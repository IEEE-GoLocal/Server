import {server} from "./app.js";
import {connectDB} from "./data/database.js"
import { io } from "./app.js";

connectDB();

const PORT=process.env.PORT

server.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})

/************** Sockets Setup ***************/
io.on('connection', (socket) => {
    console.log(`User Socket ${socket.id} connected`);
    
    // join chat room
    socket.on('join-room',(roomId) => {
        socket.join(roomId)
        console.log('User joined room: ' + roomId);
    })

    // send and recieve messages
    socket.on('send-message',data => { // data = {sender: ,room: ,msg: }
        const convo = {sender : data.sender , msg : data.msg}
        socket.broadcast.to(data.roomId).emit('receive-message',convo)
    })
})

io.on("disconnect", (socket) => {
    console.log(`User Socket ${socket.id} disconnected`);
})