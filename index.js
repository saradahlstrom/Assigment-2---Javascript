import chalk from 'chalk';
import fs from 'fs/promises'
import {formatDistanceToNow, isAfter, isBefore, parse, format, isToday, set} from 'date-fns'
import {Command} from 'commander';
import getGitVersion from './src/getGitVersion.js';

const gitVersion = await getGitVersion()
console.log(`git version: ${gitVersion}`);

const first = 'Sara'
const last = 'Dahlström'
const name = `${chalk.bgMagenta(first)} ${chalk.bgYellow(last)}`
console.log('name', name)
console.log(`npm & node: ${process.env.npm_config_user_agent}`)




const realDeadline = new Date(2023, 2, 31)
console.log(formatDistanceToNow(realDeadline))

const argumentParser = new Command();
argumentParser.option('--date')
argumentParser.parse();

const dateStringSentAsArgument = argumentParser.args[0]
const dateSentAsArgument = parse(dateStringSentAsArgument, 'yyyy-MM-dd', new Date())
const currentDate = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })

const fileContent = `
Name: ${first} ${last}
Date: ${currentDate}
NPM & node: ${process.env.npm_config_user_agent}
Git version: ${gitVersion}
How late am I leaving this assignment: ${formatDistanceToNow(realDeadline)}
`;

console.log('Am I leaving this assignment in time?', isToday(dateSentAsArgument))
console.log('Am I leaving this assignment too late?', isAfter(currentDate, realDeadline))
console.log('Am I leaving this assignment extremely late?', isAfter(2023, 3, 31, currentDate))

fs.writeFile('index.md', fileContent);
fs.writeFile('index.html', fileContent);