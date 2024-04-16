export interface User {
    email:string,
    name:string,
    phone:string,
    address:string,
    id:string
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

export interface UpdateProfile{
    email:string;
    phone:string;
    address:string;
}


