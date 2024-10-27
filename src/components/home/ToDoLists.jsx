"use client";
import getToDoList from "@/lib/getToDoList";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaRegCalendarPlus } from "react-icons/fa6";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const data = await getToDoList();
        setTodos(data);
      } catch (error) {
        setError("Failed to fetch to-do items.");
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchData();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    const newToDo = {
      title: e.target.title.value,
      description: e.target.description.value,
      dueDate: e.target.date.value,
      status: e.target.status.value,
      priority: e.target.priority.value,
    };

    try {
      setLoading(true);
      await axios.post("https://to-do-app-seven-orpin.vercel.app/api/todos/post-todo", newToDo);
      toast.success("Added successfully");
      setTodos((prevTodos) => [...prevTodos, newToDo]);
      setVisible(false);
    } catch (error) {
      setError("Failed to add the new to-do item.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://to-do-app-seven-orpin.vercel.app/api/todos/delete-todo/${id}`);
      toast.success("Deleted successfully");
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      setError("Failed to delete the to-do item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {loading && (
        <div className="min-h-[calc(100vh-288px)] flex items-center justify-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
      {!loading && error && <p className="text-red-500">{error}</p>}
      {!loading && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white dark:bg-background text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 dark:text-white">
                  Activity To Do
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 dark:text-white">
                  Due Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 dark:text-white">
                  Priority
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {todos.map((todo) => (
                <tr key={todo._id}>
                  <td className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900 dark:text-white">
                    {todo.title}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700 dark:text-white">
                    {todo.dueDate}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 capitalize text-center text-gray-700 dark:text-white">
                    {todo.priority}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-center flex justify-center gap-4">
                    <a
                      href={`/update-todo/${todo._id}`}
                      className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                    >
                      Update
                    </a>
                    <a
                      onClick={() => handleDelete(todo._id)}
                      href="#"
                      className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full text-right mt-10">
            <hr className="border-gray-600 border-2 mb-10" />
            <button
              onClick={() => setVisible(!visible)}
              className="text-xl w-32 h-12 rounded bg-emerald-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000"
            >
              <span className="absolute bg-emerald-600 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-emerald-800 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              <div className="flex items-center justify-center gap-2">
                <FaRegCalendarPlus />
                <span>Add ToDo</span>
              </div>
            </button>
          </div>
          {visible && (
            <section id="input" className="w-full my-6">
              <form onSubmit={handlePost} className="space-y-6">
                <input
                  type="text"
                  placeholder="Enter Your Task Title"
                  name="title"
                  className="input input-bordered w-full p-2"
                  required
                />
                <textarea
                  placeholder="Enter Your Task Description"
                  name="description"
                  className="input input-bordered w-full p-2"
                  required
                />
                <input
                  type="date"
                  name="date"
                  className="input input-bordered w-full p-2 text-gray-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Enter Your Task Status"
                  name="status"
                  className="input input-bordered w-full p-2"
                />
                <select
                  name="priority"
                  className="input input-bordered w-full p-2 text-gray-400"
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button className="btn btn-success text-white bg-[#10B981] w-full font-bold">
                  Submit
                </button>
              </form>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default ToDoList;
