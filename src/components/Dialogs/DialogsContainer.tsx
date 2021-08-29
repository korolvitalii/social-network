import React from 'react';
import { actions } from '../../redux/actions/MessagesActions';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/reducers/rootReducer';

let mapStateToProps = (state: AppStateType) => {
  return {
    messagePage: state.messagesPage,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { ...actions }),
  withAuthRedirect,
)(Dialogs);
