"use client";
import getToDoList from "@/lib/getToDoList";
import axios from "axios";
import { useRouter } from "next/navigation"; // Keep this import
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateTodo = ({ params }) => {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getToDoList();
      setTodos(data);
      // Find the todo when the data is fetched
      const foundTodo = data.find((todo) => todo._id === params.id);
      setTodo(foundTodo);
    };
    fetchData();
  }, [params.id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const updatedData = {
      id: params.id,
      title: event.target.title.value,
      description: event.target.description.value,
      dueDate: event.target.date.value,
      status: event.target.status.value,
      priority: event.target.priority.value,
    };
    console.log(updatedData);

    try {
      setLoading(true);
      const res = await axios.patch(
        `https://to-do-app-ecru-xi.vercel.app/api/todos/update-todo`,
        updatedData
      );
      if (res.data.acknowledged) {
        toast.success("Updated successfully");
        router.push("/"); // Ensure this route is correct
      }
    } catch (error) {
      setError("Failed to update to-do item.");
      console.error(error); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };

  if (!todo) {
    return (
      <div className="min-h-[calc(100vh-288px)] flex items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto py-12 px-6">
      <h1 className="text-center py-6 text-3xl font-bold">Update ToDo Task</h1>
      <form onSubmit={handleUpdate} className="space-y-6">
        <input
          type="text"
          defaultValue={todo.title}
          name="title"
          className="input input-bordered w-full p-2"
          required
        />
        <textarea
          defaultValue={todo.description}
          name="description"
          className="input input-bordered w-full p-2"
          required
        />
        <input
          type="date"
          defaultValue={todo.dueDate.split("T")[0]} // Ensure the date is in YYYY-MM-DD format
          name="date"
          className="input input-bordered w-full p-2 text-gray-400"
          required
        />
        <input
          type="text"
          defaultValue={todo.status}
          name="status"
          className="input input-bordered w-full p-2"
        />
        <select
          name="priority"
          defaultValue={todo.priority}
          className="input input-bordered w-full p-2 text-gray-400"
          required
        >
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button className="btn btn-success text-white bg-[#10B981] w-full font-bold">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateTodo;
