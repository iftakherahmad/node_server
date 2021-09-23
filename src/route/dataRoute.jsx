const { studentListProvider, addStudent } = require("../data/studentList");

let router=express.Router();

router.route("/students").post(studentListProvider);
router.route("/add_student").post(addStudent);
module.exports=router;