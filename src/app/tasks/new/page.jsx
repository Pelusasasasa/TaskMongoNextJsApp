"use client"
import {ChangeEvent, useState } from "react";
import { useRouter } from "next/router";

const FormPage = () => {
    const [newTask, setNewTask] = useState({
      title: "",
      description: ""
    });

    const router = useRouter();

  const handleChange =(e) => {
    setNewTask({...newTask, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try {
      const res = await fetch('/api/tasks',{
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
            "Content-Type": "application/json"
        }
      });
      
      if (res.status === 200) {
        router.push("/")
      }; 
      
    } catch (error) {
      console.log(erro)
    }
  }

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" name="title" id="title" rows={3} className="bg-gray-800 border-2  w-full p-4 rounded-lg my-4"/>
        <textarea onChange={handleChange} name="description" id="description" placeholder="Description" className="bg-gray-800 border-2  w-full p-4 rounded-lg my-4"></textarea>
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg">Save</button>
      </form>
      </div>
  )
}

export default FormPage