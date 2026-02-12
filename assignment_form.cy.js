describe('Assignment Form Test', () => {
    it('Should load the form page', ()=> {
        cy.visit('http://127.0.0.1:5500/assignment.html');
        cy.contains('ASSIGNMENT SUBMISSION');
    });
    

    it('Should fill out and submit the form', () => {
        //Fill in the fields
        cy.visit('http://127.0.0.1:5500/assignment.html');

        //Optional: wait a tiny bit for the form to appear (if needed)
        cy.wait(500);

        //Fill in the fields
        cy.get('#name_field').type('Jeon Jungkook');
        cy.get('#number_field').type('24/0006');
        cy.get('#department_field').type('Computer Science');
        cy.get('#email_field').type('jelly@student.edu');
        cy.get('#assignment_field').type('Artificial Intelligence is the answer since its the most suitable.');

        //click submit button
        cy.get('#submitBtn').click();
        cy.wait(200);
        // check that the submission appears in history
        cy.get('#messageList').should('contain','Jeon Jungkook');
        cy.get('#messageList').should('contain','24/0006');

    });
   
     // multiple inputs
     it('Should allow multiple submissions', ()=> {
        cy.visit('http://127.0.0.1:5500/assignment.html');

        cy.get('#name_field').type('Choi Yeonjun');
        cy.get('#number_field').type('24/0005');
        cy.get('#department_field').type('CS');
        cy.get('#email_field').type('one@test.com')
        cy.get('#assignment_field').type('First answer is correct because it looks the best out of every othe rone');
        cy.get('#submitBtn').click();

        cy.get('#name_field').type('Jake Sim');
        cy.get('#number_field').type('24/0007');
        cy.get('#department_field').type('IT');
        cy.get('#email_field').type('two@test.com');
        cy.get('#assignment_field').type('Second because it looks the best');
        cy.get('#submitBtn').click();

        cy.get('#messageList li').should('have.length.at.least', 2);
     });

     //empty submissions (they should not go through)
     it('Should not submit when fields are empty', () => {
        cy.visit('http://127.0.0.1:5500/assignment.html');

        cy.get('#submitBtn').click();

        cy.get('messageList li').should('have.length', 0);
     });

    // test that history persists after refresh (local storage) 
    it('should keep submissions after page reload' ,() => {
        cy.visit('http://127.0.0.1:5500/assignment.html');

        cy.get('#name_field').type('Persistent User');
        cy.get('#number_field').type('24/0008');
        cy.get('#department_field').type('ENG');
        cy.get('#email_field').type('persist@test.com');
        cy.get('#assignment_field').type('I stay');
        cy.get('#submitBtn').click();

        cy.reload();

        cy.get('#messageList').should('contain', 'Persistent User');
    });    

});

   
