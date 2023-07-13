require('dotenv').config({ path: '.env.development' });

const persistence = process.env.PERSISTENCE;
const url = process.env.MONGO_URL;
const gitHubClientId = process.env.GITHUB_CLIENT_ID;
const gitHubClientSecret= process.env.GITHUB_CLIENT_SECRET;
module.exports = {
  persistence,
  url,
  gitHubClientId,
  gitHubClientSecret
};
