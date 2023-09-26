import express, { Router } from "express";
import { createItem, deleteItem, getItem, getItems, updateItem } from "../controllers/players";
import { validatorCreateItem, validatorGetItem } from "../validators/players";

const router: Router = express.Router();

/**
 * Get players
 * @openapi
 * /players:
 *      get:
 *          tags:
 *              - players
 *          summary: Players list
 *          description: Get all players data.
 *          responses:
 *              200:
 *                  description: Data successfully retrieved.
 */
router.get("", getItems);

/**
 * Get player details
 * @openapi
 * /players/{id}:
 *      get:
 *          tags:
 *              - players
 *          summary: Player details
 *          description: Get details from a player.
 *          parameters:
 *              - name: id
 *                in: path
 *                description: Player ID
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: Data successfully retrieved.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/player'
 */
router.get("/:id", validatorGetItem, getItem);

/**
 * Create a player
 * @openapi
 * /players:
 *      post:
 *          tags:
 *              - players
 *          summary: Create player
 *          description: Create a new player.
 *          responses:
 *              201:
 *                  description: Player successfully created.
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/player'
 */
router.post("", validatorCreateItem, createItem);

/**
 * Delete a player
 * @openapi
 * /players/{id}:
 *      delete:
 *          tags:
 *              - players
 *          summary: Delete player
 *          description: Delete a player
 *          parameters:
 *              - name: id
 *                in: path
 *                description: PlayerID
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: Player successfully deleted.
 */
router.delete("/:id", validatorGetItem, deleteItem);

/**
 * Update a player
 * @openapi
 * /players/{id}:
 *      put:
 *          tags:
 *              - players
 *          summary: Update player
 *          description: Modify player details
 *          parameters:
 *              - name: id
 *                in: path
 *                description: PlayerID
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: Player successfully updated.
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/player"
 */
router.put("/:id", validatorGetItem, validatorCreateItem, updateItem);

export { router };