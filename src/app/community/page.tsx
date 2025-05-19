import { prisma } from "@/lib/prisma/client";

export default async function CommunitiesPage() {
	const communities = await prisma.community.findMany();
	return(
		<div>
			{JSON.stringify(communities)}
		</div>
	);		
}