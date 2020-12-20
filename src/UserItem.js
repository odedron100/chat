import React, {Component} from 'react';



class UserItem extends Component {
	render() {
		const {
			index,
			user,
			messagesClass,
			item,
			messages
		} = this.props;	

				
		return (
			<div className="user-link-container" style={{backgroundImage: `url(https://randomuser.me/api/portraits/men/${index + 1}.jpg)`}}  onClick={()=>this.props.onUserClicked(user)} >
				{messages[user] && <div className={messagesClass}>{messages[user].length} </div>}
				<div className="user-details-container">
					<div className="name">{item.name}</div>
					<span className="all-Item">
					</span>
			    </div>
			</div>

		);
										
	}
}

export default UserItem;