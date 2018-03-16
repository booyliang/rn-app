import React, { Component } from 'react';
import {Tab, Tabs, Container, View, StyleSheet, Text, Nav, WitkeyItem, withNavigation, FlowList, Loading } from '../../components';
import {transformSize} from '../../styles';
import {http} from './../../services';
import SearchIcon from './components/SearchIcon';
@withNavigation
export default class WitkeyHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questUrl: "/services/app/v1/witkey/findWitkeys",
			outs: []
		};
	}

	async getConfigOuts() {
		const res = await http("/services/app/v1/config/getConfigOuts");
		const data = res.data;
		if (data.code === "200") {
			this.setState({outs: data.data});
		}
	}

	_renderTab() {
		const { outs } = this.state;
		return outs.map((out, index) => {
			return (
				<Tab heading={out.commentName} key={index} >
					{this.witkeyComponent(out.commentValue)}
				</Tab>
			);
		});
	}

	componentDidMount() {
		this.getConfigOuts();
	}

	witkeyComponent(outSource) {
		const {	questUrl } = this.state;
		return (
			<FlowList 
				request = {(pageNo, pageSize) => { 
					return {url: `${questUrl}/${pageNo}/${pageSize}`, params: {outSource}};
				}}
				ItemSeparatorComponent = {() => <View style = {styles.segmentation}></View>}
				renderItem = { ({item}) => <WitkeyItem data = {item} selected = { (item) => this.onSelected(item)}/>}
			/>
		);
	}

	onSelected(item) {
		this.props.navigation.navigate('WitkeyDetail', {id: item.id});
	}
	
	render() {
		if (!this.state.outs.length) {
			return <Loading />;
		}
		return (
			<Container>
				<Nav bodyComponent = {<Text>更多威客</Text>} rightComponent={<SearchIcon />}/>
				<Tabs style={styles.tab}>
					{this._renderTab()}
				</Tabs>
			</Container>
		);
	}

}

const styles = StyleSheet.create({
	segmentation: {
		marginLeft: transformSize(50),
		marginRight: transformSize(50),
		borderBottomWidth: 1,
		borderBottomColor: "#ccc"
	},
	tab: {
		paddingTop: transformSize(20),
		backgroundColor: "#fff"
	}
});