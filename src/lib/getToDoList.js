import axios from "axios";

export default async function getToDoList(){
    const res = await axios.get('https://to-do-app-seven-orpin.vercel.app')
    return res.data;
}