import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";

export const GET = async () => {
    const db = await connectDB();
    const todoCollection = db.collection('to-do-list');
    try {
        const todos = await todoCollection.find().toArray();
        return  NextResponse.json(todos);
    } catch (error) {
        console.log(error
        )
    }
}