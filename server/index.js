import express from 'express';
import cors from 'cors';

const app = express();

// in the production will add an origin named parameter in the cors
app.use(cors());

// if also it hosted in production the process port will be avalible otherwise will be local:3005 
const port = process.env.PORT || 3005;

app.get("/", (req , res) => {
    res.send("Hello from our API")
})

app.listen(port, () =>{
  console.log(`Listening on port ${port}...`);
});