import React from "react";
import Login from "../components/Login";
import Welcome from "../components/Welcome";

const Loginpage = () => {
    return (
        <div>
            <Welcome title="Login" intro=""></Welcome>
            <Login />
        </div>
    );
};

export default Loginpage;
