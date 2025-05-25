export const dynamic = 'force-dynamic';  

import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET(req: Request, { params }: { params: { lastname: string } }){
   try {
    const client = await clientPromise
    const db = client.db('records')

    const finalData = await db.collection('records').find({lastname: params.lastname}).toArray()

    if (!finalData) {
        return NextResponse.json({message: "Not Found"})
    }

    return NextResponse.json({
        dbPosts: finalData
    })
}   catch(err) {
    console.log(err)
    return NextResponse.json({message: err})
}
}
