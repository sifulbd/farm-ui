import React from "react";
import { Button, Container, Jumbotron } from "react-bootstrap";

const Welcome = () => {
    return (
        <Container className="container">
            <Jumbotron className="home_hero">
                <h2>Hello, Welcome to Farm UI</h2>
                <p>
                    This is a simple hero unit, a simple jumbotron-style
                    component for calling extra attention to featured content or
                    information.
                </p>
            </Jumbotron>
        </Container>
    );
};

export default Welcome;
