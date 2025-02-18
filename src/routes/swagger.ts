import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
const router: Router = express.Router();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API for Item',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:9000',
        description: 'local server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpecs = swaggerJsdoc(options);

// Route to swagger docs
router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(swaggerSpecs, {
    explorer: true,
    customCssUrl:
      'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css',
  }),
);

export default router;
