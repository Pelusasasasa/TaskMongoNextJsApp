import {connect,connection} from 'mongoose';

const conn = {
    isConnected: false,
};

export async function connectDB(){
    if(conn.isConnected) return;

    const db = await connect('mongodb://localhost/Tasks');
    console.log(db.connection.db.databaseName);
    conn.isConnected = db.connections[0].readyState;
}


connection.on('conected',() =>{
    console.log("Mongosse is connected");
});

connection.on('error',(err) =>{
    console.log("Mongosse connection error ", err);
});