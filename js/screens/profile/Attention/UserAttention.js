import React from 'react';
import { StyleSheet, PixelRatio } from 'react-native';
import {
	Content, Container, Text, ListItem, View,
	Nav, Image, TagGroup, Tag, FlowList,
	withNavigation, List
} from '../../../components';
import { transformSize } from '../../../styles';
@withNavigation
export default class UserAttention extends React.Component {
	itemData = {}
	constructor(props) {
		super(props);
		this.state = {};
	}
	// 分类标签处理
	classifys(item) {
		if (item.classifys) {
			return item.classifys.map((item) => {
				return (
					<Text note style={styles.textleft} key={item.id}>{item.classifyName}</Text>
				);

			});

		}
	}
	// 标签处理
	Grouplabel(item) {
		if (item.labels) {
			return item.labels.map((label, index) => {
				return (
					<Tag key={index}>{label.labelName}</Tag>
				);
			});

		}
	}
	// 关注人数处理
	attentionNum(num) {
		if (num >= 10000) {
			return Math.floor(num / 10000) + 'W';
		}
		return num;
	}

	renderItem = ({ item }) => {
		console.log(item);
		return (
			<List>
				<ListItem style={styles.mainLIst} key={item.id} onPress={() => this.props.navigation.navigate('App', { id: item.id })} >
					<View style={styles.LIst}>
						<View>
							<Image square large source={{ uri: item.appliIcon }} style={styles.leftImg} />
						</View>

						<View style={styles.mainRight}>
							<Text style={[styles.mainRightItem, styles.mainRightItemTit]} numberOfLines={1} ellipsizeMode='tail'>{item.appliName}</Text>
							<Text style={styles.mainRightItem}>{item.slog}</Text>
							<TagGroup style={styles.mainRightTag}>
								{
									this.Grouplabel(item)

								}
							</TagGroup>
							<View style={styles.mainrTextRight}>
								<View style={styles.mainrText}>
									{this.classifys(item)}
								</View>

								<Text style={styles.attentionNum} note>{this.attentionNum(item.attentionNum)} 人关注</Text>
							</View>
						</View>
					</View>
				</ListItem >
				<View style={styles.segmentation}></View>
			</List>
		);

	}


	render() {
		let createRequest = (pageNo, pageSize) => ({
			url: `/services/app/v1/attention/app/${pageNo}/${pageSize}`,
			params: {
				otherUserId: this.props.navigation.state.params.userId
			}
		});
		return (
			<Container style={styles.contMain}>
				<Nav title='Ta关注的百科'></Nav>
				<Content>
					<FlowList
						renderItem={this.renderItem}
						request={createRequest}
						// ItemSeparatorComponent={() => <View style={styles.segmentation}></View>}
						enableCacheFirstPage
					></FlowList>
				</Content>

			</Container >
		);
	}
}

const styles = StyleSheet.create({
	contMain: {
		backgroundColor: "#fff"
	},
	mainLIst: {
		marginLeft: 0,
		marginRight: 0,
		paddingRight: transformSize(44),
		paddingLeft: transformSize(44),
		borderBottomWidth: 0
	},
	LIst: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	segmentation: {
		marginLeft: transformSize(50),
		marginRight: transformSize(50),
		height: 2 / PixelRatio.get(),
		backgroundColor: "#e3e3e3"
		// borderBottomWidth: 1,
		// borderBottomColor: "#ccc"
	},
	mainRight: {
		width: '100%',
		flex: 1
	},
	leftImg: {
		width: transformSize(200),
		height: transformSize(200),
		borderRadius: transformSize(40),
		marginRight: transformSize(50),
		borderWidth: transformSize(1),
		borderColor: '#e3e3e3'
	},
	mainCheck: {
		marginTop: transformSize(-115),
		marginRight: transformSize(65),
		width: transformSize(60),
		height: transformSize(60),
		backgroundColor: '#ff6f6b',
		borderColor: '#ff6f6b',
		borderWidth: transformSize(2),
		borderRadius: transformSize(30),
	},
	oldCheck: {
		marginTop: transformSize(-115),
		marginRight: transformSize(65),
		width: transformSize(60),
		height: transformSize(60),
		backgroundColor: '#fff',
		borderColor: '#999',
		borderWidth: transformSize(2),
		borderRadius: transformSize(30),
	},
	mainRightItem: {
		fontSize: transformSize(46),
		marginBottom: transformSize(25),
		color: '#000',
	},
	mainRightItemTit: {
		fontSize: transformSize(56),
		marginTop: transformSize(10),
		color: '#000',
		fontWeight: 'bold'
	},
	mainRightTag: {
		marginBottom: transformSize(25)
	},
	mainrTextRight: {
		flex: 1,
		flexDirection: "row",
		justifyContent: 'space-between',

	},
	mainrText: {
		flexDirection: "row",
	},
	textleft: {
		marginRight: transformSize(20),
	},
	arrowBack: {
		fontSize: transformSize(51),
		color: '#000',
		textAlign: 'left',
		marginLeft: -4,

	},
});