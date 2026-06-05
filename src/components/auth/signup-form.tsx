import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "@/stores/useAuthStore";
const signupSchema = z.object({
  name: z.string().min(1, "Họ và tên không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type SignUpFormValues = z.infer<typeof signupSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { signUp } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    const { name, email, password } = data;
    await signUp(email, name, password);
    navigate("/sign-in");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Đăng ký tài khoản</CardTitle>
          <CardDescription>
            Nhập thông tin bên dưới để tạo tài khoản mới
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              {/* Họ và tên */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Họ và tên
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              {/* Mật khẩu */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Mật khẩu
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* Nút đăng ký */}
              <Button
                type="submit"
                className="w-full hover:cursor-pointer"
                disabled={isSubmitting}
              >
                Đăng ký
              </Button>
              <div className="text-center text-sm">
                Đã có tài khoản?{" "}
                <Link to="/sign-in" className="underline underline-offset-4">
                  Đăng nhập
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Bằng cách nhấn tiếp tục, bạn đồng ý với{" "}
        <Link to="#" className="underline hover:text-blue-600">
          Điều khoản dịch vụ
        </Link>{" "}
        và{" "}
        <Link to="#" className="underline hover:text-blue-600">
          Chính sách bảo mật
        </Link>{" "}
        của chúng tôi.
      </FieldDescription>
    </div>
  );
}
