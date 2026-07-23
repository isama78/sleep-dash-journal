import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});


/**
 * Get all sleep entries for a user
 */
export async function getEntries(user_id: number) {

  const client = await pool.connect();

  try {

    const res = await client.query(
      `
      SELECT
        entry_id,
        date,
        sleep_time,
        wake_time,
        sleep_quality,
        notes,
        NOW() as updated_at
      FROM sleepjournal.entries
      WHERE user_id = $1
      ORDER BY date DESC
      `,
      [user_id]
    );


    return res.rows.map((entry) => ({
      id: entry.entry_id,
      date: entry.date,
      bedtime: entry.sleep_time,
      wakeTime: entry.wake_time,
      mood: entry.sleep_quality,
      notes: entry.notes,
      updatedAt: entry.updated_at,
    }));


  } finally {

    client.release();

  }

}


/**
 * Get one sleep entry by id
 */
export async function getEntryById(entry_id: number) {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `
      SELECT *
      FROM sleepjournal.entries
      WHERE entry_id = $1
      `,
      [entry_id]
    );

    return result.rows[0];

  } catch (error) {
    console.error('Error fetching entry:', error);
    throw new Error('Failed to fetch entry');

  } finally {
    client.release();
  }
}


/**
 * Get user information
 */
export async function getUserInfo(user_id: number) {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `
      SELECT user_id, first_name, last_name, email
      FROM sleepjournal.users
      WHERE user_id = $1
      `,
      [user_id]
    );

    return result.rows[0];

  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');

  } finally {
    client.release();
  }
}


/**
 * Create a new sleep entry
 */
export async function createEntry(
  user_id: number,
  data: {
    date: string;
    bedtime: string;
    wake_time: string;
    sleep_quality: number | null;
    notes: string | null;
  }
) {

  const client = await pool.connect();


  try {

    const result = await client.query(
      `
      INSERT INTO sleepjournal.entries
      (
        user_id,
        date,
        sleep_time,
        wake_time,
        sleep_quality,
        notes
      )

      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6
      )

      RETURNING *
      `,
      [
        user_id,
        data.date,
        data.bedtime,
        data.wake_time,
        data.sleep_quality,
        data.notes,
      ]
    );


    return result.rows[0];


  } finally {

    client.release();

  }

}


/**
 * Update an existing sleep entry
 */
export async function updateEntry(
  entry_id: number,
  entry: {
    bedtime: string;
    wake_time: string;
    mood: string;
    notes: string;
  }
) {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `
      UPDATE sleepjournal.entries
      SET
        bedtime = $1,
        wake_time = $2,
        mood = $3,
        notes = $4
      WHERE entry_id = $5
      RETURNING *
      `,
      [
        entry.bedtime,
        entry.wake_time,
        entry.mood,
        entry.notes,
        entry_id,
      ]
    );

    return result.rows[0];

  } catch (error) {
    console.error('Error updating entry:', error);
    throw new Error('Failed to update entry');

  } finally {
    client.release();
  }
}


/**
 * Delete a sleep entry
 */

export async function deleteEntry(
  entry_id: number,
  user_id: number
) {

  const client = await pool.connect();


  try {

    const result = await client.query(
      `
      DELETE FROM sleepjournal.entries
      WHERE entry_id = $1
      AND user_id = $2
      RETURNING entry_id
      `,
      [
        entry_id,
        user_id
      ]
    );


    return result.rowCount !== 0;


  } finally {

    client.release();

  }

}
