import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { ChevronLeft } from 'lucide-react'
import { DrawerTrigger } from '../ui/drawer'
import ProfileInfo from './ProfileInfo'
import { Sparkles } from 'lucide-react'

type HeaderProps = {
    desktopCollapsed: boolean
    setDesktopCollapsed: (collapsed: boolean) => void
}

const Header = ({ desktopCollapsed, setDesktopCollapsed }: HeaderProps) => {
    const headerGridClass = cn(
        "grid w-full min-h-14 sticky top-0 z-30  bg-background/80 backdrop-blur transition-all duration-200",
        // Mobile: content + profile columns
        "grid-cols-[minmax(0,1fr)_auto]",
        // Desktop: first column reserved for sidebar width
        desktopCollapsed ? "md:grid-cols-[64px_minmax(0,1fr)]" : "md:grid-cols-[240px_minmax(0,1fr)]"
    )

    return (
        <header className={headerGridClass}>
            <div className="bg-gray-50 h-full w-full md:border-r flex items-center justify-between px-4">
                <div className="w-full flex items-center justify-start md:justify-between gap-0 md:gap-2">
                    {!desktopCollapsed && (
                        <div aria-details="logo" className='hidden md:block'>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-gray-900">ChangeAI</span>
                            </div>
                        </div>
                    )}
                    <DrawerTrigger className="md:hidden" asChild>
                        <Button
                            variant="outline"
                            className="size-8"
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
                            className={`size-4 transition-transform ${desktopCollapsed ? "rotate-180" : ""}`}
                        />
                    </Button>
                </div>
            </div>

            <ProfileInfo />

        </header>
    )
}

export default Header