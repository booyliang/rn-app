import React from 'react';
import {
	Modal,
	StyleSheet,
	Animated,
} from 'react-native';
import {
	View,
	Button,
	YIcon,
	Text,
} from '@components';
import styles from '@styles';
import {
	YShareSDK
} from '@ydk';

class Share extends React.Component {
	render() {
		const targets = this.state.targetConfigs.map((target, index) => {
			const icon = target.icon;
			return (
				<Button key={index} transparent onPress={this.go(target.id)} style={style.target}>
					<YIcon name={icon.name} size={styles.transformSize(133)} color={icon.color} style={style.targetIcon} />
					<Text style={style.targetText}>{target.name}</Text>
				</Button>
			);
		});
		const maskStyle = [
			style.mask,
			{
				opacity: this.state.maskOpacity
			}
		];
		const panelStyle = [
			style.panel,
			{
				transform: [
					{
						translateY: this.state.panelTranslateY
					}
				]
			}
		];

		return (
			<Modal transparent visible={this.state.opened} onRequestClose={this.close} onShow={this.animateIn}>
				<Animated.Text style={maskStyle} onPress={this.close}></Animated.Text>
				<Animated.View onLayout={this.handlePanelLayout} style={panelStyle}>
					<View style={style.title}>
						<Text style={style.titleText}>分享到</Text>
					</View>
					<View style={style.targets}>
						{targets}
					</View>
					<Button block onPress={this.close} style={style.cancelTrigger}>
						<Text style={style.cancelTriggerText}>取消</Text>
					</Button>
				</Animated.View>
			</Modal>
		);
	}

	componentWillMount() {
		this.getTargetConfigs();
	}

	handlePanelLayout = (e) => {
		this.panelHeight = e.nativeEvent.layout.height;
	};

	getTargetConfigs = async () => {
		const defaultTargetConfigs = [
			{
				name: '微信好友',
				id: 'wechat',
				icon: {
					name: 'wechat-circle',
					color: '#31b482'
				},
				app: 'wechat'
			},
			{
				name: '朋友圈',
				id: 'wechatMoment',
				icon: {
					name: 'wechat-friend-circle',
					color: '#31b482'
				},
				app: 'wechat'
			},
			{
				name: '新浪微博',
				id: 'sinaWeibo',
				icon: {
					name: 'sina-circle',
					color: '#f2604d'
				},
				app: 'sinaWeibo'
			},
			{
				name: 'QQ 好友',
				id: 'qq',
				icon: {
					name: 'qq-circle',
					color: '#7eb9eb'
				},
				app: 'qq'
			},
			{
				name: 'QQ 空间',
				id: 'qZone',
				icon: {
					name: 'qq-space-circle',
					color: '#f2c424'
				},
				app: 'qq'
			},
		];
		const targetConfigs = [];

		for (config of defaultTargetConfigs) {
			if (await YShareSDK.isClientInstalled(config.app)) {
				targetConfigs.push(config);
			}
		}

		this.setState({
			targetConfigs
		});
	};

	go = (targetId) => async () => {
		const data = Object.assign({
			title: '悠然一指，App 的推广驿站',
			content: '从海量的 App 中找到属于自己的那个。'
		}, this.state.data);
		console.log('share data', {...data, targetId});
		await YShareSDK.share(targetId, data.title, data.content.slice(0, 60), data.url, data.image);
		this.resolve();
		this.close();
	};

	open = () => {
		this.setState({
			opened: true
		});
	};

	close = async () => {
		await this.animateOut();
		this.setState({
			opened: false
		});
	};

	createAnimation = (variable, value) => {
		return Animated.timing(variable, {
			toValue: value,
			duration: 250,
			useNativeDriver: true
		});
	};

	animateIn = () => {
		Animated.parallel([
			this.createAnimation(this.state.maskOpacity, 1),
			this.createAnimation(this.state.panelTranslateY, -this.panelHeight),
		]).start();
	};

	animateOut = () => {
		return new Promise((resolve, reject) => {
			Animated.parallel([
				this.createAnimation(this.state.maskOpacity, 0),
				this.createAnimation(this.state.panelTranslateY, 0),
			]).start(resolve);
		});
	};

	state = {
		opened: false,
		data: null,
		maskOpacity: new Animated.Value(0),
		panelTranslateY: new Animated.Value(0),
		targetConfigs: []
	};

	resolve = null;
	panelHeight = 0;
}

const style = StyleSheet.create({
	mask: {
		...styles.maskBackground,
		flex: 1
	},
	panel: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: '100%',
		backgroundColor: 'white'
	},
	title: {
		...styles.borderBottom,
		paddingVertical: styles.transformSize(50)
	},
	titleText: {
		textAlign: 'center'
	},
	targets: {
		...styles.inlineWrap,
		flexWrap: 'wrap',
		paddingVertical: styles.transformSize(55),
		paddingHorizontal: styles.toPercent(100),
	},
	target: {
		flexDirection: 'column',
		width: `${100 / 3}%`,
		paddingHorizontal: styles.transformSize(45)
	},
	targetIcon: {
		marginBottom: styles.transformSize(28)
	},
	targetText: {
		width: '100%',
		textAlign: 'center',
		color: styles.textPrimaryColor
	},
	cancelTrigger: {
		...styles.borderTop,
		paddingVertical: styles.transformSize(40),
		backgroundColor: 'white',
		borderRadius: 0
	},
	cancelTriggerText: {
		fontSize: styles.transformSize(52),
		textAlign: 'center',
		color: styles.textPrimaryColor
	}
});

export default Share;