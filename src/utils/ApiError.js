class ApiError extends Error {
    constructor (
        statuscode,
        message= "Something went Wrong",
        error= [],
        statck=""
    ){
        super(message)
        this.statuscode=statuscode
        this.date=null
        this.message=message
        this.success=false;
        this.error=error

        if(statck){
            this.stack=statck
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }

    }
    
}

export default ApiError