import { v4 as uuid } from 'uuid'

export const filePersonalPhotoNamer = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
    //Por si acaso, pero no es necesario
    if (!file) callback(new Error('File is empty'), false);
    const fileExtension = file.mimetype.split('/')[1];
    const fileName = `leoPhoto.${fileExtension}`;
    callback(null, fileName);
}

export const filePhotoNamer = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
    //Por si acaso, pero no es necesario
    if (!file) callback(new Error('File is empty'), false);
    const fileExtension = file.mimetype.split('/')[1];
    const fileName = `${uuid()}.${fileExtension}`;
    callback(null, fileName);
}