import logger from './Logger';

export const pErr = (err: Error) => {
  if (err) {
    logger.err(err);
  }
};

export const capitalizeFirstLetter = (
  // @ts-ignore
  [first, ...rest],
) => first && first.toLocaleUpperCase() + rest.join('').toLocaleLowerCase();

export const removeWhiteSpaces = (text: any) => String(text).replace(/\s/g, '');

export const removeUndefinedFields = (obj: any) => Object.keys(obj)
  .forEach((key) => (obj[key] == null || obj[key] === 'undefined') && delete obj[key]);

export const removeCityAndUniversityFromCollection = (collection: []) => collection.forEach((pd: any) => {
  delete pd.cityName;
  delete pd.universityName;
});
