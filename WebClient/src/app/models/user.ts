import { Guid } from "guid-typescript";

export interface User {
  id: Guid;
  name: string;
  phone: string;
  role: string;
  roleId: Guid;
  token?: string;
}
