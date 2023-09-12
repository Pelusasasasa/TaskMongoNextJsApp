import { Schema,model,models } from "mongoose";

const Task = new Schema({
    title:{
        type:String,
        required: [true,'El titulo es obligatorio'],
        unique:true,
        trim: true,
    },
    description:{
        type:String,
        required: [true,'La descripcion es obligatoria'],
        trim:true,
    }
},{
    timestamps:true
});

export default models.Task || model('Task',Task);