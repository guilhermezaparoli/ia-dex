import { app } from "./app.js";

// Export the app for Vercel serverless
export default async (req: any, res: any) => {
    await app.ready();
    app.server.emit('request', req, res);
};
