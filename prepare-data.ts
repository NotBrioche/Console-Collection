import * as fs from 'fs';
import * as glob from 'glob';

let total = 0;
const items: any[] = [];

const noCondition: any[] = [];

const common: any[] = [];
const uncommon: any[] = [];
const rare: any[] = [];
const epic: any[] = [];
const legendary: any[] = [];
const mythic: any[] = [];
const secret: any[] = [];

const wait: any[] = [];
const search: any[] = [];
const trade: any[] = [];
const event: any[] = [];

const names = [
  'all',
  'no_condition',
  'common',
  'uncommon',
  'rare',
  'epic',
  'legendary',
  'mythic',
  'secret',
  'wait',
  'search',
  'trade',
  'event',
];

for (let file of names) {
  if (fs.existsSync(`data/${file}.json`)) {
    fs.rmSync(`data/${file}.json`);
  }
}

const files = glob.globSync('data/**/*.json');

files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf-8');
  const json = JSON.parse(content);

  const char = process.platform == 'win32' ? '\\' : '/';

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

    switch (item.conditions['action']) {
      case 'event':
        event.push(item);
        break;
      case 'wait':
        wait.push(item);
        break;
      case 'search':
        search.push(item);
        break;
      case 'trade':
        trade.push(item);
        break;
    }
  } else {
    noCondition.push(item);
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

[
  items,
  noCondition,
  common,
  uncommon,
  rare,
  epic,
  legendary,
  mythic,
  secret,
  wait,
  search,
  trade,
  event,
].forEach((collection, key) => {
  const output = {
    total: collection.length,
    items: collection,
  };
  fs.writeFileSync(`data/${names[key]}.json`, JSON.stringify(output, null, 2));
});
