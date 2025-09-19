import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/ (all Next.js internals including HMR)
         * - favicon.ico (favicon file)
         * - common asset extensions (css, js, images, maps)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/|favicon.ico|.*\\.(?:css|js|map|svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
}