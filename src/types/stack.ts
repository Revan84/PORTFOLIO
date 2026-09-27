import { z } from "zod";

export const stackLayerSchema = z.object({
  code: z.string(),
  name: z.string(),
  skills: z.array(z.object({ name: z.string() })),
});

export const stackLayerListSchema = z.array(stackLayerSchema);

export type StackLayer = z.infer<typeof stackLayerSchema>;
