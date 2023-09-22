import express, { Router } from "express";
import { createItem, deleteItem, getItem, getItems, updateItem } from "../controllers/players";
import { validatorCreateItem, validatorGetItem } from "../validators/players";

const router: Router = express.Router();

router.get("", getItems);
router.get("/:id", validatorGetItem, getItem);
router.post("", validatorCreateItem, createItem);
router.delete("/:id", validatorGetItem, deleteItem);
router.put("/:id", validatorGetItem, validatorCreateItem, updateItem);

export { router };