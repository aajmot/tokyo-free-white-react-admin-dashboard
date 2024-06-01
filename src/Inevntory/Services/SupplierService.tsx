import { BaseService, ServiceTypeEnum } from "../../Shared/Services/BaseService";

export class SupplierService extends BaseService {
    public constructor(){
        super("Suppliers", ServiceTypeEnum.INVENTORY);
    }
}