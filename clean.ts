import * as fs from 'fs';
import * as glob from 'glob';

const dataFiles = glob.globSync('data/*.json');

for (let file of dataFiles) {
  if (fs.existsSync(file)) {
    fs.rmSync(file);
  }
}

if (fs.existsSync('Console-Collection.exe')) {
  fs.rmSync('Console-Collection.exe');
}
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
}
