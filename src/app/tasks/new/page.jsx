"use client"
import {ChangeEvent, useState,useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const FormPage = () => {
  const [newTask, setNewTask] = useState({
      title: "",
      description: ""
  });

  const params = useParams();
  const router = useRouter();

  const getTask = async ()=>{
    const res = await fetch(`/api/tasks/${params.id}`);
    const data = await res.json();
    setNewTask({
      title: data.title,
      description: data.description
    })
  }

  const createTask = async () => {
      try {
        const res = await fetch('/api/tasks',{
          method: "POST",
          body: JSON.stringify(newTask),
          headers: {
              "Content-Type": "application/json"
          }
        });
        
        if (res.status === 200) {
          router.push("/");
          router.refresh();
        }; 
        
      } catch (error) {
        console.log(erro)
      }
  };

  const updateTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${params.id}`,{
          method: 'PUT',
          body: JSON.stringify(newTask),
          headers:{
            'Content-Type': 'application/json'
          }
        });

        const data = await res.json();
        console.log(data);
      }catch (error) {
        console.log(error)
      }
  };

  const handleChange =(e) => {
    setNewTask({...newTask, [e.target.name]: e.target.value})
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();

    if (!params.id) {
      createTask();
    }else{
      updateTask();
    }
  };

  const deleteTaks = async () => {
    if (window.confirm("Estas seguro de eliminar esta tarea? ")) {
      const res = await fetch(`/api/tasks/${params.id}`,{
        method: "DELETE",
      }); 
      router.push('/')
      router.refresh();
  }};
    
  useEffect(() =>{
    if (params.id) {
      getTask();
    }
  },[]);

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <header className="flex justify-between">
          <h1 className="font-bold text-3xl">{!params.id ? "Create Task" : "Edit Task"}</h1>
          <button type="button" className="bg-red-500 px-3 py-1 rounded-md" onClick={deleteTaks}>Delete</button>
        </header>
        <input onChange={handleChange} value={newTask.title} type="text" name="title" id="title" rows={3} className="bg-gray-800 border-2  w-full p-4 rounded-lg my-4"/>
        <textarea onChange={handleChange} value={newTask.description} name="description" id="description" placeholder="Description" className="bg-gray-800 border-2  w-full p-4 rounded-lg my-4"></textarea>
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg">{!params.id ? "Save" : "Update"}</button>
      </form>
      </div>
  )
}

export default FormPage