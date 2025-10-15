// src/server.ts
import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context';

const angularApp = new AngularAppEngine();

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext();
  const result = await angularApp.handle(request, context);
  return result ?? new Response('Not found', { status: 404 });
}

// Necesario para CLI (dev server y build):
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
