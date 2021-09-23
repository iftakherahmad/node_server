const global=require('../global.js');
MongoClient=require('mongodb').MongoClient;
const dbRoot=global.db_root;
const log=global.log=true;
const mydb='hall_database';

module.exports.createCollection=(name)=>{
    return new Promise((resolve,reject)=>{
        MongoClient.connect(dbRoot,(err,db)=>{
            if(err){
                if(log) console.log('db connection error');
                db.close();
                reject(err);
            }
            let dbo=db.db(mydb);
            dbo.createCollection(name,(err,res)=>{
                if(err){    
                    db.close();
                    console.log("already exist")
                    resolve('already exist');
                }
                else{
                    if(log)console.log(`collection: ${name} created`);
                    db.close();
                    resolve(res);
                }
            })
        })
    })
}


module.exports.insertEntry=(touple,collection)=>{
    return new Promise((resolve,reject)=>{
        MongoClient.connect(dbRoot,(err,dbo)=>{
            if(err){
                if(log)console.log('db connection error');
                dbo.close();
                reject(err);
            }
            let db=dbo.db(mydb);
            if(touple.registrationNumber!==null){
                touple["_id"]=touple.registrationNumber;
            }
            db.collection(collection).insertOne(touple,(err,res)=>{
                if(err){
                    if(log)console.log('already exist');
                    dbo.close();
                    reject(err);
                }
                if(log)console.log('one entry inserted.')
                dbo.close();
                resolve(res);
            })
        })
    })
}

module.exports.query=(qry,table,projection,admin)=>{
    return new Promise((resolve,reject)=>{
        MongoClient.connect(dbRoot,(err,dbo)=>{
            if(err){
                if(log)console.log('db connection error');
                dbo.close();
                reject(err);
            }
            let db=dbo.db(mydb);
            db.collection(table).find(qry).toArray((err,result)=>{
                console.log(result)
                if(err){
                    dbo.close();
                    reject(err);
                }
                // console.log(result.length)
                // console.log(table)
                dbo.close();
                console.log("-------");
                if(admin===true)
                    resolve(result);
                else{
                    resolve(result.filter((item)=>(item.registrationNumber!=="ADMIN")));
                }
            })
        })
    })
}

module.exports.updateEntry=function(qry,newValue,table){
    return new Promise(
        (resolve,reject)=>{
            MongoClient.connect(dbRoot,(err,dbo)=>{
                if(err){
                    if(log)console.log('Database connection failed.')
                    dbo.close();
                    reject(err);
                }
                let db=dbo.db(mydb);
                if(newValue.registrationNumber!==null){
                    newValue["_id"]=newValue.registrationNumber;
                }
                const newTpl={$set:newValue};

                db.collection(table).updateOne(qry,newTpl,(error,result)=>{
                    if(error){
                        if(log) console.log('update failed');
                        dbo.close();
                        reject(error);
                    }
                    if(log)console.log('update successful');
                    resolve(result);
                })
            })
        }
    )
}

module.exports.dbInit=()=>{
    //create Students table

    this.createCollection("Students").then((res)=>{
        console.log("Students Table Created");
    })
    .catch((err)=>{
        console.log("Students table creation failed");
    })
}

module.exports.insertSomeStudents=()=>{
    students=[
    {
        name: "ADMIN",
        registrationNumber: "ADMIN",
        department: null,
        session: null,
        profilePicUrl: null,
        bloodGroup:null,
        phoneNo: null,
        email: "iftakherahmad3589@gmail.com",
        password: "valo_hoye_^_jao_masud",
        isResident:null,
        roomNo:null,
        bodingCardNumber:null,
        residentialUpto: null
    }
    ];

    
    for(i = 0 ; i < students.length ;i++){
        this.insertEntry(students[i],"Students").catch(err=>{
            console.log("new Admin creation failed maybe already exist")
        });
    }
}