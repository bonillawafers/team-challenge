import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import sinon from 'sinon';
import SignUpForm from './TeamSignUp';
import { EmailInput, BirthdayInput, PasswordConfirmationInput, RequiredInput } from './TeamSignUp';
import { shallow, mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('<EmailInput />', () => {
  var wrapper;

  it('should show required error message if left blank', () => {
    wrapper = shallow(<EmailInput value="" />);
    const input = wrapper.find('.error-missing');
    expect(input.text()).toEqual("we need to know your email address");
  })

  it('should show invalid error message if invalid input', () => {
    wrapper = shallow(<EmailInput value="blah" />);
    const input = wrapper.find('.error-invalid');
    expect(input.text()).toEqual("this is not a valid email address");
  })

  it('should not show error message if input is valid', () => {
    wrapper = shallow(<EmailInput value="hi@hi.com" />);
    const input = wrapper.find('.form-control');
    expect(input.text()).toEqual("");
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

  it('should not show error message if person is old enough', () => {
    wrapper = shallow(<EmailInput value="1995-09-06" />);
    const input = wrapper.find('.form-control');
    expect(input.text()).toEqual("");
  })
})

it('should show not old enough message if under 13', () => {

});

describe('handleReset', () => {

  it('should clear all input fields when reset is clicked', () => {
    const wrapper = mount(<SignUpForm />);
    const button = wrapper.find('#resetButton');
    button.simulate('click');
    var stateEmail = wrapper.state('email');
    var stateName = wrapper.state('name');
    var stateDOB = wrapper.state('dob');
    var statePassword = wrapper.state('password');
    var statePassConf = wrapper.state('passwordConf');
    expect(stateEmail.value).toEqual('');
    expect(stateName.value).toEqual('');
    expect(stateDOB.value).toEqual('');
    expect(statePassword.value).toEqual('');
    expect(statePassConf.value).toEqual('');
  });

});


describe('handleSubmit', () => {
  const wrapper = mount(<SignUpForm />);

  it('should not create an alert window when not clicked', () => {
    expect(wrapper.state('alert')).toEqual(false);
  })

  it('should create an alert window when clicked', () => {
    const button = wrapper.find('#submitButton');
    wrapper.find('#name').simulate('change', { target: { value: 'Anything' } });
    wrapper.find('#password').simulate('change', { target: { value: 'Anything' } });
    wrapper.find('EmailInput input').simulate('change', { target: { value: 'l@l.com' } });
    wrapper.find('PasswordConfirmationInput input').simulate('change', { target: { value: 'Anything' } });
    wrapper.find('BirthdayInput input').simulate('change', { target: { value: '1995-10-22' } });
    button.simulate('click');
    expect(wrapper.state('alert')).toEqual(true);
  })
});

describe('handleButton', () => {

  it('should not be clickable with valid fields', () => {
    const wrapper = mount(<SignUpForm />);
    const button = wrapper.find('#submitButton');

    expect(button.props().disabled).toEqual(true);
  });

  it('should be clickable with valid fields', () => {

    const wrapper = mount(<SignUpForm />);
    const button = wrapper.find('#submitButton');

    wrapper.find('#name').simulate('change', { target: { value: 'Anything' } });
    wrapper.find('#password').simulate('change', { target: { value: 'Anything' } });
    wrapper.find('EmailInput input').simulate('change', { target: { value: 'l@l.com' } });
    wrapper.find('PasswordConfirmationInput input').simulate('change', { target: { value: 'Anything' } });
    wrapper.find('BirthdayInput input').simulate('change', { target: { value: '1995-10-22' } });
    expect(button.props().disabled).toEqual(false);
  });

})


describe('password fields', () => {
  it('should show password mismatch error if password and password confirmation fields match', () => {
    const wrapper = shallow(<RequiredInput value="hello" type="password" />);
    const wrapperPasswordConf = shallow(<PasswordConfirmationInput value="hello1" />);
    const input = wrapperPasswordConf.find('.error-mismatched');
    expect(input.text()).toEqual("passwords don't match");
  });

});

describe('<RequiredInput /> component', () => {
  var wrapper;
  it('should show required error message if left blank', () => {
    wrapper = shallow(<RequiredInput value="" errorMessage="we need to know your name" />);
    expect(wrapper.containsMatchingElement(<p className="help-block error-missing">we need to know your name</p>)).toEqual(true);
    const input = wrapper.find('.error-missing');
    expect(input.text()).toEqual("we need to know your name");
  });

  it('should not show required error message if input has value', () => {
    wrapper = mount(<RequiredInput value="John Doe" errorMessage="we need to know your name" />);
    expect(wrapper.containsMatchingElement(<p className="help-block error-missing">we need to know your name</p>)).toEqual(false);
  });

});

