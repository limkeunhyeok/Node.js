module.export = function(app) {
    app.dataSources.motorcycleDataSource.automigrate('motorcycle', (err) => {
        if (err) throw err;
        app.models.Motorcycle.create([
            {
                "image": "images/heritage.jpg",
                "make": "Harly Davidson",
                "description": "An Evolution V-twin Engine",
                "category": "Cruiser",
                "model": "Heritage Softail",
                "year": "1986",
                "id": "5fc26fc1c90d491440614cab"
            }
        ], (err, motorcycles) => {
            if (err) throw err;
            console.log('Created Motorcycle Model: \n', motorcycles);
        });
    });

    app.dataSources.motorcycleDataSource.automigrate('review', (err) => {
        if (err) throw err;
        app.models.Review.create([
            {
				"name": "Jax Teller",
				"email": "jax@soa.com",
                "review": "I love the Engine and sound",
				"ObjectId": "5fc26fc1c90d491440614cab"
			},
			{
    			"name": "Filip Chibs Telford",
    			"email": "chibs@soa.com",
    			"review": "Emblematic motorcycle of the world",
                "ObjectId": "5fc26fc1c90d491440614cab"
  			},
			{
				"name": "Clay Morrow",
				"email": "clay@soa.com",
				"review": "A classic for the eighties, i love the engine sound",
                "ObjectId": "5fc26fc1c90d491440614cab"
			}
        ], (err, reviews) => {
            if (err) throw err;
            console.log('Created Review Model: \n', reviews);
        });
    });
};

