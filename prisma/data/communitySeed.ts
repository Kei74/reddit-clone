import range from "lodash/range";
import { faker } from "@faker-js/faker";
import * as changeCase from "change-case";

import Seeder from "./Seeder";

class CommunitySeed extends Seeder {
  constructor(count: number = 10) {
    super(count);
    this.count = count;
    this.createData();
  }

  createData() {
    range(this.count).forEach(() => {
      const name = faker.food.dish();
      const snakedName = changeCase.snakeCase(name)
      //console.log(snakedName);
      this._data.push({
        name: snakedName,
        description: faker.food.description(),
        createdAt: faker.date.anytime(),
      });
    });
  }
}

export default CommunitySeed;