import express, { Router } from "express";
import { createItem, getItem, getItems, deleteItem } from "../controllers/storage";
import validatorGetItem from "../validators/storage";
import uploadMiddleware from "../utils/handleStorage";

const router: Router = express.Router();

/**
 * @openapi
 * /storage:
 *      get:
 *          tags:
 *              - storage
 *          summary: Photos list
 *          description: Get all photos from storage.
 *          responses:
 *              200:
 *                  description: Data successfully retrieved.
 *              403:
 *                  description: Validation error.
 */
router.get("", getItems);

/**
 * @openapi
 * /storage/{id}:
 *      get:
 *          tags:
 *              - storage
 *          summary: Photo details
 *          description: Get details from a photo.
 *          parameters:
 *              - name: id
 *                in: path
 *                description: Photo ID
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: Data successfully retrieved.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/storage'
 *              403:
 *                  description: Validation error.
 */
router.get("/:id", validatorGetItem, getItem);

/**
 * Upload a photo
 * @openapi
 * /storage:
 *      post:
 *          tags:
 *              - storage
 *          summary: Upload a photo
 *          description: Upload a photo on storage
 *          responses:
 *              201:
 *                  description: Photo successfully uploaded.
 *              403:
 *                  description: Validation error.
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              myfile:
 *                                  type: string
 *                                  format: binary
 */
router.post("/", uploadMiddleware.single("myfile"), createItem);

/**
 * Delete a phoyo
 * @openapi
 * /storage/{id}:
 *      delete:
 *          tags:
 *              - storage
 *          summary: Delete a photo
 *          description: Delete a photo from storage
 *          parameters:
 *              - name: id
 *                in: path
 *                description: Photo ID
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: Photo successfully deleted
 *              403:
 *                  description: Validation error.
 */
router.delete("/:id", validatorGetItem, deleteItem);

export { router };