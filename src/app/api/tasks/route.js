import { connectDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";

import Task from '@/models/Task'

export async function GET() {
    connectDB();

    const tasks = await Task.find();
    return NextResponse.json(tasks);
};

export async function POST(req,res) {

    try {
        const tarea = await req.json();
        const saveTask = await new Task(tarea).save();
        return NextResponse.json(saveTask);
    } catch (error) {
        return NextResponse.json(error.message,{
            status: 400
        });
    }
};