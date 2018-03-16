import React from 'react';
import { StyleSheet, PixelRatio } from 'react-native';
import {
	Content, Container, Right, Button, Text, ListItem, View, Left, Nav, List, withNavigation, FlatList
} from '../../../components';
import { YIcon } from '../../../assets';
import { transformSize } from '../../../styles';
import { connect } from 'react-redux';
import moment from 'moment';
import { YZhugeIo } from '@ydk';
import {
	cache
} from '@utils';
let mapStateToProps = (state) => {
	return {
		noticeData: state.notice,
	};
};
@withNavigation
@connect(mapStateToProps)
export default class Notice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.noticelist();

	}


	noticelist() {
		cache(`/services/app/v1/notice/list/1/1000000`, (response) => {
			if (response.data.code == '200') {
				if (response.data.data) {
					let _resData = response.data.data.entities;
					let _entities = _resData;
					_entities.forEach(function (item) {
						item.checkBOx = true;
					});
					this.props.dispatch({ type: 'LOAD_NOTICE', payload: _entities });
				}
			}
		});



		// let res = await http.get('/services/app/v1/notice/list/1/1000000');
		// let _resData = res.data.data.entities;
		// let _entities = _resData;
		// _entities.forEach(function (item) {
		// 	item.checkBOx = true;
		// });
		// this.props.dispatch({ type: 'LOAD_NOTICE', payload: _entities });
	}

	router(item) {
		let items = this.props.noticeData;
		const newData = items.map((value, i) => {
			if (item.id == value.id) {
				value.checkBOx = false;
			}
			return value;
		});
		this.props.dispatch({ type: 'DELETE_NOTICE', payload: newData });
		YZhugeIo.track('公告主题', {
			'公告主题': item.title
		});

		this.props.navigation.navigate("Detail", item.id);
	}
	_newDot(item) {
		if (item.checkBOx) {
			return (
				<View style={styles.newDot}></View>
			);
		} else {
			return (
				null
			);
		}
	}

	// 时间截取
	createDate(dete) {
		return moment(dete).format('MM-DD');

		// var myDate = new Date(dete);
		// if (myDate) {
		// 	return myDate.getMonth() + '-' + myDate.getDate();
		// } else {
		// 	return dete
		// }

	}


	renderItem = ({ item, index }) => {
		return (
			<View>
				<ListItem style={styles.mainList} key={index} onPress={() => this.router(item)}>
					<View style={styles.mainItem}>
						<View style={styles.mainleft}>
							{this._newDot(item)}
							<Text style={[styles.title, item.checkBOx ? styles.lefttitle : null]} numberOfLines={1}>{item.title}</Text>
						</View>

						<Text style={styles.content} numberOfLines={3}>{item.content}</Text>
						<View style={styles.viewDetail}>
							<Left>
								<Text style={styles.text}>{this.createDate(item.lastUpdateDate)}</Text>
							</Left>
							<Right>
								<Button transparent style={styles.button} onPress={() => this.router(item)}>
									<Text style={[styles.text, styles.rightText]}>查看详情</Text>
									<YIcon name="arrow-right" style={styles.arrowRight} />
								</Button>
							</Right>
						</View>
					</View>

				</ListItem>
				<View style={styles.segmentation}></View>
			</View>

		);
	}
	_keyExtractor = (item, index) => index;

	render() {
		return (
			<Container style={styles.contMain}>
				<Nav title='系统公告'></Nav>
				<Content>
					<List>
						<FlatList
							data={this.props.noticeData}
							renderItem={this.renderItem}
							keyExtractor={this._keyExtractor}
						/>
					</List>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	contMain: {
		backgroundColor: '#f7f9fb',
	},
	mainList: {
		paddingTop: transformSize(30),
		paddingBottom: transformSize(30),
		paddingLeft: transformSize(44),
		paddingRight: transformSize(44),
		marginLeft: 0,
		marginRight: 0,
		borderBottomWidth: 0,
	},
	mainItem: {
		width: '100%'
	},
	title: {
		fontSize: transformSize(62),
		alignContent: 'center',
	},
	lefttitle: {
		marginLeft: transformSize(32)
	},
	mainleft: {
		flexDirection: 'row',
		alignItems: 'center',
		alignContent: 'center',
	},
	newDot: {
		// position: 'absolute',
		// top: transformSize(25),
		// left: 0,
		width: transformSize(30),
		height: transformSize(30),
		borderRadius: transformSize(15),
		backgroundColor: '#ff472e',
		alignItems: 'center',
	},
	content: {
		marginTop: transformSize(20),
		marginBottom: transformSize(20),
		color: '#666'

	},
	viewDetail: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderColor: '#e7e7e7',
		borderTopWidth: 1 / PixelRatio.get(),
		paddingTop: transformSize(20)
	},
	arrowRight: {
		paddingLeft: transformSize(10),
		paddingTop: transformSize(9),
		color: '#999',
		flex: 0,

	},
	text: {
		color: '#666',
		fontSize: transformSize(40)
	},
	rightText: {
		paddingTop: transformSize(5)

	},
	segmentation: {
		marginLeft: transformSize(50),
		marginRight: transformSize(50),
		height: transformSize(20),
		backgroundColor: "#f7f9fb"
		// borderBottomWidth: 1,
		// borderBottomColor: "#ccc"
	},
});