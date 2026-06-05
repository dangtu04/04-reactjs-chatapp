import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "@/stores/useAuthStore";

const signinSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type SignInFormValues = z.infer<typeof signinSchema>;

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signIn } = useAuthStore();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SignInFormValues) => {
    const { email, password } = data;
    await signIn(email, password);
    navigate("/");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Đăng nhập</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
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
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Mật khẩu
                  </label>
                  {/* <Link
                    to="/forgot-password"
                    className="text-sm underline underline-offset-4 hover:text-blue-600"
                  >
                    Quên mật khẩu?
                  </Link> */}
                </div>
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
              {/* Nút đăng nhập */}
              <Button
                type="submit"
                className="w-full hover:cursor-pointer"
                disabled={isSubmitting}
              >
                Đăng nhập
              </Button>
              <div className="text-center text-sm">
                Chưa có tài khoản?{" "}
                <Link to="/sign-up" className="underline underline-offset-4">
                  Đăng ký
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Bằng cách nhấn tiếp tục, bạn đồng ý với{" "}
        <Link to="/terms" className="underline hover:text-blue-600">
          Điều khoản dịch vụ
        </Link>{" "}
        và{" "}
        <Link to="/privacy" className="underline hover:text-blue-600">
          Chính sách bảo mật
        </Link>{" "}
        của chúng tôi.
      </FieldDescription>
    </div>
  );
}
