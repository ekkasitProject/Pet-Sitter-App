import crypto from "crypto";

export function generateRandomToken(length) {
  return crypto.randomBytes(length).toString("hex");
}
