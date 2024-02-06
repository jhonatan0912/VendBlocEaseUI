export interface User {
    email:string,
    name:string
}

export interface RegisterUser{
    email:string;
    name:string;
    password:string;
}

export interface LoginDTO{
    email:string;
    password:string;
}

export interface ResetPasswordDTO{
    email:string;
    password:string;
    code:string;
}


