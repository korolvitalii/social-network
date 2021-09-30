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
  getTerm,
} from '../../redux/selectors/user-selectors';
import { UserType } from '../../types/types';
import { actions as errorAction } from '../../redux/actions/ErrorsActions';
import { getErrors } from '../../redux/selectors/profile-selectors';

type MapStateToPropsType = {
  users: Array<UserType>;
  pageSize: number;
  pagesCount: number;
  isFollowingProgress: boolean;
  isFetch: boolean;
  errors: string;
  term: string;
};

type MapDispatchToPropsType = {
  toggleFollowUnfollow: (id: number) => void;
  setUsers: (items: Array<UserType>) => void;
  getTotalCount: (totalCount: number) => void;
  setPagesCount: (totalCount: number, pageSize: number) => void;
  isFetchData: (isFetch: boolean) => void;
  toggleFollowingProgress: (isFollowingProgress: boolean) => void;
  resetError: () => void;
};

type OwnPropsType = {};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    pagesCount: getPagesCount(state),
    isFollowingProgress: getIsFollowingProgress(state),
    isFetch: getIsFetch(state),
    errors: getErrors(state),
    term: getTerm(state),
  };
};

export default compose<React.ComponentType>(
  connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    { ...actions, ...errorAction },
  ),
  withAuthRedirect,
)(Users);
