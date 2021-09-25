/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("dotenv/config");

const { HARDHAT_PORT } = process.env;

module.exports = {
  solidity: "0.7.3",
  networks: {
    localhost: { url: `http://127.0.0.1:${HARDHAT_PORT}` },
    hardhat: {
      accounts: [{"privateKey":"0xd251348b64011c731d1a08535bb51d4f62e3dcee21db54af051017f619c66b01","balance":"1000000000000000000000"},{"privateKey":"0xd0df56a7445374dba176ddf3a90f481b7dd7b636e38e80131533d149c6074986","balance":"1000000000000000000000"},{"privateKey":"0xe48d9d278e8c8141d842196be3658abc540123031877e06c2e9aeb3784787caa","balance":"1000000000000000000000"},{"privateKey":"0xa4f7484ec97ddd2cbc61d0aa0054ca17a6cf04015137af284c9483bdf972efc9","balance":"1000000000000000000000"},{"privateKey":"0xa324df072521cca25ea2968327b0e5f3269a5bd012686ae380563a5d8e0bcf6e","balance":"1000000000000000000000"},{"privateKey":"0x9fb90ff35794fdbc8200b2a578313964fa9e9b4e73f38e2302a2cf0b8d136f8e","balance":"1000000000000000000000"},{"privateKey":"0x56f93cfc4d66cecf175db947cf6ce4c0845be316c1825c513c7daa5176a90da2","balance":"1000000000000000000000"},{"privateKey":"0xd428a46b417d5fb28d98ce7711ae84202969b7497033f0309a2a34701bdb2788","balance":"1000000000000000000000"},{"privateKey":"0xbdc9bb6676120542b8d7ea1fcc6c16529caf45a5487f11c39318f4f92fa6ea8f","balance":"1000000000000000000000"},{"privateKey":"0xdad4fb9e85f9b6aff877f36189b371acf29330b03c18decdf54ca480a22f44fd","balance":"1000000000000000000000"}]
    },
  },
  paths: {
    sources: './contracts',
    tests: './__tests__/contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
};