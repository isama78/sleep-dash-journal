'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4 bg-background p-6 rounded-lg border border-secondary shadow-md">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-semibold text-primary">Email</label>
        <input 
          id="email" 
          type="email" 
          name="email" 
          required 
          className="px-3 py-2 rounded-md border border-primary bg-background text-text focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-semibold text-primary">Password</label>
        <input 
          id="password" 
          type="password" 
          name="password" 
          minLength={6} 
          required 
          className="px-3 py-2 rounded-md border border-primary bg-background text-text focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      
      <button 
        aria-disabled={isPending} 
        disabled={isPending}
        type="submit"
        className="mt-2 bg-accent text-background font-bold py-2.5 px-4 rounded-md hover:bg-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
      
      {errorMessage && (
        <p role="alert" className="text-accent text-sm font-medium text-center">
          {errorMessage}
        </p>
      )}
    </form>
  );
}