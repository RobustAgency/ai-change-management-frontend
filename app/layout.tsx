import "./globals.css";
import { Inter } from 'next/font/google'
import { AuthProvider } from "@/providers/AuthProvider";
import { createClient } from "@/lib/supabase/server";
import AppShell from "@/layouts/AppShell";
import ToastProvider from "@/providers/ToastProvider";
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: {
    template: '%s | AI Change Management',
    default: 'AI Change Management Platform'
  },
  description: 'Transform your business with our AI-powered change management platform. Streamline organizational transitions, enhance communication, and drive successful change initiatives.',
  keywords: ['AI', 'change management', 'organizational transformation', 'business process', 'automation'],
  authors: [{ name: 'Robust Agency' }],
  creator: 'Robust Agency',
  publisher: 'Robust Agency',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-change-management.com',
    title: 'AI Change Management Platform',
    description: 'Transform your business with our AI-powered change management platform. Streamline organizational transitions and drive successful change initiatives.',
    siteName: 'AI Change Management',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let user = null;
  let initialProfile: { id: string; full_name?: string | null; avatar_url?: string | null } | null = null;

  try {
    const supabase = await createClient();
    const { data: { user: authUser }, error } = await supabase.auth.getUser();

    if (!error && authUser) {
      user = authUser;

      try {
        const { data } = await supabase
          .from("profiles")
          .select("id, full_name, avatar_url")
          .eq("id", authUser.id)
          .single();
        initialProfile = (data as typeof initialProfile) ?? null;
      } catch (profileError) {
        console.warn('Failed to fetch user profile:', profileError);
      }
    }
  } catch (error) {
    console.error('Failed to initialize auth:', error);
  }
  return (
    <html lang="en">
      <link rel="icon" href="/short-logo.svg" sizes="any" />
      <body className={`${inter.className} bg-gray-50`} suppressHydrationWarning={true}>
        <AuthProvider initialUser={user} initialProfile={initialProfile}>
          <AppShell>{children}</AppShell>
        </AuthProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
