import JournalClient from '@/components/journal/JournalClient';
import { listSleepEntries } from '@/lib/journal/service';

const DEMO_USER_ID = 'demo-user-1';

export default async function JournalPage() {
  const initialEntries = await listSleepEntries(DEMO_USER_ID);

  const safeEntries = initialEntries.map((e) => ({
    id: e.id,
    date: e.date.toISOString(),
    bedtime: e.bedtime,
    wakeTime: e.wakeTime,
    mood: e.mood,
    notes: e.notes,
    updatedAt: e.updatedAt.toISOString(),
  }));

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Sleep Journal</h1>
      <p className="text-sm text-slate-600">
        Create, edit, and delete your sleep entries.
      </p>
      <JournalClient initialEntries={safeEntries} />
    </main>
  );
}