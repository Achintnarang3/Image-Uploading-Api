const express = require("express");
const fileupload=require("express-fileupload");
const app = express()

const cloudinary=require('cloudinary').v2
cloudinary.config({
  cloud_name:'dxalxhnip',
  api_key:'566151371525855',
  api_secret:'5gLLDjgXjJIjnnWJLRoWzHA2sto'
})
 
 // middlewares
app.use(express.json({ extended: false }))
app.use(express.urlencoded({ extended: true }))
app.use(fileupload({
  useTempFiles:true,
}))
 

app.get("/YOUR_DATA", async (req, res) => {
  const { resources } = await cloudinary.search
  .expression().execute();

const publicIds = resources.map((sample)=>sample.url) 
console.log(publicIds)
res.send(publicIds);

});
app.post("/upload",(req,res)=>{
  const file=req.files;
  console.log(file)
  cloudinary.uploader.upload(file.image.tempFilePath,(err,result)=>{
    if(err)
    {
      res.status(404).send(err)
    }
    else{
      res.json({
        url:result.url ,
        message:"Succesfully done"
      })
    }
  })
})

 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on ${PORT}`));