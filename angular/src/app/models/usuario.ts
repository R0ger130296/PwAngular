export interface Usuario {
    _id?:string;
    nombre:string;
    apellido:string;
    edad:number;
    email:string;
    passw?:string;
    file:string
    rol:string;
    sessionID?:string;
    createAt?:string
}
