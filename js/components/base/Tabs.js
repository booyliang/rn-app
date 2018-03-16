import React from 'react';
import {
	StyleSheet,
	Animated,
	Platform,
} from 'react-native';
import {
	Tabs as NativeBaseTabs
} from 'native-base';
import {
	View
} from './';
import styles from '@styles';

class Tabs extends React.Component {
	render() {
		const locked = Platform.select({
			ios: false,
			android: true
		});
		const tabBarUnderlineStyle = [
			style.underline,
			{
				transform: [
					{
						scaleX: this.state.underlineScale
					}
				]
			},
			this.props.tabBarUnderlineStyle
		];

		return (
			<View onLayout={this.handleLayout.bind(this)} style={style.wrapper}>
				<NativeBaseTabs
					locked={locked}
					{...this.props}
					tabBarUnderlineStyle={tabBarUnderlineStyle}
					onChangeTab={this.handleChangeTab.bind(this)}
				/>
			</View>
		);
	}

	handleLayout(e) {
		if (this.props.onLayout) {
			this.props.onLayout(e);
		}

		this.rootWidth = e.nativeEvent.layout.width;
		this.updateUnderlineScale(this.props.initialPage || 0);
	}

	handleChangeTab(tabInfo) {
		this.updateUnderlineScale(tabInfo.i);

		if (this.props.onChangeTab) {
			this.props.onChangeTab(tabInfo);
		}
	}

	// 获取字母个数
	getLetterCount(str) {
		if (/[a-z]/i.test(str)) {
			return str.match(/[a-z]/ig).length;
		}
		return 0;
	}

	async updateUnderlineScale(tabIndex) {
		const tabs = this.props.children;
		const tab = tabs[tabIndex];

		if (!tab) {
			return;
		}

		let wordsWidth = tab.props.heading.length * styles.tabFontSize;
		const count = this.getLetterCount(tab.props.heading);
		if (count) {
			wordsWidth = wordsWidth - wordsWidth / tab.props.heading.length * count / 2;
		}
		Animated.timing(this.state.underlineScale, {
			toValue: wordsWidth / (this.rootWidth / tabs.length),
			duration: 300
		}).start();
	}

	state = {
		underlineScale: new Animated.Value(0)
	};
	rootWidth = 0;

	static propTypes = NativeBaseTabs.propTypes;
}

const underlineHeight = styles.transformSize(8);
const style = StyleSheet.create({
	wrapper: {
		flex: 1
	},
	underline: {
		height: underlineHeight,
		borderRadius: underlineHeight,
	}
});

export default Tabs;