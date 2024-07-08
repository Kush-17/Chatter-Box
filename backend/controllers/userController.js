const User = require('../model/userModel');
const bcrypt = require('bcrypt');


module.exports.register = async (req,res,next)=>{
    // console.log(req.body)
   try {
    const { username, email, password } = req.body;

    const usernameUniqueCheck = await User.findOne({ username });

    if (usernameUniqueCheck)
      return res.json({ msg: "Username already exists", status: false });

    const emailUniqueCheck = await User.findOne({ email });
    if (emailUniqueCheck)
      return res.json({ msg: "Email already exists", status: false });

    // hashing the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password,salt);

    const user = User({
        username,
        email,
        password: hashedPassword,
    })

    await user.save();

    

    delete user.password;
    return res.json({ status: true, user });

  } catch (ex) {
    next(ex);
  }
}


module.exports.login = async (req,res,next)=>{
    // console.log(req.body)
   try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect username or password", status: false });

    // here we compare the passwords
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect username or password", status: false });
    // hashing the password
    

    delete user.password;
    return res.json({ status: true, user });

  } catch (ex) {
    next(ex);
  }
}

module.exports.setAvatar = async (req,res,next)=>{
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId,{
      isAvatarImageSet:true,
      avatarImage
    })
    return res.json({
      isSet:userData.isAvatarImageSet,
      image:userData.avatarImage})
  } catch (ex) {
    next(ex)  
  }
}

module.exports.allUsers = async (req,res,next)=>{
  try {
    // send all users except the current user id
    const users = await User.find({_id:{$ne:req.params.id}}).select([
      "email",
      "username",
      "avatarImage",
      "_id"
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex)
  }
}
