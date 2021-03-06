const express = require('express');
const router = express.Router();

router.use((req, res, next)=>{
    switch(req.query.msg){
        case 'failure': res.locals.msg = `<script>alert('لطفا اطلاعات خواسته شده را وارد کنید');</script>`;
            break;
        case 'dbFailure': res.locals.msg = `!شما ادمین سايت نيستيد`;
            break; 
        default:
            res.locals.msg = ``;
    }
    next();
})

// Get login screen 
router.get('/', (req, res, next)=>{
    res.render('adminLoginScreen');
})


module.exports = router;