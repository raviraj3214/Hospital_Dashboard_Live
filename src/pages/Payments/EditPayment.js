import React, { Component } from "react";
import { Row, Col, Card, CardBody, FormGroup, Button, Label, Input, Container, InputGroup, Form } from "reactstrap";
//import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios library
import { withRouter } from "react-router-dom";

// Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

class EditPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: '',
            payment_date: '',
            amount: '',
            payment_id: '',
            client_id:"",
            access_token:"",

        };
    }
    async componentDidMount() {
        const access = JSON.parse(localStorage.getItem('access_token'));

        const { match } = this.props; // React Router match object
        const payment_id = match.params.payment_id;
            // Load client_id from local storage and set it in the state
            const id = JSON.parse(localStorage.getItem('client_id'));
            if (id) {
              this.setState({ client_id: id });
              this.setState({ access_token: access });

            }
          

        try {
            const response = await fetch(`http://194.163.40.231:8080/Payment/details-By/`,{
                method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${this.state.access_token}`

        },
        body: JSON.stringify({ payment_id, client_id: id }), // Use the updated client_id
            });
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            const data = await response.json();
            // console.log(`hiiiii${data.invoice_id}`);


            // Update state with fetched doctor data
            this.setState({
                invoice: data.Data.invoice_id,
                payment_date: data.Data.payment_date,
                amount: data.Data.amount,
                payment_id,
            });
            // console.log(gender);

        } catch (error) {
            console.log(error);
            // Handle error fetching doctor data
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
            invoice,
            payment_date,
            amount,
            payment_id,
            client_id,
            access_token,

        } = this.state;
        try {
            const response = await fetch(`http://194.163.40.231:8080/Payment/Updated/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${access_token}`,

                },
                body: JSON.stringify({
                    invoice,
                    payment_date,
                    amount,
                    payment_id,
                    client_id,
                }),
            });

            const data = await response.json();

            if (data.message) {
                window.alert(data.message);
                this.props.history.push('/payment-list');
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
            invoice,
            payment_date,
            amount, } = this.state;
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
                                                        <Label className="form-label" htmlFor="validationTooltip01">Invoice</Label>
                                                        <Input type="text" className="form-control" id="validationTooltip01" value={invoice} name="invoice" placeholder="Invoice" onChange={this.handleChange} />
                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md="6">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip01">Payment Date</Label>
                                                        <Input type="text" className="form-control" id="validationTooltip01" value={payment_date} name="payment_date" placeholder="Payment Date" onChange={this.handleChange} />
                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>

                                            </Row>

                                            <Row>
                                                <Col md="6">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip02">Amount</Label>
                                                        <Input type="text" className="form-control" id="validationTooltip02" value={amount} name="amount" placeholder="Amount" onChange={this.handleChange} />
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

export default withRouter(EditPayment);
