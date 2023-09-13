import React, { Component } from "react";
import { Row, Col, Card, CardBody, FormGroup, Button, Label, Input, Container, InputGroup, Form } from "reactstrap";
//import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios library

// Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

class AddBed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            department: "",
            bed_number: "",
            is_occupied: false,
            client: "",
            access_token:"",

        };
    }
    componentDidMount() {
        // Load client_id from local storage and set it in the state
        const access = JSON.parse(localStorage.getItem('access_token'));

        const client_id = JSON.parse(localStorage.getItem('client_id'));
        if (client_id) {
          this.setState({ client: client_id });
          this.setState({ access_token: access });

        }
      }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const {
            department,
            is_occupied,
            client,
            access_token,

        } = this.state;
        try {
            const response = await fetch("http://194.163.40.231:8080/Bed/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${access_token}`
                },
                body: JSON.stringify({
                    client,
                    department,
                    is_occupied,
                    
                }),
            });

            const data = await response.json();

            if (data.message) {
                window.alert(data.message);
            }
        } catch (error) {
            if (error.message) {
                window.alert(error.message);
            } else {
                window.alert("Something went wrong");
            }
        }
    };

    render() {
        const {
            department,
            is_occupied,
            client,
        } = this.state;
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid={true}>
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody>
                                        <Form className="needs-validation" method="post" id="tooltipForm" onSubmit={this.handleSubmit}>
                                            <Row>
                                                <Col md="12">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip01">Department ID</Label>
                                                        <Input type="text" className="form-control" id="validationTooltip01" name="department" placeholder="Department ID" onChange={this.handleChange} required />
                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>
                                               
                                            </Row>

                                            <Row>
                                                <Col md="12">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip02">Occupied</Label>
                                                        <select className="form-control" value={is_occupied} name="is_occupied" onChange={this.handleChange} required >
                                                            <option value="">Select </option>
                                                            <option value="True">Yes</option>
                                                            <option value="False">No</option>
                                                        </select>
                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>


                                            </Row>


                                            <Col md="12" className="text-center">
                                                <Button color="primary" type="submit">Submit form</Button>
                                            </Col>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default AddBed;
