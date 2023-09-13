import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody, Container, Table } from "reactstrap";
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import the required icons
import { withRouter } from "react-router-dom";
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

class Holidays extends Component {
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
            showAddForm: false,
            showEditForm: false, // Track whether the add form is visible
            selectedHoliday: null,
            newDoctorId: '',
            newDate: '',
            hospital_id: '',
            holiday_id: '',
        };
    }

    componentDidMount() {
        this.getHolidays();
    }


    getHolidays = async () => {
        try {
            const response = await fetch(
                `http://194.163.40.231:8080/api/BookingSlot/holidays/`
            );
            const data = await response.json();
            this.setState({ data, loading: false });
        } catch (error) {
            console.error("Error fetching data:", error);
            this.setState({ error: "Error fetching data", loading: false });
        }
    };
    handleEdit = (holiday) => {
        this.setState({
            hospital_id: holiday.hospital_id,
            newDoctorId: holiday.doctor,
            newDate: holiday.date,
            holiday_id: holiday.id,
            showEditForm: true,
        });
    };

    submitEdit = async (e, id) => {
        e.preventDefault();
        const {
            newDate,
            newDoctorId,
            hospital_id,
            holiday_id,
            showEditForm,
        } = this.state;
        const formData = {

            doctor: newDoctorId,
            date: newDate,
            hospital_id,

        };
        try {
            const response = await fetch(`http://194.163.40.231:8080/api/BookingSlot/holidays/update/${id}/`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok && data.message && data.success) {
                // toast.success(data.message);
                window.alert(data.message);
                this.getHolidays();
                this.setState({ showEditForm: false, })

            } else {
                // toast.error(data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle any network or other errors here
            // toast.error("An error occurred while processing your request.");
        }
    };
    handleAddHoliday = async (e) => {
        e.preventDefault();

        const { newDoctorId, newDate, hospital_id } = this.state;


        try {
            const response = await fetch(`http://194.163.40.231:8080/api/BookingSlot/holidays/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    hospital_id,
                    doctor: newDoctorId,
                    date: newDate,

                }),
            });

            if (!response.ok) {
                throw new Error("Addition failed");
            }

            this.setState({
                showAddForm: false,
                newDoctorId: '',
                newDate: '',
                hospital_id: '',
            });

            this.getHolidays(); // Refresh the table data
            alert("The holiday has been added.");
        } catch (error) {
            console.error('Addition failed:', error);
            alert("Addition failed");
        }
    };




    handleDeleteDoctor = async (id) => {
        const confirmDelete = window.confirm("Delete this doctor?\nYou won't be able to revert this!");

        if (confirmDelete) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/BookingSlot/holidays/delete/${id}/`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Deletion failed");
                }

                // On successful deletion, fetch updated data and update state
                this.getHolidays(); // Refresh the table data
                alert("The holiday has been deleted.");
            } catch (error) {
                console.error('Deletion failed:', error);
                alert("Deletion failed");
            }
        }
    };

    render() {
        const { data, loading, error, showAddForm, showEditForm, newDoctorId, newDate, hospital_id, holiday_id } = this.state;

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
                        
                    <div className="mb-3 d-flex align-items-center">
            <h5 className="mx-3">Holidays</h5>
            <button
                className="btn btn-primary mb-1" style={{borderRadius:"25px",backgroundColor:"#521552"}}
                onClick={() => this.setState({ showAddForm: true })}
            >
                Add Holiday
            </button>
        </div>
                        <Row>
                            <Col xs={12}>
                                <Card>
                                    <CardBody>
                                        <div className="table-rep-plugin">
                                           
                                            {showAddForm && (
                                                <div className="mb-3">
                                                    <h5>Add New Holiday</h5>
                                                    <form onSubmit={this.handleAddHoliday}>
                                                        <div className="mb-2">
                                                            <Row>
                                                                <Col md="4">
                                                                    <div className="mb-3 position-relative">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Hospital ID"
                                                                            value={hospital_id}
                                                                            onChange={(e) =>
                                                                                this.setState({ hospital_id: e.target.value })
                                                                            }
                                                                        />
                                                                        <div className="valid-tooltip">
                                                                            Looks good!
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col md="4">
                                                                    <div className="mb-3 position-relative">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Doctor ID"
                                                                            value={newDoctorId}
                                                                            onChange={(e) =>
                                                                                this.setState({ newDoctorId: e.target.value })
                                                                            }
                                                                        />
                                                                        <div className="valid-tooltip">
                                                                            Looks good!
                                                                        </div>
                                                                    </div>
                                                                </Col>

                                                                <Col md="4">
                                                                    <div className="mb-3 position-relative">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Date"
                                                                            value={newDate}
                                                                            onChange={(e) =>
                                                                                this.setState({ newDate: e.target.value })
                                                                            }
                                                                        />                            <div className="valid-tooltip">
                                                                            Looks good!
                                                                        </div>
                                                                    </div>
                                                                </Col>

                                                            </Row>
                                                            <Row className="justify-content-center align-items-center">
                                                                <Col md="12"><button type="submit" className="btn btn-primary" style={{borderRadius:"25px",minWidth:"4rem",maxWidth:"6rem",width:"4.5rem"}} onClick={() => this.handleEdit()}>
                                                                    Add
                                                                </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-success mx-2" style={{borderRadius:"25px"}}
                                                                        onClick={() => this.setState({ showAddForm: false })}
                                                                    >
                                                                        Cancel
                                                                    </button></Col>
                                                            </Row>
                                                        </div>

                                                    </form>
                                                </div>
                                            )}
                                            {showEditForm && (
                                                <div className="mb-3">
                                                    <h5>Edit Holiday</h5>
                                                    <form onSubmit={(e) => this.submitEdit(e, holiday_id)}>

                                                        <div className="mb-2">
                                                            <Row>
                                                                <Col md="4">
                                                                    <div className="mb-3 position-relative">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Hospital ID"
                                                                            value={hospital_id}
                                                                            onChange={(e) =>
                                                                                this.setState({ hospital_id: e.target.value })
                                                                            }
                                                                        />
                                                                        <div className="valid-tooltip">
                                                                            Looks good!
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col md="4">
                                                                    <div className="mb-3 position-relative">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Doctor ID"
                                                                            value={newDoctorId}
                                                                            onChange={(e) =>
                                                                                this.setState({ newDoctorId: e.target.value })
                                                                            }
                                                                        />
                                                                        <div className="valid-tooltip">
                                                                            Looks good!
                                                                        </div>
                                                                    </div>
                                                                </Col>

                                                                <Col md="4">
                                                                    <div className="mb-3 position-relative">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Date"
                                                                            value={newDate}
                                                                            onChange={(e) =>
                                                                                this.setState({ newDate: e.target.value })
                                                                            }
                                                                        />                            <div className="valid-tooltip">
                                                                            Looks good!
                                                                        </div>
                                                                    </div>
                                                                </Col>

                                                            </Row>
                                                            <Row className="justify-content-center align-items-center">
                                                                <Col md="12"><button type="submit" className="btn btn-primary" style={{borderRadius:"25px",minWidth:"4rem",maxWidth:"6rem",width:"4.5rem"}}>
                                                                    Save
                                                                </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-success mx-2"
                                                                        onClick={() => this.setState({ showEditForm: false })}
                                                                        style={{borderRadius:"25px",}}
                                                                    >
                                                                        Cancel
                                                                    </button></Col>
                                                            </Row>
                                                        </div>

                                                    </form>
                                                </div>
                                            )}
                                            <div className="table-responsive mb-0" data-pattern="priority-columns">
                                                <Table id="tech-companies-1" bordered responsive>
                                                    <thead>
                                                        <tr>
                                                            <th data-priority="3">Doctor ID</th>
                                                            <th data-priority="1">Date</th>
                                                            <th data-priority="1">Actions</th>

                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {data?.map((p) => (
                                                            <tr key={p.doctor}>
                                                                <th>{p.doctor}</th>
                                                                <th>{p.date}</th>


                                                                <td>
                                                                    <FaEdit style={{ color: "purple" }}
                                                                        className="cursor-pointer "
                                                                        onClick={() => this.handleEdit(p)}
                                                                    />
                                                                    <FaTrashAlt style={{ color: "red" }}
                                                                        className="cursor-pointer mx-2 "
                                                                        onClick={() => this.handleDeleteDoctor(p.id)}
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
export default withRouter(Holidays);
