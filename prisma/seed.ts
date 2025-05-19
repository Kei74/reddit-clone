/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "../src/generated/prisma";
import _ from "lodash";
import CommunitySeed from "./data/communitySeed";
import UserSeed from "./data/userSeed";
import PostSeed from "./data/postSeed";
import CommentSeed from "./data/commentSeed";

const prisma = new PrismaClient();

async function ChunkedCreateAndReturnId(seedData: any[], prismaModel: any, chunkSize: number) {
	const objects: any[] = [];
	const chunkedData = _.chunk(seedData, chunkSize);
	for(let i = 0; i<chunkedData.length; i++) {
		const dataChunk = chunkedData[i];
		const promises: any[] = [];
		dataChunk.forEach((objectData) => {
			promises.push(
				prismaModel.create({
					data: objectData,
					select: {
						id: true
					}
				}).then((object: any) => objects.push(object))
			);
		});
		await Promise.all(promises);
	}
	return objects;
}

const main = async () => {
	try {
		console.log("entering main")

		await prisma.comment.deleteMany();
		await prisma.post.deleteMany();
		await prisma.user.deleteMany();
		await prisma.community.deleteMany();

		const communitySeed = new CommunitySeed(5);
		const communities = await prisma.community.createManyAndReturn({
			data: communitySeed.data,
			select: {
				id: true
			}
		});
		console.log("Created Communities");

		const userSeed = new UserSeed(5, communities);
		console.log("Created User Seed");

		const users: any[] = await ChunkedCreateAndReturnId(userSeed.data, prisma.user, 5);

		console.log("Created Users");


		const postSeed = new PostSeed(200, communities, users);
		console.log("Created Post Seed");

		const posts:any[] = await ChunkedCreateAndReturnId(postSeed.data, prisma.post, 5);
		
		
		console.log("Created Posts");

		const commentSeed = new CommentSeed(200, posts, users);
		console.log("Created Comment Seed");
		
		await ChunkedCreateAndReturnId(commentSeed.data, prisma.comment, 5);

		console.log("Created Comments");
		

		console.log(`Database has been seeded. 🚀`);
	} catch (e) {
		throw e;
	}
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
