import { connectDB } from "@/lib/connectDB";
import { toDoList } from "@/lib/toDoList";


export const GET = async () => {
    const db = await connectDB();
    const todoCollection = db.collection('to-do-list');

    try {
        await todoCollection.deleteMany();
        const res = await todoCollection.insertMany(toDoList);
        return Response.json({message: 'ToDos seeded successfully'})
    } catch (error) {
        console.log(error
        )
    }
}