

import { Lucia, Session, User } from "lucia";
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import prisma from "./lib/prisma";
import { cache } from "react";
import { cookies } from "next/headers";
import { Google } from 'arctic'

const adapter = new PrismaAdapter(prisma.session, prisma.user)

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production"
		}
	},
	getUserAttributes: (attributes) => {
		return {
			id: attributes.id,
			username: attributes.username,
      displayName: attributes.displayName,
      avatarUrl: attributes.avatarUrl,
      googleId: attributes.googleId
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  `${process.env.NEXT_PUBLIC_BASSE_URL}/api/auth/google/callback`
)

interface DatabaseUserAttributes {
  id: string;
	username: string;
  displayName: string;
  avatarUrl: string|undefined;
  googleId: string|null;
}

export const validateRequest = cache(
  async() : Promise<
    {user:User, session: Session} | { user: null, session: null}
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null

    if(!sessionId){
      return { user: null, session: null }
    }
    const result = await lucia.validateSession(sessionId)

    try {
      if(result.session && result.session.fresh){
        const sessionCookie = lucia.createSessionCookie(result.session.id)
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        )
      }
      if(!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie()
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        )
      }
    } catch (error) {
      console.log(error)
    }
    return result
  }
)