const asynch= (requestHandle)=>{
    (req,res,next) => {
        Promise.resolve(requestHandle(req,res,next)).catch((err)=> next(err))
        
    }
}



export default asynch;


