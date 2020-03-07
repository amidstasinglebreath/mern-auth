import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
  
class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;
return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged{" "}
                <span style={{ fontFamily: "monospace" }}>Giphychat</span> app 👏
              </p>
            </h4>
             {/* link to chat application */}
             <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name} & room=${room}`}>
                <button className="button mt-20" type="submit">Join</button>
            </Link>            
            </div>
            <div className="loginImage">
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
          <div className="loginImage">
              {/* <img src = "https://i.picsum.photos/id/101/200/300.jpg"></img> */}
              <img className = "mac" src = {mac13}></img>
          </div> 
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);