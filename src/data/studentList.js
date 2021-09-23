const { query, insertEntry } = require("../controller/dbservice");

module.exports.studentListProvider=(req,result)=>{
    qry=req.body.query;
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    console.log(qry)
    console.log(req.body);
    query(qry,"Students",{},false)
        .then((res)=>{
            result.send({
                status:"success",
                message: "Students list returned",
                students:res
            })
        })
        .catch((err)=>{
            result.send({
                status:"failed",
                message:"Students retribal from database failed"
            })
        })
}

module.exports.addStudent=(req,result)=>{
    console.log("pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp")
    console.log(req.body)
    insertEntry(req.body,"Students")
        .then((res)=>{
            result.send({
                status:"success",
                message:'student added succesfully',
            })
        })
        .catch((err)=>{
            result.send({
                status:"failed",
                message:"Server failed to add student"
            })
        })
}