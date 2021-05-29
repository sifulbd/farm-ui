import React, { useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";

const Login = ({ mt }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { addToast } = useToasts();
    const history = useHistory();

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        const signInuser = { isSignedIn: true, ...data };
        setLoggedInUser(signInuser);
        console.log(signInuser);

        addToast("Logged in Successfully", { appearance: "success", autoDismiss: true });
        history.push("/dashboard");
    };

    return (
        <Container>
            <Row>
                <Col md={8} className={mt ? `center ${mt}` : `center mt-30`}>
                    <div className="form-area">
                        <div className="introtext">
                            <h3>Login</h3>
                            <p>Please enter your email and password</p>
                        </div>
                        <form className="fu-form" onSubmit={handleSubmit(onSubmit)}>
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
                                    })}
                                />
                                <p className="text-danger">{errors.password && "Password is required"}</p>
                            </Form.Group>
                            <Button className="btn-block" variant="info" type="submit">
                                Login
                            </Button>{" "}
                            <p className="mt-4">
                                Don't have account? <Link to="/register"> Register </Link>
                            </p>
                        </form>
                    </div>
                </Col>
                <Col md={6}></Col>
            </Row>
        </Container>
    );
};

export default Login;
