import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import sinon from 'sinon';
import {PasswordConfirmationInput, RequiredInput} from './TeamSignUp';
import {shallow, mount} from 'enzyme';

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
    //  const handleChangePassSpy = sinon.spy(PasswordInput.prototype, 'handleChange')
    //  const handleChangePassConfSpy = sinon.spy(PasswordConfirmationInput.prototype, 'handleChange')

    //  input.simulate('change', {target: {value:'hello'}});
    //  passConfInput.simulate('change', {target: {value:'hello'}});

    // expect(handleChangePassSpy.getCall(0).args[0]).toEqual('hello');
    // expect(handleChangePassConfSpy.getCall(0).args[0]).toEqual('hello');

  })
})

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




   //field is none empty. if it is empty, you should see the error text. 3 tests for each box

// render the error text with red color? (not immediately necessary)

//field is none empty. if it is empty, you should see the error text. 3 tests for each box