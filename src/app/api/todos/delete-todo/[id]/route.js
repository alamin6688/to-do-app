import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const todoCollection = await db.collection("to-do-list");

  try {
    const deleteToDo = await todoCollection.deleteOne({ _id: new ObjectId(params.id) });
    return Response.json(deleteToDo);
  } catch (error) {
    return Response.json({ messge: "something went worng" }, error, {
      status: 500,
    });
  }
};
