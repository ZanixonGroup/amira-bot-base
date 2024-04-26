import colors from "colors";
import moment from "moment-timezone";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// main configs
global.botNumber = "62856971039021";
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