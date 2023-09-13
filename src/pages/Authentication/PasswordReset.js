import React, { Component } from "react";
import { Row, Col, Alert, Button, Container, Label } from "reactstrap";
import Axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import logodark from "../../assets/images/logo-dark.png";

class PasswordReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            password2: "",
            uid: "",
            token: "",
        };
    }
    async componentDidMount() {
        // Access the URL parameters using this.props.match.params
       const { uid, token } = this.props.match.params;

        // Set the uid and token in the component's state
        this.setState({ uid, token });
    }

    handleValidSubmit = async (e) => {
        e.preventDefault();
        const { password, password2, uid, token } = this.state;

        try {
            const response = await Axios.post(
                `http://194.163.40.231:8080/Hospital/reset-password/${uid}/${token}/`,
                {
                    password,
                    password2,
                }
            );

            if (response.data.message) {
                window.alert(response.data.message);
                this.props.history.push('/login');
            } else {
                const data = response.data;
                if (data.error_message.password) {
                    // Handle password error
                }
                if (data.error_message.email) {
                    // Handle email error
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render() {
        const { password, password2 } = this.state;
        return (
            <React.Fragment>
                <div>
                    <Container fluid className="p-0">
                        <Row className="g-0">
                            <Col lg={4}>
                                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                                    <div className="w-100">
                                        <Row className="justify-content-center">
                                            <Col lg={9}>
                                                <div>
                                                    <div className="text-center">
                                                        <h4 className="font-size-18 mt-4">Reset Password</h4>
                                                        <p className="text-muted">Reset your password to Dtroffle.</p>
                                                    </div>

                                                    <div className="p-2 mt-5">
                                                        {this.props.forgetError && this.props.forgetError ? (
                                                            <Alert color="danger" className="mb-4">
                                                                {this.props.forgetError}
                                                            </Alert>
                                                        ) : null}
                                                        {this.props.message ? (
                                                            <Alert color="success" className="mb-4">
                                                                {this.props.message}
                                                            </Alert>
                                                        ) : null}
                                                        <AvForm
                                                            className="form-horizontal"
                                                            onValidSubmit={this.handleValidSubmit}
                                                        >
                                                            <div className="auth-form-group-custom mb-4">
                                                                <i className="ri-mail-line auti-custom-input-icon"></i>
                                                                <Label htmlFor="password">Password</Label>
                                                                <AvField
                                                                    name="password"
                                                                    value={password}
                                                                    onChange={this.handleChange}
                                                                    type="password"
                                                                    validate={{
                                                                        required: { value: true, errorMessage: "Password is required" },
                                                                        
                                                                    }}
                                                                    className="form-control"
                                                                    id="password"
                                                                    placeholder="Enter password"
                                                                />

                                                            </div>
                                                            <div className="auth-form-group-custom mb-4">
                                                                <i className="ri-mail-line auti-custom-input-icon"></i>
                                                                <Label htmlFor="password2">Confirm Password</Label>
                                                                <AvField
                                                                    name="password2"
                                                                    value={password2}
                                                                    onChange={this.handleChange}
                                                                    type="password"
                                                                    validate={{
                                                                        required: { value: true, errorMessage: "Confirm Password is required" },
                                                                        match: { value: "password", errorMessage: "Passwords do not match" },
                                                                    }}
                                                                    className="form-control"
                                                                    id="password2"
                                                                    placeholder="Confirm Password"
                                                                />
                                                            </div>

                                                            <div className="mt-4 text-center">
                                                                <Button
                                                                    color="primary"
                                                                    className="w-md waves-effect waves-light"
                                                                    type="submit"
                                                                >
                                                                    {this.props.loading ? "Loading..." : "Reset"}
                                                                </Button>
                                                            </div>
                                                        </AvForm>
                                                    </div>

                                                    <div className="mt-5 text-center">
                                                        <p>
                                                            Don't have an account ?{" "}
                                                            <Link to="/login" className="fw-medium text-primary">
                                                                Log in
                                                            </Link>{" "}
                                                        </p>
                                                        <p>© 2023 Dtroffle. Crafted with <i className="mdi mdi-heart text-danger"></i> by Dtroffle</p>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={8}>
                                <div className="authentication-bg">
                                    <div className="bg-overlay"></div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(PasswordReset);
