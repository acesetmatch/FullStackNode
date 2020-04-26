const proxy = require('http-proxy-middleware')
 
// NOTE: Anytime we access /api or /auth/google, forward that request to the target domain listed.
module.exports = function(app) {
    app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
}