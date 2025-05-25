export const dynamic = 'force-dynamic';

import { getMongo } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const client = await getMongo()
        const db = client.db('records')

        const filter = {title: body.title}

        const update = {
            $set: {
                title: body.title,
                description: body.description,
                image: body.image,
                readingTime: body.readingTime,
                name: body.name,
                lastname: body.lastname,
            },
            $setOnInsert: {
                createdAt: new Date(),
              },
        }

        const result = await db.collection('records').updateOne(filter, update, {upsert: true})

        return NextResponse.json({
            message: result.upsertedCount 
            ? 'Create new item'
            : 'Updated exisiting item'
        }, {status: 200})

    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "ERROR"}, {status: 500})
    }
}

export async function GET(req: Request) {
    // Think of doing pagination through dynamic string and just extract from the server side 
    // or do it on the client 
    try {
    const {searchParams} = new URL(req.url)
    const pageNumber = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'

    const client = await getMongo() // forgot to change this
    const db = client.db('records')
    const length = await db.collection('records').estimatedDocumentCount()
    const pageCount: number = Math.ceil(length / parseInt(limit))
    const skip = (parseInt(pageNumber) - 1) * parseInt(limit)
    const data = await db.collection('records').find({}).skip(skip).limit(parseInt(limit)).toArray()

    return NextResponse.json({
        items: data,
        pages: pageCount,
        newPage: pageNumber,
    }, {status: 200})
    } catch (err){
        console.log(err)
        return NextResponse.json({message: err}, {status: 500})
    }
}