//server create
const express = require("express")
const cors= require("cors")
const noteModel = require("./models/note.model")


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("./public"))
// Post api notes
// create new nodes and save data in mongodb , req.body = {title , description}
app.post('/api/notes', async (req, res)=>
{
    const {title, description} = req.body

  const note =  await noteModel.create({title , description})

  res.status(201).json({
    message:"note created successfully",
    note
  })
})

app.get("/api/notes", async (req,res)=>
{
  const notes = await noteModel.find()
   res.status(200).json({
    message:  "Notes fetched successfully ",
    notes 
   })
})

// DELETE notes api/notes/id
app.delete('/api/notes/:id' , async (req,res)=>
{
  const id = req.params.id
  console.log(id)
  await noteModel.findByIdAndDelete(id)
  res.status(200).json({
    message:"Note deleted successfully"
  })
})

// patch /api/notes/:id , update description pf note by id , req.body = {description}
app.patch('/api/notes/:id',async(req,res)=>
{
  const id = req.params.id
  const {description} = req.body

  noteModel.findByIdAndUpdate(id, {description})
  res.status(200).json({
    message:"Note updated successfully"
  })
})

console.log(__dirname)
app.use('*name', (req, res)=>{
  res.sendFile(path.join(__dirname,"/public/index.html"))
}) // handles those api which u hv not created
module.exports= app