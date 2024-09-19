import { Login } from "../POM/Login";
import { costRequester} from "../POM/costRequester";
const{test,expect}=require('@playwright/test')
test("Cost Item Request Creation",async({page}) => {
    const log = new Login(page)
    await log.launchPage()
    await log.loginDetails('7569147913')

    const newItem = new costRequester(page);
    await newItem.createNewItem('Cost','Cement')
    await newItem.requesterLevel('S1072','Naga Durga K')
    await page.waitForTimeout(5000)


})