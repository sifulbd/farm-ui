import { Route, Redirect } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../App";

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedInUser] = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedInUser.success ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
