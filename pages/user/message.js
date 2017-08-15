let util = require('../../utils/util.js'),
    app = getApp()
Page({

    contentMinLimit: 5,

    data: {
        bgHeight: 456,      //iphone6s默认值
        user: {},
        formData: {
            
        }
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

        app.getUserInfo((raw) => {
            context.setData({user: raw})
        })
       
    },

    formSubmit (e)
    {
        let context = this,
            msg = '',
            data = e.detail.value

        if (! util.checkMobile(data.phone)) {
            msg = '请输入正确的手机号'
        }

        if (data.content.length < this.contentMinLimit) {
            msg = '请输入至少'+this.contentMinLimit+'个字符'
        }

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

        wx.request({
            url: app.getRequestUrl('guest-book'),
            data: data,
            method: 'POST',
            success: function(res){
                if (res.statusCode == 200) {
                    msg = res.data.msg
                    context.resetFormData()
                } else {
                    msg = '数据有误'
                }

                wx.showToast({
                    title: msg,
                    icon: 'success'
                })
            }
            
        })
    },

    //重置表单数据
    resetFormData()
    {
        this.setData({
            formData: {}
        })
    },

        //转发
    onShareAppMessage: function (res) {
        return {
            title: '留言&建议'
        }
    },
})