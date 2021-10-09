import { fireEvent, render } from '@testing-library/react';
import TestRenderer, { create } from 'react-test-renderer';
import LoginForm from '../components/Login/LoginForm';

describe('<ProfileStatus/>', () => {
  test('should display a blank login form, with remember me checked', () => {
    const component = create(<LoginForm captcha={null} dispatch={undefined} />);
    const root = component.root;
    const inputs = root.findAllByType('input');
    expect(inputs.length).toBe(3);
  });

  test('should display corrent inputs', () => {
    const component = create(<LoginForm captcha={null} dispatch={undefined} />);
    const root = component.root;
    const inputs = root.findAllByType('input');
    const buttons = root.findAllByType('button');
    expect(inputs[0].props.placeholder).toBe('Email address');
    expect(inputs[1].props.type).toBe('password');
    expect(inputs[2].props.type).toBe('checkbox');
    expect(buttons[0].props.type).toBe('submit');
  });

  test('after click should display a blank login form, with remember me checked ', () => {
    const { getByTestId } = render(<LoginForm captcha={null} dispatch={undefined} />);
    const checkbox = getByTestId('login_form_checkbox');
    console.log(checkbox.click());
    checkbox.click();
    // expect(checkbox.checked).toBeTruthy();
  });
});
