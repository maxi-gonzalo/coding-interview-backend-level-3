import express, { Router } from 'express';
import {
  createItem,
  deleteItem,
  getAllItems,
  getItemByID,
  updateItem,
} from '../controller/item/index.item.controller';
const router: Router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemResponse:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Item
 *         name:
 *           type: string
 *           description: The name of the item
 *         price:
 *           type: number
 *           description: The price of the item
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the item was created
 *       example:
 *         id: d5fE_aszX1sff3
 *         name: Item1
 *         price: 10
 *         createdAt: 2025-02-14T04:05:06.157Z
 *     ItemBody:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the item
 *         price:
 *           type: number
 *           description: The price of the item
 *       example:
 *         name: Item1
 *         price: 10
 */

/**
 * @swagger
 * tags:
 *   name: Item
 *   description: The item managing API
 * /items:
 *   get:
 *     summary: Lists all the items exists in database
 *     tags: [Item]
 *     responses:
 *       200:
 *         description: The list of the items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ItemResponse'
 *   post:
 *     summary: Create a new item
 *     tags: [Item]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemBody'
 *     responses:
 *       201:
 *         description: The created Item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemResponse'
 *       400:
 *         description: Field "name" is required | Field "price" is required | Field "price" cannot be negative
 *       500:
 *         description: Some error
 * /items/{itemId}:
 *   get:
 *     summary: Get the item by id
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *     responses:
 *       200:
 *         description: The item response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemResponse'
 *       400:
 *         description: Param "itemId" is required
 *       404:
 *         description: item not found
 *   put:
 *    summary: Update the item by id
 *    tags: [Item]
 *    parameters:
 *      - in: path
 *        name: itemId
 *        schema:
 *          type: string
 *        required: true
 *        description: The item id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ItemBody'
 *    responses:
 *      200:
 *        description: The item was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ItemResponse'
 *      400:
 *         description: Param "itemId" is required | Field "name" is required | Field "price" is required | Field "price" cannot be negative
 *      404:
 *        description: The item was not found
 *      500:
 *        description: Some server error
 *   delete:
 *     summary: Remove the item by id
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *
 *     responses:
 *       204:
 *         description: The item was deleted
 *       400:
 *         description: Param "itemId" is required
 *       404:
 *         description: The item was not found
 */

// Route to get all existing Items
router.get('/', getAllItems);

// Route to get Item byId.
router.get('/:itemId', getItemByID);

// Route to create a new Item
router.post('/', createItem);

// Route to update an Item.
router.put('/:itemId', updateItem);

// Route to delete an Item.
router.delete('/:itemId', deleteItem);

export default router;
