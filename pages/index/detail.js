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
        options.id = 26; 

        wx.getSystemInfo({
            success: function (res) {
                context.getShoesDetail({
                    id: options.id,
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
            url:  app.config.requestUrl+'/api/shoes-detail/'+params.id,
            data: params,

            success: function (res) {

                wx.setNavigationBarTitle({
                    title: res.data.name
                })

                const pics = res.data.pics.map(url => {
                    return {
                        url: url,
                        loaded: false
                    }
                })
                console.log(pics);

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
    },

    loadImages ()
    {
        //同时发起全部图片的加载
        this.data.pics.forEach(item => {
            this.imgLoader.load(item)
        })
    },

    imageOnLoad(err, data)
    {
        console.log('图片加载完成', err, data.src)

        const imgList = this.data.pics.map(item => {
            if (item == data.src)
                item.loaded = true
            return {
                url: item
                // lo
            }
        })
        this.setData({ imgList })
    },

    imageLoad (e) {  
        var context = this,
            picSize = this.data.picSize
        picSize[this.picNo] = {
            'w':e.detail.width
        }
        console.log(picSize)

        this.picNo += 1;

        setTimeout(function() {
            context.setData({  
                picSize : picSize,
                showLoading: true
            })  
        }, 2000);
    }  ,

  

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage () {
        return {
            title: this.data.title
        }
    }
})