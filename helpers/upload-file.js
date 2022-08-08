import { nanoid } from 'nanoid';

import { path, __dirname } from '../helpers/index.js';

const uploadFile = async (files, { validExtensions = ['png', 'jpg', 'jpeg', 'gif'], directory = '' }) => {

    return new Promise((resolve, reject) => {

        const { file } = files;

        const splitFileName = file.name.split('.');
        // console.log(splitFileName);
        const extension = splitFileName[splitFileName.length - 1];
        // console.log(extension);

        if (!validExtensions.includes(extension)) {
            reject(`The extension ${extension} is not allowed, ${validExtensions}`);
        }

        const newName = nanoid() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', directory, newName);

        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, function (err) {
            if (err) {
                reject(error);
            }

            resolve(newName);
        });
    });
};

export {
    uploadFile
};