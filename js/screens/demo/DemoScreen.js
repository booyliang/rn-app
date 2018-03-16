import React from 'react';
import {
	StyleSheet,
} from 'react-native';
import {
	TagGroup,
	Tag,
	View,
	Touchable,
	Button,
	Text,
	Container,
	Header,
	Body,
	Title,
	Content,
	StarRating,
	Video,
	Anchor,
	withNavigation,
	withUser,
	ActionSheet,
	Toast,
	BrandPop,
} from '@components';
import {
	sign,
	share,
} from '@services';
import styles from '@styles';
import {YLoadingView, YPhotoBroswer, YCommon} from '@ydk';
// import { YCommon } from '@ydk';

const url = 'http://g.hiphotos.baidu.com/image/pic/item/03087bf40ad162d99c14f9d618dfa9ec8b13cd06.jpg';

@withNavigation
@withUser(false)
class DemoScreen extends React.Component {
	renderItem = (data) => {
		return <Text>{data}</Text>;
	}
	render() {
		return (
			<Container>
				<Header>
					<Body>
						<Title>Demo</Title>
					</Body>
				</Header>
				<Content padder style={{ backgroundColor: 'white' }}>
					{this.renderUser()}
					<BrandPop />
					<Video uri="http://bsyimg3.cdn.krcom.cn/static20131031/miaopai20140729/pc-static/video_01/topvideo1_03.mp4"
						poster="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507894062931&di=769e544b80011c3e8e8e260021c99882&imgtype=0&src=http%3A%2F%2Fimglf2.ph.126.net%2FCEea1WAMb9v4DqlKPLPpIQ%3D%3D%2F2025493932510038657.jpg" />
					<StarRating rating={this.state.rating} onStarChange={this.handleStarChange} />
					<Anchor href="https://baidu.com" title="百度一下"><View><Text>open webview</Text></View></Anchor>
					{/* <FlowList requst="/api/getuser" renderItem={this.renderItem}></FlowList>*/}
					<TagGroup>
						<Tag>标签</Tag>
						<Tag>标签</Tag>
					</TagGroup>
					<YLoadingView style={style.loading}/>
					{/* <YPhotoBroswer style={style.photo} url={url} onPress={this.onPress}/> */}
					<Button block><Text>按钮（块级）</Text></Button>
					<Button disabled><Text>按钮（禁用）</Text></Button>
					<Button onPress={this.openActionSheet}><Text>打开 action sheet</Text></Button>
					<Button onPress={this.share}><Text>分享</Text></Button>
					<Button onPress={this.signIn.bind(this)}><Text>登录</Text></Button>
					<Button onPress={this.signOut.bind(this)}><Text>退出</Text></Button>
					<Button onPress={this.signUp.bind(this)}><Text>注册</Text></Button>
					<Button onPress={this.updatePassword.bind(this)}><Text>修改密码</Text></Button>
					<Button onPress={this.toApp.bind(this)}><Text>应用详情</Text></Button>
					<Button onPress={this.toArticle.bind(this)}><Text>文章详情</Text></Button>
					<Touchable type="highlight" style={[style.touchable, styles.border]}>
						<Text style={[style.touchableText, {backgroundColor: 'white'}]}>Touchable (highlight)</Text>
					</Touchable>
					<Touchable style={style.touchable}>
						<Text style={style.touchableText}>Touchable (opacity)</Text>
					</Touchable>
					<Touchable type="nativeFeedback" style={style.touchable}>
						<Text style={style.touchableText}>Touchable (native feedback)</Text>
					</Touchable>
					<Touchable type="withoutFeedback" style={style.touchable}>
						<Text style={style.touchableText}>Touchable (without feedback)</Text>
					</Touchable>
					{/* <AppBar />*/}
					<Anchor href="https://baidu.com" title="百度一下"><View><Text>open webview</Text></View></Anchor>
				</Content>
			</Container>
		);
	}

	onPress() {
		alert('点击');
	}

	renderUser() {
		return <Text>{JSON.stringify(this.props.user, null, 2)}</Text>;
	}

	share() {
		share.open({
			title: 'Share title',
			content: 'I am sharing.',
			url: 'http://boring.wang/',
			image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509472305202&di=3b529e52fc17c510783f6da30ed5989a&imgtype=0&src=http%3A%2F%2Fa3.topitme.com%2F8%2Fa2%2Fea%2F11283095091f4eaa28o.jpg'
		});
	}

	signIn() {
		// sign.in();
		YCommon.saveImage('123');
	}

	signOut() {
		sign.out();
	}

	signUp() {
		sign.up();
	}

	updatePassword() {
		sign.updatePassword();
	}

	toApp() {
		this.props.navigation.navigate('App', {
			id: 1
		});
	}

	toArticle() {
		this.props.navigation.navigate('Article', {
			id: 11747644
		});
	}

	handleStarChange = (star) => {
		this.setState({
			rating: star
		});
	};

	openActionSheet = () => {
		ActionSheet.show({
			options: [
				'Action 1',
				'Action 2',
				'Cancel'
			],
			cancelButtonIndex: 2
		}, (index) => {
			Toast.show(index.toString());
		});
	};

	state = {
		rating: 1
	};
}

const style = StyleSheet.create({
	touchable: {
		marginVertical: 10
	},
	touchableText: {
		textAlign: 'center',
		padding: 10,
	},
	backgroundVideo: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: 'black',
		zIndex: 9999
	},
	loading: {
		top: 0,
		left: 0,
		width: 100,
		height: 100,
	},
	photo: {
		top: 0,
		left: 0,
		width: 200,
		height: 300,
	}
});

export default DemoScreen;