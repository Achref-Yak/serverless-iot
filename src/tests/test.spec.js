const handler = require('../handlers/testhandler');
	
 
	
test('correct greeting is generated', () => {
	
  expect(handler.getLocalGreeting("en")).toBe("Hello!");
	
  expect(handler.getLocalGreeting("ru")).toBe("Привет!");
	
});