let names = ['rex', 'piskun', 'roko', 'nav4o'];

function middleware(req, res, next) {
    console.log('Hi from middleware!');
    if (names.includes(req.params.name)) {
        next();
        return;
    }

    res.status(403).send('Invalid input name!');
}

module.exports = middleware;