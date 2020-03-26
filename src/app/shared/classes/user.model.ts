import { IUser } from '../interfaces/user.interface';

export class User implements IUser {
    constructor(
        public username: string,
        public email: string,
        public password: string,
        public id?: string) { }
}