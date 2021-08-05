import ReactDOM from 'react-dom';

import App from './App';
import { state } from '../src/redux/state';

export const render = (element: HTMLElement): void => {
  ReactDOM.render(<App state={state} />, element);
};
