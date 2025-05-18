abstract class Seeder {
	protected count: number; // decides how much data to generate
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	_data: any = []; // seed data

	constructor(count: number) {
		this.count = count;
	}

	protected abstract createData(): void; // function to generate the data

	get data(): [] {
		return this._data;
	}
}

export default Seeder;