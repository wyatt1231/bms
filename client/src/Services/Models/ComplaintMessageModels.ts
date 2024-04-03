import { UserModel } from "./UserModels";

export interface ComplaintMessageModel {
  complaint_msg_pk?: number;
  complaint_pk?: number;
  body?: string;
  sent_by?: number;
  sent_at?: Date;
  user?: UserModel;
}
