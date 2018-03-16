import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { StyleSheet, View, Image, Touchable, Responsive, YIcon, Button, Text } from '@components';
import { transformSize, padder } from '@styles';
import { navigate } from '@services';

import { cache } from './../../utils';
import { YZhugeIo } from '@ydk';
// import { http } from '../../../services';

// let mapStateToProps = (state) => {
// 	return {
// 		subjectList: state.home.subjectList,
// 	};
// };

// @withNavigation
// @connect(mapStateToProps)
export default class HomeSwiper extends Component {

	constructor(props) {
		super(props);
		this.state = {
			subjectList: []
		};
	}

	render() {
		let { subjectList = [] } = this.state;
		// if (!subjectList.length) {
		// 	return null;
		// }
		return (
			<View style={style.body}>
				<View style={style.topicWrap}>
					<YIcon name="topic" style={style.topic}/>
					<Button transparent onPress={this.handleMorePress}>
						<YIcon name="add" style={style.more} />
						<Text style={style.moreText}>更多</Text>
					</Button>
				</View>
				<View style={style.swiperWrap}>
					{subjectList.map(this.renderItem)}
				</View>
			</View>
		);
	}
	handleMorePress = () => {

		YZhugeIo.track('首页_专题', {
			// '专题标题': item.headline
		});
		navigate("SubjectTab");
		// 导航之后切换到专题的tab页
		// DeviceEventEmitter.emit("switchSubject");
	}

	componentDidMount() {
		// this.fetchSubjectData();
		this.fetchSubjectStorage();
	}

	renderItem = (item, index) => {
		let { id, thumbnail } = item;
		return (
			<Touchable key={id + this._timetick} onPress={this.handleSubjectPress(item, index)} type="highlight">
				{/* <Image source={{ uri: background }} style={style.imgWrap} />*/}
				<Image source={{ uri: thumbnail }} style={style.imgWrap} />
			</Touchable>
		);
	}

	fetchSubjectStorage() {
		this._timetick = new Date();
		cache("/services/app/v1/subject/homePage", (res) => {
			const subjectList = res.data.data || [];
			this.setState({ subjectList });
		});
	}

	// fetchSubjectData = async () => {
	// 	let reqApi = '/services/app/v1/subject/homePage';
	// 	let res = await http(reqApi);
	// 	let subjectList = res.data.data || [];
	// 	return this.props.dispatch({ type: 'LOAD_SUBJECT', payload: { subjectList } });
	// }

	handleSubjectPress = (item) => () => {
		YZhugeIo.track('首页_专题', {
			// '专题标题': item.headline
		});
		navigate("SubjectHome", item);
	}
}
const style = StyleSheet.create({
	body: {
		backgroundColor: '#fff',
		marginBottom: transformSize(30),
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: transformSize(10),
		paddingBottom: transformSize(50),
	},
	topicWrap: {
		...padder,
		marginTop: transformSize(50),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	topic: {
		color: '#000',
		fontSize: transformSize(52),
	},
	more: {
		color: '#ff6f6b',
		fontSize: transformSize(24),
	},
	moreText: {
		color: '#ff6f6b',
		fontSize: transformSize(36),
		marginLeft: transformSize(10),
	},
	swiperWrap: {
		...padder,
		marginTop: transformSize(15),
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#fff',
	},
	imgWrap: {
		width: transformSize(360),
		height: transformSize(186),
		borderRadius: transformSize(36),
		overflow: 'hidden',
		// overlayColor: '#fff',
	},
});