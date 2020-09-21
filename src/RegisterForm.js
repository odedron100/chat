import React, {Component} from 'react';

class RegisterForm extends Component {
	render() {
		return (
			<div className="register-form-container">
				<div className="form">
					<input className="name-input" className="input" type="text" placeholder="שם פרטי" />
					<input className="last-name-input" className="input" type="text" placeholder="שם משפחה" />
					<input className="email-input" className="input" type="text" placeholder="כתובת מייל" />
					<input className="password-input" className="input" type="text" placeholder="סיסמא" />
					<input className="confirm-password-input" className="input" type="text" placeholder="אימות סיסמא" />

				</div>
			</div>
		);
	}
}

export default RegisterForm;