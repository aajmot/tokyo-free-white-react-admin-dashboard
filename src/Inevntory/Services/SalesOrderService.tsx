import { BaseService, ServiceTypeEnum } from "../../Shared/Services/BaseService";

export class SalesOrderService extends BaseService {
    public constructor(){
        super("SalesOrders", ServiceTypeEnum.INVENTORY);
    }
}