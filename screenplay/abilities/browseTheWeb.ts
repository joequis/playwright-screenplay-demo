import { chromium, firefox, webkit, Browser, BrowserContext, Page } from 'playwright';

export type BrowserName = 'chromium' | 'firefox' | 'webkit';

export interface BrowseOptions {
  headless?: boolean;
  // aquí podrías agregar más opciones si las necesitas (args, slowMo, proxy, etc.)
}

async function launchBrowser(browserName: BrowserName, headless: boolean): Promise<Browser> {
  switch (browserName) {
    case 'chromium': return chromium.launch({ headless });
    case 'firefox': return firefox.launch({ headless });
    case 'webkit': return webkit.launch({ headless });
    default: throw new Error(`Browser no soportado: ${browserName}`);
  }
}

export class BrowseTheWeb {

  private readonly browserName: BrowserName;
  private readonly headless: boolean;
  private browser?: Browser;
  private context?: BrowserContext;
  private page?: Page;

  constructor(browserName: BrowserName, options: BrowseOptions = {}) {
    this.browserName = browserName;
    // default: false si no viene especificado (o cámbialo a true si prefieres)
    this.headless = typeof options.headless === 'boolean' ? options.headless : true;
  }

  async openNewPage(): Promise<Page> {
    if (!this.browser) {
      this.browser = await launchBrowser(this.browserName, this.headless);
    }
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    return this.page!;
  }

  get pageInstance(): Page {
    if (!this.page) throw new Error('La página aún no fue abierta. Usa openNewPage() primero.');
    return this.page;
  }

  async close(): Promise<void> {
    if (this.page) {
      await this.page.close().catch(() => { });
      this.page = undefined;
    }
    if (this.context) {
      await this.context.close().catch(() => { });
      this.context = undefined;
    }
  }

  async shutdown(): Promise<void> {
    await this.close();
    if (this.browser) {
      await this.browser.close().catch(() => { });
      this.browser = undefined;
    }
  }
}
