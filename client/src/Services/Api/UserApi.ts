import { GetFetch, PostFetch } from "../../Hooks/UseFetch";
import IServerResponse from "../Interface/IServerResponse";
import { UserLogin } from "../Models/UserModels";

const API_DEFAULT_ROUTE = `api/user/`;

export const CurrentUserApi = async (): Promise<IServerResponse> => {
  const response = await GetFetch(API_DEFAULT_ROUTE + "currentUser");
  return response;
};

export const LoginApi = async (
  payload: UserLogin
): Promise<IServerResponse> => {
  const response = await PostFetch(API_DEFAULT_ROUTE + "login", payload);
  return response;
};
