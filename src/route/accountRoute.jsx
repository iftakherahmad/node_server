let account = require('../controller/Account.jsx');

let router=express.Router();

router.route('/signup').post(account.signup);
router.route('/signin').post(account.signin);

module.exports=router;