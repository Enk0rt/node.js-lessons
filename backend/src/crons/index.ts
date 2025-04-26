import { removeOldTokensCron } from "./remove.old.tokens.cron";
// import { sendEmailCron } from "./send.email.cron";

export const cronRunner = async () => {
    removeOldTokensCron.start();
    // sendEmailCron.start();
};
