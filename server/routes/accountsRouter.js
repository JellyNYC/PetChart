const router = require('express').Router();

const accountsController = require('../controllers/accountsController');
const petsController = require('../controllers/petsController');
const visitsController = require('../controllers/visitsController');


router.post('/register', accountsController.createAccount, (req, res) => {
  res.status(200).send('Thanks for the request!');
});

/**
 * @endpoint : 'accounts/login'
 * @method : GET
 * @locals : profileMatch, passwordMatch. owner, pets
 * @returns -> a owner object with the owner's data, array of pets, surgeries & vaccines
 * @JSONstructure : { owner: ..., pets: [...], surgeries: [...], vaccines: [...] }
 */
router.post('/login', 
  accountsController.login, 
  petsController.getPets, 
  visitsController.getVisits, 
  (req, res) => {
  if (res.locals.profileMatch) {
    if (res.locals.passwordMatch) {
      const { owner, pets } = res.locals;
      res.status(200).json({owner, pets});
    } else {
      res.status(200).send('Incorrect password dummy!');
    }
  } else {
    res.status(200).send('You need to register silly!');
  }
}); 

module.exports = router;
