import { BillParam } from "./bill-param";

export class RentParam {
  constructor(public houseName: string, public bill: BillParam) {}
}
