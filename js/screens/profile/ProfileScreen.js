import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Header } from "@components";
import Prolist from './components/Prolist.js';
import Proheader from './components/Proheader.js';
import mockdata from './mockdata';
import { Platform} from 'react-native';
export default class ProfileScreen extends React.Component {
	

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		// let listData = mockdata;
		// if (Platform.OS === 'ios') { 
		// 	listData = listData.filter((item)=>item.router!=='Attention')
		// }
		return (
			<Container style={paint.main}>
				<Header style={paint.header}></Header>
				<Content bounces={true} overScrollMode='auto' style={paint.Container}>
					<Proheader></Proheader>
					<Prolist data={mockdata} settingData={this.settingData}></Prolist>
				</Content >
			</Container>
		);
	}
};

const paint = StyleSheet.create({
	header: {
		height: 0,
		borderBottomWidth: 0
	},
	main: {
		backgroundColor: '#fff'

	},
});