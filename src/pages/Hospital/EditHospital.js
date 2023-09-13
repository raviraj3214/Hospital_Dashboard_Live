import React, { Component } from "react";
import { Row, Col, Card, CardBody, FormGroup, Button, Label, Input, Container, InputGroup, Form } from "reactstrap";
import { toast } from 'react-toastify'; // Import toast from react-toastify
import { withRouter } from 'react-router-dom';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

class EditHospital extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hospital_name: '',
            owner_name: '',
            city: '',
            address: '',
            email: '',
            phone: '',
            client_id: '',
            password: '',
            access_token:"",
        };
    }
    async componentDidMount() {
        try {
          const { match } = this.props; // React Router match object
          const client_id = match.params.client_id;
          console.log("hii hello chalo" + client_id);
      
          const access = JSON.parse(localStorage.getItem('access_token'));
          if (access) {
            this.setState({ access_token: access });
          }
      
          const response = await fetch(`http://194.163.40.231:8080/Hospital/list/${client_id}/`, {
            headers: {
              'Authorization': `Bearer ${access}`
            }
          });
      
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
      
          const data = await response.json();
      
          console.log(data);
      
          // Update state with fetched hospital data
          this.setState({
            client_id: data.hospital_id,
            hospital_name: data.hospital_name,
            owner_name: data.owner_name,
            city: data.city,
            address: data.address,
            email: data.email,
            phone: data.phone,
            password: data.password,
          });
        } catch (error) {
          console.log(error);
          // Handle error fetching hospital data
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
            owner_name, hospital_name, city, address, email, phone,client_id,password,
        } = this.state;

        const formData = {
            owner_name, hospital_name, city, address, email, phone,password,
        };

        // Use the correct key 'image' here

        try {
            const response = await fetch(`http://194.163.40.231:8080/Hospital/update/${client_id}/`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.message ) {
                // toast.success(data.message);
                window.alert(data.message);
                this.props.history.push('/hospital-list'); // Assuming "/doctors" is the route for the doctors page

            } else {
                // toast.error(data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle any network or other errors here
            // toast.error("An error occurred while processing your request.");
        }
    };

    render() {
        const {
            owner_name, hospital_name, city, address, email, phone,password } = this.state;
        // console.log("Gender:", gender);

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
                                                <Col md="4">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip01">Owner Name</Label>
                                                        <Input type="text" className="form-control" id="validationTooltip01" value={owner_name} name="owner_name" placeholder="Owner Name" onChange={this.handleChange} />
                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md="4">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip01">Hospital Name</Label>
                                                        <Input type="text" className="form-control" id="validationTooltip01" value={hospital_name} name="hospital_name" placeholder="Hospital Name" onChange={this.handleChange} />
                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md="4">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip02">Phone Number</Label>
                                                        <Input type="text" className="form-control" id="validationTooltip02" value={phone} name="phone" placeholder="Phone Number" onChange={this.handleChange} />
                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md="4">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip02">Email ID</Label>
                                                        <Input type="text" className="form-control" id="validationTooltip02" value={email} name="email" placeholder="Email ID" onChange={this.handleChange} />
                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md="4">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip02">Password</Label>
                                                        <Input type="text" className="form-control" id="validationTooltip02" value={password} name="password" placeholder="Password" onChange={this.handleChange} />
                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md="4">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip02">City</Label>
                                                        <Input type="text" className="form-control" id="validationTooltip02" value={city} name="city" placeholder="City" onChange={this.handleChange} />
                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>
                                                
                                            </Row>
                                            <Row>
                                            <Col md="12">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip04">Address</Label>
                                                        <Input type="text" className="form-control" id="validationTooltip04" value={address} name="address" placeholder="Address" onChange={this.handleChange} />
                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md="12" className="text-center">
                                                    <Button color="primary" type="submit">Submit form</Button>
                                                </Col>
                                            </Row>
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

export default withRouter(EditHospital);
