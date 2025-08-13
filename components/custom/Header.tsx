import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { ChevronLeft } from 'lucide-react'
import { DrawerTrigger } from '../ui/drawer'
import Image from 'next/image'
import { useAuth } from '@/providers/AuthProvider'

type HeaderProps = {
    desktopCollapsed: boolean
    setDesktopCollapsed: (collapsed: boolean) => void
}

const Header = ({ desktopCollapsed, setDesktopCollapsed }: HeaderProps) => {
    const { profile, user } = useAuth()
    const avatarUrl = profile?.avatar_url
    const displayName = profile?.full_name ?? "User"
    const role = user?.user_metadata?.role ?? "user"

    return (
        <header className={cn(
            "grid w-full min-h-14 sticky top-0 z-30 border-b bg-background/80 backdrop-blur transition-all duration-200",
            "grid-cols-[minmax(0,1fr)_auto]",
            desktopCollapsed ? "md:grid-cols-[64px_minmax(0,1fr)]" : "md:grid-cols-[200px_minmax(0,1fr)]"
        )}>
            <div className="h-full w-full md:border-r flex items-center justify-between px-4">
                <div className="flex items-center justify-center gap-2">
                    {!desktopCollapsed && (
                        <div aria-details="logo">
                            <h1 className="text-base font-semibold hidden md:block">MVP Skeleton</h1>
                        </div>
                    )}
                    <DrawerTrigger className="md:hidden" asChild>
                        <Button
                            variant="outline"
                            className=" size-8"
                            size="icon"
                            aria-label="Open sidebar"
                        >
                            <ChevronLeft className="size-4 rotate-180" />
                        </Button>
                    </DrawerTrigger>
                    <Button
                        variant="outline"
                        className="cursor-pointer hidden size-8 md:inline-flex"
                        size="icon"
                        aria-label="Toggle sidebar"
                        onClick={() => setDesktopCollapsed(!desktopCollapsed)}
                    >
                        <ChevronLeft
                            className={cn(
                                "size-4 transition-transform",
                                desktopCollapsed ? "rotate-180" : ""
                            )}
                        />
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-3 justify-end px-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                    {avatarUrl ? (
                        <Image src={avatarUrl} alt={displayName} fill sizes="40px" className="object-cover" unoptimized />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm font-medium">
                            {displayName.slice(0, 2).toUpperCase()}
                        </div>
                    )}
                </div>
                <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{displayName}</div>
                    <div className="text-xs capitalize text-muted-foreground">{role}</div>
                </div>
            </div>
        </header>
    )
}

export default Header