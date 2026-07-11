const fs = require("fs");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.mjs");


async function extractPdfLinks(filePath) {

    const data = new Uint8Array(
        fs.readFileSync(filePath)
    );


    const pdf = await pdfjsLib.getDocument({
        data
    }).promise;


    const links = [];


    for(let i = 1; i <= pdf.numPages; i++){

        const page = await pdf.getPage(i);

        const annotations = await page.getAnnotations();


        annotations.forEach(annotation => {

            if(
                annotation.subtype === "Link" &&
                annotation.url
            ){
                links.push(annotation.url);
            }

        });

    }


    return links;
}


module.exports = extractPdfLinks;