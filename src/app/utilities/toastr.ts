import { ToastrService } from "ngx-toastr";

export class Toastr {
    private static toastr:ToastrService

    constructor(toastr:ToastrService){
        
    }

    static error(message:string, title:string):void{
        this.toastr.error(message, title);
    }

    static success(message:string, title:string):void{
        this.toastr.success(message, title);
    }
}
