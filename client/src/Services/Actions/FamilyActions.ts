import { Dispatch } from "react";
import helperErrorMessage from "../../Helpers/helperErrorMessage";
import FamilyApi from "../Api/FamilyApi";
import IServerResponse from "../Interface/IServerResponse";
import { FamilyModel, FamMemberModel } from "../Models/FamilyModel";
import { PaginationModel } from "../Models/PaginationModels";
import { FamilyReducerTypes } from "../Types/FamilyTypes";
import { NewsReducerTypes } from "../Types/NewsTypes";
import { PageReducerTypes } from "../Types/PageTypes";

const addFamily =
  (payload: FamilyModel, successCallback: (msg: string) => any) =>
  async (dispatch: Dispatch<NewsReducerTypes | PageReducerTypes>) => {
    try {
      dispatch({
        type: "SET_PAGE_LOADING",
        page_loading: {
          loading_message: "Loading, thank you for your patience!",
          show: true,
        },
      });
      const response: IServerResponse = await FamilyApi.addFamily(payload);
      dispatch({
        type: "SET_PAGE_LOADING",
        page_loading: {
          show: false,
        },
      });
      if (response.success) {
        if (typeof successCallback === "function") {
          successCallback(response.message.toString());
        }
        dispatch({
          type: "SET_PAGE_SNACKBAR",
          page_snackbar: {
            message: response.message.toString(),
            options: {
              variant: "success",
            },
          },
        });
      } else {
        helperErrorMessage(dispatch, response);
      }
    } catch (error) {
      console.error(`action error`, error);
    }
  };

const updateFamily =
  (payload: FamilyModel, successCallback: (msg: string) => any) =>
  async (dispatch: Dispatch<NewsReducerTypes | PageReducerTypes>) => {
    try {
      dispatch({
        type: "SET_PAGE_LOADING",
        page_loading: {
          loading_message: "Loading, thank you for your patience!",
          show: true,
        },
      });
      const response: IServerResponse = await FamilyApi.updateFamily(payload);
      dispatch({
        type: "SET_PAGE_LOADING",
        page_loading: {
          show: false,
        },
      });
      if (response.success) {
        if (typeof successCallback === "function") {
          successCallback(response.message.toString());
        }
        dispatch({
          type: "SET_PAGE_SNACKBAR",
          page_snackbar: {
            message: response.message.toString(),
            options: {
              variant: "success",
            },
          },
        });
      } else {
        helperErrorMessage(dispatch, response);
      }
    } catch (error) {
      console.error(`action error`, error);
    }
  };

const getSingleFamily =
  (ulo_pamilya: null | number) =>
  async (dispatch: Dispatch<FamilyReducerTypes>) => {
    if (!ulo_pamilya) {
      dispatch({
        type: "single_fam",
        single_fam: null,
      });
      return;
    }

    try {
      dispatch({
        type: "set_single_fam",
        set_single_fam: true,
      });
      const response: IServerResponse = await FamilyApi.getSingleFamily(
        ulo_pamilya
      );

      if (response.success) {
        dispatch({
          type: "single_fam",
          single_fam: response.data,
        });
      }

      dispatch({
        type: "set_single_fam",
        set_single_fam: false,
      });
    } catch (error) {
      console.error(`action error`, error);
    }
  };

const getSingleFamByFamPk =
  (fam_pk: number) => async (dispatch: Dispatch<FamilyReducerTypes>) => {
    try {
      dispatch({
        type: "fetch_single_fam_by_fam_pk",
        fetch_single_fam_by_fam_pk: true,
      });
      const response: IServerResponse = await FamilyApi.getSingleFamByFamPk(
        fam_pk
      );

      if (response.success) {
        dispatch({
          type: "single_fam_by_fam_pk",
          single_fam_by_fam_pk: response.data,
        });
      }

      dispatch({
        type: "fetch_single_fam_by_fam_pk",
        fetch_single_fam_by_fam_pk: false,
      });
    } catch (error) {
      console.error(`action error`, error);
    }
  };

const getFamilyOfResident =
  (resident_pk: number) => async (dispatch: Dispatch<FamilyReducerTypes>) => {
    try {
      dispatch({
        type: "fetch_family_of_resident",
        fetch_family_of_resident: true,
      });
      const response: IServerResponse = await FamilyApi.getFamilyOfResident(
        resident_pk
      );

      if (response.success) {
        dispatch({
          type: "family_of_resident",
          family_of_resident: response.data,
        });
      }

      dispatch({
        type: "fetch_family_of_resident",
        fetch_family_of_resident: false,
      });
    } catch (error) {
      console.error(`action error`, error);
    }
  };

const getFamilyDataTable =
  (payload: PaginationModel) =>
  async (dispatch: Dispatch<FamilyReducerTypes>) => {
    try {
      dispatch({
        type: "fetch_family_table",
        fetch_family_table: true,
      });
      const response: IServerResponse = await FamilyApi.getFamilyDataTable(
        payload
      );

      if (response.success) {
        dispatch({
          type: "family_table",
          family_table: response.data,
        });
      }

      dispatch({
        type: "fetch_family_table",
        fetch_family_table: false,
      });
    } catch (error) {
      console.error(`action error`, error);
    }
  };

const setOpenFamMemberDialog =
  (is_open: boolean) => async (dispatch: Dispatch<FamilyReducerTypes>) => {
    dispatch({
      type: "open_fam_member_dialog",
      open_fam_member_dialog: is_open,
    });
  };

const setFamMembers =
  (fam_members: Array<FamMemberModel>) =>
  async (dispatch: Dispatch<FamilyReducerTypes>) => {
    dispatch({
      type: "fam_members",
      fam_members: fam_members,
    });
  };

export default {
  addFamily,
  getSingleFamily,
  getFamilyDataTable,
  getFamilyOfResident,
  setOpenFamMemberDialog,
  setFamMembers,
  getSingleFamByFamPk,
  updateFamily,
};
