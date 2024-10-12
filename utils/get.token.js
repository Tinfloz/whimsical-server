import jwt from "jsonwebtoken"

export function getJwtToken (id){
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:"120d"
    })
}