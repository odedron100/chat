import React, {Component} from 'react';
import {Link} from "react-router-dom";

class User extends Component {
	render() {
		return (
			<div className="form-container">
				<Link to="/agents/List">
					<div id="list-Button">Return to agent list</div>
				</Link>
			</div>
		);
	}
}

export default User;