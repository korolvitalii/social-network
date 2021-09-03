import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Profile from './Profile';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { actions } from '../../redux/actions/ProfileActions';
import { AppStateType } from '../../redux/reducers/rootReducer';

let mapStateToProps = (state: AppStateType) => {
  return {
    profilePage: state.profilePage,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { ...actions }),
  withAuthRedirect,
)(Profile);
