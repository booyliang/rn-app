import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet
} from 'react-native';
import {
	AppBar,
	Article
} from '../';
import {
	http
} from '@services';
import styles from '@styles';

class AppArticle extends React.Component {
	render() {
		const {
			data
		} = this.state;

		if (!data) {
			return null;
		}

		return (
			<Article
				title={data.article.title}
				contentSource={data.article.contentSource}
				beforeContent={this.renderBeforeContent()}
			/>
		);
	}

	renderBeforeContent() {
		const {
			data
		} = this.state;
		return data.appInfo
			? <AppBar key="appBar" data={data.appInfo} style={style.appBar} />
			: null;
	}

	async getData() {
		this.setState({
			data: (await http(`/services/app/v1/article/${this.props.id}`)).data.data
		});
	}

	componentDidMount() {
		this.getData();
	}

	state = {
		data: null
	};

	static propTypes = {
		id: PropTypes.string.isRequired
	};
}

const style = StyleSheet.create({
	appBar: {
		marginBottom: styles.transformSize(50)
	},
});

export default AppArticle;