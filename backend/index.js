import express from 'express';
import cors from 'cors';



const app=express();
router=express.Router();

router.get('/',(req,res)=>{
    res.send("Hello World");
}
)

app.listen(8000,(req,res)=>{
    console.log("Server is running on port 8000");
})