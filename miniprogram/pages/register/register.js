// register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    progress: false,
    userno: '',
    passwd: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  showTip: function (e) {
    console.log('showTip()~');
    var value = this.data.hidden;
    this.setData({
      hidden: !value
    })
  },
  //获取用户工号
  inputUserNo: function (e) {
    // console.log(e);
    this.setData({
      userno: e.detail.value
    })
  },

  //获取密码
  inputPasswd: function (e) {
    // console.log(e);
    this.setData({
      passwd: e.detail.value
    })
  },
  //注册用户
  register: function (e) {
    //show progress .
    this.setData({
      progress: true
    })


    var that=this;
    var userNo = that.data.userno;
    var passwd = that.data.passwd;

    //console.log("userNo:" + userNo + "\t" + "passwd:" + passwd)

    //send post request .
    // 初始化云
    wx.cloud.init({
      env: 'book-management-7dcca1',
      traceUser: true
    });
    // 初始化数据库

    const db=wx.cloud.database();
    db.collection('administrator').get({
      success:function(res){
        console.log(res.data);
        var userNoSet = [];
        for (var i = 0; i < res.data.length; i++) {
          userNoSet.push(res.data[i].userNo);
        }
        if ((userNoSet.indexOf(userNo)>=0)){
          wx.showToast({
            title: '用户已注册',
          })
          wx.redirectTo({
            url: '../login/login',
          })

        }else{

          db.collection('administrator').add(
            {
              data: {
                userNo: userNo,
                passwd: passwd
              },
              success: function (res) {
                console.log(res)
                console.log(res.errMsg);
                wx.showToast({
                  title: '注册成功',
                })
                wx.switchTab({
                  url: '../index/index',
                })

        }
      })
        }
      }

    })
  }

})