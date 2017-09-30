const pg = require('pg')

module.exports = new pg.Client({
  user: 'kinzo',
  host: '10.0.0.247',
  database: 'kinzo',
  port: 5432
})
