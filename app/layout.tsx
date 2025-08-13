import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "@/providers/AuthProvider";
import { createClient } from "@/lib/supabase/server";
import AppShell from "@/layouts/AppShell";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let initialProfile: { id: string; full_name?: string | null; avatar_url?: string | null } | null = null;
  if (user?.id) {
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url")
      .eq("id", user.id)
      .single();
    initialProfile = (data as typeof initialProfile) ?? null;
  }

  return (
    <html lang="en">
      <body>
        <AuthProvider initialUser={user} initialProfile={initialProfile}>
          <AppShell>{children}</AppShell>
        </AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            backgroundColor: 'white',
            color: 'black',
            border: 'none',
            borderRadius: '8px'
          }}
        />
      </body>
    </html>
  );
}
