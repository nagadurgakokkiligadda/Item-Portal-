 exports.Login = class Login {
    constructor(page){
        this.page = page,
        this.phoneNumber ="//input[@placeholder='Phone Number']"
        // this.phoneNumber_btn ='//button[@class="button"]//*[name()="svg"]'
        // this.otp_btn = '[placeholder="One Time Password"]~svg'
        // this.header = '.dashboard-header'
        // this.login_btn = '//div[@class="sc-fThTNe exzuYW"]'
        this.signIn_btn = "//button[normalize-space()='Sign in']"
    }
    async launchPage(){
        try {
            await this.page.goto('https://item.p360.build:8444/login');
        } catch (error) {
            console.error('Error navigating to the URL:', error);
        }
    }
    async loginDetails(phoneNumber){
        await this.page.locator(this.phoneNumber).fill(phoneNumber)
        // await this.page.locator(this.phoneNumber_btn).click()
        await this.page.pause()
        // await this.page.locator(this.otp_btn).click()
        // await this.page.locator(this.login_btn).click()
        await this.page.locator(this.signIn_btn).click()
    }
}