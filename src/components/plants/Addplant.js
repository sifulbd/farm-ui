import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Jumbotron } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import DatePicker from "react-datepicker";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { API_URL } from "./../../config";
import Moment from "react-moment";
import { PlantContext } from "../../context/PlantContext/PlantState";

const Addplant = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { add_Plant } = useContext(PlantContext);
    const [someDateVal, setStartDate] = useState(new Date());
    const [someUTCDateTimeVal, setUtcDateandTime] = useState(new Date());
    const { addToast } = useToasts();
    const [flavours, setFalvours] = useState([]);
    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
        watch,
        reset,
    } = useForm();

    const addOtherFlavour = watch(
        "flavorCode",
        "33333333-3333-3333-3333-333333333333"
    );

    const config = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Farm-Api-Key": loggedInUser.farmApiKey,
        },
    };

    const configKey = loggedInUser.farmApiKey;

    const otherFlavorCondition =
        addOtherFlavour === "33333333-3333-3333-3333-333333333333"
            ? true
            : false;

    try {
        useEffect(() => {
            axios
                .get(`${API_URL}/flavors`, config)
                .then(function (res) {
                    setFalvours(res.data);
                    addToast("Flavor loaded Successfully", {
                        appearance: "success",
                        autoDismiss: true,
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, []);
    } catch (error) {
        addToast("Somthing Went Wrong", {
            appearance: "error",
            autoDismiss: true,
        });
    }

    const onSubmit = (data) => {
        addToast("Plant added Successfully", {
            appearance: "success",
            autoDismiss: true,
        });
        const allData = { ...data, someDateVal, someUTCDateTimeVal };

        // console.log(allData);
        add_Plant(allData, configKey);
        reset();
    };

    return (
        <>
            <Container className="container">
                <Jumbotron className="home_hero">
                    <h2> Add A Plant</h2>
                    <p> Add a plant to the farm</p>
                </Jumbotron>
            </Container>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="form-area">
                            <form
                                className="fu-form"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <Row>
                                    <Form.Group
                                        className="col-md-6"
                                        controlId="flavorCode"
                                    >
                                        <Form.Label>flavor Code</Form.Label>
                                        <Form.Control
                                            as="select"
                                            type="text"
                                            name="flavorCode"
                                            placeholder="Flavor Code"
                                            {...register("flavorCode", {
                                                required: true,
                                            })}
                                        >
                                            {flavours.items &&
                                                flavours.items.map(
                                                    (flavor, idx) => (
                                                        <option
                                                            key={idx}
                                                            value={
                                                                flavor.flavorCode
                                                            }
                                                        >
                                                            {flavor.description}
                                                        </option>
                                                    )
                                                )}
                                        </Form.Control>

                                        <p className="text-danger">
                                            {errors.flavorCode &&
                                                "Flavor Code is required"}
                                        </p>
                                    </Form.Group>

                                    {otherFlavorCondition && (
                                        <Form.Group
                                            className="col-md-6"
                                            controlId="firstname"
                                        >
                                            <Form.Label>otherFlavor</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="otherFlavor"
                                                placeholder="otherFlavor"
                                                {...register("otherFlavor", {
                                                    required: false,
                                                })}
                                            />
                                            <p className="text-danger">
                                                {errors.otherFlavor &&
                                                    "otherFlavor is required"}
                                            </p>
                                        </Form.Group>
                                    )}

                                    <Form.Group
                                        className="col-md-6"
                                        controlId="firstname"
                                    >
                                        <Form.Label>someIntVal</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="someIntVal"
                                            placeholder="someIntVal"
                                            {...register("someIntVal", {
                                                required: true,
                                                valueAsNumber: true,
                                                pattern: /\d+/g,
                                            })}
                                        />
                                        <p className="text-danger">
                                            {errors.someIntVal &&
                                                "someIntVal is required"}
                                        </p>
                                    </Form.Group>
                                    <Form.Group
                                        className="col-md-6"
                                        controlId="firstname"
                                    >
                                        <Form.Label>someBigIntVal</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="someBigIntVal"
                                            placeholder="someBigIntVal"
                                            {...register("someBigIntVal", {
                                                required: true,
                                                pattern: /\d+/g,
                                            })}
                                        />
                                        <p className="text-danger">
                                            {errors.someBigIntVal &&
                                                "someBigIntVal is required"}
                                        </p>
                                    </Form.Group>
                                    <Form.Group
                                        className="col-md-6"
                                        controlId="firstname"
                                    >
                                        <Form.Label>someBitVal</Form.Label>
                                        <Form.Check
                                            type="radio"
                                            value="true"
                                            label="True"
                                            name="someBitVal"
                                            id="someBitVal"
                                            {...register("someBitVal", {
                                                required: true,
                                            })}
                                        />
                                        <Form.Check
                                            type="radio"
                                            value="false"
                                            label="False"
                                            name="someBitVal"
                                            id="someBitVal2"
                                            {...register("someBitVal", {
                                                required: true,
                                            })}
                                        />
                                        <p className="text-danger">
                                            {errors.someBitVal &&
                                                "someBitVal is required"}
                                        </p>
                                    </Form.Group>
                                    <Form.Group
                                        className="col-md-6"
                                        controlId="isEditAllowed"
                                    >
                                        <Form.Label>isEditAllowed</Form.Label>
                                        <Form.Check
                                            type="radio"
                                            value="true"
                                            label="True"
                                            name="isEditAllowed"
                                            id="isEditAllowed"
                                            {...register("isEditAllowed", {
                                                required: true,
                                            })}
                                        />
                                        <Form.Check
                                            type="radio"
                                            value="false"
                                            label="False"
                                            name="isEditAllowed"
                                            id="isEditAllowed2"
                                            {...register("isEditAllowed", {
                                                required: true,
                                            })}
                                        />
                                        <p className="text-danger">
                                            {errors.isEditAllowed &&
                                                "isEditAllowed is required"}
                                        </p>
                                    </Form.Group>
                                    <Form.Group
                                        className="col-md-6"
                                        controlId="isDeleteAllowed"
                                    >
                                        <Form.Label>isDeleteAllowed</Form.Label>
                                        <Form.Check
                                            type="radio"
                                            value="true"
                                            label="True"
                                            name="isDeleteAllowed"
                                            id="isDeleteAllowed"
                                            {...register("isDeleteAllowed", {
                                                required: true,
                                            })}
                                        />
                                        <Form.Check
                                            type="radio"
                                            value="false"
                                            label="False"
                                            name="isDeleteAllowed"
                                            id="isDeleteAllowed2"
                                            {...register("isDeleteAllowed", {
                                                required: true,
                                            })}
                                        />
                                        <p className="text-danger">
                                            {errors.isDeleteAllowed &&
                                                "isDeleteAllowed is required"}
                                        </p>
                                    </Form.Group>
                                    <Form.Group
                                        className="col-md-6"
                                        controlId="someFloatVal"
                                    >
                                        <Form.Label>someFloatVal</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="someFloatVal"
                                            placeholder="someFloatVal"
                                            {...register("someFloatVal", {
                                                required: true,
                                                pattern: /^\d+(?:\.\d{1,2})?$/,
                                            })}
                                        />
                                        <p className="text-danger">
                                            {errors.someFloatVal &&
                                                "someFloatVal is required"}
                                        </p>
                                    </Form.Group>
                                    <Form.Group
                                        className="col-md-6"
                                        controlId="someDecimalVal"
                                    >
                                        <Form.Label>someDecimalVal</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="someDecimalVal"
                                            placeholder="someDecimalVal"
                                            {...register("someDecimalVal", {
                                                required: true,
                                            })}
                                        />
                                        <p className="text-danger">
                                            {errors.someDecimalVal &&
                                                "someDecimalVal is required"}
                                        </p>
                                    </Form.Group>
                                    <Form.Group
                                        className="col-md-6"
                                        controlId="someUTCDateTimeVal"
                                    >
                                        <Form.Label>
                                            someUTCDateTimeVal
                                        </Form.Label>
                                        {/* <Form.Control
                                            type="text"
                                            name="someUTCDateTimeVal"
                                            placeholder="someUTCDateTimeVal"
                                            {...register("someUTCDateTimeVal", {
                                                required: true,
                                            })}
                                        /> */}

                                        <DatePicker
                                            selected={someUTCDateTimeVal}
                                            className="form-control"
                                            showTimeSelect
                                            onChange={(someUTCDateTimeVal) =>
                                                setUtcDateandTime(
                                                    someUTCDateTimeVal
                                                )
                                            }
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                        />
                                        <p className="text-danger">
                                            {errors.someUTCDateTimeVal &&
                                                "someUTCDateTimeVal is required"}
                                        </p>
                                    </Form.Group>
                                    <Form.Group
                                        className="col-md-6"
                                        controlId="someDateVal"
                                    >
                                        <Form.Label
                                            style={{ display: "block" }}
                                        >
                                            someDateVal
                                        </Form.Label>
                                        {/* <Form.Control
                                            type="text"
                                            name="someDateVal"
                                            placeholder="someDateVal"
                                            {...register("someDateVal", {
                                                required: true,
                                            })}
                                        /> */}
                                        <DatePicker
                                            selected={someDateVal}
                                            className="form-control"
                                            onChange={(someDateVal) =>
                                                setStartDate(someDateVal)
                                            }
                                        />
                                        <p className="text-danger">
                                            {errors.someDateVal &&
                                                "someDateVal is required"}
                                        </p>
                                    </Form.Group>
                                    <Form.Group
                                        className="col-md-6"
                                        controlId="someMoneyVal"
                                    >
                                        <Form.Label>someMoneyVal</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="someMoneyVal"
                                            placeholder="someMoneyVal"
                                            {...register("someMoneyVal", {
                                                required: true,
                                            })}
                                        />
                                        <p className="text-danger">
                                            {errors.someMoneyVal &&
                                                "someMoneyVal is required"}
                                        </p>
                                    </Form.Group>
                                    <Form.Group
                                        className="col-md-6"
                                        controlId="someNVarCharVal"
                                    >
                                        <Form.Label>someNVarCharVal</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="someNVarCharVal"
                                            placeholder="someNVarCharVal"
                                            {...register("someNVarCharVal", {
                                                required: true,
                                            })}
                                        />
                                        <p className="text-danger">
                                            {errors.someNVarCharVal &&
                                                "someNVarCharVal is required"}
                                        </p>
                                    </Form.Group>
                                    <Form.Group
                                        className="col-md-6"
                                        controlId="someVarCharVal"
                                    >
                                        <Form.Label>someVarCharVal</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="someVarCharVal"
                                            placeholder="someVarCharVal"
                                            {...register("someVarCharVal", {
                                                required: true,
                                            })}
                                        />
                                        <p className="text-danger">
                                            {errors.someVarCharVal &&
                                                "someVarCharVal is required"}
                                        </p>
                                    </Form.Group>
                                    <Form.Group
                                        className="col-md-6"
                                        controlId="someTextVal"
                                    >
                                        <Form.Label>someTextVal</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="someTextVal"
                                            placeholder="someTextVal"
                                            {...register("someTextVal", {
                                                required: true,
                                            })}
                                        />
                                        <p className="text-danger">
                                            {errors.someTextVal &&
                                                "someTextVal is required"}
                                        </p>
                                    </Form.Group>
                                    <Form.Group
                                        className="col-md-6"
                                        controlId="somePhoneNumber"
                                    >
                                        <Form.Label>somePhoneNumber</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phone"
                                            placeholder="somePhoneNumber"
                                            {...register("somePhoneNumber", {
                                                required: true,
                                                pattern:
                                                    /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,
                                            })}
                                        />
                                        <p className="text-danger">
                                            {errors.somePhoneNumber &&
                                                "somePhoneNumber is required"}
                                        </p>
                                    </Form.Group>
                                    <Form.Group
                                        className="col-md-6"
                                        controlId="someEmailAddress"
                                    >
                                        <Form.Label>
                                            someEmailAddress
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="someEmailAddress"
                                            placeholder="someEmailAddress"
                                            {...register("someEmailAddress", {
                                                required: true,
                                            })}
                                        />
                                        <p className="text-danger">
                                            {errors.someEmailAddress &&
                                                "someEmailAddress is required"}
                                        </p>
                                    </Form.Group>
                                    <Form.Group
                                        className="col-md-6"
                                        controlId="sampleImageUploadFile"
                                    >
                                        <Form.Label>
                                            sampleImageUploadFile
                                        </Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="sampleImageUploadFile"
                                            placeholder="sampleImageUploadFile"
                                            {...register(
                                                "sampleImageUploadFile",
                                                {
                                                    required: false,
                                                }
                                            )}
                                        />
                                        <p className="text-danger">
                                            {errors.sampleImageUploadFile &&
                                                "sampleImageUploadFile is required"}
                                        </p>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Button
                                            className="btn-block"
                                            variant="info"
                                            type="submit"
                                        >
                                            Add Plant
                                        </Button>{" "}
                                    </Col>
                                    <Col md={6}>
                                        <Link to="/plants">
                                            <Button
                                                className="btn-block"
                                                variant="danger"
                                                type="submit"
                                            >
                                                Cancel
                                            </Button>{" "}
                                        </Link>
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    </Col>
                    <Col md={6}></Col>
                </Row>
            </Container>
        </>
    );
};

export default Addplant;
