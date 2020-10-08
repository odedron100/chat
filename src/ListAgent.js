import React, {Component} from 'react';
import {Route} from "react-router-dom";
import {Link} from "react-router-dom";

import userDB from './userDB.json';
import Chat from './Chat';

class ListAgent extends Component {
	state = {
    	listAgent: userDB.users,
  	}

	render() {
		const {listAgent} = this.state;
		const {match} = this.props;
		const users = JSON.parse(localStorage.getItem('usersName'));

		return (
			<div className="listUsers-container">
				<div className="title"> My list of calls history</div>	
				<div className="form">
					{users.map((item, index) => {
						const userId = index +1;

						return(
							<div className="calls-History" key={index}>
						 	  <span className="all-Item">
						 	    מספר מנוי:
						 	    <Link to={`/users/user/${item.id}`}>
						 	      <span className="item-Text">{item.id}</span>
						 	    </Link>
						 	  </span>
						  	  <span className="all-Item">שם:<span className="item-Text">{item.name}</span></span>
						   	  <span className="all-Item">מין:<span className="item-Text">{item.gender}</span></span> 
						   	  <span className="all-Item">אורך שיחה (דקות):<span className="item-Text">{item.callTime}</span></span>
						    </div>
						)
						
					})}	
				</div>
			</div>
		);
	}
}

export default ListAgent;
