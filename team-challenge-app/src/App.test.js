import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { EmailInput, BirthdayInput } from './TeamSignUp';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('<EmailInput />', () => {
  var wrapper;

  it('should show required error message if left blank', () => {
    wrapper = shallow(<EmailInput value="" />);
    const input = wrapper.find('.error-missing');
    console.log(wrapper.html());
    expect(input.text()).toEqual("we need to know your email address");
  })

  it('should show invalid error message if invalid input', () => {
    wrapper = shallow(<EmailInput value="blah" />);
    const input = wrapper.find('.error-invalid');
    expect(input.text()).toEqual("this is not a valid email address");
  })

  it('should not show error message if input is valid', () => {
    wrapper = shallow(<EmailInput value="hi@hi.com" />);

  })
})

describe('<BirthdayInput />', () => {
  var wrapper;
  it('should show required error message if left blank', () => {
    wrapper = shallow(<BirthdayInput value="" />);
    const input = wrapper.find('.error-missing');
    expect(input.text()).toEqual("we need to know your birthdate");
  })

  it('should show invalid date message if invalid date', () => {
    wrapper = shallow(<BirthdayInput value="blah" />);
    const input = wrapper.find('.error-invalid');
    expect(input.text()).toEqual("that isn't a valid date");
  })

  it('should show not old enough message if under 13', () => {
    wrapper = shallow(<BirthdayInput value="2015-09-06" />);
    const input = wrapper.find('.error-not-old');
    expect(input.text()).toEqual("sorry, you must be at least 13 to sign up");
  })
})
