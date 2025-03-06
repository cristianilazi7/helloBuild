'use client';
import SignInForm from "./(routes)/signin/page";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">

      <SignInForm />
    </main>
  );
}
