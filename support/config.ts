
// src/support/config.ts
import fs from 'fs';
import path from 'path';

export type BrowserName = 'chromium' | 'firefox' | 'webkit';

export interface BrowserEntry {
  name: BrowserName;
  headless?: boolean; // opcional: si falta, usa default global
}

export interface MatrixConfig {
  browsers: BrowserEntry[];  // ⬅️ ahora objetos
  headless: boolean;         // default global si algún browser no especifica
  parallel: number;
}

const DEFAULT_CONFIG: MatrixConfig = {
  browsers: [{ name: 'chromium', headless: true }],
  headless: true,
  parallel: 2,
};

export function loadMatrixConfig(): MatrixConfig {
  const cfgPath = path.resolve(process.cwd(), 'config.json');

  if (!fs.existsSync(cfgPath)) return DEFAULT_CONFIG;

  try {
    const raw = fs.readFileSync(cfgPath, 'utf8');
    const cfg = JSON.parse(raw);

    // Normaliza browsers en objetos {name, headless}
    let browsers: BrowserEntry[] = [];
    const allowed: BrowserName[] = ['chromium', 'firefox', 'webkit'];

    if (Array.isArray(cfg.browsers)) {
      // soporta tanto ["chromium", ...] como [{name:"chromium", headless:false}, ...]
      browsers = cfg.browsers
        .map((b: any) => {
          if (typeof b === 'string' && allowed.includes(b as BrowserName)) {
            return { name: b as BrowserName };
          }
          if (typeof b === 'object' && allowed.includes(b?.name)) {
            return { name: b.name as BrowserName, headless: !!b.headless };
          }
          return null;
        })
        .filter(Boolean) as BrowserEntry[];
    }

    if (!browsers.length) browsers = DEFAULT_CONFIG.browsers;

    const headless =
      typeof cfg.headless === 'boolean' ? cfg.headless : DEFAULT_CONFIG.headless;

    const parallel =
      Number.isFinite(cfg.parallel) ? Number(cfg.parallel) : DEFAULT_CONFIG.parallel;

    return { browsers, headless, parallel };
  } catch (e) {
    console.warn('No se pudo leer config.json, usando defaults.', e);
    return DEFAULT_CONFIG;
  }
}
