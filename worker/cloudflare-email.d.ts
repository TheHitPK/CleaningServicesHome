// Tipos mínimos del módulo `cloudflare:email` (lo provee el runtime de Workers).
// Se declaran aquí para no agregar @cloudflare/workers-types como dependencia.
declare module 'cloudflare:email' {
  export class EmailMessage {
    constructor(from: string, to: string, raw: string | ReadableStream);
    readonly from: string;
    readonly to: string;
  }
}
