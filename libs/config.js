module.exports = app => {
    const env = process.env.NODE_ENV;
    if (env) {
	return require('./config.test.js');
    }
    return require("./config.development.js");
};
