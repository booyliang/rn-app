import React from 'react';
import { Header, Left, Button, Body, Title, Right, StyleSheet } from '../base';
import { YIcon } from '@assets';
import {
	goBack
} from '@services';
import styles from '@styles';
// hideLeftIcon

// leftText: String,
// transparent: Boolean,
// menuData: Array
export default class Nav extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	_handleBack = () => {
		if (this.props.handleBack && this.props.handleBack() === false) {
			return;
		}
		goBack();
	};
	renderLeft = () => {
		if (this.props.hideLeftIcon)
			return <Left></Left>;

		let leftContent = this.props.leftText ? <Text>{this.props.leftText}</Text> : <YIcon name="arrow-back" style={navStyle.arrowBack} />;

		return (
			<Left>
				<Button transparent onPress={this._handleBack} dark>
					{leftContent}
				</Button>
			</Left>
		);
	}
	renderBody() {
		if (!this.props.title && !this.props.bodyComponent)
			return null;
		return (
			<Body>
				{this.props.bodyComponent || <Title style={navStyle.titleText}> {this.props.title}</Title>}
			</Body>);

	}
	renderRight() {
		if (this.props.hideRight)
			return null;
		return (<Right >{this.props.rightComponent}</Right >);

	}

	render() {

		return (
			<Header {...this.props}>
				{this.renderLeft()}
				{this.renderBody()}
				{this.renderRight()}
			</Header>
		);
	}
}

const navStyle = StyleSheet.create({
	arrowBack: {
		fontSize: styles.transformSize(54),
		color: styles.textSecondaryColor,
		textAlign: 'left',
		marginLeft: -4,
	},
	titleText: {
		fontSize: styles.transformSize(60),
		color: styles.textPrimaryColor1,
	}
});
