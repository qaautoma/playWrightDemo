import { Browser, Page, chromium, firefox, webkit, BrowserType, LaunchOptions } from 'playwright';

export class BaseBrowser {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private browserType: BrowserType<Browser>;

  constructor(browserType: 'chromium' | 'firefox' | 'webkit' = 'chromium') {
    if (browserType === 'chromium') {
      this.browserType = chromium;
    } else if (browserType === 'firefox') {
      this.browserType = firefox;
    } else {
      this.browserType = webkit;
    }
  }

  async startBrowser(headless: boolean = false) {
    this.browser = await this.browserType.launch({ headless });
    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    if (this.page) {
      await this.page.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }

  async navigateTo(url: string) {
    if (this.page) {
      await this.page.goto(url);
    }
  }

  async getTitle(): Promise<string> {
    if (this.page) {
      return this.page.title();
    }
    throw new Error('Page not initialized');
  }
}


