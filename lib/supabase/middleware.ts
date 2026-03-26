import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

function createPassThroughResponse(request: NextRequest) {
    return NextResponse.next({
        request: { headers: request.headers },
    })
}

function hasSupabaseConfig() {
    return Boolean(
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
}

export function createSupabaseMiddlewareClient(request: NextRequest) {
    let response = createPassThroughResponse(request)

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({ name, value, ...options })
                    response = NextResponse.next({
                        request: { headers: request.headers },
                    })
                    response.cookies.set({ name, value, ...options })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({ name, value: '', ...options })
                    response = NextResponse.next({
                        request: { headers: request.headers },
                    })
                    response.cookies.set({ name, value: '', ...options })
                },
            },
        }
    )

    return { supabase, response }
}


export async function updateSession(request: NextRequest) {
    const url = request.nextUrl.clone()
    const pathname = url.pathname

    const authRoutes = [
        '/login',
        '/signup',
        '/forgot-password',
        '/reset-password',
        '/update-password',
        '/auth/confirm',
    ]

    const isAuthRoute = authRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))
    const isLogoutRoute = pathname === '/logout'
    const publicRoutes = ['/', '/terms', '/privacy-policy', '/about-us', '/api/contact', '/error']
    const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))
    const passThroughResponse = createPassThroughResponse(request)

    const redirectWithoutCookies = (toPath: string) => {
        const target = request.nextUrl.clone()
        target.pathname = toPath
        return NextResponse.redirect(target)
    }

    if (!hasSupabaseConfig()) {
        console.warn('Supabase environment variables are missing; skipping auth middleware.')

        if (!isAuthRoute && !isPublicRoute && !isLogoutRoute) {
            return redirectWithoutCookies('/error')
        }

        return passThroughResponse
    }

    try {
        const { supabase, response } = createSupabaseMiddlewareClient(request)

        const {
            data: { user },
        } = await supabase.auth.getUser()

        const redirectWithCookies = (toPath: string) => {
            const target = request.nextUrl.clone()
            target.pathname = toPath
            const redirectResponse = NextResponse.redirect(target)
            response.cookies.getAll().forEach((cookie) => {
                redirectResponse.cookies.set(cookie)
            })
            return redirectResponse
        }

        if (!user) {
            if (!isAuthRoute && !isPublicRoute) {
                return redirectWithCookies('/login')
            }
            return response
        }

        if (user && isAuthRoute && !isLogoutRoute) {
            if (user.user_metadata.role === 'admin') {
                return redirectWithCookies('/admin/dashboard')
            } else {
                return redirectWithCookies('/dashboard')
            }
        }

        return response
    } catch (error) {
        console.error('Failed to update session:', error)

        if (!isAuthRoute && !isPublicRoute && !isLogoutRoute) {
            return redirectWithoutCookies('/error')
        }

        return passThroughResponse
    }
}
