import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import Chat from './Chat';
import Loading from './Loading';
import DBManager from './DBManager';

class UserDetails extends Component {
	state = {
		currentUser: null,
		// users: [],
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
		// DBManager.getUsers().then((users) => {
			// const currentUser = users.find(user => user.id === userId);

			// // this.setState({users});
			// // this.setState({isLoading: false});
			// // this.setState({currentUser});
			// this.setState({currentUser, users, isLoading: false});
		// });

	}

	render() {
		const {currentUser, isLoading, hasError} = this.state;

		if (hasError) {
			return <Redirect to="/users/List" />;
		} else if (currentUser === null) {
			return <Loading />;
		}

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
