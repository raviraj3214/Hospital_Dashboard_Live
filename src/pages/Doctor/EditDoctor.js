import React, { Component } from "react";
import { Row, Col, Card, CardBody, FormGroup, Button, Label, Input, Container, InputGroup, Form } from "reactstrap";
import { toast } from 'react-toastify'; // Import toast from react-toastify
import { withRouter } from 'react-router-dom';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

class EditDoctor extends Component {
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
      client_id: "",
      access_token:"",


    };
  }
  // async componentDidMount() {
  //   const { match } = this.props; // React Router match object
  //   const doctor_id = match.params.doctor_id;
  //   const { client_id } = this.state;
  //   const id = JSON.parse(localStorage.getItem('client_id'));
  //   if (id) {
  //     this.setState({ client: id });
  //   }
  //   try {

  //     const response = await fetch(`http://194.163.40.231:8080/Doctor/details-By/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json", // Set the content type to JSON
  //       },
  //       body: JSON.stringify({ doctor_id, client_id }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok.");
  //     }
  //     const data = await response.json();
  //     console.log(data.Data);

  //     // Update state with fetched doctor data
  //     this.setState({
  //       first_name: data.Data[0].first_name,
  //       last_name: data.Data[0].last_name,
  //       email: data.Data[0].email,
  //       contact_number: data.Data[0].contact_number,
  //       specialty: data.Data[0].specialty,
  //       qualifications: data.Data[0].qualifications,
  //       address: data.Data[0].address,
  //       gender: data.Data[0].gender,
  //       date_of_birth: data.Data[0].date_of_birth,
  //       doctor_id: doctor_id,
  //       department: data.Data[0].department
  //       // You can update the image state here too if needed
  //     });

  //   } catch (error) {
  //     console.log(error);
  //     // Handle error fetching doctor data
  //   }
  // }
  async componentDidMount() {
    try {
      const { match } = this.props;
      const doctor_id = match.params.doctor_id;
      const id = JSON.parse(localStorage.getItem('client_id'));
      const access = JSON.parse(localStorage.getItem('access_token'));

      if (id) {
        this.setState({ client_id: id });
        this.setState({ access_token: access });

      }
  
      const response = await fetch(`http://194.163.40.231:8080/Doctor/details-By/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${this.state.access_token}`,

        },
        body: JSON.stringify({ doctor_id, client_id: id }), // Use the updated client_id
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
  
      const data = await response.json();
  
      if (data.Data.length > 0) {
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
          department
        } = data.Data[0];
  
        this.setState({
          first_name,
          last_name,
          email,
          contact_number,
          specialty,
          qualifications,
          address,
          gender,
          date_of_birth,
          doctor_id,
          department,
        });
      } else {
        console.log("Doctor not found");
        // Handle the case where the doctor is not found
      }
    } catch (error) {
      console.log(error);
      // Handle other errors
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
      doctor_id,
      department,
      client_id,
      access_token,

    } = this.state;

    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('gender', gender);
    formData.append('email', email);
    formData.append('contact_number', contact_number);
    formData.append('date_of_birth', date_of_birth);
    formData.append('specialty', specialty);
    formData.append('qualifications', qualifications);
    formData.append('address', address);
    formData.append('department', department);

    // Use the correct key 'image' here

    try {
      const response = await fetch(`http://194.163.40.231:8080/Doctor/Updated/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Specify that you are sending JSON data
          'Authorization': `Bearer ${access_token}`,

        },
        body: JSON.stringify({
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
          client_id,
          doctor_id,
        }),
      });

      const data = await response.json();

      if (response.ok && data.message) {
        // toast.success(data.message);
        window.alert(data.message);
        this.props.history.push('/doctors'); // Assuming "/doctors" is the route for the doctors page

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
            <Breadcrumbs title="Edit Doctor" breadcrumbItems={this.state.breadcrumbItems} />
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
                            <Input type="text" value={last_name} className="form-control" id="validationTooltip01" name="last_name" placeholder="Last Name" onChange={this.handleChange} />

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
                            <Label className="form-label" htmlFor="validationTooltip02">Specialty</Label>
                            <select className="form-control" value={specialty} name="specialty" onChange={this.handleChange}>
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
                            <Input type="text" value={department} className="form-control" id="validationTooltip02" name="department" placeholder="Department" onChange={this.handleChange} />
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
                            <Input type="text" value={qualifications} className="form-control" id="validationTooltip02" name="qualifications" placeholder="Qualifications" onChange={this.handleChange} />
                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip04">Gender</Label>
                            <select className="form-control" value={gender} name="gender" onChange={this.handleChange}>
                              <option >Select Gender</option>
                              <option >male</option>
                              <option >female</option>
                              <option >other</option>
                            </select>

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
                        <Col md="12">
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

export default withRouter(EditDoctor);
