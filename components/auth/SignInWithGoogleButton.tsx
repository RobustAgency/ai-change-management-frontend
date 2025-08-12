"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth-actions";
import Image from "next/image";
import React from "react";

const SignInWithGoogleButton = () => {
    return (
        <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
                signInWithGoogle();
            }}
        >
            <Image src="/auth/google-logo.webp" alt="Google" width={35} height={35} />
            Continue with Google
        </Button>
    );
};

export default SignInWithGoogleButton;
