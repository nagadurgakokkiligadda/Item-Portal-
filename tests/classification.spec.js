const{test,expect}=require('@playwright/test')
import { Login } from "../POM/Login"
import { ProductLink } from "../POM/productLink"
test("Product Link Hierarchy - successful creation",async({page})=>{
    const login = new Login(page)
    await login.launchPage()
    await login.loginDetails('7569147913')

    const prodlink = new ProductLink(page);
    await prodlink.createProductLink('1460','560','570','CV');
    await page.waitForTimeout(5000)
})