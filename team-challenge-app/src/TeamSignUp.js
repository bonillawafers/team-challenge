import React from 'react';

/**
 * The overall form component
 */

class SignUpForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { //track values and overall validity of each field
      email:{value:'',valid:false}, 
      name:{value:'',valid:false},
      dob:{value:'',valid:false},
      password:{value:'',valid:false},
      passwordConf:{value:'',valid:false},
      alert: false, // state to keep track of alert status
    };

    this.updateState = this.updateState.bind(this); //bind for scope
  }

  //callback for updating the state with child information
  updateState(stateChange){
    this.setState(stateChange);
  }

  //callback for the reset button
  handleReset(event) {
    console.log('Reset!');
    this.setState({ // all fields are reset to empty Strings once clicked
      email:{value:'',valid:false}, 
      name:{value:'',valid:false},
      dob:{value:'',valid:false},
      password:{value:'',valid:false},
      passwordConf:{value:'',valid:false},
      alert: false // alert status back to false when reset clicked
    });
  }

  //callback for the submit button
  handleSubmit(event) {
    event.preventDefault();
    console.log('Submitted!');
    //this.props.submitCallback(this.state);
    this.setState({alert:true});
  }

  render() {
    //if all fields are valid, button should be enabled
    var buttonEnabled = (this.state.email.valid && this.state.name.valid && this.state.dob.valid && this.state.password.valid && this.state.passwordConf.valid);

    var content; 
    if (this.state.alert){ // conditional rendering of alert
      content = <div className="alert alert-success" role="alert">Your Form Has Been Submitted!</div>;
    } else {
      <div/>;
    }


    return (
      
      <form name="signupForm" onSubmit={(e) => this.handleSubmit(e)}>
        {content}
        <EmailInput value={this.state.email.value} updateParent={this.updateState} />

        <RequiredInput 
          id="name" field="name" type="text"
          label="Name" placeholder="your name"
          errorMessage="we need to know your name"
          value={this.state.name.value} 
          updateParent={this.updateState} />

        <BirthdayInput value={this.state.dob.value} updateParent={this.updateState}/>

        <RequiredInput 
          id="password" field="password" type="password"
          label="Password" placeholder=""
          errorMessage="your password can't be blank"
          value={this.state.password.value} 
          updateParent={this.updateState} />

        <PasswordConfirmationInput value={this.state.passwordConf.value} password={this.state.password.value} updateParent={this.updateState}/>

        {/* Submit Buttons */}
        <div className="form-group">
          <button id="resetButton" type="reset" className="btn btn-default" onClick={(e)=>this.handleReset(e)}>Reset</button> {' ' /*space*/}
          <button id="submitButton" type="submit" className="btn btn-primary" disabled={!buttonEnabled} onClick={(e)=>this.handleSubmit(e)}>Sign Me Up!</button>
        </div>

      </form>
    );
  }
}

/**
 * A component representing a controlled input for an email address
 */
class EmailInput extends React.Component {
  validate(currentValue){
    if(currentValue === ''){ //if current value is empty, input is not valid
      return {missing: true, isValid: false} //return that the input is missing and it's not valid
    }

    //check email validity
    //pattern comparison from w3c https://www.w3.org/TR/html-markup/input.email.html#input.email.attrs.value.single
    var valid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(currentValue)
    if(!valid){ //if not valid, return that the email is invalid and isvalid is false
      return {invalidEmail:true, isValid:false}; //return that the email is invalid 
    }    

    return {isValid: true}; //no errors 
  }  

  handleChange(event){  
    //check validity (to inform parent)
    var isValid = this.validate(event.target.value).isValid;

    //what to assign to parent's state
    var stateUpdate = {
      'email': {
        value:event.target.value, //value is the user input
        valid:isValid //input is valid email
      }
    };

    this.props.updateParent(stateUpdate) //update parent state
  }

  render() {
    var errors = this.validate(this.props.value); //need to validate again, but at least isolated
    var inputStyle = 'form-group';
    if(!errors.isValid) inputStyle += ' invalid'; //add styling rule

    return (
      //html for the user input form for email
      <div className={inputStyle}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" className="form-control" placeholder="email address"
                value={this.props.value}
                onChange={(e) => this.handleChange(e)}
        />
        {/* if form is empty show this error message*/}
        {errors.missing &&
          <p className="help-block error-missing">we need to know your email address</p> 
        }
        {/* if user input is invalid show this error message*/}
        {errors.invalidEmail &&
          <p className="help-block error-invalid">this is not a valid email address</p>
        }
      </div>
    );
  }
}


/**
 * A component representing a controlled input for a generic required field
 */
