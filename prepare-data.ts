import * as fs from 'fs';
import * as glob from 'glob';
import { lands } from './src/consts';

let total = 0;
const items: any[] = [];

const common: any[] = [];
const uncommon: any[] = [];
const rare: any[] = [];
const epic: any[] = [];
const legendary: any[] = [];
const mythic: any[] = [];
const secret: any[] = [];

const names = [
  'all',
  'common',
  'uncommon',
  'rare',
  'epic',
  'legendary',
  'mythic',
  'secret',
];

for (let file of names) {
  fs.writeFileSync(
    `data/${file}.json`,
    JSON.stringify({
      total: 0,
      items: [
        {
          id: 0,
          name: 'Placeholder',
          description: 'If you see this, my game is broken',
          collection: 'Debug',
          rarity: 1000,
        },
      ],
    })
  );
}

const files = glob.globSync('data/**/*.json');
const char = process.platform == 'win32' ? '\\' : '/';

files.forEach((file) => {
  let pass = true;
  for (const name of names) {
    if (file == `data${char}${name}.json`) {
      pass = false;
    }
  }

  if (!pass) {
    return;
  }

  const content = fs.readFileSync(file, 'utf-8');
  const json = JSON.parse(content);

  json.forEach((entry: any) => {
    total += 1;
    entry.id = total;
    entry.collection = file.substring(
      file.substring(file.indexOf(char) + 1, file.length).indexOf(char) +
        file.indexOf(char) +
        2,
      file.indexOf('.')
    );

    entry.collection =
      entry.collection[0].toUpperCase() +
      entry.collection.substring(1, entry.collection.length);
    items.push(entry);
  });
});

items.forEach((item: any) => {
  if (item.conditions !== undefined) {
    if (item.conditions['items'] !== undefined) {
      for (let i = 0; i < item.conditions['items'].length; i++) {
        items.forEach((condition: any) => {
          if (condition.name == item.conditions['items'][i]) {
            item.conditions['items'][i] = condition.id;
          }
        });
      }
    }

    if (item.conditions['equipped'] !== undefined) {
      items.forEach((condition: any) => {
        if (condition.name == item.conditions['equipped']) {
          item.conditions['equipped'] = condition.id;
        }
      });
    }

    if (item.conditions['land'] !== undefined) {
      item.conditions['land'] = lands[item.conditions['land']].name;
    }
  }

  switch (item.rarity) {
    default:
    case 0:
      common.push(item);
      break;
    case 1:
      uncommon.push(item);
      break;
    case 2:
      rare.push(item);
      break;
    case 3:
      epic.push(item);
      break;
    case 4:
      legendary.push(item);
      break;
    case 5:
      mythic.push(item);
      break;
    case 6:
      secret.push(item);
      break;
  }
});

[items, common, uncommon, rare, epic, legendary, mythic, secret].forEach(
  (collection, key) => {
    const output = {
      total: collection.length,
      items: collection,
    };
    fs.writeFileSync(
      `data/${names[key]}.json`,
      JSON.stringify(output, null, 2)
    );
  }
);
