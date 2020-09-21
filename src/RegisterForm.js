import React, {Component} from 'react';

class RegisterForm extends Component {
	render() {
		return (
			<div className="form-container">
			<div className="title">צור משתמש חדש</div>
				<div className="form">
					<input className="name-input" className="input" type="text" placeholder="שם פרטי" />
					<input className="last-name-input" className="input" type="text" placeholder="שם משפחה" />
					<input className="email-input" className="input" type="text" placeholder="כתובת מייל" />
					<input className="password-input" className="input" type="password" placeholder="סיסמא" />
					<input className="confirm-password-input" className="input" type="password" placeholder="אימות סיסמא" />
					<div className="create-user-button"> סיימתי, צור משתמש!</div>
				</div>
			</div>
		);
	}
}

export default RegisterForm;