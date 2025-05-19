import range from "lodash/range";
import { faker } from "@faker-js/faker";

import Seeder from "./Seeder";

class PostSeed extends Seeder {
  communities: { id: string }[];
  users: { id: string }[];
  constructor(count: number = 50, communities:{ id: string }[], users: { id: string }[]) {
    super(count);
    this.count = count;
    this.communities = communities;
    this.users = users;
    this.createData();
  }

  createData() {
    range(this.count).forEach(() => {
      this._data.push({
        title: faker.lorem.sentence(),
        //updatedAt: faker.date.anytime(),
        content: faker.lorem.paragraph(),
        createdAt: faker.date.anytime(),
        community: {
          connect: { id:  this.communities[Math.floor((Math.random() - 0.0001) * this.communities.length)].id}
        }, 
        author: {
          connect: { id:  this.users[Math.floor((Math.random() - 0.0001) * this.users.length)].id}
        },
      });
    });
  }
}

export default PostSeed;