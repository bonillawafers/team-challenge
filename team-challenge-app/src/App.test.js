import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('email form', () => {
  it('should show required error message if left blank', () => {
    const wrapper = shallow(<App />);
    const input = wrapper.find('.help-block error-missing');
    input.simulate('change', {target:{value:''}})
  })

  it('should show invalid error message if invalid input', () => {

  })

  it('should not show error message if input is valid', () => {

  })
})

describe('birthdate form', () => {
  it('should show required error message if left blank', () => {

  })

  it ('should show invalid date message if invalid date', () => {

  })

  it ('should show not old enough message if under 13', () => {

  })
})
