import React from "react";
import Register from "../components/Register";
import Welcome from "../components/Welcome";

const Loginpage = () => {
    return (
        <div>
            <Welcome title="Registration" intro=""></Welcome>
            <Register />
        </div>
    );
};

export default Loginpage;
