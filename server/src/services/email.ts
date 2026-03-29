import type { Reminder, Task } from '@waypoint/schemas';
import { Resend } from 'resend';
import { config } from '../config';

export class EmailService {
  #resend: Resend;

  constructor() {
    this.#resend = new Resend(config.resendApiKey);
  }

  async sendReminderEmail(task: Task, reminder: Reminder) {
    try {
      const result = await this.#resend.emails.send({
        from: 'onboarding@resend.dev',
        to: config.reminderEmailRecipient,
        subject: `⏰ Reminder: ${task.title} — due ${new Date(task.dueDate).toISOString()}`,
        html: `
        Task: ${task.title}
        Due: ${new Date(task.dueDate).toLocaleString('en-GB', { timeZone: 'Etc/UTC' })}
        Description: ${task.description || 'No description'}

        ---
        This reminder was scheduled ${reminder.offsetValue} ${reminder.offsetUnit} before the deadline.
        Sent by Waypoint.
        `,
      });

      if (result.error) {
        console.error(`Failed to send reminder email for task ${task.id} and reminder ${reminder.id}:`, result.error);
        return { success: false, error: result.error.message };
      }

      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Failed to send reminder email for task ${task.id} and reminder ${reminder.id}:`, error);
      return { success: false, error: message };
    }
  }
}
