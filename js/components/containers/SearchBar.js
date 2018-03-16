/**
 *author: AiQingmin
 */
import React, { Component } from 'react';
import { View, Input, StyleSheet, YIcon, Text, Keyboard, Button } from '../base';
import { transformSize, backgroundColor, iconSize, themeColor } from '../../styles';
export default class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
		};
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.searchText !== nextProps.searchText) {
			this.setState({ text: nextProps.searchText });
		}
	}
	render() {
		return (
			<View style={[searchStyle.searchBarWrap, this.props.style]}>
				<YIcon name="search" style={searchStyle.searchIcon} onPress={this.onSearch} />
				<Input
					returnKeyType="search"
					onChangeText={this.handleChangeText}
					value={this.state.text}
					onSubmitEditing={this.onSearch}
					{...this.props}
					style={[searchStyle.searchInput, this.props.style]} />
				<YIcon name="close"
					style={searchStyle.deleteIcon}
					onPress={this.handleDelete} />
				<Button transparent onPress={this.onSearch} style={searchStyle.searchTxtWrap}>
					<Text style={searchStyle.searchTxt}>搜索</Text>
				</Button>
			</View>
		);
	}
	handleChangeText = (text) => {
		this.setState({ text });
		this.props.onSearchTxtChange && this.props.onSearchTxtChange(text);
	}
	handleDelete = () => {
		this.setState({ text: '' });
		this.props.onSearchTxtChange && this.props.onSearchTxtChange();
	}
	onSearch = () => {
		Keyboard.dismiss();
		this.props.onSearch && this.props.onSearch(this.state.text);
	}
}
const searchStyle = StyleSheet.create({
	searchBarWrap: {
		flexDirection: 'row',
		// width: transformSize(1110),
		position: 'relative',
		marginLeft: transformSize(-60),
	},
	searchInput: {
		height: transformSize(90),
		paddingLeft: transformSize(132),
		paddingRight: transformSize(100),
		fontSize: transformSize(43),
		borderRadius: transformSize(50),
		backgroundColor,
		paddingVertical: transformSize(18),
		alignSelf: 'center',
	},
	searchIcon: {
		fontSize: iconSize,
		position: 'absolute',
		left: transformSize(50),
		top: transformSize(24),
		color: '#999',
		zIndex: 1,
		height: transformSize(52),
		backgroundColor,
	},
	deleteIcon: {
		fontSize: iconSize,
		position: 'absolute',
		right: transformSize(240),
		top: transformSize(24),
		color: '#bfbfbf',
		height: transformSize(52),
		backgroundColor,
	},
	searchTxtWrap: {
		// position: 'absolute',
		// right: 0,
		alignSelf: 'center',
		width: transformSize(180),
		height: transformSize(102),
		alignItems: 'center',
		justifyContent: 'center',
	},
	searchTxt: {
		color: themeColor,
		// lineHeight: transformSize(80),
	}
});