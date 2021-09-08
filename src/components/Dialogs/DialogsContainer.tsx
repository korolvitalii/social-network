import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Dialogs from './Dialogs';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { actions } from '../../redux/actions/MessagesActions';
import { AppStateType } from '../../redux/reducers/rootReducer';
import { getDialogs, getMessages } from '../../redux/selectors/dialogs';

let mapStateToProps = (state: AppStateType) => {
  return {
    dialogs: getDialogs(state),
    messages: getMessages(state),
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { ...actions }),
  withAuthRedirect,
)(Dialogs);
