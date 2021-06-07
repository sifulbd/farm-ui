import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { UserContext } from "../App";
import { API_URL } from "./../config";

const Register = ({ mt }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const { addToast } = useToasts();
    const history = useHistory();
    const [validationError, setValidationError] = useState("");

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm();
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post(`${API_URL}/register`, data);
            if (response.data.success) {
                setLoading(false);
                const signInuser = { isSignedIn: true, ...response.data };
                // setLoggedInUser(signInuser);
                localStorage.setItem("loggedInUser", JSON.stringify(signInuser));
                addToast("Registered  Successfully", { appearance: "success", autoDismiss: true });
                history.push("/dashboard");
            } else {
                setLoading(false);
                addToast(response.data.message, { appearance: "error", autoDismiss: true });
                console.log(response.data.validationErrors);
                setValidationError(response.data.validationErrors);
            }
        } catch (error) {
            console.error(error);
        }
    };
    console.log(loggedInUser);

    return (
        <Container>
            <Row>
                <Col md={8} className={mt ? `center ${mt}` : `center mt-30`}>
                    <div className="form-area">
                        <div className="introtext mt-4 mb-4">
                            <h3>Register..</h3>
                            <p>Please tell us about yourself.</p>
                        </div>
                        <form className="fu-form" onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group controlId="firstname">
                                <Form.Label>First Name *</Form.Label>
                                <Form.Control type="text" name="fname" placeholder="First Name" {...register("firstname", { required: true })} />
                                <p className="text-danger">{errors.fname && "First Name is required"}</p>
                            </Form.Group>
                            <Form.Group controlId="firstname">
                                <Form.Label>Last Name *</Form.Label>
                                <Form.Control type="text" name="lname" placeholder="Last Name" {...register("lastName", { required: true })} />
                                <p className="text-danger">{errors.lname && "Last Name is required"}</p>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address *</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" {...register("email", { required: true })} />
                                <p className="text-danger">{errors.email && "Email is required"}</p>
                                <p className="text-danger">{validationError && validationError.length > 0 ? validationError[0].message : ""}</p>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password *</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    {...register("password", {
                                        required: true,
                                        pattern: {
                                            // value: /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,8})$/,
                                            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                            message: "The password must contain at least 8 characters that include 1 upper case letter, 1 lower case letter, 1 number, and 1 non-alpha numeric character.",
                                        },
                                    })}
                                />
                                <p className="text-danger">{errors.password && errors.password.message}</p>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Confirm Password *</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    {...register("confirmPassword", {
                                        required: true,
                                        validate: (value) => value === password.current || "The passwords do not match",
                                    })}
                                />
                                <p className="text-danger">{errors.password_repeat && <p>{errors.password_repeat.message}</p>}</p>
                            </Form.Group>
                            <Button className="btn-block" variant="info" type="submit">
                                {loading ? "Loading ... " : "Register Now"}
                            </Button>{" "}
                            <p className="mt-4">
                                Already have an account? <Link to="/login"> Login </Link>
                            </p>
                        </form>
                    </div>
                </Col>
                <Col md={6}></Col>
            </Row>
        </Container>
    );
};

export default Register;
