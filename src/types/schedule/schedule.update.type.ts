import { IDType } from "../_commons/id.type";

export interface Schedule_UpdateBody {
  time?: string;
  deviceAttrId?: IDType[];
  value?: number;
  repeat?: string;
}

export interface Schedule_UpdateDto {
  id: IDType;
  body: Schedule_UpdateBody;
}
