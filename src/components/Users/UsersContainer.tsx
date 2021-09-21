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
import { UserType } from '../../types/types';

type MapStateToPropsType = {
  users: Array<UserType>;
  pageSize: number;
  pagesCount: number;
  isFollowingProgress: boolean;
  isFetch: boolean;
};

type MapDispatchToPropsType = {
  toggleFollowUnfollow: (id: number) => void;
  setUsers: (items: Array<UserType>) => void;
  getTotalCount: (totalCount: number) => void;
  setPagesCount: (totalCount: number, pageSize: number) => void;
  isFetchData: (isFetch: boolean) => void;
  toggleFollowingProgress: (isFollowingProgress: boolean) => void;
};

type OwnPropsType = {};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    pagesCount: getPagesCount(state),
    isFollowingProgress: getIsFollowingProgress(state),
    isFetch: getIsFetch(state),
  };
};

export default compose<React.ComponentType>(
  connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    { ...actions },
  ),
  withAuthRedirect,
)(Users);
