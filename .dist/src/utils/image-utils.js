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
exports.fromPath = fromPath;
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
function fromPath(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [_dir, _base] = [path_1.default.dirname(filePath), path_1.default.basename(filePath)];
            const filename = `${_dir}/${_base}-thumbnail.webp`;
            const modified = yield (0, sharp_1.default)(filePath).resize(100).webp().toFile(filename);
            console.log(modified);
        }
        catch (error) {
            console.log(error);
        }
    });
}
