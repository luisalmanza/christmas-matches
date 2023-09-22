import { readdirSync } from "fs";
import express, { Router } from "express";

const router: Router = express.Router();
const PATH_ROUTES = __dirname;

function removeExtension(filename: string): string {
    const cleanFileName = <string>filename.split(".").shift();
    return cleanFileName;
}

function loadRouter(file: string): void {
    const name = removeExtension(file);
    if (name !== "index") {
        import(`./${file}`).then(routerModule => {
            console.log(`Uploading route: ${name}`);
            router.use(`/${name}`, routerModule.router);
        });
    }
}

readdirSync(PATH_ROUTES).filter(file => loadRouter(file));

export default router;