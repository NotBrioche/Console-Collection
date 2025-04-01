enum WeatherType {
    Sunny = 'Sunny',
    Rainy = 'Rainy',
    Cloudy = 'Cloudy',
    Foggy = 'Foggy',
    Snowy = 'Snowy',
    Stormy = 'Stormy'
}

class Weather {
    type: WeatherType;
    description: string;
    itemBonus: string[];

    private static _current: Weather;

    constructor(type: WeatherType) {
        this.type = type;
        this.itemBonus = this.getAffectedItems();
        this.description = this.getDescription();
    }

    private getDescription(): string {
        switch (this.type) {
            case WeatherType.Sunny: return "Le soleil brille dans un ciel clair.";
            case WeatherType.Rainy: return "La pluie tombe doucement.";
            case WeatherType.Cloudy: return "Le ciel est couvert de nuages.";
            case WeatherType.Foggy: return "Un épais brouillard limite la visibilité.";
            case WeatherType.Snowy: return "Des flocons de neige tombent lentement.";
            case WeatherType.Stormy: return "Le ciel est noir, des éclairs illuminent l'horizon.";
            default: return "Météo inconnue.";
        }
    }

    //To be implemented
    private getAffectedItems(): string[] {
        switch (this.type) {
            case WeatherType.Rainy: return ['Parapluie', 'Imperméable'];
            case WeatherType.Snowy: return ['Habits', 'Peau d\'ours'];
            case WeatherType.Sunny: return ['Gravité', 'Théorème de Pythagore'];
            case WeatherType.Foggy: return ['Lanterne', 'Boussole'];
            case WeatherType.Stormy: return ['Machine à remonter le temps', 'Exosquelette'];
            default: return [];
        }
    }

    public static getCurrent(): Weather {
        if (!Weather._current) {
            const types = Object.values(WeatherType);
            const randomType = types[Math.floor(Math.random() * types.length)];
            Weather._current = new Weather(randomType as WeatherType);
        }
        return Weather._current;
    }

    public static changeCurrent(): Weather {
        const types = Object.values(WeatherType);
        const randomType = types[Math.floor(Math.random() * types.length)];
        Weather._current = new Weather(randomType as WeatherType);
        return Weather._current;
    }
}

export default Weather;
export { WeatherType };