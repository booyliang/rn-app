const listeners = {};
export function on(key, listener) { 
	if (!listeners[key]) { 
		listeners[key] = [];
	}
	listeners[key].push(listener);

}
export function off(key, listener) { 
	if (!listeners[key]) { 
		return;
	}
	listeners[key] = listeners[key].filter(l => l === listener);
}
export function emit(key, ...rest) { 
	if (!listeners[key]) { 
		return;
	}
	for (let listener of listeners[key]) { 
		listener && listener.apply(null, rest);
	}
}