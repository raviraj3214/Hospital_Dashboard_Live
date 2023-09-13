import React, { Component } from "react";
import axios from 'axios';
import { Row, Col, Card, CardBody, FormGroup, Button, Label, Input, Container, InputGroup, Form } from "reactstrap";
import { toast } from 'react-toastify'; // Import toast from react-toastify

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

class AddDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Forms", link: "#" },
        { title: "Form Mask", link: "#" },
      ],
        first_name: '',
        last_name: '',
        email: '',
        contact_number: '',
        specialty: '',
        qualifications: '',
        address: '',
        gender: '',
        date_of_birth: '',
        doctor_id: '',
        department: '',
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

  // handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   // Check if the selected file is not null and it's an instance of File
  //   if (file && file instanceof File) {
  //     this.setState({
  //       image: file, // Use the correct key 'image' here
  //     });
  //   } else {
  //     // Reset the image if it's not valid
  //     this.setState({
  //       image: null, // Use the correct key 'image' here
  //     });
  //   }
  // };


  // handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const {
  //     first_name,
  //     last_name,
  //     email,
  //     contact_number,
  //     specialty,
  //     qualifications,
  //     address,
  //     gender,
  //     date_of_birth,
  //      // Use the correct key 'image' here
  //     department,
  //     client,
  //   } = this.state;

    

  //   try {
  //     const response = await fetch("http://194.163.40.231:8080/Doctor/register/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json", // Set the content type to JSON
  //       },
  //       body: JSON.stringify({
  //     first_name,
  //     last_name,
  //     gender,
  //     email,
  //     contact_number,
  //     date_of_birth,
  //     specialty,
  //     qualifications,
  //     address,
  //     department,
  //     client,
  //     }),
  //     });

  //     const data = await response.json();

  //     if (response.ok && data.message && data.success) {
  //       // toast.success(data.message);
  //       window.alert(data.message);
  //     } else {
  //       // toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     // Handle any network or other errors here
  //     // toast.error("An error occurred while processing your request.");
  //   }
  // };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      email,
      contact_number,
      specialty,
      qualifications,
      address,
      gender,
      date_of_birth,
      // Use the correct key 'image' here
      department,
      client,
      access_token,

    } = this.state;
  
    try {
      const response = await axios.post("http://194.163.40.231:8080/Doctor/register/", {
        first_name,
        last_name,
        gender,
        email,
        contact_number,
        date_of_birth,
        specialty,
        qualifications,
        address,
        department,
        client,
      }, {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
          'Authorization': `Bearer ${access_token}`,

        },
      });
  
      if ( response.data.message && response.data.success) {
        // toast.success(response.data.message);
        window.alert(response.data.message);
      } 
      
    } catch (error) {
      window.alert(error.response.data.message);
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
      specialty,
      qualifications,
      address,
      gender,
      date_of_birth,
      department,
    } = this.state;
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Add Doctor" breadcrumbItems={this.state.breadcrumbItems} />
            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <Form className="needs-validation" method="post" id="tooltipForm" onSubmit={this.handleSubmit}>
                      <Row>
                        <Col md="4">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip01">First Name</Label>
                            <Input type="text" className="form-control" id="validationTooltip01" value={first_name} name="first_name" placeholder="First Name" onChange={this.handleChange} required/>

                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip01">Last Name</Label>
                            <Input type="text" value={last_name} className="form-control" id="validationTooltip01" name="last_name" placeholder="Last Name" onChange={this.handleChange} required />

                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip01">Email</Label>
                            <Input type="text" value={email} className="form-control" id="validationTooltip01" name="email" placeholder="Email" onChange={this.handleChange} required/>

                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip02">Phone Number</Label>
                            <Input type="text" value={contact_number} className="form-control" id="validationTooltip02" name="contact_number" placeholder="Phone Number" onChange={this.handleChange} required />
                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip02">Specialty</Label>
                            <select className="form-control" value={specialty} name="specialty" onChange={this.handleChange} required >
                              <option value="">Select Specialty</option>
                              <option value="Cardiology">Cardiology</option>
                              <option value="Dermatology">Dermatology</option>
                              <option value="Neurology">Neurology</option>
                              <option value="Orthopedics">Orthopedics</option>
                              <option value="Pediatrics">Pediatrics</option>
                              <option value="Gynecology">Gynecology</option>
                              <option value="Urology">Urology</option>
                              <option value="Oncology">Oncology</option>
                              <option value="Psychiatry">Psychiatry</option>
                              <option value="ENT">ENT</option>
                            </select>

                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip02">Department</Label>
                            <Input type="text" value={department} className="form-control" id="validationTooltip02" name="department" placeholder="Department" onChange={this.handleChange} required />
                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                      <Col md="4">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip02">Qualifications</Label>
                            <Input type="text" value={qualifications} className="form-control" id="validationTooltip02" name="qualifications" placeholder="Qualifications" onChange={this.handleChange} required />
                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip04">Gender</Label>
                            <select className="form-control" value={gender} name="gender" onChange={this.handleChange} required >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>

                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip04">Date Of Birth</Label>
                            <Input type="text" value={date_of_birth} className="form-control" id="validationTooltip04" name="date_of_birth" placeholder="Date Of Birth(format i.e. yyyy-mm-dd)" onChange={this.handleChange} required />
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
                            <Input type="text" value={address} className="form-control" id="validationTooltip04" name="address" placeholder="Address" onChange={this.handleChange} required/>
                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Col md="12" className="text-center">
                        <Button  color="primary" type="submit">Submit form</Button>
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

export default AddDoctor;
