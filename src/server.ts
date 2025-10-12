import { app } from "./app.js";
import { env } from "./env/index.js";

app.log.info('Starting server...');
app.log.info(`Environment: ${env.NODE_ENV}`);
app.log.info(`Port: ${env.PORT}`);

app.listen({
    port: env.PORT,
    host: '0.0.0.0',
}).then(() => {
    app.log.info(`✅ Server is running at http://0.0.0.0:${env.PORT}`);
    app.log.info('Server started successfully');
}).catch((err) => {
    app.log.error({
        err,
        port: env.PORT,
        host: '0.0.0.0'
    }, '❌ Error starting server');
    process.exit(1);
})