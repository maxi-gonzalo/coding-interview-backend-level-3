import express, { Router } from 'express';
import { getPingResponse } from '../controller/ping/ping.controller';

const router: Router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PingResponse:
 *       type: object
 *       example:
 *         ok: true
 */

/**
 * @swagger
 * tags:
 *   name: Ping
 *   description: The Ping API
 * /ping:
 *   get:
 *     summary: Test Ping API
 *     tags: [Ping]
 *     responses:
 *       200:
 *         description: The ping api response
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PingResponse'
 */

// Route to test ping
router.get('/', getPingResponse);

export default router;
