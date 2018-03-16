import React from 'react';
import PropTypes from 'prop-types';
import {
	LayoutAnimation,
	StyleSheet
} from 'react-native';
import {
	Article as ArticleComponent,
	Container,
	Content,
	Nav,
	AppBar,
	Button,
	YIcon,
	ActionSheet,
	Loading,
	Touchable,
	Image,
	View,
	withNavigation,
} from '@components';
import {
	share,
	http,
	sign
} from '@services';
import styles from '@styles';
import {
	YZhugeIo,
	Constants
} from '@ydk';
import ActionBar from '../ActionBar';
import Bubble from '../Bubble';
import platform from './platform';
import pop from '@assets/images/pop.png';

@withNavigation
class ArticlePage extends React.Component {
	render() {
		return (
			<Container style={style.main}>
				{this.renderHead()}
				{this.renderBody()}

			</Container>
		);
	}

	renderHead = () => {
		const data = this.props.data || {};
		const article = data.article || {};

		const menuTrigger = (
			<Button transparent onPress={this.openMenu} style={{width: 100}}>
				{this.renderActionBar()}
				<YIcon name="more" size={styles.transformSize(60)} />
			</Button>
		);

		return <Nav title={this.state.scrolledAway && article.title} rightComponent={menuTrigger} style={style.nav}></Nav>;
	};

	renderBody = () => {
		if (!this.props.data) {
			return <Loading />;
		}

		return (
			<View style={style.body}>
				<Content scrollEventThrottle={16} onScroll={this.handleScroll}>
					{this.renderArticle(this.props.data)}
				</Content>
				{this.state.scrolledAway && this.renderFixedApp()}
			</View>
		);
	};

	renderArticle = (data) => {
		const { article } = data;
		return (
			<ArticleComponent
				id={article.id}
				title={article.title}
				contentSource={article.contentSource}
				beforeContent={this.renderBeforeContent(data)}
				style={style.article}
			/>
		);
	};

	renderFixedApp = () => {
		return platform.renderFixedApp.call(this);
	};

	renderBeforeContent = (data) => {
		return data.appInfo
			? <AppBar key="appBar" data={Object.assign({}, data.appStatictis, data.appInfo)} touchableStyle={style.appBar} />
			: null;
	};

	renderActionBar = () => {
		const data = this.props.data;

		if (!data) {
			return null;
		}
		const app = data.appInfo || {};
		const appStatistics = data.appStatictis || {};
		const article = data.article;

		return (
			<ActionBar
				context="article"
				appId={app.id}
				articleId={article.id}
				reviewCount={appStatistics.commentCount}
				followCount={data.articleFollowCount}
				followed={data.articleFollowFlag === 1}
				onFollowed={this.props.onFollowed}
			/>
		);
	};

	renderReviewBubble = () => {
		const text = [
			'看完文章',
			'发表一下感想吧'
		];
		return <Bubble text={text} style={style.reviewBubble} />;
	};

	handleScroll = (e) => {
		const scrolledAway = e.nativeEvent.contentOffset.y >= styles.transformSize(400);

		if (scrolledAway !== this.state.scrolledAway) {
			LayoutAnimation.easeInEaseOut();
			this.setState({
				scrolledAway
			});
		}

		const nativeEvent = e.nativeEvent;

		if (
			nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height >= nativeEvent.contentSize.height
			&& !this.state.shouldShowReviewBubble
		) {
			this.setState({
				shouldShowReviewBubble: true
			});
		}
	};

	openMenu = () => {
		ActionSheet.show({
			options: [
				'分享',
				'举报',
				'免责声明',
				'取消',
			],
			cancelButtonIndex: 3
		}, (index) => {
			switch (Number(index)) {
				case 0: {
					this.share();
					break;
				}

				case 1: {
					this.props.navigation.navigate('YWebView', {
						url: 'http://youranyizhi.mikecrm.com/jQuV4xR'
					});
					break;
				}

				case 2: {
					this.props.navigation.navigate('YWebView', {
						url: `${Constants.webBaseUrl}/disclaimer`
					});
					break;
				}
			}
		});
	};

	share = () => {
		const {
			appInfo: app,
			article: data
		} = this.props.data;
		share.open({
			title: `【${app.appliName}】${data.title}`,
			content: data.description,
			image: data.imgUrl.split(',')[0] || app.appliIcon,
			url: `${Constants.webBaseUrl}/articleShare/${data.id}`
		});
		// 埋点
		YZhugeIo.track('分享', {
			'分享主题': data.title,
			'分享链接': `${Constants.webBaseUrl}/appShare/${data.id}`
		});
	};

	toApp = () => {
		this.props.navigation.navigate('App', {
			id: this.props.data.appInfo.id
		});
	};

	state = {
		scrolledAway: false,
		shouldShowReviewBubble: false,
	};

	static propTypes = {
		data: PropTypes.object
	};
}

const style = StyleSheet.create({
	main: {
		width: styles.screenWidth,
		height: '100%'
	},
	nav: {
		borderBottomWidth: 0
	},
	body: {
		flex: 1,
		paddingBottom: styles.padding,
		backgroundColor: 'white',
	},
	article: {
		paddingTop: 0
	},
	appBar: {
		marginBottom: styles.transformSize(40)
	},
	pop: {
		maxWidth: '100%'
	},
	reviewBubble: {
		left: styles.transformSize(90),
		bottom: styles.transformSize(130)
	}
});

export default ArticlePage;