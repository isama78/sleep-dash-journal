import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, 
    },
});
  
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
