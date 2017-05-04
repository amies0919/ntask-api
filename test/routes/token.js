describe("Routes: Token", () => {
    const Users = app.db.models.Users;
    describe("POST /token", () => {
	beforeEach(done => {
	    Users
		.destroy({where: {}})	
		.then(() => Users.create({
		    name: "John",
		    email: "john@email.com",
		    password: "12345"
		}))
		.then(done());
	});
	describe("status 200", () => {
	    it("returns authenticated user token", done => {
		request.post("/token")
		    .send({
			email: "john@email.com",
			password: "12345"	
		    })
		    .expect(200)
		    .end((err, res) => {
			expect(res.body).to.include.keys("token");
			done(err);
		    })
   	    });
	});
	describe("status 401", () => {
	    it("throws error when password is incorrect", done => {
		request.post("/token")
		    .send({
		    	email: "john@mail.net",
			password: "222222"
		    })
		    .expect(401)
		    .end((err, res) => {
			done(err);
		    });

	    });
	    it("throws error when email not exist", done => {
		request.post("/token")
		    .send({
			email: "aaa@163.com",
			password: "11111"	
		    })	
		    .expect(401)
		    .end((err, res) => {
			done(err);
		    });
	    });
	    it("throws error when email and password are blank", done => {
		request.post("/token")
		    .expect(401)
		    .end((err, res) => {
			done(err);
		    });		
	    });
	});	
    })
});
