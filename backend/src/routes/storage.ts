import express, { Router } from "express";
import { createItem, getItem, getItems, deleteItem } from "../controllers/storage";
import validatorGetItem from "../validators/storage";
import uploadMiddleware from "../utils/handleStorage";

const router: Router = express.Router();

router.get("", getItems);
router.get("/:id", validatorGetItem, getItem);
router.post("/", uploadMiddleware.single("myfile"), createItem);
router.delete("/:id", validatorGetItem, deleteItem);

export { router };