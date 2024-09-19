// import { User } from "../POM/User";
// const { Login } = require('./login.spec');
const{test,expect}=require('@playwright/test')
test("User Creation",async({page})=>{
    const user = new User(page)
    await user.createUser('Durga','durga@test.com','7569147913')
    await page.waitForTimeout(5000)
})