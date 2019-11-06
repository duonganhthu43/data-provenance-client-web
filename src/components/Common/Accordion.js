import React, { Component } from 'react';
import '../../styles/components/Common/Accordion.scss';

export default class Accordion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpened: true
		}
	}

	render() {
		return (
			<div className="accordion-container">
				<div onClick={this.toggle} className="head">
					<span className="title">{this.props.title}</span>
					<span className="placeholder-line" />
					<span className="accordion-button">{this.state.isOpened ? '−' : '+'}</span>
				</div>
				<div className={"body" + (this.state.isOpened ? '' : ' hide')}>
					{this.props.children}
				</div>
			</div>
		);
	}

    toggle = () => {
		this.setState({isOpened: !this.state.isOpened});
	}
}
