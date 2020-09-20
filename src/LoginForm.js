import React, {Component} from 'react';
import {Link} from "react-router-dom";

class LoginForm extends Component {
	render() {
		return (
			<div className="login-form-container">
				<div className="title">התחבר באמצעות כתובת המייל שלך</div>
				<div className="form">
					<input id="email-input" className="input" type="text" placeholder="כתובת מייל" />
					<input id="password-input" className="input" type="text" placeholder="סיסמא" />
					<div id="login-button">התחבר</div>

					<Link to="/agents/register">
						<div id="register-button">או צור משתמש</div>
					</Link>
				</div>
			</div>
		);
	}
}

export default LoginForm;