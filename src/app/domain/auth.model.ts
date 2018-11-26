import { User } from './user.model';

export class Auth {
    user: User;
    hasError: boolean;
    errMsg: string;
    redirectUrl: string;
}