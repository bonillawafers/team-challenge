import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import sinon from 'sinon';
import {SignUpForm, EmailInput, BirthdayInput, PasswordConfirmationInput, RequiredInput} from './TeamSignUp';
import {shallow, mount} from 'enzyme';

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

  it ('should show not old enough message if under 13', () => {
    //  const handleChangePassSpy = sinon.spy(PasswordInput.prototype, 'handleChange')
    //  const handleChangePassConfSpy = sinon.spy(PasswordConfirmationInput.prototype, 'handleChange')

    //  input.simulate('change', {target: {value:'hello'}});
    //  passConfInput.simulate('change', {target: {value:'hello'}});

    // expect(handleChangePassSpy.getCall(0).args[0]).toEqual('hello');
    // expect(handleChangePassConfSpy.getCall(0).args[0]).toEqual('hello');
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

//me

describe('password fields', () => {
  it('should not show password mismatch error if password and password confirmation fields match', () => {

    const wrapper = shallow(<RequiredInput value="hello" type="password"/>);
    console.log(wrapper.html());
    const wrapperPasswordConf = shallow(<PasswordConfirmationInput value ="hello" />);

    // const passConfInput = wrapperPasswordConf.find('input');    
    // const input = wrapper.find('input');
    // console.log(wrapper.html());
    // const errorText = wrapper.find('.error-missing');
    // console.log(errorText.html());
    // expect(errorText.text()).toEqual("");
    expect(wrapperPasswordConf.containsMatchingElement(<p className="help-block error-mismatched">passwords don't match</p>)).toEqual(false);    
   });
   
});

describe('<RequiredInput /> component', () => {
    var wrapper;
    it('should show required error message if left blank', () => {
        wrapper = shallow(<RequiredInput value="" errorMessage="we need to know your name"/>);
        expect(wrapper.containsMatchingElement(<p className="help-block error-missing">we need to know your name</p>)).toEqual(true);
        console.log(wrapper.html());
        const input = wrapper.find('.error-missing');
        console.log(input.html());
        expect(input.text()).toEqual("we need to know your name");
    });

    it('should not show required error message if input has value', () => {
        wrapper = mount(<RequiredInput value="John Doe" errorMessage="we need to know your name"/>);
        console.log(wrapper.html());
        //const input = wrapper.find('p');
        expect(wrapper.containsMatchingElement(<p className="help-block error-missing">we need to know your name</p>)).toEqual(false);
    });

});