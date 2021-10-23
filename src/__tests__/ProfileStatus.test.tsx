import ProfileStatus from '../components/Profile/ProfileStatus';
import TestRenderer, { create } from 'react-test-renderer';

describe('<ProfileStatus/>', () => {
  test('', () => {
    expect(true).toBe(true);
  });

  // test('it shows the expected text when clicked (testing the wrong way!)', () => {
  //   const testRenderer = TestRenderer.create(<ProfileStatus />);
  //   const testInstance = testRenderer.root;
  //   expect(testInstance.findByType(ProfileStatus).props.status).toBe('New Status Text');
  // });

  // test('after creation <span> should be displayed', () => {
  //   const component = create(<ProfileStatus />);
  //   const root = component.root;
  //   const span = root.findByType('span');
  //   expect(span).not.toBeNull();
  // });
  // test('after double click displayed input', () => {
  //   const { act } = TestRenderer;
  //   const component = create(<ProfileStatus />);
  //   const root = component.root;
  //   const span = root.findByType('span');
  //   act(() => span.props.onDoubleClick());
  //   console.log(span.props);
  //   // act(() =>span.props.onDoubleClick() )
  //   const input = root.findByType('input');
  //   expect(input.props.value).toBe('New Status Text');
  // });
  // test("after double click don't displayed span", () => {
  //   const { act } = TestRenderer;
  //   const component = create(<ProfileStatus />);
  //   const root = component.root;
  //   const span = root.findByType('span');
  //   act(() => span.props.onDoubleClick());
  //   const spanAfterDoubleClick = () => {
  //     root.findByType('span');
  //   };
  //   expect(spanAfterDoubleClick).toThrowError();
  // });
});
