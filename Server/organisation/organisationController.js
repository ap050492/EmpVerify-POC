Organisation = require('./organisationModel');
var indy = require('indy-sdk')

exports.new = function(req,res) {
   
    let email = req.body.email;
    Organisation.findOne({email},function(err,organisation){
        console.log("org - ",organisation);
        if(organisation !== null){
            res.json({
                status:400,
                message:"Email address is already exists"
            })
        } else {
            var organisation = new Organisation;
            organisation.name = req.body.name;
            organisation.email = req.body.email;
            organisation.password = req.body.password;
            organisation.location = req.body.location;
            
            organisation.save(function (err){
                if(err){
                    res.json({
                        status:400,
                        message:err
                    })
                } else {
                    res.json({
                        status : 200,
                        message: 'Record saved successfully',
                        data: organisation
                    })
                }
            })
        }
    })
}

exports.index = function(req,res) {
    Organisation.find({type :'Organisation'},function (err,organisation) {
        if(err){
            res.json({
                status:400,
                message:err
            })
        } else {
            res.json({
                status:200,
                message:'Conatct fetch successfully',
                data:organisation
            })
        }
    })
}

exports.login = function(req,res) {
    let email = req.body.email;
    let password = req.body.password;

    console.log(email)
    console.log(password)

    Organisation.findOne({email,password},function(err,organisation){
        if(err){
            res.json({
                status:400,
                message:err
            })
        } else {
            if(organisation == null){
                res.json({
                    status:400,
                    message:"Invalid login details"
                })
            } else if(organisation.isActive === false){
                res.json({
                    status:400,
                    message:"Your account not approve yet by admin"
                })
            } else {
                res.json({
                    status:200,
                    message:'Successful login',
                    data:organisation
                })
            }            
        }
    })
} 

exports.createWallet = async function (req,res) {
    console.log("-------------- Create wallet ---------------");
    let walletConfig = {'id': req.body.name}
    let walletCredentials = {'key': req.body.pin}
    console.log("config " , walletConfig);
    console.log("Credentials " , walletCredentials);
    console.log("Email " , req.body.email);
    try {
        let response = await  indy.createWallet(walletConfig, walletCredentials);
        let wallet = await indy.openWallet(walletConfig, walletCredentials);
        let [wDid, wKey] = await indy.createAndStoreMyDid(wallet, "{}");
        console.log(wDid)
        console.log(wKey)
        console.log("--------------------------------------------");
        let email = req.body.email
        await Organisation.updateOne({email},{$set: {did:wDid, verKey: wKey}})

        res.json({
            status:200,
            message:"Wallet created successfully"
        })
    } catch(e) {
        console.log(e);
        if(e.message === "WalletAlreadyExistsError") {
            res.json({
                status:400,
                message:"Wallet name already exists"
            })
            throw e;
        } else {
            res.json({
                status:400,
                message:"Something want to wrong, Please try again later"
            })
        }
    }
}