import '../../node_modules/cypress-xpath'

describe('Loginl', function () {
    beforeEach(function () {
        cy.visit('https://edus.ccss.sa.cr/eduscitasweb/');
    });

    afterEach(function () {
        cy.reload();
    });


  it('Numero de identificacion requerida', () => {
      cy.xpath('/html/body/form[1]/div[1]/div[2]/div/div[2]/div/div[2]/button').click(
      ).then(function () {
          cy.contains('Es requerido el Número de Identificación para continuar.');
      });
  });

  it('Contrasena requerida', () => {

      cy.xpath('/html/body/form[1]/div[1]/div[2]/div/div[1]/div/div/div[2]/div[2]/input').type('123456789');

      cy.xpath('/html/body/form[1]/div[1]/div[2]/div/div[2]/div/div[2]/button').click(
      );

      cy.contains('Es requerida la Clave para continuar');
  });

});
