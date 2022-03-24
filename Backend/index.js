const express = require('express')
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const connectdb = require('./Connect');
const UserRouter = require('./Routes/UserRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const ChatRoutes = require('./Routes/ChatRoutes');
const MessageRouter = require('./Routes/MessageRoute');

connectdb();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Chat application succesfully running !  ")
})

app.use('/api/user',UserRouter);
app.use('/api/chat',ChatRoutes)
app.use('/api/messages',MessageRouter)

app.use(notFound)
app.use(errorHandler)

// app.get('/api/chat',(req,res)=>{
//     res.send("here comes all the chat data ")
// })

// app.get('/api/chat/:id',(req,res)=>{
//     res.send("here single chat data ")
// })



const port = process.env.PORT;
const server = app.listen(port,()=>
{
    console.log(`server started succesfully on port http://localhost:${port}`)
})
const io = require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin: 'http://localhost:3000'
    }
})

io.on("connection",(socket)=>{
    console.log("connected to socket.io")
})
