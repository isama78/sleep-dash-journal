import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-3">Sleep Dash Journal</h1>
      <p className="text-slate-600 mb-6">
        Welcome! Manage your sleep entries with create, edit, and delete flows.
      </p>

      <Link
        href="/journal"
        className="inline-flex rounded-md bg-black text-white px-4 py-2 hover:opacity-90"
      >
        Go to Journal
      </Link>
    </main>
  );
}