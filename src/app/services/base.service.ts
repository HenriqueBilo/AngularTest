import { HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { throwError } from "rxjs";
import { LocalStorageUtils } from "../useful/localstorage";
import { environment } from "../../environments/environment";

export abstract class BaseService {

    public LocalStorage = new LocalStorageUtils();
    protected UrlServiceV1: string = environment.apiUrlv1

    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
    }

    protected extractData(response : any) {
        return response.data || {};
    }

    protected serviceError(response: Response | any) {
        let customError: string[] = [];

        if(response instanceof HttpErrorResponse) {

            if(response.statusText === "Unknown Error") {
                customError.push("An unknown error ocurred");
                response.error.errors = customError;
            }

        }

        console.error(response);
        return throwError(() => response);
    }

}