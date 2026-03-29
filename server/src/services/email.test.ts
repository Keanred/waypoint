import { beforeEach, describe, expect, it, vi } from 'vitest';

const { sendMock, resendCtorMock } = vi.hoisted(() => {
  const sendMock = vi.fn();
  const resendCtorMock = vi.fn().mockImplementation(() => ({
    emails: {
      send: sendMock,
    },
  }));

  return { sendMock, resendCtorMock };
});

vi.mock('../config', () => ({
  config: {
    resendApiKey: 'test-resend-key',
    reminderEmailRecipient: 'alerts@example.com',
  },
}));

vi.mock('resend', () => ({
  Resend: resendCtorMock,
}));

import { EmailService } from './email';

describe('EmailService', () => {
  const task = {
    id: '00000000-0000-0000-0000-000000000010',
    title: 'Submit quarterly report',
    description: 'Include final KPI chart',
    dueDate: new Date('2026-03-30T14:00:00.000Z'),
  };

  const reminder = {
    id: '00000000-0000-0000-0000-000000000011',
    offsetValue: 2,
    offsetUnit: 'HOURS' as const,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Date.prototype, 'toLocaleString').mockReturnValue('30/03/2026, 17:00:00 UTC');
  });

  it('initializes Resend with config API key', () => {
    new EmailService();

    expect(resendCtorMock).toHaveBeenCalledOnce();
    expect(resendCtorMock).toHaveBeenCalledWith('test-resend-key');
  });

  it('returns success true and sends expected payload when email send succeeds', async () => {
    sendMock.mockResolvedValue({ data: { id: 'email_123' }, error: null });
    const service = new EmailService();

    const result = await service.sendReminderEmail(task, reminder);

    expect(result).toEqual({ success: true });
    expect(sendMock).toHaveBeenCalledOnce();
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'onboarding@resend.dev',
        to: 'alerts@example.com',
      }),
    );

    const payload = sendMock.mock.calls[0][0];
    expect(payload.subject).toContain('⏰ Reminder: Submit quarterly report');
    expect(payload.subject).toContain('2026-03-30T14:00:00.000Z');
    expect(payload.html).toContain('Task: Submit quarterly report');
    expect(payload.html).toContain('This reminder was scheduled 2 HOURS before the deadline.');
    expect(Date.prototype.toLocaleString).toHaveBeenCalledWith('en-GB', { timeZone: 'Etc/UTC' });
  });

  it('logs and returns success false when Resend returns an error response', async () => {
    sendMock.mockResolvedValue({
      data: null,
      error: { message: 'SMTP temporarily unavailable' },
    });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const service = new EmailService();

    const result = await service.sendReminderEmail(task, reminder);

    expect(result).toEqual({ success: false, error: 'SMTP temporarily unavailable' });
    expect(errorSpy).toHaveBeenCalledOnce();

    errorSpy.mockRestore();
  });

  it('logs and returns success false when Resend send throws', async () => {
    sendMock.mockRejectedValue(new Error('socket hang up'));
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const service = new EmailService();

    const result = await service.sendReminderEmail(task, reminder);

    expect(result).toEqual({ success: false, error: 'socket hang up' });
    expect(errorSpy).toHaveBeenCalledOnce();

    errorSpy.mockRestore();
  });
});
