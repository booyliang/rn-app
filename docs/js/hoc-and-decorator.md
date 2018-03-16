# 高阶组件与装饰器

所谓的[高阶组件](https://reactjs.org/docs/higher-order-components.html)，其实就是特殊的高阶函数。

高阶函数是返回函数的函数，高阶组件是返回组件的函数。

因为调用高阶组件是传入一个组件，返回一个新组件，这种写法恰好符合装饰器（decorator）的语法，所以我们可以使用装饰器来调用高阶组件。

假设有一个高阶组件：

```jsx
function hoc(Component) {
    class NewComponent extends React.Component {
        render() {
            return <Component {...this.props} />;
        }
    }

    return NewComponent;
}
```

原本是这样调用：

```js
class MyComponent extends React.Component {
    // ...
}

export default hoc(MyComponent);
```

而使用装饰器我们可以这样：

```js
@hoc
class MyComponent extends React.Component {
    // ...
}

export default MyComponent;
```

因为 `@hoc` 实际上是在内部做了 `hoc(MyComponent)` 的处理。

## 装饰器语法的局限

有时候我们希望这个高阶组件传入更多参数：

```jsx
function hoc(Component, otherArgs) {
    class NewComponent extends React.Component {
        render() {
        	if (otherArgs) {
        		return null;
        	}

            return <Component {...this.props} />;
        }
    }

    return NewComponent;
}
```

那么就无法使用装饰器语法（装饰器函数只会被传入一个参数——装饰的目标），只能使用普通调用方式：

```js
hoc(MyComponent, otherArgs);
```

为了代码清晰，我们鼓励使用装饰器。而为了让大家方便地使用装饰器，上述这类高阶组件可能会进行一些变化：

```jsx
function hoc(otherArgs) {
    return (Component) => {
    	class NewComponent extends React.Component {
    	    render() {
    	        return <Component {...this.props} />;
    	    }
    	}

    	return NewComponent;
    };
}
```

改为返回高阶组件的高阶组件，这样一来我们可以如下调用：

```js
@hoc(otherArgs)
```

其实也就是 `hoc(otherArgs)(MyComponent)` 换了个写法而已。