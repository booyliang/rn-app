import React from 'react';
import { StyleSheet, PixelRatio } from 'react-native';
import { Container, Content, Text, View, List, ListItem, Nav, FlowList, Image } from '../../../components';
import { transformSize } from '../../../styles';

export default class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	};
	componentDidMount() {
		console.log(this.props.navigation.state.params.id);
	};
	attentionCount(item) {
		if (item.attentionNum) {
			let num = item.attentionNum;
			if (num >= 10000) {
				num = Math.floor(num / 10000) + '万';
			}
			return (
				<Text style={styles.conent}>Ta还关注了 <Text style={styles.count}>{num}</Text> 个百科</Text>
			);

		} else {
			null;
		}
	}

	renderItem = ({ item }) => {
		return (
			<List style={styles.list}>
				<ListItem style={styles.Listitem} key={item} onPress={() => this.props.navigation.navigate("UserAttention", item)}>
					<Image style={styles.hedImage} source={{ uri: item.userPic }} />
					<View style={styles.mainBody}>
						<Text style={styles.mainBodytitle}>{item.nickName}</Text>
						<View style={styles.mainRight}>
							{this.attentionCount(item)}
							<Text style={styles.conent}>{item.attentionDate}</Text>
						</View>
					</View>
				</ListItem>
				<View style={styles.segmentation}></View>
			</List>

		);
	}


	render() {
		let requestUrl = `/services/app/v1/attention/user/${this.props.navigation.state.params.id}`;
		return (
			<Container style={styles.mainList}>
				<Nav title='关注该百科的用户'></Nav>
				<Content>

					<FlowList
						request={requestUrl}
						renderItem={this.renderItem}
						enableCacheFirstPage
					// ItemSeparatorComponent={() => <View style={styles.segmentation}></View>}
					></FlowList>


				</Content>
			</Container>
		);
	}

}

const styles = StyleSheet.create({
	list: {
		// borderBottomColor: "#eaeaea",
		// borderBottomWidth: 2 / PixelRatio.get(),
	},
	mainList: {
		backgroundColor: '#fff'
	},
	Listitem: {
		paddingLeft: transformSize(50),
		paddingRight: transformSize(50),
		paddingTop: transformSize(45),
		paddingBottom: transformSize(45),
		marginLeft: 0,
		marginRight: 0,
		borderBottomWidth: 0
	},
	hedImage: {
		width: transformSize(168),
		height: transformSize(168),
		borderRadius: transformSize(84),
		borderWidth: transformSize(1),
		borderColor: '#e3e3e3'
	},
	mainBody: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		paddingLeft: transformSize(40),
	},
	mainBodytitle: {
		// justifyContent: 'flex-start',
		fontSize: transformSize(53),
		color: '#000',
	},
	conent: {
		color: '#999',
		fontSize: transformSize(43)
	},
	count: {
		color: '#ff9bb0'

	},
	mainRight: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		// paddingLeft: transformSize(30),
		marginTop: transformSize(25),
	},
	segmentation: {
		marginLeft: transformSize(50),
		marginRight: transformSize(50),
		height: 2 / PixelRatio.get(),
		backgroundColor: "#e3e3e3"
		// borderBottomWidth: 1,
		// borderBottomColor: "#ccc"
	},
});