"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { User } from "./columns"
import ConfirmationDialog from "./ConfirmationDialog"

interface ActionCellProps {
    user: User
}

const ActionCell = ({ user }: ActionCellProps) => {
    const [showDialog, setShowDialog] = useState(false)
    const [currentAction, setCurrentAction] = useState<"approve" | "reject" | null>(null)

    const handleActionClick = (action: "approve" | "reject") => {
        setCurrentAction(action)
        setShowDialog(true)
    }

    const handleClose = () => {
        setShowDialog(false)
        setCurrentAction(null)
    }

    const handleApprove = () => {
        console.log("Approve user:", user.id)
    }

    const handleReject = () => {
        console.log("Reject user:", user.id)
    }

    const handleConfirm = () => {
        if (currentAction === "approve") {
            handleApprove()
        } else if (currentAction === "reject") {
            handleReject()
        }
        handleClose()
    }

    const isApproved = user.status === "approved"
    const isRejected = user.status === "rejected"

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
                    action={currentAction}
                    user={user}
                    onConfirm={handleConfirm}
                />
            )}
        </>
    )
}

export default ActionCell