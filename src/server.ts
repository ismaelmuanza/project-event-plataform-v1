import { env } from "./env";
import { app } from "./app";

app.listen({
    port: env.PORT
}).then(() => console.log('HTTP SERVER RUNNING ON PORT', env.PORT))

