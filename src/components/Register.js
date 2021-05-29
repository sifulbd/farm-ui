import React, { useContext, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { UserContext } from "../App";

const Register = ({ mt }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { addToast } = useToasts();
    const history = useHistory();

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm();
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = (data) => {
        console.log(data);
        const signInuser = { isSignedIn: true, ...data };
        setLoggedInUser(signInuser);
        console.log(signInuser);
        addToast("Registered  Successfully", { appearance: "success", autoDismiss: true });
        history.push("/dashboard");
    };
    return (
        <Container>
            <Row>
                <Col md={8} className={mt ? `center ${mt}` : `center mt-30`}>
                    <div className="form-area">
                        <div className="introtext mt-4 mb-4">
                            <h3>Register</h3>
                            <p>Please tell us about yourself.</p>
                        </div>
                        <form className="fu-form" onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group controlId="firstname">
                                <Form.Label>First Name *</Form.Label>
                                <Form.Control type="text" name="fname" placeholder="First Name" {...register("fname", { required: true })} />
                                <p className="text-danger">{errors.fname && "First Name is required"}</p>
                            </Form.Group>
                            <Form.Group controlId="firstname">
                                <Form.Label>Last Name *</Form.Label>
                                <Form.Control type="text" name="lname" placeholder="Last Name" {...register("lname", { required: true })} />
                                <p className="text-danger">{errors.lname && "Last Name is required"}</p>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address *</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" {...register("email", { required: true })} />
                                <p className="text-danger">{errors.email && "Email is required"}</p>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password *</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    {...register("password", {
                                        required: true,
                                        minLength: {
                                            value: 6,
                                            message: "Password must have at least 6 characters",
                                        },
                                    })}
                                />
                                <p className="text-danger">{errors.password && errors.password.message}</p>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password *</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password_repeat"
                                    placeholder="Confirm Password"
                                    {...register("password_repeat", {
                                        required: true,
                                        validate: (value) => value === password.current || "The passwords do not match",
                                    })}
                                />
                                <p className="text-danger">{errors.password_repeat && <p>{errors.password_repeat.message}</p>}</p>
                            </Form.Group>
                            <Button className="btn-block" variant="info" type="submit">
                                Login
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
