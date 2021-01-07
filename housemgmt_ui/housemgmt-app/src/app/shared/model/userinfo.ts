import { House } from "./house";

export interface UserInfo {
  id:          string;
  username:    string;
  house:       House;
  roles?:       string[];
  error:       string;
  accessToken: string;
  tokenType:   string;
}


