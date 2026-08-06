import { Pool } from 'pg';
import { auth } from '@/auth';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, 
    },
});

async function requireOwnerSession() {
  const session = await auth();
  if (!session?.user) throw new Error('Not authenticated');
  return session;
}
  
export async function getEntries(user_id: number) {
  try {
    const client = await pool.connect();
    const res = await client.query(`SELECT * FROM sleepjournal.entries WHERE user_id = ${user_id}`);
    client.release();
    return res.rows;
  } catch (error) {
    console.error('Error fetching entries:', error);
    throw new Error('Failed to fetch data');
  }
}

export async function getEntryById(entry_id: number) {
  await requireOwnerSession();
  try {
    const client = await pool.connect();
    const res = await client.query(`SELECT * FROM sleepjournal.entries WHERE entry_id = ${entry_id}`);
    client.release();
    return res.rows;
  } catch (error) {
    console.error('Error fetching entries:', error);
    throw new Error('Failed to fetch data');
  }
}

export async function getUserInfo(user_id: number) {
  await requireOwnerSession();
  try {
    const client = await pool.connect();
    const res = await client.query(`SELECT user_id, first_name, last_name, email FROM sleepjournal.users WHERE user_id = ${user_id}`);
    client.release();
    return res.rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch data');
  }
}

export async function getUserByEmail(email: string) {
  try {
    const client = await pool.connect();
    const res = await client.query(`SELECT * FROM sleepjournal.users WHERE email = '${email}'`);
    client.release();
    return res.rows[0];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch data');
  }
}
