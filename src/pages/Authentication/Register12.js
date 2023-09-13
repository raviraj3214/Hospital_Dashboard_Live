// import React, { Component } from "react";
// import { Row, Col, Button, Alert, Container, Label } from "reactstrap";
// import { AvForm, AvField } from "availity-reactstrap-validation";
// import { Link } from "react-router-dom";
// import logodark from "../../assets/images/logo-dark.png";

// class Register12 extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       name: "",
//       email: "",
//       password: "",
//       password2: "",
//       contactNumber: "",
//       loading: false, // Add loading state for the button
//     };

//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }

//   handleSubmit(e) {
//     e.preventDefault();

//     const {
//       name,
//       email,
//       password,
//       password2,
//       contactNumber,
//     } = this.state;

//     // Add loading state to show "Loading ..." on the button while submitting
//     this.setState({ loading: true });

//     fetch("http://194.163.40.231:8080/api/user/register/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         name,
//         password,
//         password2,
//         contact_number: contactNumber,
//       }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           return response.json().then((data) => {
//             throw new Error(data.message);
//           });
//         }
//         window.alert("Registration Sucessfull")
//         return response.json();
//       })
//       .then((data) => {
//         if (data.message && data.success) {
//           // Registration success
//           this.setState({ loading: false }); // Set loading state to false after successful registration
//           // Do something after successful registration
//           // For example, navigate to the login page
//           // using this.props.history.push("/login");
//         } else if (data.success !== true && data.email && data.contact_number) {
//           // Registration failed due to duplicate email and contact number
//           this.setState({ loading: false }); // Set loading state to false after failed registration
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         this.setState({ loading: false }); // Set loading state to false on error
//       });
//   }

//   render() {
//     const {
//       name,
//       email,
//       password,
//       password2,
//       contactNumber,
//       loading,
//     } = this.state;

//     return (
//       <React.Fragment>
//         <div>
//           <Container fluid className="p-0">
//             <Row className="g-0">
//               <Col lg={4}>
//                 <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
//                   <div className="w-100">
//                     <Row className="justify-content-center">
//                       <Col lg={9}>
//                         <div>
//                           <div className="text-center">
//                            {/* <div>
//                               <Link to="#" className="logo">
//                                 <img src={`../../assets/images/Dtroffle_icon.png`} style={{height:"100px",width:"100px",opacity:"1",Zindex:"1",}} alt="logo" />
//                               </Link>
//     </div>*/}

//                             <h4 className="font-size-18 mt-4">Register account</h4>
//                             <p className="text-muted">
//                             </p>
//                           </div>

//                           {this.props.user && (
//                             <Alert color="success">
//                               Registration Done Successfully.
//                             </Alert>
//                           )}

//                           {this.props.registrationError && (
//                             <Alert color="danger">
//                               {this.props.registrationError}
//                             </Alert>
//                           )}

//                           <div className="p-2 mt-5">
//                             <AvForm
//                               onValidSubmit={this.handleSubmit}
//                               className="form-horizontal"
//                             >
//                               <div className="auth-form-group-custom mb-4">
//                                 <i className="ri-user-2-line auti-custom-input-icon"></i>
//                                 <Label htmlFor="username">Name</Label>
//                                 <AvField
//                                   name="name"
//                                   value={name}
//                                   onChange={this.handleChange}
//                                   type="text"
//                                   className="form-control"
//                                   id="username"
//                                   placeholder="Enter username"
//                                 />
//                               </div>
//                               <div className="auth-form-group-custom mb-4">
//                                 <i className="ri-mail-line auti-custom-input-icon"></i>
//                                 <Label htmlFor="useremail">Email</Label>
//                                 <AvField
//                                   name="email"
//                                   value={email}
//                                   onChange={this.handleChange}
//                                   validate={{ email: true, required: true }}
//                                   type="email"
//                                   className="form-control"
//                                   id="useremail"
//                                   placeholder="Enter email"
//                                 />
//                               </div>
//                               <div className="auth-form-group-custom mb-4">
//                                 <i className="ri-lock-2-line auti-custom-input-icon"></i>
//                                 <Label htmlFor="userpassword">Password</Label>
//                                 <AvField
//                                   name="password"
//                                   value={password}
//                                   onChange={this.handleChange}
//                                   type="password"
//                                   className="form-control"
//                                   id="userpassword"
//                                   placeholder="Enter password"
//                                 />
//                               </div>
//                               <div className="auth-form-group-custom mb-4">
//                                 <i className="ri-lock-2-line auti-custom-input-icon"></i>
//                                 <Label htmlFor="userpassword">Confirm Password</Label>
//                                 <AvField
//                                   name="password2"
//                                   value={password2}
//                                   onChange={this.handleChange}
//                                   type="password"
//                                   className="form-control"
//                                   id="userpassword"
//                                   placeholder="Enter password"
//                                 />
//                               </div>
//                               <div className="auth-form-group-custom mb-4">
//                                 <i className="ri-lock-2-line auti-custom-input-icon"></i>
//                                 <Label htmlFor="userpassword">Contact Number</Label>
//                                 <AvField
//                                   name="contactNumber"
//                                   value={contactNumber}
//                                   onChange={this.handleChange}
//                                   type="text"
//                                   className="form-control"
//                                   id="userpassword"
//                                   placeholder="Enter password"
//                                 />
//                               </div>

//                               <div className="text-center">
//                                 <Button
//                                   color="primary"
//                                   className="w-md waves-effect waves-light"
//                                   type="submit"
//                                   disabled={loading} // Disable the button when loading is true
//                                 >
//                                   {loading ? "Loading ..." : "Register"}
//                                 </Button>
//                               </div>

                              
//                             </AvForm>
//                           </div>

//                           <div className="mt-5 text-center">
//                             <p>
//                               Already have an account ?{" "}
//                               <Link to="/login" className="fw-medium text-primary">
//                                 {" "}
//                                 Login
//                               </Link>{" "}
//                             </p>
                            
//                           </div>
//                         </div>
//                       </Col>
//                     </Row>
//                   </div>
//                 </div>
//               </Col>
//               <Col lg={8}>
//                 <div className="authentication-bg">
//                   <div className="bg-overlay"></div>
//                 </div>
//               </Col>
//             </Row>
//           </Container>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default Register12;
