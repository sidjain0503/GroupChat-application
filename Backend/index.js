const express = require('express')
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const connectdb = require('./Connect');
const UserRouter = require('./Routes/UserRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

connectdb();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hey your app running ")
})

app.use('/api/user',UserRouter);
app.use(notFound)
app.use(errorHandler)

// app.get('/api/chat',(req,res)=>{
//     res.send("here comes all the chat data ")
// })

// app.get('/api/chat/:id',(req,res)=>{
//     res.send("here single chat data ")
// })



const port = process.env.PORT;
app.listen(port,()=>
{
    console.log(`server started succesfully on port ${port}`)
})