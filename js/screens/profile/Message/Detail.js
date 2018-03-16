import React from 'react';
import {
	Content, Container, Nav, Article
} from '../../../components';
import { http } from '../../../services';

export default class Detail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: []
		};

	};
	getData = async () => {
		let res = await http(`/services/app/v1/notice/getNotice/${this.props.navigation.state.params}`);
		let data = res.data;
		if (data.code == '200') {
			this.setState({ data: data.data });
		}
	}

	componentDidMount() {
		this.getData();
	}


	render() {
		return (
			<Container>
				<Nav title='公告详情'></Nav>
				<Content style={{ backgroundColor: '#fff' }}>
					<Article title={this.state.data.title} content={this.state.data.content}></Article>
				</Content>
			</Container>
		);

	}

}