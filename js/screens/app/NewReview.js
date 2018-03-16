import React from 'react';
import {
	StyleSheet,
	LayoutAnimation,
	Platform,
} from 'react-native';
import {
	http,
	Validator
} from '@services';
import {
	Container,
	Nav,
	Content,
	View,
	Text,
	Input,
	StarRating,
	Button,
	withUser
} from '@components';
import Logo from './components/Logo';
import PopApps from './components/PopApps';
import styles from '@styles';

function testText(value) {
	const length = value.trim().length;
	return length >= 10 && length <= 140;
}

const validator = new Validator({
	text: [
		{
			rule: 'required',
			message: '请输入内容'
		},
		{
			test: testText,
			message: '请输入 10-140 字'
		}
	]
});
const maxLength = 140;

@withUser()
class NewReview extends React.Component {
	render() {
		const done = this.state.done;
		const bodyStyle = done ? style.bodyAfterDone : null;
		const scrollContentStyle = !done ? style.scrollContent : null;
		const navRight = done || (
			<Button disabled={!testText(this.state.text)} onPress={this.handleSubmit.bind(this)} style={style.submitTrigger}>
				<Text>发布</Text>
			</Button>
		);

		return (
			<Container>
				<Nav title="发布点评" rightComponent={navRight}></Nav>
				<Content
					keyboardShouldPersistTaps="handled"
					keyboardDismissMode="interactive"
					style={bodyStyle}
					contentContainerStyle={scrollContentStyle}
				>
					{this.renderCover()}
					{this.renderInput()}
					{this.state.done && this.renderPopApps()}
				</Content>
			</Container>
		);
	}

	renderPopApps() {
		return <PopApps />;
	}

	renderCover() {
		const coverStyle = [style.cover];

		let tip = '给它评个分吧';
		let ratingDisabled = false;

		if (this.state.done) {
			coverStyle.push(style.coverAfterDone);
			tip = '感谢您的点评！';
			ratingDisabled = true;
		}

		return (
			<View style={coverStyle}>
				{this.renderLogo()}
				<View><Text style={style.tip}>{tip}</Text></View>
				<StarRating rating={this.state.rating} disabled={ratingDisabled} onStarChange={this.handleRatingChange.bind(this)} />
			</View>
		);
	}

	renderLogo() {
		return !this.state.done && Platform.select({
			'ios': null,
			'android': <Logo uri={this.state.appData.appliIcon} style={style.logo} />
		});
	}

	renderInput() {
		return this.state.done ? null : (
			<View style={style.input}>
				<Input
					multiline
					placeholder="请输入点评"
					maxLength={maxLength}
					onChangeText={this.handleChangeText.bind(this)}
					style={style.inputControl}
				/>
				<Text style={style.count}><Text style={style.currentCount}>{this.state.text.length}</Text>/{maxLength}</Text>
			</View>
		);
	}

	handleRatingChange(rating) {
		this.setState({
			rating
		});
	}

	handleChangeText(text) {
		this.setState({
			text
		});
	}

	async handleSubmit() {
		const text = this.state.text;
		await validator.validate([
			{
				name: 'text',
				value: text
			}
		]);
		await http.post('/services/app/v1/comment/publish', {
			appId: this.appId,
			comment: text,
			starLevel: this.state.rating,
		});

		if (Platform.OS === 'ios') {
			LayoutAnimation.easeInEaseOut();
		}

		this.setState({
			done: true
		});
	}

	async getData() {
		this.setState({
			appData: (await http(`/services/app/v1/application/base/${this.appId}`)).data.data
		});
	}

	componentWillMount() {
		this.getData();
	}

	state = {
		appData: {},
		done: false,
		text: '',
		rating: 4
	};
	appId = this.props.navigation.state.params.appId;
}

const style = StyleSheet.create({
	bodyAfterDone: {
		backgroundColor: 'white'
	},
	scrollContent: {
		// Hack for Android since keyboard avoiding doesn't work here.
		minHeight: Platform.OS === 'android' ? '120%' : undefined
	},
	cover: {
		alignItems: 'center',
		paddingTop: styles.transformSize(50),
		paddingBottom: styles.transformSize(70),
		backgroundColor: 'white',
		marginBottom: styles.transformSize(33)
	},
	coverAfterDone: {
		paddingTop: styles.transformSize(136),
		paddingBottom: styles.transformSize(136),
	},
	logo: {
		marginBottom: styles.transformSize(80)
	},
	tip: {
		fontSize: styles.transformSize(60),
		marginBottom: styles.transformSize(65)
	},
	input: {
		padding: styles.transformSize(50),
		backgroundColor: 'white'
	},
	inputControl: {
		height: Platform.select({
			'ios': styles.transformSize(440),
			'android': styles.transformSize(640),
		}),
		fontSize: styles.transformSize(56),
		textAlignVertical: 'top',
		paddingLeft: 0,
		paddingRight: 0,
	},
	count: {
		alignSelf: 'flex-end',
		fontSize: styles.transformSize(42),
		color: '#aaa',
		marginTop: styles.transformSize(20)
	},
	currentCount: {
		fontSize: styles.transformSize(42),
		color: styles.textSecondaryColor
	},
});

export default NewReview;