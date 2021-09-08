import React from 'react';
import { actions } from '../../redux/actions/UsersActions';
import Users from './Users';
import { connect } from 'react-redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/reducers/rootReducer';
import {
  getIsFetch,
  getIsFollowingProgress,
  getPagesCount,
  getPageSize,
  getUsers,
} from '../../redux/selectors/user-selectors';

let mapStateToProps = (state: AppStateType) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    pagesCount: getPagesCount(state),
    isFollowingProgress: getIsFollowingProgress(state),
    isFetch: getIsFetch(state),
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { ...actions }),
  withAuthRedirect,
)(Users);