class RequiredInput extends React.Component {
  validate(currentValue){
    if(currentValue === ''){ //check presence
      return {required: true, isValid: false};
    }

    return {isValid: true}; //no errors
  }  
  
  handleChange(event){  
    //check validity (to inform parent)
    var isValid = this.validate(event.target.value).isValid;

    //what to assign to parent's state
    var stateUpdate = {}
    stateUpdate[this.props.field] = {
      value:event.target.value,
      valid:isValid
    }

    this.props.updateParent(stateUpdate) //update parent state
  }

  render() {
    var errors = this.validate(this.props.value); //need to validate again, but at least isolated
    var inputStyle = 'form-group';
    if(!errors.isValid) inputStyle += ' invalid';

    return (
      <div className={inputStyle}>
        <label htmlFor={this.props.field}>{this.props.label}</label>
        <input type={this.props.type} id={this.props.id} name={this.props.field} className="form-control" placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={(e) => this.handleChange(e)}
        />
        {/*Changed line 196 from {errors && <p...} to check the isvalid property of errors to render the error message, as it was not doing this before  */}
        {!errors.isValid &&
          <p className="help-block error-missing">{this.props.errorMessage}</p>
        }
      </div>
    );
  }
}


/**
 * A component representing a controlled input for a birthdate (min age: 13)
 */
class BirthdayInput extends React.Component {
  validate(currentValue){
    if(currentValue === ''){ //check presence
      return {missing:true, isValid:false}
    }

    //check date validity
    var timestamp = Date.parse(currentValue); //use built-in Date type
    if(isNaN(timestamp)) { //it not a valid stamp
      return {notDate:true, isValid:false};
    }

    //check age range
    var d = new Date(); //today
    d.setYear(d.getFullYear() - 13); //subtract 13 from the year
    var minTimestamp = d.getTime();
    if(minTimestamp < timestamp){ //if minTimeStamp (users age) is less than current date minus 13
      return {notOldEnough:true, isValid:false} //return that they aren't old enough and isnt valid
    }

    return {isValid: true}; //no errors
  }  
  
  handleChange(event){  
    //check validity (to inform parent)
    var isValid = this.validate(event.target.value).isValid;

    //what to assign to parent's state
    var stateUpdate = {
      'dob': {
        value:event.target.value,
        valid:isValid
      }
    };

    this.props.updateParent(stateUpdate) //update parent state
  }

  render() {
    var errors = this.validate(this.props.value); //need to validate again, but at least isolated
    var inputStyle = 'form-group';
    if(!errors.isValid) inputStyle += ' invalid';

    return (
      // form for user to input date of birth
      <div className={inputStyle}>
        <label htmlFor="dob">Birthdate</label>
        <input type="text" id="dob" name="dob" className="form-control" placeholder="YYYY-MM-DD"
                value={this.props.value}
                onChange={(e) => this.handleChange(e)}
        />
        {/* if form is empty show this error message*/}
        {errors.missing &&
          <p className="help-block error-missing">we need to know your birthdate</p>
        }
        {/* if form is not a valid date format show this error message*/}
        {errors.notDate &&
          <p className="help-block error-invalid">that isn't a valid date</p>
        }
        {/* if the age inputed makes user less than 13 show this error message*/}
        {errors.notOldEnough &&
          <p className="help-block error-not-old">sorry, you must be at least 13 to sign up</p>
        }
      </div>
    );
  }
}


/**
 * A component representing a controlled input for a password confirmation
 */
class PasswordConfirmationInput extends React.Component {
  validate(currentValue){
    if(currentValue !== (this.props.password)){ //check both entries
      return {mismatched:true, isValid:false};
    }    

    return {isValid: true}; //no errors
  }  
  
  handleChange(event){  
    //check validity (to inform parent)
    var isValid = this.validate(event.target.value).isValid;

    //what to assign to parent's state
    var stateUpdate = {
      'passwordConf': {
        value:event.target.value,
        valid:isValid
      }
    };

    this.props.updateParent(stateUpdate) //update parent state
  }

  render() {
    var errors = this.validate(this.props.value); //need to validate again, but at least isolated
    var inputStyle = 'form-group';
    if(!errors.isValid) inputStyle += ' invalid';

    return (
      <div className={inputStyle}>
        <label htmlFor="passwordConf">Confirm Password</label>
        <input type="password" id="passwordConf" name="passwordConf" className="form-control"
                value={this.props.value}
                onChange={(e) => this.handleChange(e)}
        />
        {errors.mismatched &&
          <p className="help-block error-mismatched">passwords don't match</p>
        }
      </div>
    );
  }
}

//exports: DO NOT REMOVE OR CHANGE THESE
export default SignUpForm;
export {EmailInput, RequiredInput, BirthdayInput, PasswordConfirmationInput};
