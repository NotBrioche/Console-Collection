import * as fs from 'fs';
import * as glob from 'glob';
import { Storage } from './src/storage';
import Item from './src/item';
import Condition from './src/condition';

const files = glob.globSync('data/**/*.json');
const datas: Array<Array<Storage>> = [];
const datasSingleArray: Array<Storage> = [];
const output: Array<Item> = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  datas.push(JSON.parse(content));
}

let count = 0;
for (let i = 0; i < datas.length; i++) {
  for (let j = 0; j < datas[i].length; j++) {
    datas[i][j].id = ++count;
    datas[i][j].collection = files[i]
      .split('\\')
      [
        files[i].split('\\').length - 1
      ].substring(0, files[i].split('\\')[files[i].split('\\').length - 1].length - 5);
    datasSingleArray.push(datas[i][j]);
  }
}

for (let i = 0; i < datasSingleArray.length; i++) {
  const item = new Item(
    datasSingleArray[i].id ?? -1,
    datasSingleArray[i].name,
    datasSingleArray[i].description,
    Condition.empty(),
    datasSingleArray[i].collection
  );
  output.push(item);
  if (
    datasSingleArray[i].conditions !== undefined &&
    datasSingleArray[i].conditions!.item !== undefined
  ) {
    const index =
      datasSingleArray.findIndex(
        (item: Storage) => item.name == datasSingleArray[i].conditions!.item
      ) + 1;
    output[i].conditions.item = index;
  }
}

fs.writeFileSync('data/all.json', JSON.stringify(output), {
  flag: 'w',
});
