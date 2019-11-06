import React, { Component } from 'react';
import '../../styles/components/Common/menuAccordion.scss';

export default class MenuAccordion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpened: true
		}
	}

	render() {
		return (
			<div className="menu-accordion-container">
				<div onClick={this.toggle} className="head">
					<span className="title">{this.props.title}</span>
				</div>
				<div className={"body" + (this.state.isOpened ? '' : ' hide')}>
					{this.props.children}
				</div>
			</div>
		);
	}

  // Disabled for now
  // toggle = () => {
	// 	this.setState({isOpened: !this.state.isOpened});
	// }
}
