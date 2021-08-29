import React from 'react';
import { actions } from '../../redux/actions/UsersActions';
import Users from './Users';
import { connect } from 'react-redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/reducers/rootReducer';

let mapStateToProps = (state: AppStateType) => {
  return {
    usersPage: state.usersPage,
    isFollowingProgress: state.usersPage.isFollowingProgress,
    isFetch: state.usersPage.isFetch,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { ...actions }),
  withAuthRedirect,
)(Users);
