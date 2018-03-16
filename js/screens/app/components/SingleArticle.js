import React from 'react';
import PropTypes from 'prop-types';
import {
	ContentSource,
	Message,
} from '@components';
import {
	http
} from '@services';

class SingleArticle extends React.Component {
	render() {
		const data = this.state.data;

		if (typeof data === 'undefined') {
			return null;
		}

		if (!data) {
			return <Message type="no-data" />;
		}

		return <ContentSource data={data.article.contentSource} />;
	}

	componentWillMount() {
		this.getData();
	}

	getData = async () => {
		this.setState({
			data: (await http(`/services/app/v1/article/single/${this.props.appId}/${this.props.columnId}`)).data.data
		});
	};

	state = {
		data: undefined
	};

	static propTypes = {
		appId: PropTypes.number,
		columnId: PropTypes.string
	};
}

export default SingleArticle;