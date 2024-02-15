const user = require('../models/user');
const bcrypt = require('bcrypt');

const v1UserSelfGet = async (req,res,next)=>{
  if(Object.keys(req.body).length!=0){
    return res.setHeader("Cache-Control", "no-cache").status(400).json().end();
  }
  [username,password]= Buffer.from(req.headers.authorization.split(' ')[1],'base64').toString().split(':');
  const currentUser = await user.findOne({where:{username:username}});
  if(currentUser && await bcrypt.compare(password,currentUser.password)){
    res.setHeader("Cache-Control", "no-cache").status(200).json({
      "id": currentUser.id,
      "first_name": currentUser.first_name,
      "last_name": currentUser.last_name,
      "username": currentUser.username,
      "account_created": currentUser.account_created,
      "account_updated": currentUser.account_updated
    }).end()    
  }else{
    res.setHeader("Cache-Control", "no-cache").status(401).json().end();
  }
}
module.exports=v1UserSelfGet;