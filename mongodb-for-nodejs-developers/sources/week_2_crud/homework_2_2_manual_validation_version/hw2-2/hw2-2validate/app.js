var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var weather = db.collection('data');

    var cursor = weather.find({});
    cursor.sort([['State', 1], ['Temperature', -1]]);

	var tmp_lastState = ''
	var tmp_ids = []
	
    cursor.toArray(function(err, docs) {
        if(err) throw err;
		
		docs.forEach(function(doc) {
			if(tmp_lastState == doc["State"])
				return
			
			tmp_lastState = doc["State"]
			console.dir(doc);
			
			weather.update({
				"_id": doc["_id"]
			}, {
				"$set" : {
					"month_high": true
				}
			}, function(err, doc) {
				console.log(err)
				console.log(doc)
			})
		})
    });
});
