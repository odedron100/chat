import React, {Component} from 'react';
import {Link} from "react-router-dom";

class RegisterForm extends Component {
	render() {
		return (
			<div className="form-container">
			<div className="title">צור משתמש חדש</div>
				<div className="form">
					<input className="name-input input" type="text" placeholder="שם פרטי" />
					<input className="last-name-input input" type="text" placeholder="שם משפחה" />
					<input className="email-input input" type="text" placeholder="כתובת מייל" />
					<input className="password-input input" type="password" placeholder="סיסמא" />
					<input className="confirm-password-input input" type="password" placeholder="אימות סיסמא" />
					<div className="submit-button"> סיימתי, צור משתמש!</div>
					<Link to="/agents/login">
					<div id="login-button" className="secondary-button"> אני כבר רשום </div>
					</Link>
				</div>
			</div>
		);
	}
}

export default RegisterForm;