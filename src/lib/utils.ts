import { type ClassValue, clsx } from "clsx"
import { createHash } from "crypto";
import { twMerge } from "tailwind-merge"
import { formatDate, formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseStringify(data:any) {
  return JSON.parse(JSON.stringify(data))
}

export function encryptSha256(text: string) {
  const hash = createHash('sha256');

  // Update the hash object with the input text
  hash.update(text);

  // Calculate the hash digest in hexadecimal format
  const digest = hash.digest('hex');

  // Return the hash digest
  return digest;
}

export function formatTimeAgo(createdAt: Date): string {
  const now = new Date();
  const secondsAgo = Math.round((now.getTime() - createdAt.getTime()) / 1000);

  if (secondsAgo < 2) {
    return 'Vừa xong';
  }
  else if (secondsAgo <60){
    return `${secondsAgo} giây trước`;
  }
  else if (secondsAgo < 3600) {
    const minutesAgo = Math.round(secondsAgo / 60);
    return `${minutesAgo} phút trước`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.round(secondsAgo / 3600);
    return `${hoursAgo} giờ trước`;
  } else if (secondsAgo < 604800) {
    const daysAgo = Math.round(secondsAgo / 86400);
    return `${daysAgo} ngày trước`;
  } else if (secondsAgo < 2629743) { // 1 tháng (khoảng 30 ngày)
    const weeksAgo = Math.round(secondsAgo / 604800);
    return `${weeksAgo} tuần trước`;
  } else if (secondsAgo < 31556926) { // 1 năm (khoảng 365 ngày)
    const monthsAgo = Math.round(secondsAgo / 2629743);
    return `${monthsAgo} tháng trước`;
  } else {
    const yearsAgo = Math.round(secondsAgo / 31556926);
    return `${yearsAgo} năm trước`;
  }
}

export function formatNumber(n:number):string {
  return Intl.NumberFormat('vi-VN',{
    notation: "compact",
    maximumFractionDigits: 1
  }).format(n)
}

export function slugify(input:string):string{
  return input.toLowerCase().replace(/ /g,"-")
  .replace(/[^a-z0-9-]/g,"")
}

export function convertToUsername(name: string): string {
  // Loại bỏ dấu tiếng Việt
  const noDiacriticsName = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Chuyển sang chữ thường
  const lowercaseName = noDiacriticsName.toLowerCase();
  // Thay thế khoảng trắng bằng dấu gạch ngang
  const username = lowercaseName.replace(/\s/g, '-');
  return username;
}