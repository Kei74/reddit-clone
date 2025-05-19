import Avatar from "@/app/_components/Avatar";
import PostBox from "@/app/_components/PostBox";
import PostsList from "@/app/_components/PostsList";
import { prisma } from "@/lib/prisma/client";

export default async function CommunityPage({ params, }: { params: Promise<{ name: string }> }) {
	const { name: communityName } = await params;
	const community = await prisma.community.findUnique({
		where: {
			name: communityName,
		},
	});
	/*
	const posts = await prisma.post.findMany({
		where: {
			community: {
				id: {
					equals: communityName,
				},
			},
		},
		include: {
			author: true,
		},
	})
	*/
	return (
		// <PostsList communityName = {communityName}/>
		<div className="">
			<div className="h-24 bg-green-800 p-8">
				<div className="-mx-8 mt-10 bg-white">
					<div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
						<div className="-mt-8">
							<Avatar seed={communityName} large />
						</div>
						<div>
							<h1 className="text-3xl font-semibold">
								{communityName}
							</h1>
						</div>
					</div>
				</div>
				<div className="mx-auto max-w-5xl pb-10">
					{community.description}
					<PostBox communityName={communityName} />
					<PostsList communityName={communityName} />
				</div>
			</div>
		</div>
	);
}