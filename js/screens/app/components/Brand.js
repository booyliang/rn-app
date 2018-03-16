import React from 'react';
import PropTypes from 'prop-types';
import {
	ContentSource,
	Message,
} from '@components';
import {
	http
} from '@services';

class Brand extends React.Component {
	render() {
		const data = this.state.data;

		if (typeof data === 'undefined') {
			return null;
		}

		if (!data) {
			return <Message type="no-data" />;
		}

		return <ContentSource data={data.contentSource} />;
	}

	async getData() {
		this.setState({
			data: (await http(`/services/app/v1/application/brand/${this.props.id}`)).data.data
		});
	}

	componentWillMount() {
		this.getData();
	}

	state = {
		data: undefined
	};

	static propTypes = {
		id: PropTypes.number.isRequired
	};
}

export default Brand;