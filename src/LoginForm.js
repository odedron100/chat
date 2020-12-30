import React, { Component } from 'react';
import { Link } from "react-router-dom";

import DBManager from './DBManager';

class LoginForm extends Component {
	state = {
		email: '',
		password: '',
		validationError: null,
	}

	componentDidMount() {
		window.addEventListener('keydown', (e) => {
			if (e.keyCode === 13) {
				this.login();
			}
		});
	}

	login = () => {
		const { email, password } = this.state;

		if (!password || !email) {
			this.setState({ validationError: 'אנא ודא כי כל השדות מלאים' });
		}

		DBManager.loginWithEmailAndPassword(email, password)
			.then(() => {
				this.props.history.push('/users/List');
				DBManager.setOnlineAgent(email);
			})
			.catch(() => {
				this.setState({ validationError: 'נסה שוב' });
			});
	}

	createHandleFieldChange = (fieldName) => {
		return (e) => {
			this.setState({ [fieldName]: e.target.value });
		}
	}

	render() {
		return (
			<div className="form-container">
				<div className="title">התחבר באמצעות כתובת המייל שלך</div>
				<div className="form">
					{this.state.validationError && <div className="error-message">{this.state.validationError}</div>}
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