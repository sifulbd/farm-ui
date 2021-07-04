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
import { PlantProvider } from "./context/PlantContext/PlantState";

export const UserContext = createContext();

const ISSERVER = typeof window === "undefined";
const userInfo =
    !ISSERVER && localStorage.getItem("loggedInUser")
        ? JSON.parse(localStorage.getItem("loggedInUser"))
        : "";

// const getUserInfo = async () => {
//     const userInfoFromStorage = !ISSERVER && localStorage.getItem("loggedInUser") ? await JSON.parse(localStorage.getItem("loggedInUser")) : null;
//     return userInfoFromStorage;
// };

function App() {
    const [loggedInUser, setLoggedInUser] = useState(userInfo);

    console.log(loggedInUser);
    return (
        <ToastProvider>
            <PlantProvider>
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
            </PlantProvider>
        </ToastProvider>
    );
}

export default App;
