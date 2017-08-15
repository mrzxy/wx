let util = require('../../utils/util.js'),
    app = getApp()
Page({

    offset: 0,
    lockPullDown: false,

    data: {
        pageParam: {
            name: '',
            id: 0,
            bid: 0,
            sid: 0,
            kw: ''
        },
        type: 'shoes',
        showCategory: false,

        lists: [],
        categories: [],
    },

    onLoad()    
    {
        let context = this,
            pageParam = Object.assign(this.data.pageParam, {
                name: '全部品牌'
            }, app.globalData.pageParam);

        this.getList();

        //分类
        wx.request({
            url: app.getRequestUrl('cates'),
            success: function (res) {
                context.setData({
                    pageParam: pageParam,
                    categories: res.data
                })
            }
        })
    },

    getList(param)
    {
        let context = this;
        param = param || {}

        typeof param.new != 'undefined' && (context.offset = 0);

        //list
        wx.request({
            url: app.getRequestUrl('shoes'),
            data: {
                offset: context.offset,
                limit: 10,
                brand_id: this.data.pageParam.bid,
                series_id: this.data.pageParam.sid,
                w: 136,
                h: 97,
                keyword: this.data.pageParam.kw
            },
            success: function (res) {


                let lists = context.data.lists;
                lists = context.data.lists.concat(res.data)

                if (res.data.length < 1) {
                    context.setData({pullDownText: '——没有数据了^b^——'});
                    context.lockPullDown = true;
                    return ;
                }

                context.offset += res.data.length;

                context.setData({
                    lists
                })
            }
        })
    },

    //展开分类
    handleType(e)
    {
        this.setData({
            "showCategory": this.data.showCategory ? false : true
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


        app.globalData.pageParam = data;

        wx.reLaunch({
            url: "list"
        });
       
    },

    //下拉碰顶
    onPullDownRefresh()
    {
        wx.stopPullDownRefresh()
    },

    //上拉触底
    onReachBottom()
    {
        ! this.lockPullDown && this.getList();
    },

    search(e)
    {
        let value = e.detail.value.trim();
        if (! value) {
            return ;
        }
        app.globalData.pageParam = {
            name: '',
            id: 0,
            bid: 0,
            sid: 0,
            kw: value
        }

        wx.reLaunch({
            url: "list"
        });
    },

    //转发
    onShareAppMessage: function (res) {
        //TODO
        return {
            title: '球鞋库'
        }
    },
})