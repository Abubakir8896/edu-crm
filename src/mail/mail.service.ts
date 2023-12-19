import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { Admin } from '../admin/models/admin.model';
import { Teacher } from '../teacher/models/customer.model';
import { Customer } from '../customer/models/customer.model';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService){}

    async sendCustomerConfirmation(customer: Customer):Promise<void>{
        const url = `${process.env.API_HOST}/api/student/activate/${customer.activation_link}`;
        await this.mailerService.sendMail({
        to:customer.email,
        subject: `Welcome to Online Magazine ?`,
        template: 'confirmation.hbs',
        context: {
        name: customer.full_name,
        url,
        }})}

        async sendAdminConfirmation(customer: Admin):Promise<void>{
            const url = `${process.env.API_HOST}/api/admin/activate/${customer.activation_link}`;
            await this.mailerService.sendMail({
            to:customer.email,
            subject: `Welcome to edu-crm ?`,
            template: 'confirmation.hbs',
            context: {
            name: customer.username,
            url,
            }})}

        async sendTeacherConfirmation(teacher:Teacher ):Promise<void>{
            const url = `${process.env.API_HOST}/api/teacher/activate/${teacher.activation_link}`;
            await this.mailerService.sendMail({
            to:teacher.email,
            subject: `Welcome to edu-crm ?`,
            template: 'confirmation.hbs',
            context: {
            name: teacher.username,
            url,
            }})}
}