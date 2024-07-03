const  express = require("express")
require('dotenv').config()
const mongoose = require("mongoose")
const cors = require("cors")
const authRouter = require("./router/authRouter")
const todoRouter = require("./router/todoRouter")



const app = express()

app.use(express.json())

app.use(
    cors({
        origin: [
                 "https://todo-9bl4.onrender.com",
                 "http://localhost:3000",
                 "http://localhost:3000/:id"],
        method: ["GET","POST","PATCH","DELETE"]
    })
)
app.use((req, res, next)=>{

    console.log(req.path, req.method);
    next();
})
app.use('/api/auth/', authRouter)
app.use('/api/todo/', todoRouter)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log('Connected to database and server running on port');
    });
})
.catch((error)=>{
    console.log(error);
})


