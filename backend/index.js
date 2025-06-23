import express from 'express';
import cors from 'cors';



const app=express();


app.use('/',(req,res)=>{
    res.json({
        message:"Hello from the backend"
    },{status:200})
}
)

app.listen(8000,(req,res)=>{
    console.log("Server is running on port 8000");
})