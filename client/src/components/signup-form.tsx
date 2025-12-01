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

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirm_password: z
      .string()
      .min(1, "Confirm password is required"),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
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
    <Card {...props} className={className}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="first_name">First Name</FieldLabel>
              <Input
                id="first_name"
                type="text"
                placeholder="John"
                {...register("first_name")}
              />
              {errors.first_name && (
                <p className="text-red-600 text-sm">
                  {errors.first_name.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
              <Input
                id="last_name"
                type="text"
                placeholder="Doe"
                {...register("last_name")}
              />
              {errors.last_name && (
                <p className="text-red-600 text-sm">
                  {errors.last_name.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}

              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" {...register("password")} />
              <FieldDescription>
                Must be at least 6 characters long.
              </FieldDescription>

              {errors.password && (
                <p className="text-red-600 text-sm">
                  {errors.password.message}
                </p>
              )}
            </Field>

            {/* CONFIRM PASSWORD */}
            <Field>
              <FieldLabel htmlFor="confirm_password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm_password"
                type="password"
                {...register("confirm_password")}
              />
              {errors.confirm_password && (
                <p className="text-red-600 text-sm">
                  {errors.confirm_password.message}
                </p>
              )}
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>

                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link to="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
