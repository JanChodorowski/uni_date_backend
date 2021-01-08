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

const deg2rad = (deg: number) => deg * (Math.PI / 180);

export const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) {
    return 0;
  }
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
      + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
      * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};
