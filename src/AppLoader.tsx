import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

export const render = (element: HTMLElement): void => {
  ReactDOM.render(<App />, element);
};
