import express from 'express';
import { join } from 'node:path';

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

import { getContext } from '@netlify/angular-runtime/context.mjs';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();

// --- Motores SSR ---
const angularApp = new AngularNodeAppEngine();

/**
 * Static /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * SSR para peticiones no estáticas (local / Express)
 */
app.use((req, res, next) => {
  angularApp
    .handle(req) // el adaptador Node entiende el req de Express
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Arranque local
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) throw error;
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Handler que usa Angular CLI (dev-server) o Firebase Functions si hiciera falta
 */
export const reqHandler = createNodeRequestHandler(app);

/**
 * ✅ Netlify + AppEngine (recomendado en Angular 18+)
 */
export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext() || {};
  const result = await angularApp.handle(request as any, context);
  return result ?? new Response('Not found', { status: 404 });
}
