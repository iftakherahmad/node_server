const dbService=require('./dbservice.js');

module.exports.signup=(req,result)=>{
    data=req.body;
    personFinder={
        registrationNumber: req.body.registrationNumber,
        name: req.body.name,
        isResident:req.body.isResident,
        boadingCardNumber:req.body.boadingCardNumber,
        email:req.body.email
    }

    dbService.query(personFinder,"Students",{},false)
            .then((res)=>{
                if(res.length>0){
                    if(res[0].password===null){
                        //create account
                        dbService.updateEntry(personFinder,{password:req.body.password,phoneNo:req.body.phone,profilePicUrl:req.body.profilePicUrl},"Students")
                                .then((rr)=>{
                                    result.send({
                                        status:"success",
                                        message:"Account Created Succesfully.",
                                        username:req.body.registrationNumber,
                                        password:req.body.password
                                    })
                                })
                                .catch((errr)=>{
                                    result.send({
                                        status:"failed",
                                        message:"Something went wrong!"
                                    })
                                })
                    }
                    else{
                        result.send({
                            status:"failed",
                            message:"Account Already Exists"
                        })
                    }
                }
                else{
                    result.send({
                        status:"failed",
                        message:"You are not a valid student of this hall"
                    });
                }
            })
            .catch(err=>{
                result.send({
                    status: "failed",
                    message:"Something Went Wrong"
                })
            })

}

module.exports.signin=(req,result)=>{
    registrationNumber=req.body.registrationNumber;
    password=req.body.password;
    console.log("++++++++++++")
    console.log(req.body)
    
    dbService.query({registrationNumber: registrationNumber},"Students",{},true)
        .then((res)=>{
            if(res===null || res.length==0){
                result.send({
                    status:"failed",
                    message:"Invalid email or password"
                })
            }
            else{
                if(res[0].registrationNumber===registrationNumber && res[0].password===password){
                    let as=false;
                    if(registrationNumber==="ADMIN"){as=true;}
                    result.send({
                        status:"success",
                        message:"Login successfull",
                        username:registrationNumber,
                        password:password,
                        is_admin:as
                    })
                }
                else{
                    result.send({
                        status:"failed",
                        message:"Username or password does not match"
                    })
                }
            }
        })
}