import React, {Component} from 'react';
import {Route} from "react-router-dom";
import {Link} from "react-router-dom";

const callsHistoryList = [
	{userId : '1', name:'אליאור', gender: 'זכר', callTime : '10'},
	{userId : '2', name:'שחר', gender: 'נקבה', callTime: '4'},
];

class ListAgent extends Component {
	state = {
    	listAgent: callsHistoryList,
  	}

	render() {
		const {listAgent} = this.state;
		const {match} = this.props;
  	console.log(this.state.listAgent[0].name);


		return (
			<div className="listAgent-container">
				<div className="title"> My list of calls history</div>	
				<div className="form">
					{listAgent.map((item, index) => {
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