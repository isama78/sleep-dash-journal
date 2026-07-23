'use client';

import { useState } from 'react';
import EntryForm from './EntryForm';
import EntryList from './EntryList';
import { useToast, ToastContainer } from './Toast';


type Entry = {
  id: number;
  date: string;
  bedtime: string;
  wakeTime: string;
  mood?: number | null;
  notes: string | null;
  updatedAt: string;
};


type Props = {
  initialEntries: Entry[];
};


export default function JournalClient({
  initialEntries,
}: Props) {

  const [entries, setEntries] = useState<Entry[]>(initialEntries);

  const [editing, setEditing] = useState<Entry | null>(null);

  const [message, setMessage] = useState('');

  const {
    toasts,
    addToast,
    removeToast,
  } = useToast();



  async function refresh() {

    try {

      const res = await fetch('/api/sleep-entries');

      if (!res.ok) {
        throw new Error('Failed to load entries');
      }


      const data = await res.json();

      setEntries(data);


    } catch (error) {

      addToast(
        'Unable to refresh sleep entries.',
        'error'
      );

    }
  }



  const handleSetMessage = (msg: string) => {

    setMessage(msg);


    if (msg) {

      addToast(
        msg,
        'success'
      );

    }

  };



  return (

    <div className="space-y-4">

      <EntryForm
        editing={editing}
        setEditing={setEditing}
        onDone={refresh}
        setMessage={handleSetMessage}
      />


      <ToastContainer
        toasts={toasts}
        removeToast={removeToast}
      />


      <EntryList
        entries={entries}
        onEdit={setEditing}
        onDeleted={refresh}
        setMessage={handleSetMessage}
      />

    </div>

  );
}