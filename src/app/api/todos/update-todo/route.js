import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export const PATCH = async (request) => {
  const updatedData = await request.json();
  const id = updatedData.id;
  const db = await connectDB();
  const todoCollection = await db.collection("to-do-list");
  const query = await todoCollection.findOne({ _id: new ObjectId(id) });
  const updatedDoc = {
    $set: {
      ...updatedData,
    },
  };
  const result = await todoCollection.updateOne(query, updatedDoc);

  return Response.json(result);
};
