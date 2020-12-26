import fs from 'fs';
import logger from './Logger';

// export const getByteArray = (filePath: string) => {
//   const fileData = fs.readFileSync(filePath).toString('hex');
//   const result = [];
//   for (let i = 0; i < fileData.length; i += 2) result.push(`0x${fileData[i]}${fileData[i + 1]}`);
//   return result;
// };
export const pErr = (err: Error) => {
  if (err) {
    logger.err(err);
  }
};

export const capitalizeFirstLetter = (
  // @ts-ignore
  [first, ...rest],
) => first && first.toLocaleUpperCase() + rest.join('').toLocaleLowerCase();

// export const bytesBufferToBase64 = (buffer: any) => {
//   let binary = '';
//   const bytes = new Uint8Array(buffer);
//   const len = bytes.byteLength;
//   for (let i = 0; i < len; i += 1) {
//     binary += String.fromCharCode(bytes[i]);
//   }
//
//   return btoa(binary);
// };

// export const getRandomInt = () => Math.floor(Math.random() * 1_000_000_000_000);

export const removeWhiteSpaces = (text: any) => String(text).replace(/\s/g, '');

export const removeUndefinedFields = (obj: any) => Object.keys(obj).forEach((key) => (obj[key] == null || obj[key] === 'undefined') && delete obj[key]);
