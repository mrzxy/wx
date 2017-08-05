//index.js
//获取应用实例
var app = getApp()
Page({

    offset: 0,
    lockPullDown: false,

    data: {
        pullDownText: '——下拉加载更多——',
        pageHeight: 0,
        lists: [
           
        ]
    },

    onLoad: function () {
        this.getSaleData([])
    },

    getSaleData: function(params) {
        const context = this
        wx.request({
            url: app.config.requestUrl+'/api/sale-calendar/',
            data: {
                offset: context.offset,
                limit: 10 
            },
            success: function (res) {
                if (res.data.length < 1) {
                    context.setData({pullDownText: '——已经拉到底了——'});
                    context.lockPullDown = true;
                    return ;
                }

                var lists = context.data.lists;
                lists = context.data.lists.concat(res.data)

                context.offset += res.data.length;
                context.setData({
                    lists: lists
                })
            }
        })
    },

    //下拉碰顶
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
    },

    //上拉触底
    onReachBottom: function () {
        ! this.lockPullDown && this.getSaleData([]);
    },

    //转发
    onShareAppMessage: function (res) {
        //TODO
        return {
            title: 'hi, 大姐姐',
            success: function (res) {
                //转发成功
                console.log('ok');
            },

            fail: function (res) {
                console.log(res)
            }
        }
    },


    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    }
    
})
