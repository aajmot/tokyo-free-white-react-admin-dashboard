import { BaseService, ServiceTypeEnum } from "../../Shared/Services/BaseService";

export class CustomerService extends BaseService {
    public constructor() {
        super("Customers", ServiceTypeEnum.INVENTORY);
    }
}