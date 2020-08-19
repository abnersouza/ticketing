import { randomBytes } from "crypto";

export const stripe = {
  charges: {
    create: jest.fn().mockImplementation((params?: {}, options?: {}) => {
      return { id: randomBytes(10).toString("hex") };
    }),
  },
};
