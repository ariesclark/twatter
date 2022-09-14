/* eslint-disable import/named */
import { z } from "zod";

import { PrivacyLevel as PrismaPrivacyLevel } from "~/utils/prisma";

export type { PrismaPrivacyLevel };

export const PrivacyLevel = z.nativeEnum(PrismaPrivacyLevel);

export type PrivacyLevel = z.infer<typeof PrivacyLevel>;
