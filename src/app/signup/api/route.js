import { connectDB } from "@/lib/connectDB"
import bcrypt from "bcrypt";


export const POST = async (request) => {

    const newUser = await request.json()

    try {
        const db = await connectDB()
        const userCollction = await db.collection('users');
        const exist = await userCollction.findOne({ email: newUser.email })
        if (exist) {
            return Response.json({ messge: 'user already exists' }, { status: 304 })
        }
        const hassedPass = bcrypt.hashSync(newUser.password, 14);
        const res = await userCollction.insertOne({ ...newUser, password: hassedPass })
        return Response.json(res)
    } catch (error) {
        return Response.json({ messge: 'something went worng' }, error, { status: 500 })
    }

}