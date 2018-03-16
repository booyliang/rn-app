import React, { Component} from 'react';
import { Container, StyleSheet, View, FlowList, Nav,  Loading, withNavigation, Toast, Text, Image } from '@components';
import {iconSize, transformSize, textPrimaryColor, textSecondaryColor, border} from '@styles';
import {AppItem} from './../../components/containers';
import {http} from "@services";
@withNavigation
export default class TagPage extends Component {
	constructor(props) {
		super(props);
		this.tagId = this.props.navigation.state.params.tagId;
		this.state = {
			tagInfo: null,
			title: '',
		};
	}

	componentDidMount() {
		this.getTagInfo();
	}

	// 获取当前的标签信息
	async getTagInfo() {
		const res = await http.get(`/services/app/v1/label/single/${this.tagId}`);
		const data = res.data;
		if (data.code === "200") {
			this.setState({ tagInfo: data.data, title: data.data.labelName });
		} else {
			Toast.show({ text: data.msg });
		}
	}

	_renderLabelView() {
		const { tagInfo } = this.state;
		return (
			<View style={decorate.tagInfo}>
				<View style={[decorate.tagImg]}>
					<Image style={decorate.tagInfoImg} source={{ uri: tagInfo.icon }} />
				</View>
				<View style={[decorate.tagDesc]}>
					<Text style={[decorate.text]}>
						{tagInfo.labelDescription}
					</Text>
				</View>
			</View>
		);
	}

	renderBody() {
		const { tagInfo } = this.state;
		if (!tagInfo) {
			return <Loading />;
		}
		return (
			<FlowList
				ListHeaderComponent={this._renderLabelView()}
				request={`/services/app/v1/application/tag/${this.tagId}`}
				renderItem={({ item }) => <AppItem data={item} contentOfLines={3} iconSize={300}/>}
				ItemSeparatorComponent={() => <View style={decorate.segemation}></View>}
			/>
		);
	}

	render() {
		return (
			<Container >
				<Nav title={this.state.title}></Nav>
				{this.renderBody()}
			</Container>
		);
	}

}

const decorate = StyleSheet.create({
	container: {
		backgroundColor: '#f7fbf9'
	},
	segemation: {
		height: transformSize(16),
	},
	loading: {
		flex: 1,
		justifyContent: "center",
		alignItems: 'center'
	},
	searchBox: {
		width: transformSize(100),
	},
	search: {
		fontSize: iconSize,
		color: textSecondaryColor,
		textAlign: 'right',
	},
	tagInfo: {
		paddingTop: transformSize(80),
		paddingBottom: transformSize(76),
		paddingHorizontal: transformSize(90),
		alignItems: "center",
		backgroundColor: "#fff",
		marginBottom: transformSize(40)
	},
	tagImg: {
		width: transformSize(150),
		marginRight: transformSize(70),
		paddingBottom: transformSize(63)
	},
	tagInfoImg: {
		width: transformSize(250),
		height: transformSize(250),
		borderRadius: transformSize(20),
		...border
	},
	tagDesc: {
		flex: 1
	},
	content: {
		minHeight: transformSize(176),
		marginBottom: transformSize(60),
		fontSize: transformSize(46),
		color: "#333333"
	},
	text: {
		fontSize: transformSize(46),
		color: "#333333",
		fontWeight: '600'
	},
	tagName: {
		marginTop: transformSize(18),
		color: textPrimaryColor,
		fontSize: transformSize(42),
		textAlign: "center"
	}
});