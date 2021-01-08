import fs from 'fs-extra';
import Logger from 'jet-logger';


try {
    fs.removeSync('./dist/');
    fs.copySync('./src/client', './dist/client');
} catch (err) {
    Logger.Err(err);
}

