var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var Item = require('/blueSteel/models/item');
var Style = require('/blueSteel/models/style');
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res){
	res.render('helloworld', {title:'Hello World!'})
});

/* GET itemlist page. */
router.get('/itemlist', function(req, res) {
    res.render(Item);
});

/* GET Form page. */
router.get('/form', function(req, res) {
    res.render('form', { title: 'Add New Item' });
});

/*GET Add Style page */
router.get('/addstyle', function(req, res){
    res.render('addstyle', {title: 'Add New Style to Inventory'})
});

/*POST to Add Style page*/
router.post('/addstyle', function(req, res){
    var style = new Style();
    style.style = req.body.style
    style.sizes = req.body.sizes
    style.colors = req.body.colors
    style.desc = req.body.desc
    style.content = req.body.content
    style.price = req.body.price
    
    style.save(function(err) {
        if (err)
            res.send(err);
       console.log('successful add');
    });
});

/* POST to Add User Service */
router.post('/additem', function(req, res) {
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
    service: '',
    auth: {
        user: '',
        pass: ''
        }
    });
    
    var item = new Item();
    var order = req.body.items;
    var html = req.body.html;
        
    item.customer = req.body.customer
    item.tel = req.body.tel
    item.email = req.body.email
    item.address = req.body.address
    item.itemsOrdered = order
    
    
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '', // sender address
        to: ',' + item.email, // list of receivers
        subject: 'Test ', // Subject line
        text: 'Your order has been confirmed' + order, // plaintext body
        html: "<style> h3{display:inline}</style><ul style='list-style:none;margin:0px 10px;'>" + html + "</ul>" //html text
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
    
    item.save(function(err) {
        if (err)
            res.send(err);
       res.json({message:'item added to the list', data: item});
    });
    
});

/*GET STYLE LIST*/
    router.get('/stylelist', function(req, res){
       Style.find(function (err, styles){
           console.log(styles);
           res.render('stylelist', {
            styles : styles,
            title : 'Style List'
           });
       });
    });

/*GET ORDER LIST*/
    router.get('/orderlist', function(req, res){
       Items.find(function (err, items){
           console.log(items);
           res.render('orderlist', {
            items : items,
            title : 'Order List'
           });
       });
    });

module.exports = router;
