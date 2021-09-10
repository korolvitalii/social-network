import ProfileStatus from '../components/Profile/ProfileStatus';
import TestRenderer, { create } from 'react-test-renderer';

describe('<ProfileStatus/>', () => {
  test('it shows the expected text when clicked (testing the wrong way!)', () => {
    const testRenderer = TestRenderer.create(<ProfileStatus status='New Status Text' />);
    const testInstance = testRenderer.root;
    expect(testInstance.findByType(ProfileStatus).props.status).toBe('New Status Text');
  });

  test('after creation <span> should be displayed', () => {
    const component = create(<ProfileStatus status='New Status Text' />);
    const root = component.root;
    const span = root.findByType('span');
    expect(span).not.toBeNull();
  });

  test('after creation span text should be correct', () => {
    const component = create(<ProfileStatus status='New Status Text' />);
    const root = component.root;
    const span = root.findByType('span');
    expect(span.children[0]).toBe('New Status Text');
  });

  test('after double click displayed input', () => {
    const { act } = TestRenderer;
    const component = create(<ProfileStatus status='New Status Text' />);
    const root = component.root;
    const span = root.findByType('span');
    act(() => span.props.onDoubleClick());
    const input = root.findByType('input');
    expect(input.props.value).toBe('New Status Text');
  });

  test("after double click don't displayed span", () => {
    const { act } = TestRenderer;
    const component = create(<ProfileStatus status='New Status Text' />);
    const root = component.root;
    const span = root.findByType('span');
    act(() => span.props.onDoubleClick());
    const spanAfterDoubleClick = () => {
      root.findByType('span');
    };
    expect(spanAfterDoubleClick).toThrowError();
  });
});
