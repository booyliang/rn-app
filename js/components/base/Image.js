import React from 'react';
import PropTypes from 'prop-types';
import {
	Image as ReactNativeImage,
	StyleSheet
} from 'react-native';
import url from 'url';
import placeholder from '@assets/images/logo-1.png';

class Image extends React.Component {
	render() {
		const source = this.props.source;
		const newProps = {
			source: typeof source === 'object'
				? Object.assign({
					cache: 'force-cache'
				}, source)
				: source,
			style: [s.main].concat(this.props.style)
		};

		if (this.state.loading) {
			Object.assign(newProps, {
				source: placeholder,
				resizeMode: 'center',
				style: newProps.style.concat(s.placeholder)
			});
		}

		if (this.props.maxWidth) {
			Object.assign(newProps, {
				style: newProps.style.concat(this.calcSize())
			});
		}

		return <ReactNativeImage {...this.props} {...newProps} ref={this.getRef} />;
	}

	async componentDidMount() {
		if (this.isRemote()) {
			const unmount = new Promise((resolve) => {
				this.resolveUnmounting = resolve;
			});
			const succeeded = await Promise.race([
				unmount,
				this.prefetch()
			]);

			if (succeeded) {
				this.setState({
					loading: false
				});
			}
		}
	}

	componentWillUnmount() {
		if (this.resolveUnmounting) {
			this.resolveUnmounting();
		}
	}

	setNativeProps(...args) {
		return this.ref.setNativeProps(...args);
	}

	getRef = (element) => {
		this.ref = element;
	};

	calcSize = () => {
		const maxWidth = this.props.maxWidth;
		let {
			width,
			height
		} = this.getOriginalSize();

		if (width > maxWidth) {
			height = height / width * maxWidth;
			width = maxWidth;
		}

		return {
			width,
			height
		};
	};

	getOriginalSize = () => {
		const query = url.parse(this.props.source.uri, true).query;
		return {
			width: Number(query.w),
			height: Number(query.h),
		};
	};

	prefetch = async () => {
		return await ReactNativeImage.prefetch(this.props.source.uri);
	};

	isRemote = () => {
		const source = this.props.source;

		if (typeof source === 'object') {
			const uri = source.uri;

			if (uri && uri.startsWith('http')) {
				return true;
			}
		}

		return false;
	};

	state = {
		width: 0,
		height: 0,
		loading: this.isRemote() && !this.props.placeholderDisabled
	};

	ref = null;
	resolveUnmounting = null;

	static propTypes = {
		...ReactNativeImage.propTypes,
		maxWidth: PropTypes.number,
		placeholderDisabled: PropTypes.bool
	};

	static defaultProps = {
		placeholderDisabled: false
	};
}

const s = StyleSheet.create({
	main: {
		overlayColor: 'white'
	},
	placeholder: {
		backgroundColor: '#f1f1f1'
	}
});

export default Image;