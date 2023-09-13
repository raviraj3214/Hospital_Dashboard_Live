import React, { Component } from "react";
import { Link } from "react-router-dom"; 
import { Row, Col, Card, CardBody, Container, Table } from "reactstrap";
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import the required icons
import { withRouter } from "react-router-dom";
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

class BookingSlotList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Tables", link: "#" },
                { title: "Responsive Table", link: "#" },
            ],
            data: null,
            loading: true,
            error: null,
            client_id:"",
            access_token:"",
        };
    }

    // componentDidMount() {
    //     this.getBookingSlotList();
    // }
    componentDidMount() {
        // const { sortOrder } = this.state; // You're not using client_id from state, so no need to destructure it here.
       
        const access = JSON.parse(localStorage.getItem('access_token'));
        const id = JSON.parse(localStorage.getItem('client_id'));
        if (access) {
          this.setState({ access_token: access });
          //console.log("hello" + this.state.access_token);
          this.setState({ client_id: id }, () => {
            this.getBookingSlotList();
          });
}

       }

    getBookingSlotList = async () => {
        const acces = this.state.access_token;

        try {
            const response = await fetch(
                "http://194.163.40.231:8080/api/BookingSlot/list/"
            );
            const data = await response.json();
            this.setState({ data, loading: false });
        } catch (error) {
            console.error("Error fetching data:", error);
            this.setState({ error: "Error fetching data", loading: false });
        }
    };

    
    handleEdit = (booking) => {
        // Redirect to the edit page with the appointment data as a URL parameter
        this.props.history.push(`/edit-booking-slot/${booking.booking_id}`, { booking });
    };

    
    handleDeleteBooking = async (booking_id) => {
        const confirmDelete = window.confirm("Delete this doctor?\nYou won't be able to revert this!");

        if (confirmDelete) {
            try {
                const response = await fetch(`http://194.163.40.231:8080/api/BookingSlot/delete/${booking_id}/`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${this.state.access_token}`,

                    },
                });

                if (!response.ok) {
                    throw new Error("Deletion failed");
                }

                // On successful deletion, fetch updated data and update state
                this.getBookingSlotList(); // Refresh the table data
                alert("The doctor has been deleted.");
            } catch (error) {
                console.error('Deletion failed:', error);
                alert("Deletion failed");
            }
        }
    };

    render() {
        const { data, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>{error}</div>;
        }
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="Booking Slot List" breadcrumbItems={this.state.breadcrumbItems} />
                        <Row>
                            <Col xs={12}>
                                <Card>
                                    <CardBody>
                                        <div className="table-rep-plugin">
                                            <div className="table-responsive mb-0" data-pattern="priority-columns">
                                                <Table id="tech-companies-1" bordered responsive>
                                                    <thead>
                                                        <tr>
                                                            <th> Booking ID</th>
                                                            <th data-priority="3">Doctor ID</th>
                                                            <th data-priority="1">Date</th>
                                                            <th data-priority="3">Weekend</th>
                                                            <th data-priority="3">Start Time</th>
                                                            <th data-priority="6">End Time</th>
                                                            <th data-priority="6">Appointment Duration</th>
                                                            <th data-priority="6">Created At</th>
                                                            <th data-priority="6">Updated At</th>
                                                            <th data-priority="6">Actions</th> {/* Added a new column for actions */}
                                                        </tr>
                                                    </thead>
                                                
                                                    <tbody>
                                                        {data.data?.map((p) => (
                                                            <tr key={p.booking_id}>
                                                                <th>{p.booking_id}</th>
                                                                <th>{p.doctor}</th>
                                                                <td>{p.date}</td>
                                                                <td>{p.weekend}</td>
                                                                <td>{p.start_time}</td>
                                                                <td>{p.end_time}</td>
                                                                <td>{p.appointment_duration}</td>
                                                                <td>{p.created_at}</td>
                                                                <td>{p.updated_at}</td>
                                                                
                                                                <td>
                                                                <FaEdit style={{ color: "purple" }}
                                                                    className="cursor-pointer "
                                                                    onClick={() => this.handleEdit(p)}
                                                                />
                                                                <FaTrashAlt style={{ color: "red" }}
                                                                    className="cursor-pointer mx-2 "
                                                                    onClick={() => this.handleDeleteBooking(p.booking_id)} 
                                                                />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
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
export default withRouter(BookingSlotList);
