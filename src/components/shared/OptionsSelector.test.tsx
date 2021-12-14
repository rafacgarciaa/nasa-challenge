import "@testing-library/jest-dom";
import { shallow } from 'enzyme';
import moment from "moment";

import { OptionsSelector } from './OptionsSelector';

test('should render the text "Loading..."', () => {
  const wrapper = shallow(
    <OptionsSelector
      cameras={['FHAZ', 'RHAZ', 'MAST']}
      earthDateSelected={moment('2021-12-14').toDate()}
    />
  );

  expect(wrapper).toMatchSnapshot();

  const buttons = wrapper.find('.btn-group button');
  expect(buttons.length).toBe(4);
});
