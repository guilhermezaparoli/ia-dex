import { app } from "./app.js";


app.listen({
    port: 5555,
     host: '0.0.0.0',
}).then(() => {
    console.log(`Server is running at port ${5555}`);
})