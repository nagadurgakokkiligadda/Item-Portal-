exports.Test = class Test{
    constructor(page){
        this.page = page;
        this.user = "[title='Users']"
        this.addUser = "//div[@class='sc-eIceNc bBJBCf']"
        this.fullName = '//input[@placeholder="Enter Full Name"]'
        this.email = "//input[@placeholder='Enter Email']"
        this.phoneNumber = '//input[@placeholder="Enter Phone Number"]'
        this.role = '.ant-radio-input'
        this.createBtn = '//button[normalize-space()="Create"]'
        this.resetBtn = "//button[normalize-space()='Reset']"
        // this.mailErr = "//p[@class='sc-hYmYN lmSPwb']"
        this.emailErr ="//p[normalize-space()='Invalid Email']"
        this.mobileErr = "//p[normalize-space()='Number required']"
        this.fullNameErr = "//p[normalize-space()='Full Name required']"
        this.roleErr = "//span[normalize-space()='Please Select User Role']"
    }
    async launchUserPage(){
        await this.page.locator(this.user).click()
    }
    async userCreation(fullName,phoneNumber,email){
        await this.page.locator(this.addUser).click()
        await this.page.locator(this.fullName).fill(fullName)
        await this.page.locator(this.email).fill(email)
        await this.page.locator(this.phoneNumber).fill(phoneNumber)
        await this.page.locator(this.role).last().check()
        await this.page.locator(this.createBtn).click()
        // await this.page.locator(this.resetBtn).click()
    }
    async getFieldLengths() {
        const fullNameValue = await this.page.locator(this.fullName).inputValue();
        const emailValue = await this.page.locator(this.email).inputValue();
        const phoneNumberValue = await this.page.locator(this.phoneNumber).inputValue();

        const fullNameLength = fullNameValue.length;
        const emailLength = emailValue.length;
        const phoneNumberLength = phoneNumberValue.length;

        console.log(`Full Name length: ${fullNameLength}`);
        console.log(`Email length: ${emailLength}`);
        console.log(`Phone Number length: ${phoneNumberLength}`);

        return {
            fullNameLength,
            emailLength,
            phoneNumberLength
        };
    }
}



