import { render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ProfileStatus from '../components/Profile/ProfileStatus';
import { initialState, ProfileReducer } from '../redux/reducers/ProfileReducer';
import '@testing-library/jest-dom/extend-expect';

const render = (
  ui: JSX.Element,
  {
    initialState: InitialStateType = initialState,
    store = createStore(ProfileReducer, initialState),
    ...renderOptions
  } = {},
) => {
  const Wrapper = ({ children }: any) => <Provider store={store}>{children}</Provider>;

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

describe('<ProfileStatus/>', () => {
  test('after creation <span> should be displayed', () => {
    render(<ProfileStatus status={'new text'} />);
    expect(screen.getByTestId('profile-status-span')).toBeTruthy();
  });

  test('after double click should be displayed input', () => {
    render(<ProfileStatus status={'new text'} />);
    userEvent.dblClick(screen.getByTestId('profile-status-span'));
    expect(screen.getByTestId('profile-status-input')).toBeTruthy();
  });

  test('after double click text should be correct', () => {
    render(<ProfileStatus status={'new text'} />);
    userEvent.dblClick(screen.getByTestId('profile-status-span'));
    const input = screen.getByTestId('profile-status-input') as HTMLInputElement;
    expect(input.value).toEqual('new text');
  });
});
