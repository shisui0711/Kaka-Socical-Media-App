<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_._JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white" alt="postgres" />
  </div>

  <h3 align="center">Kaka - Social Media App</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)


## <a name="introduction">🤖 Introduction</a>

In today's fast-paced, digital world, staying connected with friends, family, and communities has never been more important. Yet, the social media landscape has become cluttered, distracting, and often overwhelming. That's where Kaka comes in.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- TypeScript
- Prisma - Postgresql
- TanStack-Query
- ShadCN
- Tailwind CSS

## <a name="features">🔋 Features</a>

👉 **Authentication**: Secure and reliable user login and registration system.

👉 **Interactions**: Users can interact with each other by actions such as following, liking, commenting, and sharing.

👉 **Bookmark Page**: Dedicated page for users to store favourite posts.

👉 **Fully Functional Search**: Allows users to find posts easily using various search criteria.

👉 **Create Post Modern**: Enables post creation with paste or drag to upload attachments and attachments previews.

👉 **Dark Mode**: Intergration dark mode for UX .

👉 **Profile Page**: View detail infomation of user about each avatar, name, posts, followers, tagged, bio.

👉 **Post Details Page**: Displays detailed information about each post, including creator details, content, interactions, attachments.

👉 **Responsive Design**: Fully functional and visually appealing across all devices and screen sizes.

and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/shisui0711/Taka-Socical-Media-App.git
cd Taka-Socical-Media-App
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
POSTGRES_PRISMA_URL=
POSTGRES_PRISMA_URL_NON_POOLING=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

UPLOADTHING_SECRET=
NEXT_PUBLIC_UPLOADTHING_APP_ID=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=

CLEAR_UPLOADS_SECRET=
NEXT_PUBLIC_BASE_URL=http://localhost:3000

```

Replace the placeholder values with your actual Uploadthing & Google credentials. You can obtain these credentials by signing up on the [Google](https://cloud.google.com/) and [Uploadthing](https://uploadthing.com/) websites.

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
