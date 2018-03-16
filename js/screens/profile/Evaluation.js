import React from 'react';
import { StyleSheet } from 'react-native';
import {
	Container, Right, Text, View, Touchable, Nav, H2, FlowList, StarRating
	, withUser, Image, Message
} from '../../components';
import styles from '@styles';
import { connect } from 'react-redux';
import { http } from '@services';
import noDataIcon from '@assets/images/collect_03.png';
let mapStateToProps = (state) => {
	return {
		userdata: state.intro,
	};
};
@withUser(true)
@connect(mapStateToProps)
export default class Evaluation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	};

	renderItem = ({ item }) => {
		return (
			<View style={style.list}>
				<View style={style.listTit}>
					<Touchable onPress={() => this.props.navigation.navigate('App', { id: item.appId })}>
						<Image square source={{ uri: item.icon }} style={style.leftImg} />
					</Touchable>

					<View style={style.listTitRight}>
						<H2 onPress={() => this.props.navigation.navigate('App', { id: item.appId })} style={style.listH2}>{item.appliName}</H2>
						<View style={style.textRating}>
							<Text style={style.textSize}>我的评级：</Text>
							<StarRating disabled rating={item.starLevel} style={style.size}></StarRating>
						</View>
					</View>
				</View>

				<Text style={style.content}>{item.comment}</Text>
				<Right style={style.contDate}>
					<Text style={style.textSize}>{item.createDate.split(' ')[0]}</Text>
				</Right>
			</View>
		);
	};


	render() {
		let _url = (pageNo, pageSize) => ({
			url: `/services/app/v1/comment/myComment/${pageNo}/${pageSize}`,
			params: {
				userId: this.props.user.userId
			}
		});
		if (this.state.data.length > 0) {
			return (
				<Container style={style.container}>
					<Nav title='我的评价'></Nav>
					<FlowList
						enableCacheFirstPage
						request={_url}
						renderItem={this.renderItem}
						ItemSeparatorComponent={() => <View style={style.segmentation}></View>}
					/>
				</Container>
			);

		} else {
			return (
				<Container style={style.container}>
					<Nav title='我的评价'></Nav>
					<Message icon={noDataIcon} text='您当前暂无评价~' />
				</Container>
			);
		}


	}

	// 更改数据结构
	async evallist() {
		const res = await http('/services/app/v1/comment/myComment/1/10');
		const data = res.data;
		if (data.code == "200") {
			let _entities = data.data.entities;
			this.setState({
				data: _entities
			});
			return this.state.data;
		}
		throw data.msg;
	}
	componentDidMount() {
		this.evallist();

	}
}

const style = StyleSheet.create({
	container: {
		backgroundColor: '#fff'
	},
	main: {
		backgroundColor: '#f7f9fb'
	},
	listH2: {
		fontSize: styles.transformSize(56),
		color: '#000',
		fontWeight: 'bold'
	},
	list: {
		marginLeft: 0,
		marginRight: 0,
		backgroundColor: '#fff',
		flexDirection: 'column',
		justifyContent: 'space-between',
		paddingLeft: styles.transformSize(50),
		paddingRight: styles.transformSize(50),
		paddingTop: styles.transformSize(40),
		borderBottomWidth: styles.transformSize(30),
		borderColor: "#f7f9fb"
	},
	listTit: {
		flexDirection: 'row',
		// backgroundColor: 'blu e',
		justifyContent: 'flex-start',
		borderBottomWidth: 0
	},
	listTitRight: {
		width: '100%',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		borderBottomWidth: 0,
	},
	leftImg: {
		...styles.border,
		width: styles.transformSize(125),
		height: styles.transformSize(125),
		borderRadius: styles.transformSize(30),
		marginRight: styles.transformSize(25)
	},
	content: {
		marginTop: styles.transformSize(30),
		lineHeight: styles.transformSize(72),
		borderBottomWidth: 0,
		color: '#000',
		alignSelf: 'flex-start'
	},
	contDate: {
		width: '100%',
		paddingRight: styles.transformSize(20),
		borderBottomWidth: 0,
		paddingBottom: styles.transformSize(65),
		paddingTop: styles.transformSize(35)
	},
	textRating: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center'
	},
	size: {
		fontSize: styles.transformSize(40),
		paddingLeft: styles.transformSize(5)
	},
	textSize: {
		fontSize: styles.transformSize(40),
		color: "#999"
	},
	segmentation: {
		// height: transformSize(30),
		// backgroundColor: "#f7f9fb"
		// borderBottomWidth: 1,
		// borderBottomColor: "#ccc"
	},

});