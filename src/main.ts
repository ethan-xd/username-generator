class Username {
	private minLength: number;
	private maxLength: number;
	private maxAlphabetStringLength: number;
	private seperator: string;
	private maxPartsOfName: number;
	private names: string[];
	private animals: string[];
	private colors: string[];
	private adjectives: string[];
	private letters: string[];

	constructor(
		minLength: number,
		maxLength: number,
		maxAlphabetStringLength: number,
		seperator: string,
		maxPartsOfName: number,
	) {
		if (minLength === undefined) this.minLength = 3;
		else this.minLength = minLength;

		if (maxLength === undefined) this.maxLength = 20;
		else this.maxLength = maxLength;

		if (maxAlphabetStringLength === undefined) this.maxAlphabetStringLength = 6;
		else this.maxAlphabetStringLength = maxAlphabetStringLength;

		if (seperator === undefined) this.seperator = '_';
		else this.seperator = seperator;

		if (maxPartsOfName === undefined) this.maxPartsOfName = 3;
		else this.maxPartsOfName = maxPartsOfName;

		this.names = require('./dict/names.js').d;
		this.animals = require('./dict/animals.js').d;
		this.colors = require('./dict/colors.js').d;
		this.adjectives = require('./dict/adjectives.js').d;
		this.letters = [
			'a',
			'b',
			'c',
			'd',
			'e',
			'f',
			'g',
			'h',
			'i',
			'j',
			'k',
			'l',
			'm',
			'n',
			'o',
			'p',
			'q',
			'r',
			's',
			't',
			'u',
			'v',
			'w',
			'x',
			'y',
			'z',
		];
	}

	private static getRand(arr: string[]) {
		return arr[Math.floor(Math.random() * arr.length)] as string;
	}

	private getPart(allowSeperator: boolean) {
		let item = '';
		const maxCase = allowSeperator ? 7 : 6;

		switch (Math.floor(Math.random() * maxCase)) {
			case 0:
				item = this.getName();
				break;
			case 1:
				item = this.getAnimal();
				break;
			case 2:
				item = this.getColor();
				break;
			case 3:
				item = this.getAdjective();
				break;
			case 4:
				item = this.getAlphabetString();
				break;
			case 5: {
				let ret = Math.floor(Math.random() * 10).toString();
				while (Math.random() < 0.3) ret += Math.floor(Math.random() * 10).toString();
				return ret;
			}
			case 6:
				return this.seperator;
		}

		switch (Math.floor(Math.random() * 3)) {
			case 0:
				return item.toLowerCase();
			case 1:
				return item.toUpperCase();
			default:
				return item;
		}
	}

	getName() {
		return Username.getRand(this.names);
	}

	getAnimal() {
		return Username.getRand(this.animals);
	}

	getColor() {
		return Username.getRand(this.colors);
	}

	getAdjective() {
		return Username.getRand(this.adjectives);
	}

	getAlphabetString() {
		const num = Math.floor(Math.random() * this.maxAlphabetStringLength) + 1;
		let ret = '';
		for (let i = 0; i < num; i++) {
			ret += Username.getRand(this.letters);
		}
		return ret;
	}

	makeUsername() {
		const parts = Math.floor(Math.random() * this.maxPartsOfName + 1);

		let ret = '';

		while (ret.length < this.minLength || ret.length > this.maxLength) {
			ret = '';

			for (let i = 0; i < parts; i++) {
				ret += this.getPart(i > 0 && i < parts - 1);
			}
		}

		return ret;
	}
}

module.exports = {
	Username,
};
