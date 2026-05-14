import { BasePage } from "./BasePage";
import { HeaderComponent } from "./components/HeaderComponent";
import { MobileNavComponent } from "./components/MobileNavComponent";
import { testConfig } from "../config";

export class HomePage extends BasePage {
  readonly header: HeaderComponent;
  readonly mobileNav: MobileNavComponent;

  constructor(page: any) {
    super(page, testConfig.baseURL + "/");
    this.header = new HeaderComponent(page);
    this.mobileNav = new MobileNavComponent(page);
  }
}
