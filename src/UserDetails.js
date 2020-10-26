import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import Chat from './Chat';
import Loading from './Loading';
import DBManager from './DBManager';

class UserDetails extends Component {
	state = {
		currentUser: null,
		isLoading: false,
		hasError: false
	}

	componentDidMount() {
		const userId = this.props.match.params.id;

		this.setState({isLoading: true});
		DBManager.getUser(userId)
			.then((currentUser) => {
				this.setState({
					currentUser, 
					isLoading: false
				});
			})
			.catch((error) => {
				this.setState({hasError: true})
			});

	}

	render() {
		const {currentUser, isLoading, hasError} = this.state;

		if (hasError) {
			return <Redirect to="/users/List" />;
		} else if (currentUser === null) {
			return <Loading />;
		}
		console.log('currentUser', currentUser);

		return(
			<div>
				{isLoading ?
					<Loading />
					:
					<div>
						<div>{`המזהה שלי הוא ${currentUser.id}`}</div>
						<div>{`וקוראים לי ${currentUser.name}`}</div> 
	
						<Chat owner={currentUser} isAgent={true} />
					</div>
				}
					
			</div>	
		);

	}
}

export default UserDetails;
