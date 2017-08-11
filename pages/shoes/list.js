let util = require('../../utils/util.js'),
    app = getApp()
Page({

    data: {
        type: 'shoes',
        current: {
            'id': 0,
            'name': '全部品牌'
        },
        showCategory: false,
        hoverId: 0,

        lists: [],
        categories: [],
    },

    onLoad()    
    {
        let context = this;

        this.getList();

        //分类
        wx.request({
            url: app.getRequestUrl('cates'),
            success: function (res) {
                context.setData({
                    categories: res.data
                })
            }
        })
    },

    getList()
    {
        let context = this;
        //list
        wx.request({
            url: app.getRequestUrl('shoes'),
            data: {
                offset: 0,
                limit: 10,
                brand_id: this.data.current.bid,
                series_id: this.data.current.sid,
                w: 136,
                h: 97
            },
            success: function (res) {
                context.setData({
                    lists: res.data
                })
            }
        })
    },

    //展开分类
    handleType(e)
    {
        this.setData({
            "eventCategory": this.data.typeCategory,
            "showCategory": true
        });

    },

    //点击类别外的区域，取消显示类别信息
    handleCoverTap(e)
    {
        this.setData({ "showCategory": false });
    },

    tapCate(e)
    {
        let data = e.target.dataset
        //显示下一级
        if (data.action) {
            let o = this.data.categories[data.key];
            this.setData({
                "hoverId": o.id,
                "series": o.series,
            });
            return ;
        }

        if (data.id == this.data.current.id) {
            this.setData({ "showCategory": false });
            return ;
        }

        this.setCurrent(data);
        //确认跳转
       
    },

    setCurrent(data)
    {
        this.setData({
            current: {
                'id': data.id,
                'bid':data.bid,
                'sid':data.sid,
                'name': data.name,
            },
            hoverId: data.id,
            showCategory: false
        });

        this.getList();
    }
})