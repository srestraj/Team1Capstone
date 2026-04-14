import { handlers } from "../../../auth";
console.log("Handlers in auth route:", handlers);
export const { GET, POST } = handlers;