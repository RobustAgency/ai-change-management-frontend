"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, "type"> & {
    toggleAriaLabel?: string
}

export function PasswordInput({ className, toggleAriaLabel = "Toggle password visibility", ...props }: PasswordInputProps) {
    const [isVisible, setIsVisible] = React.useState(false)

    return (
        <div className="relative">
            <Input
                {...props}
                type={isVisible ? "text" : "password"}
                className={cn("pr-10", className)}
            />
            <button
                type="button"
                aria-label={toggleAriaLabel}
                onClick={() => setIsVisible((v) => !v)}
                className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                tabIndex={0}
            >
                {isVisible ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                )}
            </button>
        </div>
    )
}

export default PasswordInput


