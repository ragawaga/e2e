describe('Senior Tester E2E Exercise', () => {
  //Store the test data in an array due to small size of dataset
  //Considerations for future : switch to an external file for management of the dataset
  const services = [
    { name: 'Igbo', url: 'https://bbc.com/igbo', title: 'Ogbako - BBC News Ìgbò' },
    { name: 'Hausa', url: 'https://bbc.com/hausa', title: 'Labaran Duniya - BBC News Hausa' },
    { name: 'Pidgin', url: 'https://bbc.com/pidgin', title: 'Domot - BBC News Pidgin' }
  ];

  //Create a seperate test case for each service in the dataset
  services.forEach(service => {
    it(`Verify page title for ${service.name} World Service page`, () => {
      cy.visit(service.url);
      cy.title().should('eq', service.title);
    });
  });
});