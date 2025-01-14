import { connectDB } from "@/lib/connectDB"

export const GET = async () => {
    const db = await connectDB();
    const todoCollection = db.collection('to-do-list');
    try {
        const todos = await todoCollection.find().toArray();
        return  Response.json(todos);
    } catch (error) {
        console.log(error
        )
    }
}