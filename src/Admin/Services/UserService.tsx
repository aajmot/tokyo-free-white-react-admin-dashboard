import axios from "axios";
import { BaseService } from "../../Shared/Services/BaseService";

export class UserService extends BaseService {
    public constructor(){
        super("Users");
    }

    public async authenticate(input: any): Promise<any> {
        try {
            const { data, status } = await axios.post(
                this.baseUrl + 'Users/Authenticate',
                input,
                {
                    headers: {
                        Accept: 'application/json',
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