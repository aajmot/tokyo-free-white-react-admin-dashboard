import { BaseService, ServiceTypeEnum } from "../../Shared/Services/BaseService";

export class ProductService extends BaseService {
    public constructor(){
        super("Products", ServiceTypeEnum.INVENTORY);
    }
}