import { Dispatch } from "react";
import { CurrentUserApi } from "../Api/UserApi";
import IUserAuthenticate from "../Interface/IAuth";
import IServerResponse from "../Interface/IServerResponse";
import { UserActionTypes } from "../Reducers/UserReducer";

interface IActionAuthenticateUser {
  user: IUserAuthenticate;
  resetForm: () => void;
}

export const SetCurrentUserAction =
  () => async (dispatch: Dispatch<UserActionTypes>) => {
    try {
      dispatch({
        type: "SET_LOADING_USER",
        isLoading: true,
      });
      const response: IServerResponse = await CurrentUserApi();
      console.log(`response`, response);
      dispatch({
        type: "SET_LOADING_USER",
        isLoading: false,
      });
      if (response.success) {
        dispatch({
          type: "SET_CURRENT_USER",
          user: response.data,
        });

        const user_type = response?.data?.user_type;
        console.log(`user_type`, user_type);
        if (
          window.location.pathname === "/login" ||
          window.location.pathname === "/"
        ) {
          if (user_type === "admin") {
            window.location.href = "/admin/dashboard";
          } else if (user_type === "tutor") {
            window.location.href = "/tutor/dashboard";
          } else if (user_type === "student") {
            window.location.href = "/student/dashboard";
          }
        }
      } else {
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    } catch (error) {}
  };
