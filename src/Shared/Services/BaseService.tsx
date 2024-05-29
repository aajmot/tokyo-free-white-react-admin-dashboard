import axios from 'axios';
export class BaseService {

    public baseUrl: string = "http://admin-api.runasp.net/api/v1/";

    _path: string;

    public constructor(path: string) {
        this._path = path;
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

}