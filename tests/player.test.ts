import Land from '../src/land';
import Player from '../src/player';

describe('Player class', () => {
    test('A player created with the constructor have to correct username', () => {
        const player = new Player('Brioche');
        expect(player.username).toBe('Brioche');
    }); 

    test('A new player with no arguments have the correct initial energy', () => {
        const player = new Player('Brioche');
        expect(player.energy).toBe(100);
    });

    test('A new player with no arguments have the correct initial land', () => {
        const player = new Player('Brioche');
        expect(player.land.equals(Land.default()));
    });

    test('A new player with no arguments have the correct initial collection',  () => {
        const player = new Player('Brioche');
        expect(player.collection.length).toBe(0);
    });

    test('A new player with no arguments have the correct initial money',  () => {
        const player = new Player('Brioche');
        expect(player.money).toBe(0);
    });
})