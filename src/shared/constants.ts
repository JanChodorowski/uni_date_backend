import { IUser } from '@interfaces/IUser';
import { Request } from 'express';

export const PARAM_MISSING_ERROR = 'One or more of the required parameters was missing.';

export interface IRequest extends Request {
    body: {
        user: IUser;
    }
}

export interface IRequestWithPayload extends Request {
    body: {
        payload: {
            id : string
        }
    }
}

export const initialMaxSearchDistance = 200;

export const PASSWORD_MIN_CHARS = 8;
