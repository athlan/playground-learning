var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if(err) throw err;

    var students = db.collection('students');

    var cursor = students.find({});

    cursor.toArray(function(err, docs) {
        if(err) throw err;
		
		docs.forEach(function(doc) {
			var i = 0
			var min = -1
			
			for(var i = 0, j = doc.scores.length; i < j; i++) {
				if(doc.scores[i].type == 'homework') {
					if(min == -1 || doc.scores[i].score < doc.scores[min].score) {
						min = i
					}
				}
			}
			
			if(min == -1)
				return
			
			//doc.scores[min].isLowest = true // for debug only
			//console.log(doc.scores)
			
			// splice
			var newScores = doc.scores
			newScores.splice(min, 1)
			
			//console.log(newScores)
			
			students.update({
				"_id": doc["_id"]
			}, {
				"$set" : {
					"scores": newScores
				}
			}, function(err, doc) {
				console.log(err)
				console.log(doc)
			})
		})
    });
});
