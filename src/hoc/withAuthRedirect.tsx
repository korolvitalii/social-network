import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../redux/reducers/rootReducer';

interface MapPropsInterface {
  isAuth: boolean;
}

type DispatchPropsType = {};

const mapStateToPropsForRedirect = (state: AppStateType) =>
  ({
    isAuth: state.auth.isAuth,
  } as MapPropsInterface);

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<MapPropsInterface & DispatchPropsType> = (props) => {
    const { isAuth, ...restProps } = props;
    if (!isAuth) return <Redirect to='/login' />;
    return <WrappedComponent {...(restProps as WCP)} />;
  };
  const ConnectedAuthRedirectComponent = connect<
    MapPropsInterface,
    DispatchPropsType,
    WCP,
    AppStateType
  >(
    mapStateToPropsForRedirect,
    {},
  )(RedirectComponent);

  return ConnectedAuthRedirectComponent;
}

export default withAuthRedirect;
