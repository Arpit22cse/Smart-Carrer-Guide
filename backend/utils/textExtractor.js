const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");
const Tesseract = require("tesseract.js");


const extractText = async function extractText(filePath) {


    const ext = path.extname(filePath).toLowerCase();
    

    switch (ext) {

        case ".pdf": {

            const buffer = fs.readFileSync(filePath);

            const data = await pdf(buffer);

            if (data.text.trim().length > 100)
                return data.text;

            const result = await Tesseract.recognize(filePath, "eng");

            return result.data.text;
        }

        case ".docx": {

            const result = await mammoth.extractRawText({
                path: filePath
            });

            return result.value;
        }

        case ".txt":

            return fs.readFileSync(filePath, "utf8");

        case ".png":
        case ".jpg":
        case ".jpeg":
        case ".webp":

            const image = await Tesseract.recognize(filePath, "eng");

            return image.data.text;

        default:
            throw new Error("Unsupported file type");
    }

};
module.exports = extractText;