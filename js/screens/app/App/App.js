import React from 'react';
import {
	StyleSheet,
	LayoutAnimation,
	Linking,
	Platform
} from 'react-native';
import {
	Container,
	Nav,
	View,
	Button,
	Text,
	H1,
	Image,
	Tabs,
	Tab,
	ScrollView,
	YIcon,
	Loading,
} from '@components';
import {
	http,
	share
} from '@services';
import {
	cache,
} from '@utils';
import {
	Constants, YZhugeIo, YCommon
} from '@ydk';
import styles from '@styles';
import Brand from '../components/Brand';
import ArticleTabs from '../components/ArticleTabs';
import Reviews from '../components/Reviews';
import SingleArticle from '../components/SingleArticle';
import ActionBar from '../components/ActionBar';
import Bubble from '../components/Bubble';
import platform from './platform';

class App extends React.Component {
	render() {
		return (
			<Container style={style.screen}>
				{this.renderHead()}
				{this.state.followed && this.renderShareBubble()}
				{this.renderBody()}
				{this.renderFoot()}
			</Container>
		);
	}

	renderHead() {
		return platform.renderHead.call(this);
	}

	renderShareBubble() {
		const text = [
			'分享给好友',
			'一起关注吧',
		];
		return <Bubble type="bottom" text={text} style={style.shareBubble} />;
	}

	renderBody() {
		const data = this.state.data;

		if (typeof data === 'undefined') {
			return <Loading />;
		}

		if (!data) {
			return null;
		}

		return (
			<View style={style.body}>
				{this.renderCover()}
				{this.renderTabs()}
			</View>
		);
	}

	renderCover() {
		return platform.renderCover.call(this);
	}

	renderTabs() {
		const tabs = this.state.menu.map((item) => (
			<Tab
				key={item.id}
				heading={item.name}
				style={style.tab}
				activeTextStyle={style.activeTabBarItemText}
			>
				{this.renderTabPage(item)}
			</Tab>
		));

		return (
			<Tabs
				onLayout={this.handleTabsLayout.bind(this)}
				tabBarUnderlineStyle={style.tabBarUnderline}
			>
				{tabs}
			</Tabs>
		);
	}

	renderTabPage(menuItem) {
		const columnId = menuItem.columnId;
		const scrollContentContainerStyle = Platform.select({
			'ios': style.scrollContentContainer,
			'android': [
				style.scrollContentContainer,
				this.state.scrollDirection === 'down' ? style.overflowScrollContentContainer : null
			]
		});

		switch (menuItem.moduleId) {
		case '2': {
			return <ArticleTabs
				appId={this.id}
				columnId={columnId}
				{...this.scrollHandlers}
			/>;
		}

		case '3': {
			return (
				<Reviews
					appId={this.id}
					count={(this.state.data.appStatictis || {}).commentCount}
					{...this.scrollHandlers}
					onRefreshed={this.handleReviewsRefreshed}
				/>
			);
		}

		case '4': {
			return (
				<ScrollView
					scrollEventThrottle={16}
					{...this.scrollHandlers}
					style={styles.padder}
					contentContainerStyle={scrollContentContainerStyle}
				>
					<SingleArticle
						appId={this.id}
						columnId={columnId}
					/>
				</ScrollView>
			);
		}
		}
	}

	renderFoot() {
		const data = this.state.data;

		if (!data) {
			return null;
		}

		return (
			<ActionBar
				context="app"
				appId={this.id}
				reviewCount={data.appStatictis.commentCount}
				followCount={data.appStatictis.appSum}
				followed={data.followFlag === 1}
				onFollowed={this.handleFollowed}
			/>
		);
	}

	handleTabsLayout(e) {
		if (this.tabsOffsetY) {
			return;
		}

		this.tabsOffsetY = e.nativeEvent.layout.y;
	}

	async getData() {
		let response = await http(`/services/app/v1/application/base/${this.id}`);
		return response.data.data;
	}

	async getMenu() {
		return (await http('/services/app/v1/menu/list')).data.data;
		// this.setState({
		// 	menu:
		// });
	}

	async componentWillMount() {
		const [
			data,
			menu
		] = await Promise.all([
			this.getData(),
			this.getMenu()
		]);
		this.setState({
			data,
			menu
		}, () => {
			YZhugeIo.track('应用打开', {
				'应用名称': this.state.data.appliName,
			});
		});
	}

	handleTabContentScrollEndDrag = (e) => {
		if (this.state.scrollDirection !== 'down' && e.nativeEvent.contentOffset.y > 0) {
			LayoutAnimation.easeInEaseOut();
			this.setState({
				scrollDirection: 'down'
			});
		} else if (this.state.scrollDirection !== 'up' && e.nativeEvent.contentOffset.y <= 0) {
			this.scrollUp();
		}
	};

	scrollUp = () => {
		LayoutAnimation.easeInEaseOut();
		this.setState({
			scrollDirection: 'up'
		});
	};

	share = async () => {
		const data = this.state.data;
		await share.open({
			title: data.slog,
			content: data.description || data.slog,
			image: data.appliIcon,
			url: `${Constants.webBaseUrl}/appShare/${this.id}`
		});

		this.countShare();
		// 埋点
		YZhugeIo.track('分享', {
			'分享主题': data.appliName,
			'分享链接': `${Constants.webBaseUrl}/appShare/${this.id}`
		});

	};

	countShare = () => {
		http.get(`/services/app/v1/application/share/${this.id}`);
	};

	handleFollowed = () => {
		this.setState((state) => Object.assign({}, state, {
			data: Object.assign({}, state.data, {
				followFlag: 1,
				appStatictis: Object.assign({}, state.data.appStatictis, {
					appSum: state.data.appStatictis.appSum + 1
				})
			}),
			followed: true
		}));
	};

	download = () => {
		const links = JSON.parse(this.state.data.downloadLink);
		const matchedLink = links[YCommon.channel];
		Linking.openURL(matchedLink || links['YRYZAPP-YYB']);
		this.countDownload();
		YZhugeIo.track('下载', {
			'应用名称': this.state.data.appliName
		});
	};

	countDownload = () => {
		http.get(`/services/app/v1/application/download/${this.id}`);
	};

	handleReviewsRefreshed = (data) => {
		const appData = this.state.data;
		appData.appStatictis.commentCount = data.count;
		this.setState({
			data: appData
		});
	};

	state = {
		data: undefined,
		menu: [],
		scrollDirection: undefined,
		followed: false
	};

	id = this.props.navigation.state.params.id;
	tabsOffsetY = 0;
	scrollHandlers = Platform.select({
		'ios': {
			onScrollEndDrag: this.handleTabContentScrollEndDrag
		},
		'android': {
			onScrollEndDrag: this.handleTabContentScrollEndDrag,
			onRefresh: this.scrollUp
		}
	});
}

const style = StyleSheet.create({
	screen: {
		backgroundColor: 'white'
	},
	shareBubble: {
		right: styles.transformSize(30),
		top: styles.transformSize(180),
		zIndex: 2
	},
	body: {
		flex: 1,
		overflow: 'hidden',
		zIndex: Platform.OS === 'ios' ? undefined : 0
	},
	tab: {
		paddingVertical: styles.transformSize(40)
	},
	scrollContentContainer: {
		flexGrow: 1
	},
	overflowScrollContentContainer: {
		minHeight: '101%'
	},
	activeTabBarItemText: {
		color: styles.assistColor
	},
	tabBarUnderline: {
		backgroundColor: styles.assistColor
	}
});

export default App;