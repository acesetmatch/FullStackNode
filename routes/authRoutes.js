const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  /** Passing control to passport authenticate middleware function */
  app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
      res.redirect("/surveys")
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout(); // Takes cookie that contains user.id and kills it which logs us out.
    res.redirect("/");
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  })
};
