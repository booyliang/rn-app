import React, { Component } from 'react';
import { Container, Tabs, Tab, withNavigation, StyleSheet } from '@components';
import Subject from './Subject';
import Witkey from './Witkey.js';
import Act from '../act/Act.js';
import { transformSize } from '@styles';
import SearchIcon from './components/SearchIcon';
@withNavigation
export default class Discover extends Component {

	render() {
		return (
			<Container style={styles.wrap}>
				<Tabs
					page={0}
				>
					<Tab heading="活动">
						<Act /> 
					</Tab>
					<Tab heading="威客">
						<Witkey />
					</Tab>
				</Tabs>
				{/* <SearchIcon /> */}
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	wrap: {
		paddingTop: transformSize(104),
		backgroundColor: "#fff"
	}
});