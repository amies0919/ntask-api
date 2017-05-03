module.exports = app => {
	return {
	    findAll: (params, callback) => {
		return callback([
		    {title: "Buy some shose"},
		    {title: "Fix notebook"}
		]);	
	    }
	};
};
