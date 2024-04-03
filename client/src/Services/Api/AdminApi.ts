import { PostFetch } from "../../Hooks/UseFetch";
import IServerResponse from "../Interface/IServerResponse";
import { AdministratorModel } from "../Models/AdminModel";
import { PaginationModel } from "../Models/PaginationModels";

const API_DEFAULT_ROUTE = `api/admin/`;

export const getAdminDataTableApi = async (
  payload: PaginationModel
): Promise<IServerResponse> => {
  const response = await PostFetch(
    API_DEFAULT_ROUTE + "getAdminDataTable",
    payload
  );
  return response;
};

export const addAdminApi = async (
  payload: AdministratorModel
): Promise<IServerResponse> => {
  const response = await PostFetch(API_DEFAULT_ROUTE + "addAdmin", payload);
  return response;
};

export const updateAdminApi = async (
  payload: AdministratorModel
): Promise<IServerResponse> => {
  const response = await PostFetch(API_DEFAULT_ROUTE + "updateAdmin", payload);
  return response;
};

const changeAdminStatus = async (
  payload: AdministratorModel
): Promise<IServerResponse> => {
  const response = await PostFetch(
    API_DEFAULT_ROUTE + "changeAdminStatus",
    payload
  );
  return response;
};

export const getSingleAdminApi = async (
  admin_pk: string
): Promise<IServerResponse> => {
  const response = await PostFetch(API_DEFAULT_ROUTE + "getSingleAdmin", {
    admin_pk,
  });
  return response;
};

export default {
  changeAdminStatus,
};
