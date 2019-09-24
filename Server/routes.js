let routes = require('express').Router();
let organisationController = require('./organisation/organisationController');

routes.get('/',(req,res) => {
    res.json({
        status:200,
        message:'Welcome to EmpVerify'
    })
});

routes.route('/organisation')
    .get(organisationController.index)
    .post(organisationController.new);

routes.route('/login')
    .post(organisationController.login);

routes.route('/createWallet')
    .post(organisationController.createWallet);

module.exports = routes;