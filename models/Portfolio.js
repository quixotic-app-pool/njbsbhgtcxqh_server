/**
 * @Author: MichaelChen <mymac>
 * @Date:   2017-10-26T16:43:16+08:00
 * @Email:  teacherincafe@163.com
 * @Project: one_server
 * @Filename: Blog.js
 * @Last modified by:   mymac
 * @Last modified time: 2017-12-03T14:51:49+08:00
 */
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 const ObjectId = mongoose.Schema.Types.ObjectId

 var portfolioSchema = new Schema({
      imgurls: [{
        url: {type: String, default: ''},
        width: {type: Number, default: 0},
        height: {type: Number, default: 0}
      }],
      nickname: { type: String, default: ''},
      selfintro: { type: String, default: ''},
      gender: { type: String, default: ''},
      age: { type: String, default: ''},
      marriagestatus: { type: String, default: ''},
      height: { type: String, default: ''},
      weight: { type: String, default: ''},
      degree: { type: String, default: ''},
      shihaigui: { type: Boolean, default: false},
      college: { type: String, default: ''},
      major: { type: String, default: ''},
      city: { type: String, default: '南京'},
      salary: { type: String, default: ''},
      youfang: { type: Boolean, default: false},
      hometown: { type: String, default: ''},
      industry: { type: String, default: ''},
      companytype: { type: String, default: ''},
      created_time: { type: String, default: ''}
 })

 module.exports = mongoose.model('Portfolio', portfolioSchema);
