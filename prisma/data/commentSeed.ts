import range from "lodash/range";
import { faker } from "@faker-js/faker";

import Seeder from "./Seeder";

class CommentSeed extends Seeder {
  posts: { id: string }[];
  users: { id: string }[];
  constructor(count: number = 200, posts:{ id: string }[], users: { id: string }[]) {
    super(count);
    this.count = count;
    this.posts = posts;
    this.users = users;
    this.createData();
  }

  createData() {
    range(this.count).forEach(() => {
      this._data.push({
        //updatedAt: faker.date.anytime(),
        content: faker.lorem.paragraph(),
        createdAt: faker.date.anytime(),
        post: {
          connect: { id:  this.posts[Math.floor((Math.random() - 0.0001) * this.posts.length)].id}
        }, 
        author: {
          connect: { id:  this.users[Math.floor((Math.random() - 0.0001) * this.users.length)].id}
        },
      });
    });
  }
}

export default CommentSeed;