const { connect } = require('@tidbcloud/serverless');

const conn = connect({ url: process.env.MYSQL_DATABASE_URL });

module.exports = conn;
