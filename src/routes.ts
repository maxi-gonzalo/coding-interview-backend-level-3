import { Server } from '@hapi/hapi';

export const defineRoutes = (server: Server) => {
  server.route({
    method: 'GET',
    path: '/ping',
    handler: async () => {
      return {
        ok: true,
      };
    },
  });
};
