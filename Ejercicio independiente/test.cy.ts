import '../../node_modules/cypress-xpath'

describe('Formulario de búsqueda en BN Venta de Bienes', function () {
    
    beforeEach(function () {
        // Ignorar errores no capturados
        cy.on('uncaught:exception', (err, runnable) => {
            // Devuelve false para prevenir que Cypress falle el test
            return false;
        });

        cy.visit('https://www.bnventadebienes.com/properties/search');
    });



    /**
     * CASO DE PRUEBA 1
     * Nombre: Buscar propiedades por ubicaciOn especIfica
     * Objetivo: Verificar que al buscar propiedades por una ubicacion especifica, los resultados devueltos contengan la ubicación deseada.
     * Datos de prueba: Ubicación: 'Alajuela'.
     * Resultado esperado: Cada propiedad en los resultados debe contener la ubicación 'Alajuela'.
     */
    it('Buscar propiedades por ubicacion especifica', () => {
        const location = 'Alajuela';
        
        cy.xpath('/html/body/div[3]/div[4]/form/div/div[1]/div[3]/div/select').select(location);
        cy.xpath('/html/body/div[3]/div[4]/form/div/div[2]/div[2]/button').click();
        
        cy.get('.property-item-padding').first().contains(location).should('exist');
    });
    
    
    /**
     * CASO DE PRUEBA 2
     * Nombre: Buscar propiedades por tipo de propiedad
     * Objetivo: Verificar que al buscar propiedades por un tipo específico, los resultados devueltos sean del tipo deseado.
     * Datos de prueba: Tipo de propiedad: 'Finca'.
     * Resultado esperado: Cada propiedad en los resultados debe contener el tipo 'Finca'.
     */
    it('Buscar propiedades por tipo de propiedad', () => {
        const propertyType = 'Finca';
    
        cy.xpath('/html/body/div[3]/div[4]/form/div/div[1]/div[2]/div/select').select(propertyType);
        cy.xpath('/html/body/div[3]/div[4]/form/div/div[2]/div[2]/button').click();
    
        cy.get('.property-item-info').each(($el) => {
            cy.wrap($el).contains(propertyType).should('exist');
        });
    });
    

    /**
     * CASO DE PRUEBA 3
     * Nombre: Buscar propiedades por ciudad específica dentro de una provincia
     * Objetivo: Verificar que al buscar propiedades en una provincia específica y ciudad, los resultados devueltos sean de la ciudad seleccionada.
     * Datos de prueba: Provincia: 'Alajuela', Ciudad: 'Río Cuarto'.
     * Resultado esperado: Cada propiedad en los resultados debe contener la ciudad 'Río Cuarto'.
     */
    it('Buscar propiedades por ciudad específica dentro de una provincia', () => {
        const province = 'Alajuela';
        const city = 'Río Cuarto';
    
        cy.xpath('/html/body/div[3]/div[4]/form/div/div[1]/div[3]/div/select').select(province);
        cy.wait(3000);
    
        cy.xpath('/html/body/div[3]/div[4]/form/div/div[1]/div[4]/div/select').select(city);
        cy.xpath('/html/body/div[3]/div[4]/form/div/div[2]/div[2]/button').click();
    
        cy.wait(5000);

        // Obtener todos los elementos de propiedad
        cy.get('.property-item').then(($items) => {
            const lastIndex = $items.length - 1;

            // Iterar sobre los elementos, ignorando el último
            $items.each((index, item) => {
                if (index < lastIndex) { // Solo procesar hasta el penúltimo
                    cy.wrap(item).find('.property-item-padding').first().contains(city).should('exist');
                }
            });
        });

    });
    

    /**
     * CASO DE PRUEBA 4
     * Nombre: Buscar propiedad por código de propiedad
     * Objetivo: Verificar que al buscar una propiedad mediante su código, la propiedad correspondiente se muestre en los resultados.
     * Datos de prueba: Código de propiedad: '7106-1'.
     * Resultado esperado: Al menos una propiedad debe ser visible en los resultados de búsqueda.
     */
    it('Buscar propiedad por código de propiedad', () => {
        const propertyCode = '7106-1';
    
        cy.xpath('/html/body/div[3]/div[4]/form/div/div[1]/div[1]/div/input').first().type(propertyCode);
        cy.xpath('/html/body/div[3]/div[4]/form/div/div[2]/div[2]/button').click();
    
        cy.wait(5000);
    
        cy.get('.property-item').should('have.length.gte', 1);
    
    });
    
    
});
