var User = require('../models/user');

exports.hasRole = (roles) => {
    return async function(req, res, next) {
        const user = await User.findOne({_id: req.user.sub });
        //console.log(user);
        if (!user || !roles.includes(user.role)) {
            return res.status(403).send({status:403, message:'Access denied.'});s
        }
        next();
    }
}

exports.hasRoleOrUserReqParamsMatch = (roles) => {
    return async function(req, res, next) {
        const user = await User.findOne({_id: req.user.sub });
        if (!user || !roles.includes(user.role) && !(req.user.sub == req.params.userId)) {
            return res.status(403).send({ status:403, message:'Access denied.'});
        }
        next();
    }
}