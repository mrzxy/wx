let util = require('../../utils/util.js');

Page({

    contentMinLimit: 5,

    data: {
        bgHeight: 456,      //iphone6s默认值
        user: {}
    },

    onLoad()    
    {
        let context = this

        //设置高度
        wx.getSystemInfo({
            success: function(res) {
                context.setData ({
                    bgHeight: res.windowHeight
                })
            }
        })
        wx.getUserInfo({
            success: function(res){
                context.setData({user: JSON.parse(res.rawData)})
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    },

    formSubmit (e)
    {
        let msg = '',
            data = e.detail.value

        // if (! util.checkMobile(data.phone)) {
        //     msg = '请输入正确的手机号'
        // }

        // if (data.content.length < this.contentMinLimit) {
        //     msg = '请输入至少'+this.contentMinLimit+'个字符'
        // }

        if (msg !== '') {
             wx.showToast({
                title: msg,
                icon: 'loading'
            })
            return false;
        }

        let o = this.data.user

        if (typeof this.data.user.nickName !== 'undefined') {
            data.wx_name = this.data.user.nickName
        }

        //TODO
        wx.request({
            url: 'https://URL',
            data: data,
            method: 'GET',
            success: function(res){
                // success
            }
            
        })
    }
})