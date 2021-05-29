import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./components/Welcome";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./assets/css/styles.css";
import Home from "./pages/Home";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Plantlistpage from "./pages/Plantlistpage";
import Addplant from "./components/plants/Addplant";
import "react-datepicker/dist/react-datepicker.css";
import Editplant from "./components/plants/EditPlant";
import { ToastProvider, useToasts } from "react-toast-notifications";

export const UserContext = createContext();

function App() {
    const [loggedInUser, setLoggedInUser] = useState({
        isSignedIn: false,
    });

    return (
        <ToastProvider>
            <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
                <Router>
                    <Header />
                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>

                        <PrivateRoute path="/addplant">
                            <Addplant />
                        </PrivateRoute>
                        <PrivateRoute path="/editplant">
                            <Editplant />
                        </PrivateRoute>
                        <PrivateRoute path="/dashboard">
                            <Dashboard />
                        </PrivateRoute>
                        <PrivateRoute path="/plants">
                            <Plantlistpage />
                        </PrivateRoute>
                        <Route exact path="/">
                            <Home loggedInUser={loggedInUser} />
                        </Route>
                    </Switch>
                    <Footer />
                </Router>
            </UserContext.Provider>
        </ToastProvider>
    );
}

export default App;
