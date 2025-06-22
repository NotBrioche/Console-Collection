import * as fs from 'fs';
import Player from './player';
import Item from './item';

const createSeasonSolver = require('date-season');

class Utils {
  static getSeason(date: Date) {
    const season = createSeasonSolver();
    const s = season(date);

    switch (s) {
      case 'Spring':
        return 'Printemps';
      case 'Summer':
        return 'Été';
      case 'Autumn':
        return 'Automne';
      case 'Winter':
        return 'Hiver';
    }
  }

  static importAllItems(rarity: number = 0) {
    const filesNames = [
      'all',
      'common',
      'uncommon',
      'rare',
      'epic',
      'legendary',
      'mythic',
      'secret',
    ];

    const fileString = fs.readFileSync(
      `data/${filesNames[rarity]}.json`,
      'utf-8'
    );
    const json = JSON.parse(fileString);

    const items = json['items'];
    return items;
  }

  static getAllPossibleToGetItems(
    player: Player,
    rarity: number,
    action?: string,
    equiped?: Item
  ): Item[] {
    const items = Utils.importAllItems(rarity);
    const available = [];

    for (const item of items) {
      //   let owned = false;
      //   for (const playerItem of player.collection) {
      //     if (item['id'] == playerItem.id) {
      //       owned = true;
      //       break;
      //     }
      //   }
      //   if (owned) {
      //     continue;
      //   }

      if (item['conditions'] === undefined) {
        available.push(
          new Item(
            item['id'],
            item['name'],
            item['description'],
            item['collection'],
            null,
            item['rarity']
          )
        );

        continue;
      }

      if (item['conditions']['time'] !== undefined) {
        const now = new Date();
        const elapsed = now.getHours() * 60 + now.getMinutes();

        switch (item['conditions']['time']) {
          case 'day':
            if (elapsed >= 360 && elapsed < 1380) {
            } else {
              continue;
            }
            break;
          case 'night':
            if (elapsed < 360 && elapsed >= 1380) {
            } else {
              continue;
            }
            break;
          case 'morning':
            if (elapsed >= 360 && elapsed < 720) {
            } else {
              continue;
            }
            break;
          case 'afternoon':
            if (elapsed >= 720 && elapsed < 1080) {
            } else {
              continue;
            }
            break;
          case 'evening':
            if (elapsed >= 1080 && elapsed < 1380) {
            } else {
              continue;
            }
            break;
          default:
            continue;
        }

        // TODO plage de temps
      }

      if (item['conditions']['season'] !== undefined) {
        let season = Utils.getSeason(new Date());

        switch (season) {
          case 'Printemps':
            season = 'spring';
            break;
          case 'Été':
            season = 'summer';
            break;
          case 'Automne':
            season = 'autumn';
            break;
          case 'Hiver':
            season = 'winter';
            break;
        }

        if (item['conditions']['season'] != season) {
          continue;
        }
      }

      if (item['conditions']['moon'] !== undefined) {
        // TODO moon condition check
      }

      if (item['conditions']['action'] !== undefined) {
        if (item['conditions']['action'] != action) {
          continue;
        }
      }

      if (item['conditions']['items'] !== undefined) {
        let itemValid = false;
        for (const itemId of item['conditions']['items']) {
          itemValid = false;
          for (const playerItem of player.collection) {
            if (playerItem.id == itemId) {
              itemValid = true;
              break;
            }
          }

          if (!itemValid) {
            break;
          }
        }

        if (!itemValid) {
          continue;
        }
      }

      if (item['conditions']['land'] !== undefined) {
        if (item['conditions']['land'] != player.land) {
          continue;
        }
      }

      if (item['conditions']['equiped'] !== undefined) {
        if (item['conditions']['equiped'] != equiped) {
          continue;
        }
      }

      if (item['conditions']['money'] !== undefined) {
        if (item['conditions']['money'] > player.money) {
          continue;
        }
      }

      //   if (fs.existsSync('data/available.json')) {
      //     fs.rmSync('data/available.json');
      //   }
      //   fs.writeFileSync(
      //     'data/available.json',
      //     JSON.stringify(available, null, 2)
      //   );

      available.push(
        new Item(
          item['id'],
          item['name'],
          item['description'],
          item['collection'],
          null,
          item['rarity']
        )
      );
    }

    return available;
  }

  static getRarity() {
    let rarity = 0;

    for (let i = 0; i < Item.rarities.length; i++) {
      if (Math.floor(Math.random() * 9) == 0) {
        rarity++;
      } else {
        break;
      }
    }

    return rarity;
  }

  static printWithRarityColor(message: string, rarity: number) {
    switch (rarity) {
      default:
      case 0:
        return message;
      case 1:
        return '\x1b[34m' + message + '\x1b[0m';
      case 2:
        return '\x1b[32m' + message + '\x1b[0m';
      case 3:
        return '\x1b[36m' + message + '\x1b[0m';
      case 4:
        return '\x1b[35m' + message + '\x1b[0m';
      case 5:
        return '\x1b[33m' + message + '\x1b[0m';
      case 6:
        return '\x1b[31m' + message + '\x1b[0m';
    }
  }
}

export default Utils;
