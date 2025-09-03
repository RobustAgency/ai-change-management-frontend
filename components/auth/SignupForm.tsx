"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import { Loader2, Sparkles, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/auth-actions";
import SignInWithGoogleButton from "./SignInWithGoogleButton";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold" type="submit" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="animate-spin" />
                </>
            ) : (
                <>
                    Create account
                </>
            )}
        </Button>
    );
}

export function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false)
    const formRef = useRef<HTMLFormElement | null>(null);
    const [state, formAction] = useActionState(
        async (_prevState: unknown, formData: FormData) => {
            const result = await signup(formData);
            return result;
        },
        null as null | { success: boolean; message?: string }
    );

    useEffect(() => {
        if (!state) return;
        if (state.success) {
            toast.success("A verification email has been sent.");
            formRef.current?.reset();
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <>
            <Card className="shadow-xl border">
                <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Create your account</CardTitle>
                    <CardDescription className="text-gray-600">
                        Join ChangeAI and start generating professional communication assets
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <form ref={formRef} action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="full-name" className="text-sm font-medium text-gray-700">
                                Full name
                            </Label>
                            <Input
                                name="full-name"
                                id="full-name"
                                placeholder="Enter your full name"
                                required
                                className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email address
                            </Label>
                            <Input
                                name="email"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                required
                                className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    name="password"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    required
                                    className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center py-2">
                            <input
                                id="agree-terms"
                                name="agree-terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                                I agree to the{" "}
                                <Link href="/terms" className="text-indigo-600 hover:text-indigo-700">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        <SubmitButton />
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <SignInWithGoogleButton />
                </CardContent>
            </Card>

            <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
                        Sign in
                    </Link>
                </p>
            </div>
        </>
    );
}
