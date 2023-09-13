import React, { Component } from "react";
import { Row, Col, Card, CardBody, FormGroup, Button, Label, Input, Container, InputGroup, Form } from "reactstrap";
import { toast } from 'react-toastify'; // Import toast from react-toastify
import { withRouter } from 'react-router-dom';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

class EditPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Forms", link: "#" },
                { title: "Form Mask", link: "#" },
            ],
            first_name: "",
            last_name: "",
            email: "",
            contact_number: "",
            date_of_birth: "",
            gender: "",
            address: "",
            patient_id: "",
            medical_history: "",
            client_id:"",
            access_token:"",

        };
    }
    async componentDidMount() {
        const { match } = this.props;
        const patient_id = match.params.patient_id;
        const access = JSON.parse(localStorage.getItem('access_token'));

        const id = JSON.parse(localStorage.getItem('client_id'));
      
        try {
          if (!id) {
            throw new Error("client_id not found in localStorage");
          }
      
          // Fetch patient details using the patient_id
        //   const response = await fetch(`http://194.163.40.231:8080/Patient/details-By/`);
        const response = await fetch(`http://194.163.40.231:8080/Patient/details-By/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${access}`,

        },
        body: JSON.stringify({ patient_id, client_id: id }), // Use the updated client_id
      });
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
      
          const data = await response.json();
          const patientData = data.Data[0];
      
          if (!patientData) {
            throw new Error("Patient data not found in the response");
          }
      
          // Update state with fetched patient data
          this.setState({
            client_id: id,
            first_name: patientData.first_name,
            last_name: patientData.last_name,
            email: patientData.email,
            contact_number: patientData.contact_number,
            address: patientData.address,
            gender: patientData.gender,
            date_of_birth: patientData.date_of_birth,
            patient_id: patient_id,
            medical_history: patientData.medical_history,
            access_token:access,

          });
      
          //console.log("Patient data loaded:", this.state);
        } catch (error) {
          console.log("Error:", error);
          // Handle error fetching patient data, e.g., show an error message
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
            first_name,
            last_name,
            email,
            contact_number,
            date_of_birth,
            address,
            gender,
            patient_id,
            medical_history,
            client_id,
            access_token,

            // Use the correct key 'image' here
        } = this.state;

        const formData = {
            first_name,
            last_name,
            gender,
            email,
            contact_number,
            address,
            date_of_birth,
            medical_history,
            client_id,
            patient_id,
        };

        // Use the correct key 'image' here

        try {
            const response = await fetch(`http://194.163.40.231:8080/Patient/Updated/`, {
                method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,

            },
            body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.message) {
                // toast.success(data.message);
                window.alert(data.message);
                this.props.history.push('/patients'); // Assuming "/doctors" is the route for the doctors page

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
            first_name,
            last_name,
            email,
            contact_number,
            date_of_birth,
            address,
            gender,
            patient_id,
            medical_history,
        } = this.state;
        // console.log("Gender:", gender);

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid={true}>
                        <Breadcrumbs title="Edit Patient" breadcrumbItems={this.state.breadcrumbItems} />
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody>
                                        <Form className="needs-validation" method="post" id="tooltipForm" onSubmit={this.handleSubmit}>
                                            <Row>
                                                <Col md="4">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip01">First Name</Label>
                                                        <Input type="text" className="form-control" id="validationTooltip01" value={first_name} name="first_name" placeholder="First Name" onChange={this.handleChange} />

                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md="4">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip01">Last Name</Label>
                                                        <Input type="text" className="form-control" id="validationTooltip01" value={last_name} name="last_name" placeholder="Last Name" onChange={this.handleChange} />

                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col md="4">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip01">Email</Label>
                                                        <Input type="text" value={email} className="form-control" id="validationTooltip01" name="email" placeholder="Email" onChange={this.handleChange} />

                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>
                                               


                                            </Row>

                                            <Row>
                                            <Col md="4">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip02">Phone Number</Label>
                                                        <Input type="text" value={contact_number} className="form-control" id="validationTooltip02" name="contact_number" placeholder="Phone Number" onChange={this.handleChange} />
                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>
                                                
                                                <Col md="4">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip04">Gender</Label>
                                                        <select  className="form-control"  name="gender" value={gender} onChange={this.handleChange}>
                                                            <option>Select Gender</option>
                                                            <option>male</option>
                                                            <option>female</option>
                                                            <option>other</option>
                                                        </select>
                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md="4">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip04">Date Of Birth</Label>
                                                        <Input type="text" value={date_of_birth} className="form-control" id="validationTooltip04" name="date_of_birth" placeholder="Date Of Birth(format i.e. yyyy-mm-dd)" onChange={this.handleChange} />
                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>
                                                
                                            </Row>

                                            <Row>
                                           
                                                <Col md="4">
                                                    <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip04">Medical History</Label>
                                                        <Input type="text" value={medical_history} className="form-control" id="validationTooltip04" name="medical_history" placeholder="Medical History" onChange={this.handleChange} />
                                                        <div className="valid-tooltip">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md="8">
                                                     <div className="mb-3 position-relative">
                                                        <Label className="form-label" htmlFor="validationTooltip04">Address</Label>
                                                        <Input type="text" value={address} className="form-control" id="validationTooltip04" name="address" placeholder="Address" onChange={this.handleChange} />
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

export default withRouter(EditPatient);
