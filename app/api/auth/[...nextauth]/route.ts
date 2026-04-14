import { handlers } from "@/app/lib/auth";
console.log("Handlers in auth route:", handlers);
export const { GET, POST } = handlers;