import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../redux/reducers/rootReducer';

type PropsType = {};

type MapPropsType = {
  isAuth: boolean;
};

type DispatchPropsType = {};

let mapStateToPropsForRedirect = (state: AppStateType) =>
  ({
    isAuth: state.auth.isAuth,
  } as MapPropsType);

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    const { isAuth, ...restProps } = props;
    if (!isAuth) return <Redirect to='/login' />;
    return <WrappedComponent {...(restProps as WCP)} />;
  };
  let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(
    mapStateToPropsForRedirect,
    {},
  )(RedirectComponent);

  return ConnectedAuthRedirectComponent;
}

export default withAuthRedirect;
