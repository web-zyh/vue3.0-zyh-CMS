import { getItem } from "../storage/storage";
/**
 * @description:  Get token
 */

export function getToken(): string | null {
  return getItem("token");
}
