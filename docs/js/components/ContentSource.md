# 正文源内容

多用于富文本内容的展示。

## `props`

- `data`

JSON 格式的字符串。

类型：`PropTypes.string`。

格式：

```js
[
    // 文本
    {
        "text": String
    },

    // 图片
    {
        "image": String
    },

    // 视频
    {
        "video": {
            // 地址
            "url": String,

            // 缩略图地址
            "thumbnailImage": String,

            // 时长（ms）
            "videoTime": Number,

            // 尺寸（KB）
            "size": Number
        }
    }
]
```