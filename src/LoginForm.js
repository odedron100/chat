import React, {Component} from 'react';
import {Link} from "react-router-dom";

import DBManager from './DBManager';

class LoginForm extends Component {
	state = {
		email: '',
		password: ''
	}

	login = () => {
		console.log('login clicked!');
		const {email, password} = this.state;

		DBManager.loginWithEmailAndPassword(email, password)
			.then(() => {
				this.props.history.push('/users/List');
			})
			.catch(() => {
				console.log('failed!');
			});
	}

	createHandleFieldChange = (fieldName) => {
		return (e) => {
			this.setState({[fieldName]: e.target.value});
		}
	}

	render() {
		console.log('this.props', this.props);

		return (
			<div className="form-container">
				<div className="title">התחבר באמצעות כתובת המייל שלך</div>
				<div className="form">
					<input onChange={this.createHandleFieldChange('email')} className="email-input input" type="text" placeholder="כתובת מייל" />
					<input onChange={this.createHandleFieldChange('password')} className="password-input input" type="password" placeholder="סיסמא" />
					<div onClick={this.login} className="submit-button" id="login-button">התחבר</div>

					<Link to="/agents/register">
						<div id="register-button" className="secondary-button">או צור משתמש</div>
					</Link>
				</div>
			</div>
		);
	}
}

export default LoginForm;