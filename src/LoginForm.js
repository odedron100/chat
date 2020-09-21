import React, {Component} from 'react';
import {Link} from "react-router-dom";

class LoginForm extends Component {
	render() {
		return (
			<div className="form-container">
				<div className="title">התחבר באמצעות כתובת המייל שלך</div>
				<div className="form">
					<input className="email-input" className="input" type="text" placeholder="כתובת מייל" />
					<input className="password-input" className="input" type="text" placeholder="סיסמא" />
					<div className="submit-button" id="login-button">התחבר</div>

					<Link to="/agents/register">
						<div id="register-button" className="secondary-button">או צור משתמש</div>
					</Link>
				</div>
			</div>
		);
	}
}

export default LoginForm;