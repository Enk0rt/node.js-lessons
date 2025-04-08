import { EmailEnum } from "../enums/email.enum";
export const emailConstants = {
    [EmailEnum.WELCOME]: {
        subject: "Welcome",
        template: "welcome",
    },
    [EmailEnum.ACTIVATE]: {
        subject: "Activate account",
        template: "activate",
    },
    [EmailEnum.RECOVERY]: {
        subject: "Recover password",
        template: "recovery",
    },
};
