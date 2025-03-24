import { Dayjs } from "dayjs";

export type HouseSchedule_ConditionType = "time" | "interval";

export interface HouseSchedule_Condition {
  time: string;
}

export interface HouseSchedule_ConditionForm {
  time: Dayjs;
}
