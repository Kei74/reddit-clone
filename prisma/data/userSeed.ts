import bcrypt from "bcrypt";
import range from "lodash/range";
import { faker } from "@faker-js/faker";

import Seeder from "./Seeder";

class UserSeed extends Seeder {
  communities: { id: string }[];
  constructor(count: number = 10, communities: { id: string }[] = []) {
    super(count);
    this.communities = communities;
    this.createData();
  }

  createData() {
    range(this.count).forEach(() => {
      const communityList: { id: string; }[] = [];
      this.communities.forEach(community => {
        if(Math.random() > 0.5)
            communityList.push({ id: community.id })
      })
      this._data.push({
        name: faker.internet.username(),
        email: faker.internet.email(),
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.anytime(),
//        password: bcrypt.hashSync(faker.internet.password(), 10),
        communities: {
          connect: communityList,
        },
      });
    });
  }
}

export default UserSeed;