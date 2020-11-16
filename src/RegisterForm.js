import React, {Component} from 'react';
import {Link} from "react-router-dom";

import DBManager from './DBManager';

class RegisterForm extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		passwordConfirmation: '',
		validationError: null
	}

	createNewAccount = () => {
		const {
			firstName,
			lastName,
			email,
			password,
			passwordConfirmation
		} = this.state;

		if (!firstName || !lastName || !email || !password || !passwordConfirmation) {
			return this.setState({validationError: 'יש למלא את כל השדות!'});
		}

		if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
			return this.setState({validationError: 'יש להזין כתובת מייל תקינה!'});
		}

		if (password !== passwordConfirmation) {
			return this.setState({validationError: 'הסיסמאות לא תואמות!'});
		}

		const user = {
			fullName: `${firstName} ${lastName}`,
			email: email,
			password: password
		}

		DBManager.createNewAgentUser(user).then(() => {
			console.log('new account created!');
		});
	}

	createHandleFieldChange = (fieldName) => {
		return (e) => {
			this.setState({[fieldName]: e.target.value});
		}
	}
 
	render() {
		return (
			<div className="form-container">
			<div className="title">צור משתמש חדש</div>
				<div className="form">
					{this.state.validationError && <div className="error-message">{this.state.validationError}</div>}
					<input onChange={this.createHandleFieldChange('firstName')} className="name-input input" type="text" placeholder="שם פרטי" />
					<input onChange={this.createHandleFieldChange('lastName')} className="last-name-input input" type="text" placeholder="שם משפחה" />
					<input onChange={this.createHandleFieldChange('email')} className="email-input input" type="text" placeholder="כתובת מייל" />
					<input onChange={this.createHandleFieldChange('password')} className="password-input input" type="password" placeholder="סיסמא" />
					<input onChange={this.createHandleFieldChange('passwordConfirmation')} className="confirm-password-input input" type="password" placeholder="אימות סיסמא" />
					<div className="submit-button" onClick={this.createNewAccount}> סיימתי, צור משתמש!</div>
					<Link to="/agents/login">
					<div id="login-button" className="secondary-button"> אני כבר רשום </div>
					</Link>
				</div>
			</div>
		);
	}
}

export default RegisterForm;