/**
 * @Author: MichaelChen <mymac>
 * @Date:   2017-10-26T16:43:16+08:00
 * @Email:  teacherincafe@163.com
 * @Project: one_server
 * @Filename: Blog.js
 * @Last modified by:   mymac
 * @Last modified time: 2017-11-26T16:45:24+08:00
 */
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 const ObjectId = mongoose.Schema.Types.ObjectId

 var inviteSchema = new Schema({
      invitecode: { type: String, default: ''},
      available: { type: Boolean, default: true}
 })

 module.exports = mongoose.model('Invite', inviteSchema);
