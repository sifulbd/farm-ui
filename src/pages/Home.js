import React from "react";
import Login from "../components/Login";
import Welcome from "../components/Welcome";

const Home = ({ loggedInUser }) => {
    console.log(loggedInUser);
    return (
        <>
            <Welcome />
            {loggedInUser.isSignedIn ? "" : <Login mt="3" />}
        </>
    );
};

export default Home;
