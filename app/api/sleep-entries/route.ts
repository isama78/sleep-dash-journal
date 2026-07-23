import { NextRequest, NextResponse } from 'next/server';
import { createEntry, getEntries } from '@/lib/db';


const DEMO_USER_ID = 1;



export async function GET() {

  try {

    const entries = await getEntries(DEMO_USER_ID);

    return NextResponse.json(entries);


  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: 'Failed to fetch entries',
      },
      {
        status: 500,
      }
    );

  }

}




export async function POST(
  request: NextRequest
) {

  try {

    const body = await request.json();


    const {
      date,
      bedtime,
      wake_time,
      sleep_quality,
      notes,
    } = body;



    if (!date || !bedtime || !wake_time) {

      return NextResponse.json(
        {
          message:
            'Date, bedtime and wake time are required.',
        },
        {
          status: 400,
        }
      );

    }



    const newEntry = await createEntry(
      DEMO_USER_ID,
      {
        date,
        bedtime,
        wake_time,
        sleep_quality,
        notes,
      }
    );



    return NextResponse.json(
      newEntry,
      {
        status: 201,
      }
    );



  } catch (error) {

    console.error(
      'POST sleep entry error:',
      error
    );


    return NextResponse.json(
      {
        message: 'Failed to create entry',
      },
      {
        status: 500,
      }
    );

  }

}