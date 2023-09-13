import React, { Component } from "react";
import { Row, Col, Card, CardBody, FormGroup, Button, Label, Input, Container, InputGroup, Form } from "reactstrap";
import { toast } from 'react-toastify'; // Import toast from react-toastify
import { withRouter } from 'react-router-dom';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
class EditAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Forms", link: "#" },
        { title: "Form Mask", link: "#" },
      ],
      appointment: this.props.location.state.appointment,
      patient: this.props.location.state.appointment.patient_id,
      doctor: this.props.location.state.appointment.doctor_id,
      appointment_date: this.props.location.state.appointment.appointment_date,
      start_time: this.props.location.state.appointment.start_time,
      end_time: this.props.location.state.appointment.end_time,
      appointment_id: this.props.location.state.appointment.appointment_id,
      client_id:"",
      access_token:"",
    };
  }
  componentDidMount() {
    // Load client_id from local storage and set it in the state
   const access = JSON.parse(localStorage.getItem('access_token'));
        const id = JSON.parse(localStorage.getItem('client_id'));
        if (access) {
          this.setState({ access_token: access });
         // console.log("hello" + this.state.access_token);
          this.setState({ client_id: id });
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
      patient,
      doctor,
      appointment_date,
      start_time,
       end_time,
       appointment_id,
       client_id,
       access_token,
    } = this.state;
    const formData = {
      client_id,
      appointment_id,
      patient,
      doctor,
      appointment_date,
      start_time,
      end_time,
    };
    try {
      const response = await fetch(`http://194.163.40.231:8080/Appointment/updateBy/`, {
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
        this.props.history.push('/appointments'); // Assuming "/doctors" is the route for the doctors page

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
      patient,
      doctor,
      appointment_date,
      start_time,
      end_time,
      
    } = this.state;
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Edit Appointment" breadcrumbItems={this.state.breadcrumbItems} />
            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <Form className="needs-validation" method="post" id="tooltipForm" onSubmit={this.handleSubmit}>
                      <Row>
                        <Col md="4">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip01">Patient ID</Label>
                            <Input type="text" className="form-control" id="validationTooltip01" value={patient} name="patient" placeholder="Patient ID" onChange={this.handleChange} />

                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip01">Doctor ID</Label>
                            <Input type="text" value={doctor} className="form-control" id="validationTooltip01" name="doctor" placeholder="Doctor ID" onChange={this.handleChange} />

                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip01">Appointment Date</Label>
                            <Input type="text" value={appointment_date} className="form-control" id="validationTooltip01" name="appointment_date" placeholder="Appointment Date" onChange={this.handleChange} />

                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>
                       

                        
                      </Row>

                      <Row>
                      <Col md="6">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip02">Appointment Start Time</Label>
                            <Input type="text" value={start_time} className="form-control" id="validationTooltip02" name="start_time" placeholder="Appointment Start Time" onChange={this.handleChange} />
                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>

                        <Col md="6">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip04">Appointment End Time</Label>
                            <Input type="text" value={end_time} className="form-control" id="validationTooltip04" name="end_time" placeholder="Appointment End time" onChange={this.handleChange} />
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

export default withRouter(EditAppointment);
