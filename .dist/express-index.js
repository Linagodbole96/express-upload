"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const image_utils_1 = require("./src/utils/image-utils");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const disk = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file);
        const ext = path_1.default.extname(file === null || file === void 0 ? void 0 : file.originalname);
        const name = `${Date.now()}.${ext}`;
        cb(null, name);
    }
});
const upload = (0, multer_1.default)({ dest: "uploads/", storage: disk });
app.get("/", (req, res) => {
    res.send('hello world');
});
app.use("/uploads", express_1.default.static("uploads"));
app.post("/upload", upload.single("upload"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { file } = req;
    console.log(file === null || file === void 0 ? void 0 : file.filename);
    if (!file)
        return res.status(400).json({ error: "No file uploaded" });
    console.log(file);
    const { path: filePath } = file;
    yield (0, image_utils_1.fromPath)(filePath);
    return res.status(201).json(Object.assign({}, req.file));
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
