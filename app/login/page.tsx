import { LoginForm } from '@/app/components/LoginForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center text-primary">Sign In</h1>
        <LoginForm />
      </div>
    </main>
  );
}