"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { User } from "./columns"

interface ConfirmationDialogProps {
    isOpen: boolean
    onClose: () => void
    action: "approve" | "reject"
    user: User
    onConfirm: () => void
}

const ConfirmationDialog = ({ isOpen, onClose, action, user, onConfirm }: ConfirmationDialogProps) => {
    const isApprove = action === "approve"

    const title = isApprove ? "Approve User" : "Reject User"
    const description = isApprove
        ? `Are you sure you want to approve ${user.full_name}?`
        : `Are you sure you want to reject ${user.full_name}?`

    const confirmButtonText = isApprove ? "Approve" : "Reject"
    const confirmButtonVariant = isApprove ? "default" : "destructive"
    const confirmButtonClassName = isApprove ? "bg-green-600 hover:bg-green-700" : ""

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        variant={confirmButtonVariant as any}
                        className={confirmButtonClassName}
                    >
                        {confirmButtonText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmationDialog
