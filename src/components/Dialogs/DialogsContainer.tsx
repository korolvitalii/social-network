import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Dialogs from './Dialogs';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { actions } from '../../redux/actions/MessagesActions';
import { AppStateType } from '../../redux/reducers/rootReducer';
import { getDialogs, getMessages } from '../../redux/selectors/dialogs';
import { DialogType, MessageType } from '../../types/types';

type MapStateToPropsType = {
  dialogs: Array<DialogType>;
  messages: Array<MessageType>;
};

type MapDispatchToPropsType = {
  addNewMessage: (newMessage: MessageType) => void;
};

type OwnPropsType = {};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    dialogs: getDialogs(state),
    messages: getMessages(state),
  };
};

export default compose<React.ComponentType>(
  connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    {
      ...actions,
    },
  ),
  withAuthRedirect,
)(Dialogs);
