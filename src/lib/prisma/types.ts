import { Prisma } from '@/generated/prisma'

export type PostWithAuthorCommunity = Prisma.PostGetPayload<{
  include: { community: true, author: true }
}>
