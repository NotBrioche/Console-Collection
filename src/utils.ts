import Player from './player';
import Item from './item';
import { Moon } from 'lunarphase-js';

import all from '../data/all.json';
import common from '../data/common.json';
import uncommon from '../data/uncommon.json';
import rare from '../data/rare.json';
import epic from '../data/epic.json';
import legendary from '../data/legendary.json';
import mythic from '../data/mythic.json';
import secret from '../data/secret.json';

const createSeasonSolver = require('date-season');

class Utils {
  static getSeasonName(date: Date = new Date()) {
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
      all,
      common,
      uncommon,
      rare,
      epic,
      legendary,
      mythic,
      secret,
    ];

    const json = filesNames[rarity];

    const items = json['items'];
    return items as Item[];
  }

  static getAllPossibleToGetItems(
    player: Player,
    rarity: number,
    action?: string,
    equipped?: Item
  ): Item[] {
    const items: Item[] = Utils.importAllItems(rarity);
    const available = [];

    for (const item of items) {
      // let owned = false;
      // for (const playerItem of player.collection) {
      //   if (item['id'] == playerItem.id) {
      //     owned = true;
      //     break;
      //   }
      // }
      // if (owned) {
      //   continue;
      // }

      if (item['conditions']! === undefined) {
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

      if (item['conditions']!!['time'] !== undefined) {
        const dayPart = this.getCurrentDayPart();

        switch (item['conditions']!!['time']) {
          case 'day':
            if (dayPart == 3) {
              continue;
            }
            break;
          case 'night':
            if (dayPart != 3) {
              continue;
            }
            break;
          case 'morning':
            if (dayPart != 0) {
              continue;
            }
            break;
          case 'afternoon':
            if (dayPart != 1) {
              continue;
            }
            break;
          case 'evening':
            if (dayPart != 2) {
              continue;
            }
            break;

          default:
            continue;
        }

        // TODO plage de temps
      }

      if (item['conditions']!['season'] !== undefined) {
        let season = Utils.getSeasonName();

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

        if (item['conditions']!['season'] != season) {
          continue;
        }
      }

      if (item['conditions']!['moonPhase'] !== undefined) {
        const moonPhase = Moon.lunarPhase().toString();

        // new first full last
        switch (item['conditions']!['moonPhase']) {
          case 'new':
            if (moonPhase != 'New') continue;
          case 'first':
            if (moonPhase != 'First Quarter') continue;
          case 'full':
            if (moonPhase != 'Full') continue;
          case 'last':
            if (moonPhase != 'Last Quarter') continue;
        }
      }

      if (item['conditions']!['action'] !== undefined) {
        if (item['conditions']!['action'] != action) {
          continue;
        }
      }

      if (item['conditions']!['items'] !== undefined) {
        let itemValid = false;
        for (const itemId of item['conditions']!['items']!) {
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

      if (item['conditions']!['land'] !== undefined) {
        if (item['conditions']!['land'] != player.land) {
          continue;
        }
      }

      if (item['conditions']!['equipped'] !== undefined) {
        if (item['conditions']!['equipped'] != equipped?.id) {
          continue;
        }
      }

      if (item['conditions']!['money'] !== undefined) {
        if (item['conditions']!['money']! > player.money) {
          continue;
        }
      }

      // if (fs.existsSync('data/available.json')) {
      //   fs.rmSync('data/available.json');
      // }
      // fs.writeFileSync(
      //   'data/available.json',
      //   JSON.stringify(available, null, 2)
      // );

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
        return '\x1b[32m' + message + '\x1b[0m';
      case 2:
        return '\x1b[36m' + message + '\x1b[0m';
      case 3:
        return '\x1b[35m' + message + '\x1b[0m';
      case 4:
        return '\x1b[33m' + message + '\x1b[0m';
      case 5:
        return '\x1b[31m' + message + '\x1b[0m';
      case 6:
        return '\x1b[1m\x1b[31m' + message + '\x1b[0m';
    }
  }

  static getTimeEmoji() {
    return this.getCurrentDayPart() == 3 ? Moon.lunarPhaseEmoji() : '☀️';
  }

  static getCurrentDayPart() {
    const now = new Date();
    const elapsed = now.getHours() * 60 + now.getMinutes();

    const season = this.getSeasonName();

    // Été : 6:00 - 23:00
    // Automne + Printemps : 6:30 - 20:00
    // Hiver : 7:30 - 18:00

    const morningElapsed =
      season == 'Été' ? 360 : season == 'Hiver' ? 450 : 390;
    const nightElapsed =
      season == 'Été' ? 1380 : season == 'Hiver' ? 1080 : 1200;

    const eveningElapsed =
      nightElapsed -
      (season == 'Été' ? 4 * 60 : season == 'Hiver' ? 2 * 60 : 3 * 60);
    const afternoonElapsed = 720;

    if (elapsed >= morningElapsed && elapsed < afternoonElapsed) {
      return 0;
    }
    if (elapsed >= afternoonElapsed && elapsed < eveningElapsed) {
      return 1;
    }
    if (elapsed >= eveningElapsed && elapsed < nightElapsed) {
      return 2;
    }
    if (elapsed < morningElapsed || elapsed >= nightElapsed) {
      return 3;
    }
  }

  static getItemFromId(id: number, quality?: number, rareVariant?: boolean) {
    const base = all.items[id - 1];

    return new Item(
      base.id,
      base.name,
      base.description,
      base.collection,
      null,
      base.rarity,
      quality,
      rareVariant
    );
  }
}

export default Utils;
