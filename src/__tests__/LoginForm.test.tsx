import { fireEvent, render } from '@testing-library/react';
import TestRenderer, { create } from 'react-test-renderer';
import LoginForm from '../components/Login/LoginForm';

describe('<ProfileStatus/>', () => {
  test('should display a blank login form, with remember me checked', () => {
    const component = create(<LoginForm captcha={null} dispatch={undefined} />);
    const root = component.root;
    const inputs = root.findAllByType('input');
    expect(inputs.length).toBe(4);
  });

  test('should display corrent inputs', () => {
    const component = create(<LoginForm captcha={null} dispatch={undefined} />);
    const root = component.root;
    const inputs = root.findAllByType('input');
    expect(inputs[0].props.placeholder).toBe('Email');
    expect(inputs[1].props.type).toBe('password');
    expect(inputs[2].props.type).toBe('checkbox');
    expect(inputs[3].props.type).toBe('submit');
  });

  test('after click should display a blank login form, with remember me checked ', () => {
    const { getByTestId } = render(<LoginForm captcha={null} dispatch={undefined} />);
    const checkbox = getByTestId('login_form_checkbox');
    checkbox.click();
    expect(checkbox.checked).toBeTruthy();
  });
});
