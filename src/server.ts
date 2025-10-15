// src/server.ts
import { CommonEngine } from '@angular/ssr/node';
import { render } from '@netlify/angular-runtime/common-engine';

const commonEngine = new CommonEngine();

export async function netlifyCommonEngineHandler(
  request: Request,
  _context: unknown
): Promise<Response> {
  const { pathname } = new URL(request.url);

  // Ejemplo de endpoint API:
  if (pathname === '/api/hello') {
    return Response.json({ message: 'Hello from the API' });
  }

  // Render SSR
  return render(commonEngine);
}
