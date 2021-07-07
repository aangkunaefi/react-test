import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
import UserForm from './UserForm';
import { Form } from 'react-bootstrap';

jest.setTimeout(30000);
Enzyme.configure({ adapter: new Adapter() });

describe('<UserForm />', () => {
  it('Contains three <Form.Control /> components', () => {
    const wrapper = shallow(<UserForm />);
    expect(wrapper.find(Form.Control)).to.have.length(3);
  });
});