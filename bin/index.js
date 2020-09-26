#!/usr/bin/env node

const GetWOD = require('../index');

const args = process.argv.splice(2);

const getWod = new GetWOD('293-snoridge-crossfit');
getWod.execute(args[0]);
