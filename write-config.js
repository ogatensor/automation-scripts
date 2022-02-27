const path = require('path');

// helper scripts
const writeJson = require('./helpers/write-json');
const getJiraData = require('./helpers/get-jira-data');

const args = process.argv.slice(2);
const [ticket] = args;

const CONFIG_FILE = 'config.json';
const jiraTicket = ticket || 'GS-1000';
const jiraData = getJiraData(jiraTicket);

if (jiraData === undefined) {
  console.log(`JIRA ticket ${jiraTicket} not found`);
  process.exit(0);
}

const newConfigFile = path.join(__dirname, 'data', CONFIG_FILE);

writeJson(newConfigFile, jiraData)
  .then(msg => {
    console.log('\n' + msg + '\n')
    console.log("The contents of the created configaration file are: ")
    console.log(jiraData);
  })
  .catch((err) => { throw err; });