import axios from "axios";

export default async function getToDoList(){
    const res = await axios.get('https://to-do-app-seven-orpin.vercel.app/api/todos/get-all')
    return res.data;
}