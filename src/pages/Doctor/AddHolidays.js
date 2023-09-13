import React, { Component } from "react";
import { Row, Col, Card, CardBody, FormGroup, Button, Label, Input, Container, InputGroup, Form } from "reactstrap";
import { toast } from 'react-toastify'; // Import toast from react-toastify

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
class AddHolidays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Forms", link: "#" },
        { title: "Form Mask", link: "#" },
      ],
    
      patient_id: '', 
      doctor_id: '',
      appointment_date: '', 
      appointment_time: '',
      status: '',
      reason: '',
      location: '',
      reminders: '',
    };
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
       
    } = this.state;
    const formData = {
        
        doctor,
        date,
      };
    try {
        const response = await fetch(`http://194.163.40.231:8080/api/BookingSlot/holidays/create/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok && data.message && data.appointment) {
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
        doctor,
        date,
        
    } = this.state;
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Add Appointment" breadcrumbItems={this.state.breadcrumbItems} />
            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <Form className="needs-validation" method="post" id="tooltipForm" onSubmit={this.handleSubmit}>
                      <Row>
                        <Col md="4">
                          <div className="mb-3 position-relative">
                            <Label className="form-label"  htmlFor="validationTooltip01">Patient ID</Label>
                            <Input type="text" className="form-control" id="validationTooltip01" value={patient_id} name="first_name" placeholder="First Name" onChange={this.handleChange} />

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
                            <Label className="form-label" htmlFor="validationTooltip01">Date</Label>
                            <Input type="text" value={date} className="form-control" id="validationTooltip01" name="date" placeholder="Date" onChange={this.handleChange} />

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

export default AddHolidays;
