import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Profile from './Profile';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { actions } from '../../redux/actions/ProfileActions';
import { AppStateType } from '../../redux/reducers/rootReducer';
import { getCurrentUser, getStatus } from '../../redux/selectors/profile-selectors';

let mapStateToProps = (state: AppStateType) => {
  return {
    currentUser: getCurrentUser(state),
    status: getStatus(state),
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { ...actions }),
  withAuthRedirect,
)(Profile);
