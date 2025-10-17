"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Eye } from "lucide-react"
import { TableUser } from "@/hooks/admin/useUsers"
import ConfirmationDialog from "@/components/custom/ConfirmationDialog"
import { usersService } from "@/service/admin/users"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

interface ActionCellProps {
    user: TableUser
    onRefresh?: () => void
    onDashboardRefresh?: () => void
}

const ActionCell = ({ user, onRefresh, onDashboardRefresh }: ActionCellProps) => {
    const router = useRouter()
    const [showDialog, setShowDialog] = useState(false)
    const [currentAction, setCurrentAction] = useState<"activate" | "deactivate" | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleViewDetails = () => {
        router.push(`/admin/users/${user.id}`)
    }

    const handleActionClick = (action: "activate" | "deactivate") => {
        setCurrentAction(action)
        setShowDialog(true)
    }

    const handleClose = () => {
        if (!isLoading) {
            setShowDialog(false)
            setCurrentAction(null)
        }
    }

    const handleActivate = async () => {
        setIsLoading(true)
        try {
            const response = await usersService.activateUser(user.id)
            if (response.error) {
                toast.error(response.message || "Failed to activate user")
            } else {
                toast.success(response.message || "User activated successfully")
                handleClose()
                onRefresh?.()
                onDashboardRefresh?.() // Refresh dashboard stats
            }
        } catch {
            toast.error("Error activating user")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeactivate = async () => {
        setIsLoading(true)
        try {
            const response = await usersService.deactivateUser(user.id)
            if (response.error) {
                toast.error(response.message || "Failed to deactivate user")
            } else {
                toast.success(response.message || "User deactivated successfully")
                handleClose()
                onRefresh?.()
                onDashboardRefresh?.() // Refresh dashboard stats
            }
        } catch {
            toast.error("Error deactivating user")
        } finally {
            setIsLoading(false)
        }
    }

    const handleConfirm = () => {
        if (currentAction === "activate") {
            handleActivate()
        } else if (currentAction === "deactivate") {
            handleDeactivate()
        }
    }

    const isActive = user.status === "active"
    const isInactive = user.status === "inactive"

    const getDialogConfig = () => {
        if (currentAction === "activate") {
            return {
                title: "Activate User",
                description: `Are you sure you want to activate ${user.full_name}?`,
                confirmText: "Activate",
                type: "success" as const
            }
        } else if (currentAction === "deactivate") {
            return {
                title: "Deactivate User",
                description: `Are you sure you want to deactivate ${user.full_name}?`,
                confirmText: "Deactivate",
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
                    <Button 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation()
                            handleViewDetails()
                        }}
                        className="cursor-pointer"
                    >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation()
                            handleActionClick("activate")
                        }}
                        disabled={isActive}
                        className={`${!isActive && 'cursor-pointer'}`}
                    >
                        {isActive ? "Active" : "Activate"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation()
                            handleActionClick("deactivate")
                        }}
                        disabled={isInactive}
                        className={`${!isInactive && 'cursor-pointer'}`}
                    >
                        {isInactive ? "Inactive" : "Deactivate"}
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