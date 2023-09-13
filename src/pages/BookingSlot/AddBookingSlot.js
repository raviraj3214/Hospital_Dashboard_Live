import React, { Component } from "react";
import { Row, Col, Card, CardBody, FormGroup, Button, Label, Input, Container, InputGroup, Form } from "reactstrap";
import { toast } from 'react-toastify'; // Import toast from react-toastify

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
class AddBookingSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Forms", link: "#" },
        { title: "Form Mask", link: "#" },
      ],
    
      weekend: '', 
      date: '',
      start_time: '', 
      end_time: '',
      appointment_duration: '',
      doctor_id: '',
      client:"",
    };
  }
  componentDidMount() {
    // Load client_id from local storage and set it in the state
    const client_id = JSON.parse(localStorage.getItem('client_id'));
    if (client_id) {
      this.setState({ client: client_id });
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
      weekend, 
      date,
      start_time, 
      end_time,
      appointment_duration,
      doctor_id,
    } = this.state;
    const formData = {
        weekend, 
      date,
      start_time, 
      end_time,
      appointment_duration,
      };
    try {
        const response = await fetch(`http://194.163.40.231:8080/api/BookingSlot/book/${doctor_id}/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok && data.message && data.success) {
       // toast.success(data.message);
       window.alert(data.message);

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
        weekend, 
      date,
      start_time, 
      end_time,
      appointment_duration,
      doctor_id,
    } = this.state;
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Add Booking Slot" breadcrumbItems={this.state.breadcrumbItems} />
            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <Form className="needs-validation" method="post" id="tooltipForm" onSubmit={this.handleSubmit}>
                      <Row>
                        <Col md="4">
                          <div className="mb-3 position-relative">
                            <Label className="form-label"  htmlFor="validationTooltip01">Doctor ID</Label>
                            <Input type="text" className="form-control" id="validationTooltip01" value={doctor_id} name="doctor_id" placeholder="Doctor ID" onChange={this.handleChange} />

                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>
                        <Col md="4">
                        <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip02">Specialty</Label>
                            <select className="form-control" name="weekend" onChange={this.handleChange}>
                              <option value="">Select Day</option>
                              <option value="Monday">Monday</option>
                              <option value="Tuesday">Tuesday</option>
                              <option value="Wednesday">Wednesday</option>
                              <option value="Thursday">Thursday</option>
                              <option value="Friday">Friday</option>
                              <option value="Saturday">Saturday</option>
                              <option value="Sunday">Sunday</option>
                              
                            </select>

                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip01">Date</Label>
                            <Input type="text" value={date} className="form-control" id="validationTooltip01" name="date" placeholder="yyyy-mm-dd" onChange={this.handleChange} />

                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip02">Start Time</Label>
                            <Input type="time" value={start_time} className="form-control" id="validationTooltip02" name="start_time" placeholder="Start Time" onChange={this.handleChange} />
                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>
                        
                        <Col md="4">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip02">End Time</Label>
                            <Input type="time" value={end_time} className="form-control" id="validationTooltip02" name="end_time" placeholder="End Time" onChange={this.handleChange} />
                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip04">Appointment Duration</Label>
                            <Input type="text" value={appointment_duration} className="form-control" id="validationTooltip04" name="appointment_duration" placeholder="Appointment Duration" onChange={this.handleChange} />
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

export default AddBookingSlot;
