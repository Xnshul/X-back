<<<<<<< HEAD
import { initServer } from "./app";

async function init() {
    const app = await initServer();
    app.listen(8000, () => console.log(`Server Started at PORT:8000`));
}

init();

=======
import { initServer } from "./app";
import  express from "express";


import { expressMiddleware } from "@apollo/server/express4";

export async function init() {
    const app = express();
    app.use(express.json());
    
    
    app.listen(8000, () => console.log(`Server Started at PORT:8000`));
    return app;
}



>>>>>>> d432332 (googleauth)
