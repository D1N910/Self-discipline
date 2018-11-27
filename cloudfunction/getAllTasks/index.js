// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const userInfoOpenId = event.userInfo.openId
  const getAllTasks = event.allTasks
  let ifhave = await db.collection('allTasksList').where({
    openId: userInfoOpenId
  }).get()
  if (ifhave.data.length==0){
    await db.collection('allTasksList').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          dupDateue: new Date(),
          openId: userInfoOpenId,
          allTasks: getAllTasks
        }
      })
      return {
        status:1400,
        msg:'成功添加新记录'
      }
  }else{
    await db.collection('allTasksList').where({
      openId: userInfoOpenId
    }).update({
      data:{
        allTasks: getAllTasks
      }
    })

    return {
      status: 200,
      msg: 'Success UpDate'
    }
  }
}