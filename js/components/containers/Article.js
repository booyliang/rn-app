import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	WebView
} from 'react-native';
import {
	Constants
} from '@ydk';
import {
	View,
	H1,
	Text,
	Album
} from '../';
import styles from '@styles';

class Article extends React.Component {
	render() {
		return (
			<View padder style={[style.main, this.props.style]}>
				<H1 style={style.title}>{this.props.title}</H1>
				{this.props.beforeContent}
				{this.renderContent()}
			</View>
		);
	}

	renderContent() {
		return this.props.contentSource && this.props.id
			? (
				<WebView
					source={{uri: `${Constants.webBaseUrl}/article-content/${this.props.id}`}}
					scrollEnabled={false}
					ref={ c=> this._webview = c}
					onMessage={this.handleWebViewMessage}
					style={{height: this.state.webViewHeight}}
				/>
			)
			: <Text style={style.content}>{this.props.content}</Text>;
	}

	handleWebViewMessage = (e) => {
		if (!e.nativeEvent.data) {
			return;
		} 
		try {
			const message = JSON.parse(e.nativeEvent.data);
			switch (message.type) {
				case 'height-change': {
					// this.setState({
					// 	webViewHeight: message.data
					// });
					// console.log({ style: { height: message.data } })
					console.log(typeof this._webview.refs.webview);
					
					this._webview.refs.webview.setNativeProps({ style: { height: message.data } });
					break;
				}
	
				case 'preview-images': {
					Album.open(message.data);
					break;
				}
			}
		} catch (ex) { 
			console.log(ex, e.nativeEvent.data)
		}
		
	};

	state = {
		webViewHeight: 0
	};

	static propTypes = {
		id: PropTypes.number,
		title: PropTypes.string,
		content: PropTypes.string,
		contentSource: PropTypes.string,
		beforeContent: PropTypes.node
	};

	static defaultProps = {
		beforeContent: null
	};
}

const style = StyleSheet.create({
	main: {
		paddingVertical: styles.transformSize(55),
		backgroundColor: 'white'
	},
	title: {
		fontSize: styles.transformSize(72),
		lineHeight: styles.transformSize(92),
		marginBottom: styles.transformSize(55)
	},
	content: {
		fontSize: styles.transformSize(56),
		lineHeight: styles.transformSize(92),
	},
});

export default Article;