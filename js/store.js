import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
import rootReudcers from './reducers';
let store = createStore(rootReudcers, autoRehydrate());

export  class StoreProvider extends Component { 
	
	constructor(props) { 
		super(props);
	}
	state = {persistIsFinish: false}
	componentWillMount() { 
		persistStore(store, { storage: AsyncStorage }, () => { 
			this.setState({persistIsFinish: true});
		});
	}
	render() { 
		if (!this.state.persistIsFinish)
			return null;	
		return <Provider store={store}>{this.props.children}</Provider>;
	}
}


export default store;