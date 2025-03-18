import Types from "mongoose";
import { IGymBusinessHours } from "./gymbuisnesshours-types";
import { IGymmedia } from "./gymmedia-types";
import { IGymLegalInfo } from "./gymlegalinfo-types";

export interface IGym {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  contactInfo: {
    phoneNumber: string;
    email: string;
  };
  ownerId: Types.ObjectId | string;
  status: IGymStatus;
  legalInfo?: Types.ObjectId;
  media?: Types.ObjectId;
  businessHours?: Types.ObjectId;
}

export enum IGymStatus {
  Active = "active",
  InActive = "inactive",
  Suspended = "suspended",
}
