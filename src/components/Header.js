import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link, NavLink, useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Nav, NavDropdown, Form, FormControl, Button, Image } from "react-bootstrap";
import { UserContext } from "../App";
import { useToasts } from "react-toast-notifications";

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { addToast } = useToasts();
    const history = useHistory();

    const navBtn = {
        color: "#fff",
        padding: "8px 26px",
        margin: "0 4px",
    };
    const handlelogOut = (e) => {
        e.preventDefault();
        const logout = { isSignedIn: false };
        setLoggedInUser(logout);
        console.log("logout");
    };
    const handleLogOut = (e) => {
        e.preventDefault();
        localStorage.setItem("loggedInUser", JSON.stringify(""));
        addToast("Logout Successfully", { appearance: "success", autoDismiss: true });
        window.location.href = "/login";
    };
    return (
        <div>
            <Navbar bg="light" expand="lg" className="vt-nav">
                <div className="container">
                    <Navbar.Brand as={Link} to="/">
                        NewCo, Inc.
                        {/* <img src="holder.js/40x110" alt="" /> */}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {loggedInUser.isSignedIn ? (
                                <>
                                    <Nav.Link as={Link} to="/dashboard">
                                        Dashbaord
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/plants">
                                        Plants
                                    </Nav.Link>
                                    <button onClick={handleLogOut} className="btn btn-danger">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                ""
                            )}
                            <Nav.Link as={Link} to="/register">
                                {loggedInUser.isSignedIn ? "" : "Register"}
                            </Nav.Link>
                            {loggedInUser.isSignedIn ? (
                                <Nav.Link as={Link} to="/" onClick={handlelogOut}>
                                    {loggedInUser.isSignedIn && loggedInUser.email ? loggedInUser.email + " " + "Logout" : ""}
                                </Nav.Link>
                            ) : (
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </div>
    );
};

export default Header;
