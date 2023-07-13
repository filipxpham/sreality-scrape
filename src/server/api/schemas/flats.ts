import * as z from "zod";

export const getFlatsPaginationSchema = z.object({
  page: z.number(),
});
