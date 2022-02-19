import { UserRegister, UserLogin } from './../schemas/user.schema';
import axios from 'axios';

// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const URL = 'https://poopis-apis.herokuapp.com';

type registerResponse = {
    username: string;
    email: string;
    token: string;
};

export async function registerUser(newUser: UserRegister) {
    try {
        const response = await axios.post(`${URL}/users`, newUser);
        const { data } = response;
        saveToken(data.token);
        return data as registerResponse;
    } catch (error) {
        throw new Error('User creation has failed');
    }
}

type loginResponse = {
    token: string;
};

export async function logInUser(user: UserLogin) {
    try {
        const response = await axios.post(`${URL}/users/login`, user);
        const { data } = response;
        saveToken(data.token);
        return data as loginResponse;
    } catch (error) {
        throw new Error('Log in has failed');
    }
}

export function saveToken(token: string): void {
    window.localStorage.setItem('token', token);
}

export function getToken(): string | null {
    const token = window.localStorage.getItem('token');
    return token;
}

export function logOut(): void {
    window.localStorage.removeItem('token');
}

/*
export function isLogged():boolean{
    const token = window.localStorage.getItem('token');
    return token != null;
}
*/

export function isLogged(): boolean {
    return true;
}

export async function getUsers() {
    try {
        const response = await axios.get(`${URL}/user`);
        return response.data;
    } catch (error) {
        throw new Error(`Can't get users from ${URL}`);
    }
}
