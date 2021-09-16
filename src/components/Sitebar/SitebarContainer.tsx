import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Sitebar from './Sitebar';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { AppStateType } from '../../redux/reducers/rootReducer';

const mapStateToProps = (state: AppStateType) => {
  return {};
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, {}),
  withAuthRedirect,
)(Sitebar);
