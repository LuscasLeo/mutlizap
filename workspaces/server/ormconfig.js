const {SnakeNamingStrategy} = require('typeorm-naming-strategies')
module.exports = {
    "type": "sqlite",
    "database": "./src/database/database.sqlite",
    "logging": true,
    "synchronize": true,
    "namingStrategy": new SnakeNamingStrategy(),
    "entities": [
        "./src/database/models/**/*.ts"
    ],
    "migrations": [

    ],
    "subscribers": [

    ]


}