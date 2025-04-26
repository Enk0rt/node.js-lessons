import { CronJob } from "cron";

import { emailConstants } from "../constants/email.constants";
import { EmailEnum } from "../enums/email.enum";
import { User } from "../models/user.model";
import { emailService } from "../services/email.service";

const handler = async () => {
    try {
        const users = await User.find();
        users.map((item) => {
            emailService.sendMail(item.email, emailConstants[EmailEnum.SPAM], {
                name: item.name,
            });
        });
    } catch (e) {
        console.error(e.message);
    }
};

export const sendEmailCron = new CronJob("10 * * * * *", handler);
