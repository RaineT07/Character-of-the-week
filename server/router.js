const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getSheets', mid.requiresLogin, controllers.Sheet.getSheets);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/sheetList', mid.requiresLogin, controllers.Sheet.listPage);

  // app.post('/sheetList', mid.requiresLogin, controllers.Sheet.sheetPage);
  app.post('/upload', mid.requiresLogin, controllers.Filestore.uploadFile); 
  app.get('/retrieve', controllers.Filestore.retrieveFile);
  app.post('/getSingleSheet', mid.requiresLogin, controllers.Sheet.getSingleSheet);

  app.get('/sheet', mid.requiresLogin, controllers.Sheet.sheetPage);
  app.post('/makeSheet', mid.requiresLogin, controllers.Sheet.makeCharacter);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
