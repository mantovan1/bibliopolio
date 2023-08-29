const pdf2pic = require('pdf2pic');
const fs = require('fs');
const path = require('path');
const rootImagesPath = path.join(__dirname, '..', 'images');
const unzipper = require('unzipper');
const sharp = require('sharp');

async function fromPDF(file) {
    if (!fs.existsSync(rootImagesPath)) {
        fs.mkdirSync(rootImagesPath);
    }

    const filename = file.originalname.replace('.pdf', '') + '.png';

    const options = {
        density: 100,
        saveFilename: filename,
        savePath: rootImagesPath,
        format: "png",
        width: 210,
        height: 290
    };

    const convert = pdf2pic.fromPath(file.path, options);
    const pageToConvertAsImage = 1;

    try {
        const resolve = await convert(pageToConvertAsImage, { responseType: "image" });
        const parts = resolve.path.split('/');
        let dir = parts.slice(0, -1);
        dir = dir.join('/');
        const newPath = path.join(dir, filename);

        // Renaming the file
        fs.renameSync(resolve.path, newPath);

        // Create a new "resolve" object with updated path
        const updatedResolve = {
            ...resolve, // Copy existing properties from the original resolve
            name: filename,
            path: newPath // Update the path with the new path
        };

        console.log(updatedResolve);

        return updatedResolve;
    } catch (error) {
        console.error("Error converting page to image:", error);
        throw error;
    }
}

async function fromEPUB(file) {
    if (!fs.existsSync(rootImagesPath)) {
        fs.mkdirSync(rootImagesPath);
    }

    return new Promise((resolve, reject) => {
        fs.createReadStream(file.path)
            .pipe(unzipper.Parse())
            .on('entry', entry => {
                if (entry.path.toLowerCase().includes('cover') && entry.type === 'File') {
                    const coverPath = rootImagesPath + '/' + file.originalname.replace('.epub', '.png');

                    entry.pipe(sharp().toFile(coverPath, (err, info) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(coverPath); // Resolve with the path of the extracted image
                        }
                    }));
                } else {
                    entry.autodrain();
                }
            })
            .on('error', error => {
                console.error('Erro ao processar o EPUB:', error);
                reject(error);
            });
    });
}

module.exports = Object.freeze({
    fromPDF,
    fromEPUB
});