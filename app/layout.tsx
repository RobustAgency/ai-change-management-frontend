import "./globals.css";
import { Inter } from 'next/font/google'
import { AuthProvider } from "@/providers/AuthProvider";
import { createClient } from "@/lib/supabase/server";
import AppShell from "@/layouts/AppShell";
import ToastProvider from "@/providers/ToastProvider";

export const dynamic = 'force-dynamic'

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
