import React, {Component} from 'react';
import {Route} from "react-router-dom";

const callsHistoryList = [
	{numberOfUser : '1', name:'אליאור', genus: 'זכר', callTime : '10',},
	{numberOfUser : '2', name:'שחר', genus: 'נקבה', callTime: '4'},
];

class ListAgent extends Component {
	state = {
    	listAgent: callsHistoryList,
  	}	
	render() {
		const {listAgent} = this.state;
		return (
			<div className="listAgent-container">
				<div className="title"> My list of calls history</div>	
				<div className="form">
					{listAgent.map((item, index) => {
						return <div className="calls-History" key={index} numberOfUser={item.numberOfUser} name={item.name} genus={item.genus} callTime={item.callTime}> <span className="all-Item" > מספר מנוי:<span className="item-Text">{item.numberOfUser}</span></span> <span className="all-Item">שם:<span className="item-Text">{item.name}</span></span> <span className="all-Item">מין:<span className="item-Text">{item.genus}</span></span> <span className="all-Item">אורך שיחה (דקות):<span className="item-Text">{item.callTime}</span></span></div>
					})} 	
				</div>
			</div>
		);
	}
}

export default ListAgent;

// <div className="list" id="number-Of-User">מספר משתמש</div>
// <div className="list" id="call-Time">זמן השיחה (דקות)</div>