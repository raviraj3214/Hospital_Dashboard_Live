import React, { Component } from "react";
import { Row, Col, Card, CardBody, FormGroup, Button, Label, Input, Container, InputGroup, Form } from "reactstrap";
import { toast } from 'react-toastify'; // Import toast from react-toastify
import { withRouter } from 'react-router-dom';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
class EditBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Forms", link: "#" },
        { title: "Form Mask", link: "#" },
      ],
      booking_id: this.props.location.state.booking.booking_id,
      doctor: this.props.location.state.booking.doctor,
      date: this.props.location.state.booking.date,
      weekend: this.props.location.state.booking.weekend,
      start_time: this.props.location.state.booking.start_time,
      end_time: this.props.location.state.booking.end_time,
      appointment_duration: this.props.location.state.booking.appointment_duration,
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
      console.log("hello" + this.state.access_token);
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
        
        doctor,
        date,
        weekend,
        start_time,
        end_time,
        appointment_duration,
        access_token,


    } = this.state;
    const formData = {
        date,
        weekend,
        start_time,
        end_time,
        appointment_duration,
      };
    try {
        const response = await fetch(`http://194.163.40.231:8080/api/BookingSlot/update/${doctor}/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,

        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok && data.message && data.success) {
       // toast.success(data.message);
       window.alert(data.message);
       this.props.history.push('/booking-slot-list'); // Assuming "/doctors" is the route for the doctors page

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
        doctor,
        date,
        weekend,
        start_time,
        end_time,
        appointment_duration,
    } = this.state;
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="EDIT BOOKING SLOT" breadcrumbItems={this.state.breadcrumbItems} />
            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <Form className="needs-validation" method="post" id="tooltipForm" onSubmit={this.handleSubmit}>
                      <Row>
                      <Col md="6">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip01">Doctor ID</Label>
                            <Input type="text" value={doctor} className="form-control" id="validationTooltip01" name="doctor" placeholder="Doctor ID" onChange={this.handleChange} />

                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip01">Date</Label>
                            <Input type="text" value={date} className="form-control" id="validationTooltip01" name="date" placeholder="Date" onChange={this.handleChange} />

                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>

                        
                        
                        
                      </Row>

                      <Row>
                      <Col md="6">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip02">Weekend</Label>
                            <Input type="text" value={weekend} className="form-control" id="validationTooltip02" name="weekend" placeholder="Weekend" onChange={this.handleChange} />
                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>
                      <Col md="6">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip02">Start Time</Label>
                            <Input type="text" value={start_time} className="form-control" id="validationTooltip02" name="start_time" placeholder="Start Time" onChange={this.handleChange} />
                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>
                        
                       
                      </Row>

                      <Row>
                      <Col md="6">
                          <div className="mb-3 position-relative">
                            <Label className="form-label" htmlFor="validationTooltip04">End Time</Label>
                            <Input type="text" value={end_time} className="form-control" id="validationTooltip04" name="end_time" placeholder="End Time" onChange={this.handleChange} />
                            <div className="valid-tooltip">
                              Looks good!
                            </div>
                          </div>
                        </Col>
                        <Col md="6">
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

export default withRouter(EditBooking);
