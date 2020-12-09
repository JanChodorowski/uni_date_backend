import logger from './Logger';

export const pErr = (err: Error) => {
  if (err) {
    logger.err(err);
  }
};

// export const getRandomInt = () => Math.floor(Math.random() * 1_000_000_000_000);

export const removeWhiteSpaces = (text: any) => String(text).replace(/\s/g, '');
