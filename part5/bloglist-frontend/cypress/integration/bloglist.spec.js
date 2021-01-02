describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.addUser({ username: "test", password: "testpw", name: "tester" });
  });

  it("Login is shown", function () {
    cy.get("#username");
    cy.get("#password");
    cy.get("#submitLogin");
  });

  describe("Login", function () {
    it("Succeeds with correct credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("testpw");
      cy.get("#submitLogin").click();

      cy.contains("tester logged-in");
    });
    it("Fails with incorrect credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("testpw2");
      cy.get("#submitLogin").click();

      cy.contains("Login failed due to wrong credentials");
    });
  });
  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "test", password: "testpw" });
    });
    it("Logged in Users can create blogs", function () {
      cy.contains("New Blog").click();
      cy.get("#title").type("testblog");
      cy.get("#author").type("testauthor");
      cy.get("#url").type("testurl");
      cy.get("#addBlogSubmit").click();

      cy.contains("Successfully added Blog testblog");
      cy.contains("view");
    });

    describe("Blog modification when logged in", function () {
      beforeEach(function () {
        cy.contains("New Blog").click();
        cy.get("#title").type("testblog");
        cy.get("#author").type("testauthor");
        cy.get("#url").type("testurl");
        cy.get("#addBlogSubmit").click();
      });
      it("Logged in Users can like blogs", function () {
        cy.contains("Successfully added Blog testblog");
        cy.contains("view").click();
        cy.contains("Likes: 0");
        cy.contains("Like").click();
        cy.contains("Likes: 1");
      });
      it("Logged in Users can delete blogs", function () {
        cy.contains("view").click();
        cy.contains("Delete").click();
        cy.contains("Successfully removed blog");
      });
      it.only("Blogs are ordered by likes", function () {
        cy.get("#title").type("testblog2");
        cy.get("#author").type("testauthor2");
        cy.get("#url").type("testurl2");
        cy.get("#addBlogSubmit").click();
        cy.contains("view").click();
        cy.contains("view").click();
        cy.get(".likeButton").last().click();
        const order = [];
        cy.get(".likes")
          .invoke("text")
          .then((likes) => {
            const pattern = /[0-9]+/g;
            const number = likes.match(pattern);
            order.push(number);
          })
          .then(() => {
            expect(order[0][0] > order[0][1]).to.be.true;
          });
        cy.get(".likeButton").last().click().click();
        order.length = 0;
        cy.get(".likes")
          .invoke("text")
          .then((likes) => {
            const pattern = /[0-9]+/g;
            const number = likes.match(pattern);
            order.push(number);
          })
          .then(() => {
            expect(order[0][0] > order[0][1]).to.be.true;
          });
      });
    });
  });
});
