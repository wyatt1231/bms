import { FamilyModel, FamMemberModel } from "../Models/FamilyModel";
import { ResidentModel } from "../Models/ResidentModels";

export type FamilyReducerTypes =
  | {
      type: "fam_table";
      fam_table?: Array<FamilyModel>;
    }
  | {
      type: "set_fam_table";
      set_fam_table?: boolean;
    }
  | {
      type: "single_fam";
      single_fam?: FamilyModel;
    }
  | {
      type: "set_single_fam";
      set_single_fam?: boolean;
    }
  //
  | {
      type: "single_fam_by_fam_pk";
      single_fam_by_fam_pk?: FamilyModel;
    }
  | {
      type: "fetch_single_fam_by_fam_pk";
      fetch_single_fam_by_fam_pk?: boolean;
    }
  //
  | {
      type: "family_of_resident";
      family_of_resident?: FamilyModel;
    }
  | {
      type: "fetch_family_of_resident";
      fetch_family_of_resident?: boolean;
    }
  //
  | {
      type: "open_fam_member_dialog";
      open_fam_member_dialog?: boolean;
    }
  //
  | {
      type: "fam_members";
      fam_members?: Array<FamMemberModel>;
    }
  //
  | {
      type: "family_table";
      family_table?: ResidentDataTable;
    }
  | {
      type: "fetch_family_table";
      fetch_family_table?: boolean;
    };

export interface FamilyReducerModel {
  fam_table?: Array<FamilyModel>;
  set_fam_table?: boolean;
  //
  single_fam?: FamilyModel;
  set_single_fam?: boolean;
  //
  //
  single_fam_by_fam_pk?: FamilyModel;
  fetch_single_fam_by_fam_pk?: boolean;
  //
  family_of_resident?: FamilyModel;
  fetch_family_of_resident?: boolean;
  //
  open_fam_member_dialog?: boolean;
  fam_members?: Array<FamMemberModel>;
  //
  family_table?: ResidentDataTable;
  fetch_family_table?: boolean;
}

interface ResidentDataTable {
  limit: number;
  count: number;
  begin: number;
  table: Array<FamilyModel>;
}
