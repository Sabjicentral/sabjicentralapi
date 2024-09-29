import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import env from "dotenv"
import { userExistModel } from "../../models/auth.model.js";

env.config()
export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const result=await userExistModel(email)
        if(result.length !=0){
            const user = result[0];
            const hash= user.password;
            bcrypt.compare(password, hash, function(err, result) {
                if(err){
                    console.log(err)
                    return res.status(500).json({message:"Something wrong in comparing"})
                }else{
                if(result){
                    const token = jwt.sign(
                        { userId: user.id, email: user.email, role: user.role },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: '1h' }
                      );
                  
                      // Construct profile image URL if available
                      let profileImageUrl = user.profile_url || null;
                    delete user.password;
                   return res.cookie('accessToken',token,{
                        httpOnly:true,
                    }).status(200).json({
                        message: 'Login successful',
                        // token,
                        user: {
                            id: user.id,
                            email: user.email,
                            role: user.role,
                            profileImageUrl,
                            name:`${user.first_name} ${user.middle_name} ${user.last_name}`
                          }
                        })
                }else{
                    return res.status(400).json({message:"Invalid Crediential"})
                }}
            });
        }else{
            return res.status(400).json({message:"User not registered"})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

export const adminLogin=async(req,res)=>{
    const { email, password } = req.body;
    // console.log(req.body);
    
  try {
    const users = await userExistModel(email)
    const user = users[0];

    if (user && user.role === 'admin' && await bcrypt.compare(password, user.password)) {
      // Create a JWT token for admin
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
       let profileImageUrl = user.profile_url || null;
       delete user.password;
      return res.cookie('accessToken',token,{
           httpOnly:true,
       }).status(200).json({
           message: 'Login successful',
           // token,
           user: {
               id: user.id,
               email: user.email,
               role: user.role,
               profileImageUrl,
               name:`${user.first_name} ${user.middle_name} ${user.last_name}`
             }
           })
    } else {
        return res.status(400).json({message:"No access"});
    }
  } catch (error) {
    console.log(err);
    
    return res.status(500).json({message:err.message})
  }
}


export const logout = async (req, res) => {
    try {
      res.clearCookie('accessToken', {
        httpOnly: true,
        sameSite: 'Strict',
      });
      console.log(res.clearCookie('accessToken', {
        httpOnly: true,
        sameSite: 'Strict',
      }));
      
      
      return res.status(200).json({
        message: 'Logout successful'
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
};
  