import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getFlatsPaginationSchema } from "../schemas/flats";

export const flatsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(getFlatsPaginationSchema)
    .query(({ ctx, input }) => {
      const skip = input.page * 20;
      return ctx.prisma.flats.findMany({ skip, take: 20 });
    }),
});
