import React, { Component } from 'react';

class Loading extends Component {
	render() {
		const { text } = this.props;
		const defaultText = 'טוען...';

		return (<div className="loading">{text || defaultText}<span role="img" aria-label="clock">⏰</span></div>);
	}
}

export default Loading;