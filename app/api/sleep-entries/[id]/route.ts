import { NextRequest, NextResponse } from 'next/server';
import { deleteEntry, updateEntry } from '@/lib/db';


const DEMO_USER_ID = 1;



export async function DELETE(
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {

  try {

    const { id } = await params;

    const entryId = Number(id);


    if (Number.isNaN(entryId)) {

      return NextResponse.json(
        {
          message: 'Invalid entry id',
        },
        {
          status: 400,
        }
      );

    }



    const deleted = await deleteEntry(
      entryId,
      DEMO_USER_ID
    );



    if (!deleted) {

      return NextResponse.json(
        {
          message: 'Entry not found',
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      {
        message: 'Entry deleted successfully',
      },
      {
        status: 200,
      }
    );



  } catch (error) {

    console.error(
      'Delete entry error:',
      error
    );


    return NextResponse.json(
      {
        message: 'Failed to delete entry',
      },
      {
        status: 500,
      }
    );

  }

}





export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {


  try {


    const { id } = await params;

    const entryId = Number(id);



    if (Number.isNaN(entryId)) {

      return NextResponse.json(
        {
          message: 'Invalid entry id',
        },
        {
          status: 400,
        }
      );

    }



    const body = await request.json();



    const updated = await updateEntry(
      entryId,
      DEMO_USER_ID,
      body
    );



    if (!updated) {

      return NextResponse.json(
        {
          message: 'Entry not found',
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      updated,
      {
        status: 200,
      }
    );



  } catch (error) {

    console.error(
      'Update entry error:',
      error
    );


    return NextResponse.json(
      {
        message: 'Failed to update entry',
      },
      {
        status: 500,
      }
    );

  }

}