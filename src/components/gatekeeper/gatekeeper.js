import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authenticateUser } from '../../actions';

const appK = 'com.herokuapp.djorg-fwcdga48i';

export default ComposedComponent => {
  class CheckAuthentication extends Component {
    componentWillMount() {
      if (!localStorage.getItem(appK)) {
        // window.alert('Please log in first');
        this.props.history.push('/login');
      }

      if (!this.props.user) {
        const username = localStorage.getItem(appK + ',user');

        if (username) {
          this.props.authenticateUser(username);
        } else {
          this.props.history.push('/login');
        }
      }
    }

    render() {
      return (
        <div className="CheckAuthentication">
          {localStorage.getItem(appK) ? (
            <ComposedComponent history={this.props.history} />
          ) : null}
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      user: state.auth.user,
    };
  };

  return connect(mapStateToProps, { authenticateUser })(CheckAuthentication);
};
