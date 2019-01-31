import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (rest.auth.isAuthenticated) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location
              }
            }}
          />
        );
      }
    }}
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(ProtectedRoute);

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   return class extends Component {
//     render() {
//       console.log("rest", rest);

//      if (rest.auth.isAuthenticated) {
//        return
//      }
//     }
//   }
// };

// const withLoginAuthenticated = (WrapperContent) => {

//   return class extends Component {

//       render() {
//           const usrNameCookie = cookies.getCookie('userName');
//           if (usrNameCookie) {
//               return (<WrapperContent {...this.props} ></WrapperContent>)
//           } else {
//               return (<Login></Login>)
//           }
//       }
//   }

// }
