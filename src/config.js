import colors from "colors";
import moment from "moment-timezone";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// main configs
global.botNumber = "62856971039021";
global.bot = {
  public: true,
  antiCall: true,
  owner: ["6288292024190"],
  sessionName: "session",
  prefix: /^[/]/i
}
global.clock = moment().tz("Asia/Jakarta").format("DD-MM-YY HH:mm:ss");

// utility
global.dirname = __dirname;

// beautify logs
colors.setTheme({
   main: ['brightBlue', 'bold'],
   plain: "brightGrey",
   info: "brightGreen",
   warn: "brightYellow",
   danger: "brightRed"
});

// sticker exif
global.exif = {
  packId: "https://github.com/ZanixonGroup",
  packName: `s.id/amirabot`,
  packPublish: "© Amira-MD",
  packEmail: "zanixon.group@gmail.com",
  packWebsite: "https://github.com/ZanixonGroup",
  androidApp: "https://play.google.com/store/apps/details?id=com.bitsmedia.android.muslimpro",
  iOSApp: "https://apps.apple.com/id/app/muslim-pro-al-quran-adzan/id388389451?|=id",
  emojis: [],
  isAvatar: 0,
}

// alert messages
global.alertMessage = {
  owner: "Features can only be accessed owner!",
  group: "Features only accessible in group!",
  private: "Features only accessible private chat!",
  admin: "Features can only be accessed by group admin!",
  botAdmin: "Bot is not admin, can't use the features!",
  bot: "Features only accessible by me",
  media: "Reply media...",
  query: "No Query?",
  error: "Seems to have encountered an unexpected error, please repeat your command for a while again",
  quoted: "Reply message...",
  wait: "Wait a minute...",
  urlInvalid: "Url Invalid",
  premium: "Premium Only Features!"
}