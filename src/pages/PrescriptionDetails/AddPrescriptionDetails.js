import React, { Component } from "react";
import { Row, Col, Card, CardBody, FormGroup, Button, Label, Input, Container, InputGroup, Form } from "reactstrap";
//import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios library

// Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

class AddPrescriptionDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prescription: 0,
            medicine: 0,
            dosage: "",
            frequency: "",
            client:"",
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
            prescription,
            medicine,
            dosage,
            frequency,
            client,
            access_token,

        } = this.state;
        try {
            const response = await fetch("http://194.163.40.231:8080/PrescriptionDetail/add/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${access_token}`,

                },
                body: JSON.stringify({
                    prescription,
                    medicine,
                    dosage,
                    frequency,
                    client,
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
                                                <Col md="6">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip01">Prescription ID</Label>
                                                        <Input type="text" className="form-control" id="validationTooltip01" name="prescription" placeholder="Prescription" onChange={this.handleChange} required/>
                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md="6">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip01">Medicine</Label>
                                                        <Input type="text" className="form-control" id="validationTooltip01" name="medicine" placeholder="Medicine" onChange={this.handleChange} required/>
                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>
                                                
                                            </Row>

                                            <Row>
                                                <Col md="6">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip02">Dosage</Label>
                                                        <Input type="text" className="form-control" id="validationTooltip02" name="dosage" placeholder="Dosage" onChange={this.handleChange} required/>
                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>
                                               
                                                <Col md="6">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip04">Frequency</Label>
                                                        <Input type="text" className="form-control" id="validationTooltip04" name="frequency" placeholder="Frequency" onChange={this.handleChange} required/>
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

export default AddPrescriptionDetails;
