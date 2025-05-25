import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

export async function GET(
  req: NextRequest,
  context: { params: { lastname: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('records');

    const finalData = await db
      .collection('records')
      .find({ lastname: context.params.lastname })
      .toArray();

    if (!finalData) {
      return NextResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    return NextResponse.json({ dbPosts: finalData });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
