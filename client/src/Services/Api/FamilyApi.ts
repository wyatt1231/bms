import { PostFetch } from "../../Hooks/UseFetch";
import IServerResponse from "../Interface/IServerResponse";
import { FamilyModel } from "../Models/FamilyModel";
import { PaginationModel } from "../Models/PaginationModels";

const API_DEFAULT_ROUTE = `api/family/`;

const addFamily = async (payload: FamilyModel): Promise<IServerResponse> => {
  const response = await PostFetch(API_DEFAULT_ROUTE + "addFamily", payload);
  return response;
};
const updateFamily = async (payload: FamilyModel): Promise<IServerResponse> => {
  const response = await PostFetch(API_DEFAULT_ROUTE + "updateFamily", payload);
  return response;
};

const getFamilyOfResident = async (
  resident_pk: number
): Promise<IServerResponse> => {
  const response = await PostFetch(API_DEFAULT_ROUTE + "getFamilyOfResident", {
    resident_pk,
  });
  return response;
};

const getSingleFamily = async (
  ulo_pamilya: number
): Promise<IServerResponse> => {
  const response = await PostFetch(API_DEFAULT_ROUTE + "getSingleFamily", {
    ulo_pamilya,
  });
  return response;
};

const getSingleFamByFamPk = async (
  fam_pk: number
): Promise<IServerResponse> => {
  const response = await PostFetch(API_DEFAULT_ROUTE + "getSingleFamByFamPk", {
    fam_pk,
  });
  return response;
};

const getFamilyDataTable = async (
  payload: PaginationModel
): Promise<IServerResponse> => {
  const response = await PostFetch(
    API_DEFAULT_ROUTE + "getFamilyDataTable",
    payload
  );
  return response;
};

const getFamilyDataTablePdf = async (
  payload: PaginationModel
): Promise<IServerResponse> => {
  const response = await PostFetch(
    API_DEFAULT_ROUTE + "getFamilyDataTablePdf",
    payload
  );
  return response;
};

export default {
  addFamily,
  updateFamily,
  getSingleFamily,
  getFamilyDataTable,
  getFamilyOfResident,
  getSingleFamByFamPk,
  getFamilyDataTablePdf,
};
