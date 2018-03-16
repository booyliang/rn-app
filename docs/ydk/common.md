# 1. 约定
错误返回code：'-100'；取消返回code：'-101'；


## 2.关闭启动页

```js
NativeModules.YCommon.closeLoadingPage()
```

## 3.打开启动页

```js
NativeModules.YCommon.showLoadingPage()
```

## 4.获得device信息

```js
NativeModules.YCommon.getDeviceInfo()
```
#### 返回
| 名称			| 类型		 	  | 说明				|
| ---			 | ---		   		| ---				|
| *`appVersion`	 | `String`	   	    | 当前版本号（例：1.0.1）	|
| *`deviceType`	 | `String`	   	    | android：2 ； ios ：1	|
| *`OS`	 | `String`	   	    | api版本	|
| *`ip`	 | `String`	   	    | ip地址	|
| *`deviceId`	 | `String`	   	    | 手机唯一识别码

## 5. 渠道码

```js
NativeModules.YCommon.channel
```
## 6. 红点

#### 入参
| 类型		 	  | 说明				|
| ---		   		| ---				|
| `Number`	   	    | 红点个数	|


```js
NativeModules.YCommon.changeBadgeCount(count)
```

## 7. 缓存

### 7.1 获得缓存大小

```js
NativeModules.YCommon.getCacheSize()
```

#### 返回
| 名称			| 类型		 	  | 说明				|
| ---			 | ---		   		| ---				|
| *`cacheSize`	 | `Number`	   	    | 缓存大小（单位：b）	|


### 7.2 清除缓存

```js
NativeModules.YCommon.clearCache()
```
## 8. 获得注册id

```js
NativeModules.YCommon.getRigsterId()
```

#### 返回
 类型		 	  | 说明				|
| ---		   		| ---				|
|* `String`	   	    | 极光注册id	|

## 10. 保存图片

### 入参
|类型		 	  	   | 说明				|
| ---		   		| ---				|
|* `Object`	   	    | 	|

```js
NativeModules.YCommon.saveImage({ uri : 'http://xxxxx.jpg' })
```

## 11. 设置壁纸（仅android）

### 入参
|类型		 	  	   | 说明				|
| ---		   		| ---				|
|* `Object`	   	    | 	|

```js
NativeModules.YCommon.setWallpaper({ uri : 'http://xxxxx.jpg' })
```