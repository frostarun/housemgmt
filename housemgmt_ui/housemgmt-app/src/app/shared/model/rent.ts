import { Bill } from "./Bill";
import { House } from "./house";

export interface Rent {
    id:     string;
    house:  House;
    date:   string;
    bill:   Bill;
    latest: boolean;
}


