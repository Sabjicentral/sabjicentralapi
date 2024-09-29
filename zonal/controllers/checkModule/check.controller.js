import jwt from "jsonwebtoken"
import { getUserByIdModel } from "../../models/user.model.js";



export const check=async(req,res)=>{
    try {
        // const token = req.header('Authorization').replace('Bearer ', '');
        const token=req.cookies.accessToken;
        if(!token){
          return res.status(400).json({message:"LogIn first"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId=decoded.userId

        const user = await getUserByIdModel(userId)

        if(!user){
           return res.status(400).json({message:"User not exist"})
        }
        return res.status(200).json({
            user: {
                id: user[0].id,
                email: user[0].email,
                role: user[0].role,
                profileImageUrl:user[0].profileurl,
                name:`${user[0].first_name} ${user[0].middle_name} ${user[0].last_name}`
              }
    })
      } catch (error) {
        res.status(500).json({message:error.message});
      }
}