import LoginButton from "@/components/auth/LoginLogoutButton";
import UserGreetText from "@/components/home/UserGreetText";

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="w-full border-b px-4 py-3 flex items-center justify-between">
        <UserGreetText />
        <LoginButton />
      </header>
      <section className="p-4" />
    </main>
  );
}
