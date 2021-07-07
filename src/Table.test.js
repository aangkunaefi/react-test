import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
 
import Table from './Table';
import UserForm from './UserForm';
import { Button } from 'react-bootstrap';

jest.setTimeout(30000);
Enzyme.configure({ adapter: new Adapter() });

describe('<Table />', () => {
  it('Renders one <UserForm /> components', () => {
    const wrapper = shallow(<Table />);
    expect(wrapper.find(UserForm)).to.have.length(1);
  });
  
  it('Simulates button add click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(<Table onButtonClick={onButtonClick} />);
    wrapper.find(Button).simulate('click');
    expect(wrapper.find(UserForm).prop('visibility')).to.equal(true);
  });
});