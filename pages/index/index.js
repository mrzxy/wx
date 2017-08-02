//index.js
//获取应用实例
var app = getApp()
Page({

    data: {
        pageHeight: 0,
        lists: [
            {
                name: 'Adidas Yeezy Powerphase Calabasas Core White',
                price: '1000~1500',
                pub_data: '2017-01-01'
            },
            {
                name: 'Ai VaporMax xxx Triple Black 2.0',
                price: '1300',
                pub_data: '2017-01-01'
            },
            {
                name: 'Ai VaporMax xxx Triple Black 2.0',
                price: '1300',
                pub_data: '2017-01-01'
            },
            {
                name: 'Ai VaporMax xxx Triple Black 2.0',
                price: '1300',
                pub_data: '2017-01-01'
            },
            {
                name: 'Ai VaporMax xxx Triple Black 2.0',
                price: '1300',
                pub_data: '2017-01-01'
            },
            {
                name: 'Ai VaporMax xxx Triple Black 2.0',
                price: '1300',
                pub_data: '2017-01-01'
            }
        ]
    },

    onLoad: function () {


       
    },

    //下拉碰顶
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
    },

    //上拉触底
    onReachBottom: function () {
        var context = this,
            lists = this.data.lists;
        lists.push(lists[Math.round(Math.random()*10%(lists.length))]);
        setTimeout(function () {
            context.setData({
                lists: lists
            })
        }, 2000)
    },

    //转发
    onShareAppMessage: function (res) {
    
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
