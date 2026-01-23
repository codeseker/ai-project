import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const registerSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

type RegisterFormProps = {
  className?: string;
  onSubmit: (data: RegisterSchema) => void | Promise<void>;
} & Omit<React.ComponentProps<"div">, "onSubmit">;

export function SignupForm({
  className,
  onSubmit,
  ...props
}: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center bg-background px-4",
        className,
      )}
      {...props}
    >
      <Card className="w-full max-w-sm border-border">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Start learning with personalized AI courses
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
              {/* First + Last name */}
              <div className="grid grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor="first_name">First name</FieldLabel>
                  <Input
                    id="first_name"
                    placeholder="John"
                    {...register("first_name")}
                  />
                  {errors.first_name && (
                    <p className="text-sm text-destructive">
                      {errors.first_name.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="last_name">Last name</FieldLabel>
                  <Input
                    id="last_name"
                    placeholder="Doe"
                    {...register("last_name")}
                  />
                  {errors.last_name && (
                    <p className="text-sm text-destructive">
                      {errors.last_name.message}
                    </p>
                  )}
                </Field>
              </div>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
                <FieldDescription>
                  We’ll never share your email.
                </FieldDescription>
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                <FieldDescription>
                  Must be at least 6 characters.
                </FieldDescription>
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              {/* Confirm Password */}
              <Field>
                <FieldLabel htmlFor="confirm_password">
                  Confirm password
                </FieldLabel>
                <Input
                  id="confirm_password"
                  type="password"
                  {...register("confirm_password")}
                />
                {errors.confirm_password && (
                  <p className="text-sm text-destructive">
                    {errors.confirm_password.message}
                  </p>
                )}
              </Field>

              {/* Actions */}
              <Field className="space-y-3">
                <Button type="submit" className="w-full">
                  Create account
                </Button>

                <Button variant="outline" type="button" className="w-full">
                  Continue with Google
                </Button>

                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
