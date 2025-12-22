import { chromium, Browser, Page } from 'playwright';

export class BrowseTheWeb {
  private browser?: Browser;
  private page?: Page;

  async openNewPage(): Promise<Page> {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: false });
    }
    if (!this.page) {
      const context = await this.browser.newContext();
      this.page = await context.newPage();
    }
    return this.page;
  }

  get pageInstance(): Page {
    if (!this.page) throw new Error('La página aún no fue abierta. Usa openNewPage() primero.');
    return this.page;
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = undefined;
      this.page = undefined;
    }
  }
}
