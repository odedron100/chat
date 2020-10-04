import React, {Component} from 'react';

import Chat from './Chat';

class SomeWebsite extends Component {
	render() {
		return (
			<div className="some-website-container">
				<div className="logo"></div>

        		<Chat owner="Me" />
			</div>
		);
	}
}

export default SomeWebsite;