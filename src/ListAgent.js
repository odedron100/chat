import React, {Component} from 'react';
import {Route} from "react-router-dom";
import {Link} from "react-router-dom";

import userDB from './userDB.json';

class ListAgent extends Component {
	state = {
    	listAgent: userDB.users,
  	}

	render() {
		const {listAgent} = this.state;
		const {match} = this.props;

		return (
			<div className="listAgent-container">
				<div className="title"> My list of calls history</div>	
				<div className="form">
					{Object.keys(listAgent).map((key, index) => {
						const item = listAgent[key];

						return(
							<div className="calls-History" key={index}>
						 	  <span className="all-Item">
						 	    מספר מנוי:
						 	    <Link to={`/agents/user/${item.userId}`}>
						 	      <span className="item-Text">{item.userId}</span>
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

// <div className="list" id="number-Of-User">מספר משתמש</div>
// <div className="list" id="call-Time">זמן השיחה (דקות)</div>