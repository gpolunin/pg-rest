const restify = require('restify');
const pgRestify = require('pg-restify');
const hooks = new pgRestify.Hooks();
//test commit 4
hooks.addPreHookForAllResources('getList', function(req, res, dbClient, next){

    req.pgRestifyWhere = {};
    for (let key in req.query){
        switch (key){
            case 'pageSize':
            case 'page':
            case 'orderBy':
            case 'orderByDesc':
                break;
            default:
                req.pgRestifyWhere[key] = req.query[key];
        }
    }
    return next();

});

const server = restify.createServer();


pgRestify.initialize({
    server: server,
    pgConfig: {
        user: 'postgres',
        database: 'rest',
        host: 'localhost',
        port: 5433,
    },
    hooks: hooks
}, function(err, pgRestifyInstance) {

    if (err) throw err;

    server.listen(6142);

});
