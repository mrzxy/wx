// pages/index/detail.js

const ImgLoader = require('../../plugins/img-loader/img-loader.js')

var app = getApp()
Page({

    picNo: 0,
    /**
     * 页面的初始数据
     */
    data: {
        shoes : null,
        pics: [],
        showLoading: false
    },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad (options)
    {
        var context = this;
        // options.id = 26; 

        console.log(options);

        wx.getSystemInfo({
            success: function (res) {
                context.getShoesDetail({
                    id: options.id,
                    type: options.type,
                    w: res.screenWidth
                });
            }
        })
        
        //图片预加载组件
        this.imgLoader = new ImgLoader(this)
    },  

    getShoesDetail (params)
    {
        var context = this;
        params['h'] = 200;

        wx.request({
            
            url:  app.getRequestUrl('shoes-detail/'+params.id),
            data: params,

            success: function (res) {

                wx.setNavigationBarTitle({
                    title: res.data.name
                })

                const pics = res.data.pics.format.map(url => {
                    return {
                        url: url,
                        loaded: false
                    }
                })

                context.setData({
                    shoes: res.data,
                    pics: pics
                });

                //加载图片
                context.loadPics()
            }
        });
    },

    loadPics()
    {
        this.imgLoader = new ImgLoader(this, this.imageOnLoad.bind(this))
        //同时发起全部图片的加载
        this.data.pics.forEach(item => {
            this.imgLoader.load(item.url)
        })
    },

    imageOnLoad(err, data)
    {
        const pics = this.data.pics.map(item => {
            if (item.url == data.src) {
                item.loaded = true
                item.w = data.width
            }
            return item
        })
        this.setData({ pics })
    },


    //查看原图
    showSrcPic(e)
    {
        var current = e.target.dataset.src
        wx.previewImage({
            current: current,
            urls: this.data.shoes.pics.src,
            fail: function() {
            　　　　console.log('fail')
        　　　　 },
            complete: function () {
                console.info("点击图片了");
            },
       })
        return false;
    },
  

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage () {
        return {
            title: this.data.shoes.name
        }
    }
})