// Ejecuta el CLI de Astro con la letra de unidad en mayúscula (Windows).
// Si la terminal abre el proyecto como `c:\...` (típico de VS Code), Tailwind v4 no genera
// el CSS y el build sale sin estilos. Arreglarlo en astro.config.ts no alcanza: Astro ya resolvió la ruta.
import { spawnSync } from 'node:child_process';

const cwd = process.platform === 'win32'
  ? process.cwd().replace(/^[a-z]:/, (drive) => drive.toUpperCase())
  : process.cwd();

const { status } = spawnSync(process.execPath, ['node_modules/astro/astro.js', ...process.argv.slice(2)], {
  cwd,
  stdio: 'inherit',
});
process.exit(status ?? 1);
