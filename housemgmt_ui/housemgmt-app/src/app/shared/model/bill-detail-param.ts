import { UnitParam } from "./unit-param";

export class BillDetailParam {
  constructor(public  rent: UnitParam,public maintanence:UnitParam,public electricity :UnitParam) {}
}
