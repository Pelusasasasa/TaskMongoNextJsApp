const { NextResponse } = require("next/server");
import { connectDB } from '@/utils/mongoose';
import Task from '@/models/Task';

export async function GET(request,{params}) {
    try {
        connectDB();
        const task = await Task.findOne({
            _id: params.id
        });
    
        if(!task){
            return NextResponse.json({
                message: 'No se encontro la tarea'
            }, {
                status: 404
            });
        };
    
        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
};

export async function PUT(request,{params}) {
    try {
        connectDB();

        const data = await  request.json();
        console.log(params.id)
        const task = await Task.findByIdAndUpdate(params.id,data,{new: true});
    
        return NextResponse.json(task);
    } catch (error) {
        console.log(error)
        return NextResponse.json(error.message, {
            status: 400
        });
    }
};

export async function DELETE(request,{params}){

    try {
        connectDB();

        const task = await Task.findByIdAndDelete(params.id);

        if (!task) {
            return NextResponse.json({
                message: 'No se encontro la tarea'
                }, {
                    status: 404
                })
        }
        
        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
};