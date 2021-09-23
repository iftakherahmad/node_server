PORT=3002;
const database=require('./src/controller/dbservice.js');
let cors=require('cors');
express=require('express');
const bodyParser=require('body-parser');
app=express();

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json())
accountRoute=require('./src/route/accountRoute.jsx');
dataRoute=require('./src/route/dataRoute.jsx');
app.use('/account',accountRoute);
app.use('/data',dataRoute);

// database.dbInit();
//initialze admin
database.insertSomeStudents();

app.listen(PORT,()=>{
    console.log(`Server started at PORT: ${PORT}`);
})

