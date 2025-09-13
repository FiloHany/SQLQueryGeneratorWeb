import express from 'express';
import cors from 'cors';
import generate from './generate.js';
const app = express();

app.use(express.json())
// in the production will add an origin named parameter in the cors
app.use(cors());

// if also it hosted in production the process port will be avalible otherwise will be local:3005 
const port = process.env.PORT || 3005;

app.get("/", (req , res) => {
    res.send("Hello from our API")
})

app.post('/generate', async (req , res)=>{
  const queryDescription = req.body.queryDescription
  try{
    const SqlQuery = await generate(queryDescription)
    res.json({response: SqlQuery})
  }catch (error){
    console.error(error)
    res.status(500).send("Internal server error")
  }
})

app.listen(port, () =>{
  console.log(`Listening on port ${port}...`);
});