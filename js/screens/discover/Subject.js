import React, { Component } from 'react';
import {
	withNavigation, Container, View,
	Text, YIcon, FlowList, withUser,
	Image, StyleSheet, Nav
} from '../../components';
import { transformSize, padder, inlineWrap, centerWrap, padding } from '../../styles';
import Touchable from "./../../components/base/Touchable";
import SearchIcon from './components/SearchIcon';

@withNavigation
@withUser(false)
export default class Subject extends Component {

	renderItemTag(item) {
		let [dominantHue, arrowsHue] = item.color.split(",");
		dominantHue = dominantHue || "blue";
		arrowsHue = arrowsHue || "green";
		return (
			<View style={[styles.tag, { backgroundColor: arrowsHue }]}>
				<View style={[styles.content, { backgroundColor: dominantHue }]}>
					<Text style={styles.title} numberOfLines={1}>{item.headline}</Text>
					<Text style={styles.caption} numberOfLines={1}>{item.description}</Text>
				</View>
				<View style={[styles.arrows, { backgroundColor: arrowsHue }]}>
					<YIcon name="arrw-right-slender" style={styles.arrowIcon} />
				</View>
			</View>
		);
	}

	renderItem(item, index) {
		if (!item.listImg) {
			return null;
		}	
		let firstSubject = {};
		if (index === 0) {
			firstSubject = {
				paddingTop: 0
			};
		}
		return (
			<Touchable
				type="highlight"
				onPress={
					() => {
						this.props.navigation.navigate("SubjectHome", { id: item.id });
					}}
			>
				<View style={[styles.backWrap, firstSubject]}>
					<Image source={{ uri: item.listImg}} style={[styles.backSubject]} />
					{/* {this.renderItemTag(item)} */}
				</View>
			</Touchable>
		);
	}

	render() {
		return (
			<Container style={styles.container} >
				<Nav hideLeftIcon={true} title="专题" rightComponent={<SearchIcon />}></Nav>
				<FlowList
					request={"/services/app/v1/subject/discover"}
					disabledPage={true}
					enableCacheFirstPage={true}
					renderItem={({ item, index }) => this.renderItem(item, index)}
				/>
			</Container>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	// tag: {
	// 	...inlineWrap,
	// 	height: transformSize(143),
	// 	marginHorizontal: transformSize(180),
	// 	marginTop: transformSize(-118),
	// 	backgroundColor: 'transparent',
	// 	elevation: 3,
	// 	shadowColor: "black",
	// 	shadowOffset: { width: 0, height: transformSize(5) },
	// 	shadowOpacity: 0.1,
	// 	shadowRadius: transformSize(12),
	// 	borderRadius: transformSize(5),
	// },
	// content: {
	// 	flex: 1,
	// 	backgroundColor: "#5fb4f1",
	// 	paddingLeft: transformSize(40),
	// 	marginRight: transformSize(-150),
	// 	justifyContent: 'space-around',
	// 	paddingVertical: transformSize(15),
	// 	borderRadius: transformSize(5),

	// },
	// title: {
	// 	fontSize: transformSize(52),
	// 	fontWeight: 'bold',
	// 	color: "#fff",
	// },
	// caption: {
	// 	fontSize: transformSize(36),
	// 	fontWeight: '200',
	// 	color: "#fff",
	// },
	// arrows: {
	// 	width: transformSize(160),
	// 	...centerWrap,
	// 	backgroundColor: "#7bd673",
	// 	borderTopRightRadius: transformSize(5),
	// 	borderBottomRightRadius: transformSize(5),
	// },
	// arrowIcon: {
	// 	color: "#fff",
	// 	fontSize: transformSize(82)
	// },
	backWrap: {
		// paddingTop: transformSize(48),
		// paddingBottom: transformSize(25),
	    paddingVertical: transformSize(15),
		backgroundColor: 'white',
		// ...padder
	},
	backSubject: {
		width: '100%',
		height: transformSize(600),
		flex: 1,
		// borderRadius: transformSize(42),
		overlayColor: '#fff',
	}
});