import React, { Component } from 'react';
import { Container, Nav, View, StyleSheet, Right, Button, YIcon, Text } from "@components";
import CategoryMenu from './components/CategoryMenu';
import CategoryRight from './components/CategoryRight';
import styles from '@styles';
import { YZhugeIo } from '@ydk';
export default class Category extends Component {
	constructor(poprs) {
		super(poprs);
		this.state = {
			currSubClassifiId: null,		// 子分类id
		};
	}
	render() {
		let bodyComponent = this.headTitle();
		let rightComponent = this.headerRightSearch();
		return (
			<Container>
				<Nav rightComponent={rightComponent} bodyComponent={bodyComponent}></Nav>
				<View style={style.wrap}>
					<CategoryMenu
						style={{ width: styles.transformSize(300), height: '100%', }}
						onMenuClick={this.handleMenuClick} />
					<CategoryRight
						style={{ flex: 1 }}
						currSubClassifiId={this.state.currSubClassifiId} />
				</View>
			</Container>
		);
	}

	headTitle = () => {
		return (
			<View style={style.headerText}>
				<Text style={style.headerTitle}>百科</Text>
				<Text style={style.titleAssist}>您的生活助理</Text>
			</View>
		);
	}

	headerRightSearch = () => {
		return (
			<Right>
				<Button onPress={() => this.props.navigation.navigate('SearchScreen')} transparent dark>
					<YIcon name="search" style={style.search} />
				</Button>
			</Right>
		);
	}

	// 点击顶级分类切换并更新二级分类及应用列表
	handleMenuClick = (item) => {
		requestAnimationFrame(() => {
			this.setState({ currSubClassifiId: item.id });
		});

		YZhugeIo.track('一级分类名称', {
			'分类名称': item.classifyName
		});
	}
}

const style = StyleSheet.create({
	wrap: {
		flexDirection: 'row',
		height: styles.screenHeight - 128,
		backgroundColor: '#fff',
		flex: 1
	},
	search: {
		textAlign: 'left',
		fontSize: styles.transformSize(49),
		color: styles.textSecondaryColor,
		paddingHorizontal: styles.transformSize(50),
	},
	headerText: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	headerTitle: {
		fontSize: styles.transformSize(60),
		color: styles.textPrimaryColor1,
	},
	titleAssist: {
		marginLeft: styles.transformSize(15),
		fontSize: styles.transformSize(45),
		color: styles.textSecondaryColor,
	}
});

