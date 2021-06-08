import { FaBeer } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { UserContext } from "./../App";
import DatePicker from "react-datepicker";
import { useToasts } from "react-toast-notifications";
import { useLocation } from "react-router-dom";
import { API_URL } from "./../config";
import { Container, Jumbotron, Breadcrumb, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Plantlistpage = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [startDate, setStartDate] = useState(new Date());
    const { addToast } = useToasts();

    const config = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Farm-Api-Key": loggedInUser.farmApiKey,
        },
    };

    try {
        useEffect(() => {
            axios
                .get(`${API_URL}/plants`, config)
                .then(function (items) {
                    console.log(items);
                    addToast("Plants loaded Successfully", { appearance: "success", autoDismiss: true });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, []);
    } catch (error) {
        addToast("Somthing Went Wrong", { appearance: "error", autoDismiss: true });
    }
    return (
        <>
            <Container style={{ marginTop: "60px" }}>
                <Breadcrumb className="plantlist_breakcrumb">
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard" }}>
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Plant List</Breadcrumb.Item>
                </Breadcrumb>
            </Container>
            <Container className="container">
                <Jumbotron className="home_hero">
                    <h2> Plant List</h2>
                    <p>A list of plants</p>
                    <Link to="/dashboard">
                        <Button variant="secondary"> Dashboard </Button>
                    </Link>
                    <Link to="/addplant">
                        <Button style={{ marginLeft: "15px", padding: "8px 30px" }} variant="success">
                            Add{" "}
                        </Button>
                    </Link>
                    <Link to="/editplant">
                        <Button style={{ marginLeft: "15px", padding: "8px 30px" }} variant="success">
                            EditPlant{" "}
                        </Button>
                    </Link>
                </Jumbotron>
            </Container>
        </>
    );
};

export default Plantlistpage;
