import React, { Component } from 'react';
import { StyleSheet, PixelRatio, Platform } from 'react-native';
import { Text, ListItem, View, Left, Body, Right, List, withNavigation, withUser } from '@components';
import { transformSize, textPrimaryColor } from '@styles';
import { YIcon } from '@assets';
import { YZhugeIo, Constants } from '@ydk';
import { sign } from '@services';
import { connect } from 'react-redux';
let mapStateToProps = (state) => {
	return {
		pushCount: state.jpush.pushCount,
	};
};
@withNavigation
@withUser(false)
@connect(mapStateToProps)
export default class Prolist extends Component {
	constructor(props) {
		super(props);
		this.state = {};

	}
	routers(item) {
		if (this.props.data[item].name == '我关注的应用百科') {
			YZhugeIo.track('我关注的应用百科', {});

			this.props.navigation.navigate(this.props.data[item].router);
		} else if (this.props.data[item].name == '一键邀请') {
			if (sign.isIn()) {
				let url = `${Constants.webBaseUrl}/myShare/${this.props.user.userId}`;
				this.props.navigation.navigate('YWebView', { url });
			} else {
				sign.in();
			}

		} else {
			this.props.navigation.navigate(this.props.data[item].router);
		}
	}
	// 消息红点处理
	_newDot(item) {
		console.log(this.props.pushCount);
		if (item.router == 'Message' && this.props.pushCount > 0 && Platform.OS !== 'ios') {
			return (
				<View style={styles.newDot}></View>
			);
		} else if (item.router == 'Message' && this.props.pushCount > 0 && Platform.OS == 'ios') {
			return (
				<View style={styles.newDot}></View>
			);
		} else {
			return (
				null
			);
		}
	}
	render() {
		let data = [];
		for (let i in this.props.data) {
			let text = (
				<ListItem avatar style={styles.flex} key={i} onPress={() => this.routers(i)}>
					<Left>
						<YIcon name={this.props.data[i].icon} style={{ color: this.props.data[i].color, fontSize: this.props.data[i].fontSize }} />
					</Left>
					<Body style={[styles.body, i == 7 ? styles.line : null, Platform.OS == 'ios' && i == 6 ? styles.line : null]}>
						<Text style={styles.list_item}>{this.props.data[i].name}</Text>
						<View style={styles.dotright}>
							{this._newDot(this.props.data[i])}
							<YIcon name="arrow-right" style={styles.arrowRight} />
						</View>

					</Body>
					<Right style={styles.right}></Right>
				</ListItem>
			);
			data.push(text);
		}
		return (
			<View>
				<List style={styles.mainlist}>
					{data}
				</List>
			</View >
		);
	}
}

const styles = StyleSheet.create({
	mainlist: {
		backgroundColor: '#fff',

	},
	flex: {
		// borderBottomWidth: 3 / PixelRatio.get(),
		// borderBottomColor: '#e3e3e3',
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: transformSize(102),
		paddingRight: transformSize(10),
		marginLeft: 0,
		marginRight: 0,
		height: transformSize(176)
	},
	body: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: transformSize(171),
		borderBottomWidth: 2 / PixelRatio.get(),
		borderBottomColor: '#e3e3e3',
		marginBottom: transformSize(2)
	},
	line: {
		borderBottomWidth: 0,
		height: transformSize(160),
	},
	arrowRight: {
		fontSize: transformSize(46),
		color: '#bfbfbf',
		flex: 0,
		marginTop: transformSize(5)
	},
	right: {
		borderBottomWidth: 0,
	},
	winnower: {
		color: '#ffbfcc'

	},
	newDot: {
		width: transformSize(30),
		height: transformSize(30),
		borderRadius: transformSize(15),
		backgroundColor: '#ff472e',
		alignItems: 'center',
		paddingRight: transformSize(5),
		marginRight: transformSize(36)
	},
	list_item: {
		color: textPrimaryColor,
	},
	dotright: {
		flexDirection: 'row',
		alignItems: 'center',
	}
});