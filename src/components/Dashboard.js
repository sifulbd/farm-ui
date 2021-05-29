import React from "react";
import { Button, Container, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <Container className="container">
                <Jumbotron className="home_hero">
                    <h2>Hello, Welcome to Farm UI Dashbaord</h2>
                    <p>
                        This is a simple hero unit, a simple jumbotron-style
                        component for calling extra attention to featured
                        content or information.
                    </p>
                    <Link to="/plants">
                        <Button
                            style={{ padding: "8px 80px" }}
                            variant="success"
                        >
                            Plant List{" "}
                        </Button>
                    </Link>
                </Jumbotron>
            </Container>
            );
        </div>
    );
};

export default Dashboard;
