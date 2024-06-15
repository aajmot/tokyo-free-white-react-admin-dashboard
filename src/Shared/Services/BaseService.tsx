import axios from 'axios';
export class BaseService {

    public baseUrl: string = "";

    _path: string;

    public constructor(path: string, module: ServiceTypeEnum = ServiceTypeEnum.ADMIN) {
        this._path = path;
        if (module == ServiceTypeEnum.ADMIN) {
            this.baseUrl = "http://admin-api.runasp.net/api/v1/";
            //this.baseUrl = "http://localhost:4200/api/v1/";
        }
        else if (module == ServiceTypeEnum.INVENTORY) {
            this.baseUrl = "http://inventory-api.runasp.net/api/v1/";
            //this.baseUrl = "http://localhost:4201/api/v1/";
        }
    }

    public getHeader(): any {
        return {
            Accept: 'application/json',
            Authorization: "Bearer " + sessionStorage.getItem("user_token")
        };
    }

    public async create(input: any): Promise<any> {
        try {
            const { data, status } = await axios.post(
                this.baseUrl + this._path,
                input,
                {
                    headers: this.getHeader(),

                },
            );
            return data;
        }
        catch (error: any) {
            return error?.response?.data;
        }

    }

    public async update(input: any): Promise<any> {
        try {
            debugger;
            const { data, status } = await axios.put(
                this.baseUrl + this._path,
                input,
                {
                    headers: this.getHeader(),
                },
            );
            return data;
        }
        catch (error: any) {
            return error?.response?.data;
        }

    }

    public async delete(input: any): Promise<any> {
        try {
            const { data, status } = await axios.delete(
                this.baseUrl + this._path,
                {
                    headers: this.getHeader(),
                    data: input
                },
            );
            return data;
        }
        catch (error: any) {
            return error?.response?.data;
        }

    }

    public async search(input: any): Promise<any> {
        try {
            const { data, status } = await axios.post(
                this.baseUrl + this._path + "/search",
                input,
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: "Bearer " + sessionStorage.getItem("user_token")
                    },

                },
            );
            return data;
        }
        catch (error: any) {
            return error?.response?.data;
        }

    }

    public async get(id: number): Promise<any> {
        try {
            const { data, status } = await axios.get(
                this.baseUrl + this._path+"?id="+id,
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: "Bearer " + sessionStorage.getItem("user_token")
                    },

                },
            );
            return data;
        }
        catch (error: any) {
            return error?.response?.data;
        }

    }

}

export enum ServiceTypeEnum {
    ADMIN = "admin",
    INVENTORY = "inventory"
}