import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import transactionRouter from "./routes/transactionFormRoute.js"
import dashboardRouter from "./routes/dashboardRoute.js"

const app=express()
const port=process.env.PORT || 4000
connectDB()




//middlewares
app.use(cors());
app.use(cors({
    origin: ['http://localhost:5173','https://transaction-tracking-frontend.vercel.app/'], // Allow only this origin to access the server
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS', // Allowed HTTP methods
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, auth-token', // Allowed headers
    credentials: true // If you need to send cookies or HTTP authentication
}));
app.use(express.json())
// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

app.use('/api/transactionForm',transactionRouter)
app.use('/api/dashboard',dashboardRouter)

app.get('/',(req,res)=>{
    res.send("Api working")
})

app.listen(port,()=>console.log("Server started",port))
