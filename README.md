![Amira Bot Base](https://raw.githubusercontent.com/ZanixonGroup/amira-bot-base/master/assets/amira-md.png)

# Amira Bot Base
Amira bot base is a chatbot base that has many features in it to make development easier and faster, Amira bot has a base with clean, neat and structured code. We offer features that can make it easier for developers to create their whatsapp bots easily using a good command handling system as well as other additional handlers such as event handlers, plugins handlers and much more.

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey.svg?style=for-the-badge)](https://creativecommons.org/licenses/by-nc/4.0/) ![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/t/zanixongroup/amira-bot-base?logo=github&cacheSeconds=12000&style=for-the-badge) ![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/zanixongroup/amira-bot-base?style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/zanixongroup/amira-bot-base?logo=github&style=for-the-badge&link=https%3A%2F%2Fgithub.com%2Fzanixongroup%2Famira-bot-base) ![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/zanixongroup/amira-bot-base/master?style=for-the-badge&logo=github)

# Setup
Before running this script, you need a few settings so that this script runs well. the settings are quite easy, you can follow the steps below.

## Installation
First, clone the repo from github.
```bash
git clone https://github.com/zanixongroup/amira-bot-base.git amira
```

then, go to the local repo directory.
```bash
cd amira
```

execute the npm command to install the dependencies.
```bash
npm install
```

## Setup config.js
Once you have installed the dependencies, you need to set the bot number to your bot number. change your bot number [here](https://github.com/ZanixonGroup/amira-bot-base/blob/master/src%2Fconfig.js#L7), the config is like this.

```js
global.botNumber = "628xxxxx"; // change this with your number, start with your country code number
global.bot = {
  antiCall: true, // auto reject call switch
  owner: ["6285697103902"], // owner number
  sessionName: "session", // session name directory
}
```

## Start the bot
Ok, you managed to do all the settings, now you can run the bot with the command as below.

### new
```bash
npm run new
```
This command used to creating new session if you not logged-in before, you can't start the bot if the bot not logged-in.

### start
```bash
npm run start
```
Start running the bot

### dev
```bash
npm run dev
```
This command is used for development mode, if you run this command.. your bot will automatic restart if you change some code inside your bot.


## Relevant
- [Introduction](https://github.com/ZanixonGroup/amira-bot-base/blob/master/docs%2Fintroduction.md)
- [How to make new command](https://github.com/ZanixonGroup/amira-bot-base/blob/master/docs%2FCommands.md)
- [How to use MessageCollector](https://github.com/ZanixonGroup/amira-bot-base/blob/master/docs%2FMessageCollector.md)