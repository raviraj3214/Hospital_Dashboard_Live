// import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';

// import { logoutUser } from '../../store/actions';

// class Logout extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {  };
//     }

//     componentDidMount() {
     
//         // Fire Action for Remove all Item from localstorage and redirect to login page
//         this.props.logoutUser(this.props.history);
//     }

//     render() {
//         return (
//             <React.Fragment>
//                <h1>&nbsp;</h1>
//             </React.Fragment>
//         );
//     }
// }

// export default withRouter(connect(null,{ logoutUser })(Logout));

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
class Logout extends Component {
  componentDidMount() {
    // Remove data from local storage (e.g., user token)
    const itemsToRemove = ['access_token', 'refresh_token', 'client_id', 'is_admin'];

    // Loop through the array and remove each item
    itemsToRemove.forEach(item => {
      localStorage.removeItem(item);
    });

    
    // Redirect to the login page
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        Logging out...
      </div>
    );
  }
}

export default Logout;
