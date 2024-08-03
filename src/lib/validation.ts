import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Họ không được để trống")
    .regex(
      /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]*$/,
      "Họ không hợp lệ"
    ),
  lastName: z
    .string()
    .trim()
    .min(1, "Tên không được để trống")
    .regex(
      /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]*$/,
      "Tên không hợp lệ"
    ),
  email: z
    .string()
    .trim()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),
  username: z
    .string()
    .trim()
    .min(1, "Tên đăng nhập không được để trống")
    .regex(/^[a-zA-Z0-9_]{1,30}$/, "Tên đăng nhập không hợp lệ"),
  password: z.string().trim().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  repassword: z.string().trim().min(1, "Mật khẩu không được để trống"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  username: z.string().trim().min(1, "Tên đăng nhập không được để trống"),
  password: z.string().trim().min(1, "Mật khẩu không được để trống"),
});

export type SignInValues = z.infer<typeof signInSchema>;

export const createPostSchema = z.object({
  content: z.string().trim().min(1, "Nội dung không được để trống"),
  mediaIds: z.array(z.string()).max(5, "Bạn chỉ được chọn tối đa 5 ảnh/video"),
});

export type CreatePostValues = z.infer<typeof createPostSchema>;

export const updateUserProfileSchema = z.object({
  username: z.string().trim().min(1, "Tên đăng nhập không được để trống"),
  firstName: z.string().trim().min(1, "Nội dung không được để trống"),
  lastName: z.string().trim().min(1, "Nội dung không được để trống"),
  bio: z.string().trim().max(1000, "Tối đa 1000 ký tự"),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;

export const createCommentSchema = z.object({
  content: z.string().trim().min(1, "Nội dung không được để trống"),
});
