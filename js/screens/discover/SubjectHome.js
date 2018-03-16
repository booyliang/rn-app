import React, { Component } from 'react';
import {
	Container, View, StyleSheet,
	YIcon, ArticleItem, Image, Button,
	withNavigation, FlowList, Text
} from '../../components';
import stylesClass, { inlineWrap, centerWrap, transformSize } from '../../styles';
import { cache } from './../../utils';
import { YZhugeIo } from '@ydk';

@withNavigation
export default class SubjectTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			subject: {},
			subjectTheme: null,
			showBackArrow: true,
		};
	}

	componentWillMount() {
		const subject = this.props.navigation.state.params;
		this.setState({ subject });
	}

	_renderBack() {
		return (
			<Button transparent onPress={this._handleBack} style={styles.backBox}>
				<YIcon name="arrow-back" style={styles.arrowBack} />
			</Button>
		);
	}

	_handleBack = () => {
		this.props.navigation.goBack();
	}

	onSelected = (item) => {
		YZhugeIo.track('专题主题', {
			'专题标题': item.headline
		});
		// let articleIds = this._subjectRef.state.data.map(item => item.id);
		this.props.navigation.navigate("Article", { id: item.id,articleIds:[item.id] });
	}

	_renderHeader() {
		const { subjectTheme } = this.state;
		if (!subjectTheme) {
			return null;
		}
		return (
			<Image source={{ uri: subjectTheme.background }} style={styles.subjectBg}  />
		);
	}

	render() {
		const { subject } = this.state;
		const url = `/services/app/v1/subject/list/${subject.id}`;

		return (
			<Container style={styles.container}>
				{this._renderBack()}
				<FlowList
					request={url}
					ListHeaderComponent={this._renderHeader()}
					ListEmptyComponent={<View style={styles.empty}></View>}
					renderItem={({ item }) => <ArticleItem data={item} style={styles.articleItem} foot={null} onPress={this.onSelected} />}
					ItemSeparatorComponent={() => <View style={styles.divide}></View>}
					enableCacheFirstPage={true}
					onRefresh={() => this.setState({ showBackArrow: true })}
					directionalLockEnabled={true}
					ref={(r) => { this._subjectRef = r; }}
				/>
			</Container>
		);
	}

	getSubjectThemeDetail() {
		const { subject } = this.state;
		const url = `/services/app/v1/subject/detail/${subject.id}`;
		let subjectTheme = null;
		// 数据缓存处理
		cache(url, (res) => {
			const data = res.data;
			subjectTheme = data.data || {};
			this.setState({ subjectTheme });
		});
	}


	componentDidMount() {
		this.getSubjectThemeDetail();
	}

}


const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff'
	},
	headline: {
		marginBottom: stylesClass.transformSize(30),
		fontSize: stylesClass.transformSize(82),
		color: "#2c1f4a",
		backgroundColor: 'transparent'
	},
	caption: {
		fontSize: stylesClass.transformSize(52),
		color: "#241542",
		backgroundColor: 'transparent'
	},
	articleItem: {
		paddingTop: stylesClass.transformSize(60),
		paddingBottom: stylesClass.transformSize(85)
	},
	divide: {
		height: stylesClass.transformSize(2),
		backgroundColor: "#e3e3e3"
	},
	item: {
		paddingTop: stylesClass.transformSize(64),
		paddingBottom: stylesClass.transformSize(84)
	},
	backBox: {
		width: stylesClass.transformSize(108),
		height: stylesClass.transformSize(108),
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: stylesClass.subjectHomeArrow,
		left: stylesClass.transformSize(35),
		zIndex: 999,
		backgroundColor: 'rgba(0,0,0,0.5)',
		borderRadius: 9999
	},
	arrowBack: {
		fontSize: stylesClass.transformSize(54),
		color: '#fff',
		textAlign: 'center',
	},
	backBtn: {
		width: stylesClass.transformSize(155),
		height: stylesClass.transformSize(155)
	},
	subjectBg: {
		width: '100%',
		height: stylesClass.transformSize(700),
	},
	otherWrapper: {
		paddingTop: stylesClass.transformSize(50),
	},
	otherInner: {
		paddingLeft: stylesClass.transformSize(50),
		paddingRight: stylesClass.transformSize(50),
		borderLeftWidth: stylesClass.transformSize(10),
		borderLeftColor: "#000000",
		paddingBottom: stylesClass.transformSize(50),
	},
	otherTitle: {
		paddingLeft: stylesClass.transformSize(20),
		fontSize: stylesClass.transformSize(56)
	},
	empty: {
		height: transformSize(200)
	}
});