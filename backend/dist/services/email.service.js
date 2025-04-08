import fs from "node:fs/promises";
import * as path from "node:path";
import handlebars from "handlebars";
import nodemailer from "nodemailer";
import { config } from "../configs/config";
class EmailService {
    transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.EMAIL_USER,
                pass: config.EMAIL_PASSWORD,
            },
        });
    }
    async sendMail(to, emailData, context) {
        await this.transporter.sendMail({
            to,
            subject: emailData.subject,
            html: await this._renderTemplated(emailData.template, context),
        });
    }
    async _renderTemplated(templateName, context) {
        const layoutSource = await fs.readFile(path.join(process.cwd(), "src", "templates", "base.hbs"), "utf-8");
        const layoutTemplate = handlebars.compile(layoutSource);
        const templateSource = await fs.readFile(path.join(process.cwd(), "src", "templates", `${templateName}.hbs`), "utf-8");
        const childTemplate = handlebars.compile(templateSource);
        const childHtml = childTemplate(context);
        return layoutTemplate({ ...context, body: childHtml });
    }
}
export const emailService = new EmailService();
