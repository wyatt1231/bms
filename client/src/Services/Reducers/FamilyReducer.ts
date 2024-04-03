import { FamilyReducerModel, FamilyReducerTypes } from "../Types/FamilyTypes";

const defaultState: FamilyReducerModel = {
  fam_members: [],
};

const NewsReducer = (
  state: FamilyReducerModel = defaultState,
  action: FamilyReducerTypes
): FamilyReducerModel => {
  switch (action.type) {
    case "fam_table": {
      return {
        ...state,
        fam_table: action.fam_table,
      };
    }
    case "set_fam_table": {
      return {
        ...state,
        set_fam_table: action.set_fam_table,
      };
    }

    case "single_fam": {
      return {
        ...state,
        single_fam: action.single_fam,
      };
    }
    case "set_single_fam": {
      return {
        ...state,
        set_single_fam: action.set_single_fam,
      };
    }
    //
    //
    case "single_fam_by_fam_pk": {
      return {
        ...state,
        single_fam_by_fam_pk: action.single_fam_by_fam_pk,
      };
    }
    case "fetch_single_fam_by_fam_pk": {
      return {
        ...state,
        fetch_single_fam_by_fam_pk: action.fetch_single_fam_by_fam_pk,
      };
    }
    //
    case "family_of_resident": {
      return {
        ...state,
        family_of_resident: action.family_of_resident,
      };
    }
    case "fetch_family_of_resident": {
      return {
        ...state,
        fetch_family_of_resident: action.fetch_family_of_resident,
      };
    }

    //
    case "open_fam_member_dialog": {
      return {
        ...state,
        open_fam_member_dialog: action.open_fam_member_dialog,
      };
    }

    case "fam_members": {
      return {
        ...state,
        fam_members: action.fam_members,
      };
    }

    //
    case "family_table": {
      return {
        ...state,
        family_table: action.family_table,
      };
    }
    case "fetch_family_table": {
      return {
        ...state,
        fetch_family_table: action.fetch_family_table,
      };
    }

    default:
      return state;
  }
};

export default NewsReducer;
