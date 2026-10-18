


const setCookies=async(res,age,sid,id,type,token)=>{
    if(!res || !age || !sid || !id || !type || !token){
        throw new Error("Please send all required data in function parameter")
    }
    try{
        const cookieOptions={
            httpOnly:true,
            secure:true,
            sameSite:'None',
            maxAge:age
        }
        res.cookie(type,token,cookieOptions);
        return "Cookie successfuly set"
    }catch(error){
        throw new Error;
    }
}

export {setCookies}