
# 1. 约定
错误返回code：'-100'；取消返回code：'-101'；

## 2. shareSDK

### 2.1 三方登录


#### 入参
| 类型		 	  | 说明				|
| ---		   		| ---				|
| `String`	   	    | 平台识别码	|

#### 平台识别码
| 平台		 	  | 识别码				|
| ---		   		| ---				|
| qq登录	   	    | 'qq'	|
| 新浪微博登录	   	    | 'sinaWeibo'	|
| 微信登录	   	    | 'wechat'	|


```js
  NativeModules.YShareSDK.authorizeLogin("wechat").then(
            (result) => {
                // ToastAndroid.show("Promise收到消息:" + result, ToastAndroid.SHORT)
                console.log(result)
                console.log('token: ', data.token)
                console.log('userId: ', data.user_id)
            }
        ).catch((error) => {
            console.log(error)
        });
```

### 2.2 三方分享

#### 入参
| 类型		 	  | 说明				|
| ---		   		| ---				|
| `String`	   	    | 平台名称	|
| `String`	   	    | 分享title	|
| `String`	   	    | 分享内容	|
| `String`	   	    | 分享链接	|
| `String`	   	    | 分享imgUrl	|


#### 平台识别码
| 平台		 	  | 识别码				|
| ---		   		| ---				|
| qq好友分享	   	    | qq	|
| qq朋友圈分享	   	    | qZone	|
| 微信好友分享	   	    | wechat	|
| 微信朋友圈分享	   	    | wechatMoment	|
| 微博分享	   	    | sinaWeibo	|
| 微信登录	   	    | wechat	|
```js
    wechatShare() {
        NativeModules.YShareSDK.share("wechat","wechatTitle","wechatText","www.baidu.com"，“http://www.xxx.png”).then(
            (result) => {
                // ToastAndroid.show("Promise收到消息:" + result, ToastAndroid.SHORT)
                console.log(result)
            }
        ).catch((error) => {
            console.log(error)
        });
    }
```
### 2.3  判断app是否安装

#### 入参
| 类型		 	  | 说明				|
| ---		   		| ---				|
| `String`	   	    | 平台识别码	(同上)|
#### 返回
| 类型		 	  | 说明				|
| ---		   		| ---				|
| `Boolean`	   	    | true -> 安装 ; false -> 未安装|

```js
await YShareSDK.isClientInstalled("qq");
```


## 3.诸葛IO
### 3.1 打开诸葛IO
```js
NativeModules.YZhugeIo.open()
```
### 3.2 埋点统计
#### 入参
| 类型		 	  | 说明				|
| ---		   		| ---				|
| `String`	   	    | 事件名称	|
| `Object`	   	    | 对应埋点key-value	|

```js
NativeModules.YZhugeIo.track("事件名称",{userId:"uabc",jpushId:"j12345","事件key":"事件value"});
```
### 3.3 关闭诸葛IO
```js
NativeModules.YZhugeIo.close()
```

## 4.oss

```js
let picArray = ['onePicUri','twoPicUri'];
let ossDir ='headImage/';
NativeModules.YOSS.requestOSS(picArray, ossDir);
```

#### 入参
| 类型		 	  | 说明				|
| ---		   		| ---				|
| `Array`	   	    | 图片uri路径（例：let picArray = ['onePicUri','twoPicUri'] ），该uri为expo调用选择图片方法返回	|
| `String`	   	    | ossDir (例：头像 -> 'headImage/' );注意携带‘／’|

#### 返回
| 类型		 	  | 说明				|
| ---		   		| ---				|
| `Array`	   	    | 图片url (例：['http://xxxxx.jpg','http://xxxxx.jpg'])	|

## 5.加载动画
```js
<YLoadingView style={styles.image}/>
```

