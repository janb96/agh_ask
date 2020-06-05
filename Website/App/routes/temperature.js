var express = require('express');
var router = express.Router();
let temperature = require("./../Temperature");

/* GET home page. */
router.get('/', function(req, res) {

	function mongoCallback(err, temperatures) {
        if(err){
            res.status(200);
            res.send("ERROR");
            return;
        }

        const renderData = {
			title: "Weather data from London",
			temperatures: temperatures
		};

  		res.render('index', renderData);
    }

    temperature.find().sort({dateOfTemperature: -1}).exec(mongoCallback);

});

module.exports = router;
