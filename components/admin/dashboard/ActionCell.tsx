"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { TableUser } from "@/hooks/admin/useUsers"
import ConfirmationDialog from "@/components/custom/ConfirmationDialog"
import { usersService } from "@/service/admin/users"
import { toast } from "react-toastify"

interface ActionCellProps {
    user: TableUser
    onRefresh?: () => void
}

const ActionCell = ({ user, onRefresh }: ActionCellProps) => {
    const [showDialog, setShowDialog] = useState(false)
    const [currentAction, setCurrentAction] = useState<"approve" | "reject" | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleActionClick = (action: "approve" | "reject") => {
        setCurrentAction(action)
        setShowDialog(true)
    }

    const handleClose = () => {
        if (!isLoading) {
            setShowDialog(false)
            setCurrentAction(null)
        }
    }

    const handleApprove = async () => {
        setIsLoading(true)
        try {
            const response = await usersService.approveUser(user.id)
            if (response.error) {
                toast.error(response.message || "Failed to approve user")
            } else {
                toast.success(response.message || "User approved successfully")
                handleClose()
                onRefresh?.()
            }
        } catch {
            toast.error("Error approving user")
        } finally {
            setIsLoading(false)
        }
    }

    const handleReject = async () => {
        setIsLoading(true)
        try {
            const response = await usersService.rejectUser(user.id)
            if (response.error) {
                toast.error(response.message || "Failed to reject user")
            } else {
                toast.success(response.message || "User rejected successfully")
                handleClose()
                onRefresh?.()
            }
        } catch {
            toast.error("Error rejecting user")
        } finally {
            setIsLoading(false)
        }
    }

    const handleConfirm = () => {
        if (currentAction === "approve") {
            handleApprove()
        } else if (currentAction === "reject") {
            handleReject()
        }
    }

    const isApproved = user.status === "approved"
    const isRejected = user.status === "rejected"

    const getDialogConfig = () => {
        if (currentAction === "approve") {
            return {
                title: "Approve User",
                description: `Are you sure you want to approve ${user.full_name}?`,
                confirmText: "Approve",
                type: "success" as const
            }
        } else if (currentAction === "reject") {
            return {
                title: "Reject User",
                description: `Are you sure you want to reject ${user.full_name}?`,
                confirmText: "Reject",
                type: "danger" as const
            }
        }
        return {
            title: "",
            description: "",
            confirmText: "",
            type: "danger" as const
        }
    }

    const dialogConfig = getDialogConfig()

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() => handleActionClick("approve")}
                        disabled={isApproved}
                        className={`${!isApproved && 'cursor-pointer'}`}
                    >
                        {isApproved ? "Approved" : "Approve"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => handleActionClick("reject")}
                        disabled={isRejected}
                        className={`${!isRejected && 'cursor-pointer'}`}
                    >
                        {isRejected ? "Rejected" : "Reject"}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {currentAction && (
                <ConfirmationDialog
                    isOpen={showDialog}
                    onClose={handleClose}
                    onConfirm={handleConfirm}
                    title={dialogConfig.title}
                    description={dialogConfig.description}
                    confirmText={dialogConfig.confirmText}
                    type={dialogConfig.type}
                    isLoading={isLoading}
                />
            )}
        </>
    )
}

export default ActionCell