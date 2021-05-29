import { FaBeer } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Jumbotron, Breadcrumb, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Plantlistpage = () => {
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
