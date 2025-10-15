// server.ts (ESM)

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

// --- Instancias SSR ---
const app = express();
const angularApp = new AngularNodeAppEngine();

// --- Archivos estáticos de /browser ---
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// --- SSR en local (Express) ---
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

// --- Arranque local (ng serve --ssr, node, PM2) ---
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error?: unknown) => {
    if (error) throw error;
    // eslint-disable-next-line no-console
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// --- Handler para Angular CLI / Firebase Functions (entornos con Express) ---
export const reqHandler = createNodeRequestHandler(app);

// --- Netlify: recomendado (AngularNodeAppEngine) ---
export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext() || {};
  const result = await angularApp.handle(request as any, context);
  return result ?? new Response('Not found', { status: 404 });
}
