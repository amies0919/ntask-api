var http = require('http');
module.exports = app =>{
	app.get("/douban/*",(req, res) => {
		var _fn = {
			getData: function(path, callback){
				var _this = this;
				http.get({
					hostname: 'api.douban.com',
					path: '/' + path
				}, function(res){
					var body = [];
					res.on('data', function(chunk){
						body.push(chunk);
					});
					res.on('end', function(){
						body = Buffer.concat(body);
						var bodyObject = JSON.parse(body.toString());
						if(bodyObject && bodyObject.subjects){
							bodyObject.subjects = _this.changeImgUrl(bodyObject.subjects,'images');
						}
						if(bodyObject && bodyObject.casts){
							bodyObject.casts = _this.changeImgUrl(bodyObject.casts,'avatars');
						}
						if(bodyObject && bodyObject.directors){
							bodyObject.directors = _this.changeImgUrl(bodyObject.directors,'avatars');
						}
						if(bodyObject && bodyObject.images){
							bodyObject.images = _this.changeImgUrl(bodyObject.images, 'images');
						}
						callback(bodyObject);
					})
				})
			},
			//change im7 to img3
			changeImgUrl: function(data,key){
				var result = data;
				if(result && result.forEach){
					result.forEach(element => {
					for(var ele in element[key]){
						element[key][ele] = element[key][ele].replace('img7','img3');
					}	
					});
				}else{
					for(var ele in result){
						result[ele] = result[ele].replace('img7','img3');
					}
				}
				
				return result;
			}
		};
		var path = req.originalUrl.replace('/douban/','');
		_fn.getData(path, function(data){
			res.send(data);
		});
	})
 	/**
	 * @api {get} /API Status
	 * @apiGroup Status
	 * @apiSuccess {String} status API Status' message
	 * @apiSuccessExample {json} Success
	 *    HTTP/1.1 200 OK
	 *    {"status": "NTask API"}
	 */
	app.get("/", (req, res) => {
		res.json({ status: "NTask API" });
	});

};
