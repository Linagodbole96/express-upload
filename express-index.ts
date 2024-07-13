import express from "express";
import multer from "multer";
import { fromPath } from "./src/utils/image-utils";
import path from "path";

const app = express();

const disk = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null, "uploads/")
  },
  filename:(req,file,cb)=>{
    console.log(file)
    const ext = path.extname(file?.originalname!);
    const name = `${Date.now()}.${ext}`;
    cb(null, name)
  }
})

const upload = multer({ dest: "uploads/", storage:disk });

app.get("/",(req,res)=>{
  res.send('hello world')
})

app.use("/uploads", express.static("uploads"))

app.post("/upload", upload.single("upload"), async (req, res) => {
  const { file } = req;
  console.log(file?.filename)
  if (!file) return res.status(400).json({ error: "No file uploaded" });
console.log(file)
  const { path: filePath } = file;
  await fromPath(filePath);

  return res.status(201).json({ ...req.file });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
