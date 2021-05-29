import React, { useContext, useState } from "react";
import { Form, Button, Container, Row, Col, Jumbotron } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import DatePicker from "react-datepicker";
import { useToasts } from "react-toast-notifications";
import { useLocation } from "react-router-dom";

const Editplant = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [startDate, setStartDate] = useState(new Date());
    const { addToast } = useToasts();

    useEffect(() => {
        addToast("Plant loaded Successfully", { appearance: "success", autoDismiss: true });
    }, []);

    return (
        <>
            <Container className="container">
                <Jumbotron className="home_hero">
                    <h2> Update A Plant</h2>
                    <p> Update a plant on the farm</p>
                </Jumbotron>
            </Container>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="form-area"></div>
                    </Col>
                    <Col md={6}></Col>
                </Row>
            </Container>
        </>
    );
};

export default Editplant;
