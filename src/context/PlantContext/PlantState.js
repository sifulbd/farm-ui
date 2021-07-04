import axios from "axios";
import { createContext, default as React, useContext, useReducer } from "react";
import PlantReducer from "./PlantReducers";
import { API_URL } from "./../../config";

const ISSERVER = typeof window === "undefined";
// logged in user
const userInfoFromStorage =
    !ISSERVER && localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;

// Initial state
const initialState = {
    userInfo: userInfoFromStorage,
    error: "",
    resetPassword: "",
    userValidate: "",
    successMessage: "",
    loading: false,
};

// Create context
export const PlantContext = createContext(initialState);

// Provider component
export const PlantProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PlantReducer, initialState);

    // Actions

    // userLogin Action
    async function add_Plant(allplantdata, configKey) {
        console.log(allplantdata);

        try {
            // dispatch({
            //     type: "ADD_PLANT_REQUEST",
            // });

            const addPlantconfig = {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Farm-Api-Key": configKey,
                },
            };

            await axios
                .post(`${API_URL}/plants`, { allplantdata }, addPlantconfig)
                .then((res) => console.log(res));

            // dispatch({
            //     type: "USER_LOGIN_SUCCESS",
            //     payload: data,
            // });
            // localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
            console.log({ error });
            //     dispatch({
            //         type: "USER_LOGIN_FAIL",
            //         payload:
            //             error.response && error.response.data.message
            //                 ? error.response.data.message
            //                 : error.message,
            //     });
        }
    }

    // userValidation Action
    async function userValidation() {
        try {
            dispatch({ type: "VALIDATE_USER_REQUEST" });
            // const userInfo = localStorage.getItem('userInfo')
            //     ? JSON.parse(localStorage.getItem('userInfo'))
            //     : null;
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfoFromStorage.token}`,
                },
            };
            const { data } = await axios.post(
                `/simple-jwt-authentication/v1/token/validate`,
                {},
                config
            );
            dispatch({
                type: "VALIDATE_USER_SUCCESS",
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: "VALIDATE_USER_FAIL",
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    }

    // user logout action
    async function userLogOut() {
        try {
            dispatch({
                type: "USER_LOGOUT_REQUEST",
            });
            const config = {
                headers: {
                    Authorization: `Bearer ${state.userInfo.token}`,
                },
            };
            const { data } = await axios.post(
                `/simple-jwt-authentication/v1/token/revoke`,
                {},
                config
            );
            dispatch({
                type: "USER_LOGOUT_SUCCESS",
                payload: data,
            });
            localStorage.removeItem("userInfo");
        } catch (error) {
            dispatch({
                type: "USER_LOGOUT_FAIL",
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    }

    // reset user password action
    async function resetUserPassword(username) {
        try {
            dispatch({ type: "RESET_PASSWORD_REQUEST" });
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                `/simple-jwt-authentication/v1/token/resetpassword`,
                { username },
                config
            );
            if (data.data.status === 200) {
                dispatch({
                    type: "RESET_PASSWORD_SUCCESS",
                    payload: data,
                });
            } else {
                dispatch({
                    type: "RESET_PASSWORD_FAIL",
                    payload: data.message,
                });
            }
        } catch (error) {
            dispatch({
                type: "RESET_PASSWORD_FAIL",
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    }
    // user registration
    async function userRegistration(username, email, password) {
        try {
            dispatch({
                type: "USER_REGISTER_REQUEST",
            });
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await axios
                .post(
                    `$/wp/v2/users/register`,
                    { username, email, password },
                    config
                )
                .then((res) => {
                    console.log(res);
                    dispatch({
                        type: "USER_REGISTER_SUCCESS",
                        payload: res.data.message,
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: "USER_REGISTER_FAIL",
                        payload:
                            error.response && error.response.data.message
                                ? error.response.data.message
                                : error.message,
                    });
                });
        } catch (error) {
            dispatch({
                type: "USER_REGISTER_FAIL",
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    }

    return (
        <PlantContext.Provider
            value={{
                user: state.userInfo,
                loggedInUser: state.userInfo && state.userInfo.loggedInUser,
                userRegistration,
                userLogOut,
                userValidation,
                resetUserPassword,
                error: state.error,
                successMessage: state.successMessage,
                loading: state.loading,
                add_Plant,
            }}
        >
            {children}
        </PlantContext.Provider>
    );
};
