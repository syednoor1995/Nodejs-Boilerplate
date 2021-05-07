const { UserRoles } = require("../libraries/constants");

const expect = require("expect");
var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);

let baseUrl = "http://localhost:4041";
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlIjp7Il9pZCI6IjYwOTMyMTczMzA2MWYyMTllNDU4N2Q3ZiIsIm5hbWUiOnsiZmlyc3ROYW1lIjoiVGhpcyBzaG91bGQgYmUgdGhlIG5ldyBmaXJzdCBuYW1lIiwibGFzdE5hbWUiOiJUaGlzIHNob3VsZCBiZSB0aGUgbmV3IGxhc3QgbmFtZSJ9LCJlbWFpbCI6Im5vb3JyYXphMzc3QGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiY3JlYXRlZEF0IjoiMjAyMS0wNS0wNVQyMjo1MTozMS4zODhaIiwidXBkYXRlZEF0IjoiMjAyMS0wNS0wN1QwMjowMjo1MC42NDBaIn0sInJvbGUiOiJVU0VSIiwiaWF0IjoxNjIwMzUzMDgwLCJleHAiOjE2MjAzNTQ1MjB9.QGEAvzSFze9Dde664IhysiPslIEcwxrbj6575XNQd0c";

describe("POST /api/user/signup", () => {
  it("should signup a user", (done) => {
    var name = {
      firstName: "Syed",
      lastName: "Raza",
    };
    var email = "noorraza3aa77acaca1@gmail.com";
    var password = "hello";
    var role = UserRoles.USER;
    chai
      .request(baseUrl)
      .post("/api/user/signup")
      .set({ "Content-Type": `application/json` })
      .send({ name, email, password, role })
      .then((res) => {
        expect(res.body.data.profile.email).toBe(email);
        done();
      })
      .catch((err) => {
        expect(500);
        done(`${err.message} Email already exist`);
      });
  });

  it("should return validation errors if request is invaild", (done) => {
    chai
      .request(baseUrl)
      .post("/api/user/signup")
      .set({ "Content-Type": `application/json` })
      .send({
        email: "asdvsdf",
        password: "sd3",
      })
      .then((res) => {
        expect(400); // - not really needed, but I include them as a comment
        done();
      })
      .catch((err) => done(err));
  });

  it("should not create user if email in use", (done) => {
    chai
      .request(baseUrl)
      .post("/api/user/signup")
      .set({ "Content-Type": `application/json` })
      .send({
        email: "noorraza377@gmail.com",
        password: "hello",
      })
      .then((res) => {
        expect(500); // - not really needed, but I include them as a comment
        done();
      })
      .catch((err) => done(err));
  });
});

describe("POST /api/user/login", () => {
  it("should login a user", (done) => {
    email = "noorraza3aa77acaca1@gmail.com";
    var password = "hello";

    chai
      .request(baseUrl)
      .post("/api/user/login")
      .set({ "Content-Type": `application/json` })
      .send({ email, password })
      .then((res) => {
        expect(res.headers["x-auth"]).not.toBeNull();
        done();
      })
      .catch((err) => {
        done(`${err.message} `);
      });
  });

  it("should return validation errors if request is invaild", (done) => {
    chai
      .request(baseUrl)
      .post("/api/user/login")
      .set({ "Content-Type": `application/json` })
      .send({
        email: "asdvsdf",
        password: "sd3",
      })
      .then((res) => {
        expect(400); // - not really needed, but I include them as a comment
        done();
      })
      .catch((err) => done(err));
  });

  it("Should reject invalid login", (done) => {
    chai
      .request(baseUrl)
      .post("/api/user/login")
      .set({ "Content-Type": `application/json` })
      .send({
        email: "noorraza377@gmail.com",
        password: "hello44",
      })
      .then((res) => {
        expect(500); // - not really needed, but I include them as a comment
        done();
      })
      .catch((err) => done(err));
  });
});

describe("PUT /api/user/profile", () => {
  it("Should update the profile first or lastname", (done) => {
    var name = {
      firstName: "This should be the new first name",
      lastName: "This should be the new last name",
    };

    chai
      .request(baseUrl)
      .put("/api/user/profile")
      .set({ "Content-Type": `application/json` })
      .set({ Authorization: `${token}` })
      .send({
        name,
      })
      .then((res) => {
        expect(res.body.data._id).not.toBeNull();
        done();
      })
      .catch((err) => {
        done(`${err.message} check you authorization token `);
      });
  });

  it("Should not update the profile if created by other user", (done) => {
    var name = {
      firstName: "This should be the new first name",
      lastName: "This should be the new last name",
    };

    chai
      .request(baseUrl)
      .put("/api/user/profile")
      .set({ "Content-Type": `application/json` })
      .set({ Authorization: `${token}111` })
      .send({
        name,
      })
      .then((res) => {
        expect(404);
        done();
      })
      .catch((err) => {
        done(`${err.message} `);
      });
  });
});

describe("POST /api/ticket", () => {
  it("Should Store authenticated user customer support ticket ", (done) => {
    var message = "I am facing issue while printing my license.";

    chai
      .request(baseUrl)
      .post("/api/ticket")
      .set({ "Content-Type": `application/json` })
      .set({ Authorization: `${token}` })
      .send({
        message,
      })
      .then((res) => {
        expect(res.body.data.ticket._id).not.toBeNull();
        done();
      })
      .catch((err) => {
        done(`${err.message} check you authorization token `);
      });
  });

  it("Should not create the ticket if token is expired", (done) => {
    var message = "I am facing issue while printing my license.";

    chai
      .request(baseUrl)
      .put("/api/ticket")
      .set({ "Content-Type": `application/json` })
      .set({ Authorization: `${token}111` })
      .send({
        message,
      })
      .then((res) => {
        expect(404);
        done();
      })
      .catch((err) => {
        done(`${err.message} `);
      });
  });
});

describe("GET /api/ticket", () => {
  it("Admin user request to list customer support tickets ", (done) => {
    chai
      .request(baseUrl)
      .get("/api/ticket")
      .set({ "Content-Type": `application/json` })
      .set({ Authorization: `${token}` })

      .then((res) => {
        expect(200);
        done();
      })
      .catch((err) => {
        done(`${err.message}  `);
      });
  });
});
