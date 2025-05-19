import { Post, Prisma } from '@/generated/prisma'

export type PostWithAuthorCommunityNames = Post & Prisma.PostGetPayload<{
  select: {
    community: {
      select: {
        name: true
      }
    },
    author: {
      select: {
        name: true
      }
    },
  }
}>
