import { connectDB } from "@/lib/connectDB";

export const POST = async (request) => {
  const newToDO = await request.json();
  const db = await connectDB();
  const todoCollction = await db.collection("to-do-list");
  try {
    const res= await todoCollction.insertOne(newToDO);
    return Response.json(res);
  } catch (error) {
    return Response.json({ messge: "something went worng" }, error, {
      status: 500,
    });
  }
};
