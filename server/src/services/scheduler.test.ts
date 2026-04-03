import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  sendReminderEmailMock,
  getUnsentRemaindersMock,
  markReminderAsSentMock,
  dbInsertTaskMock,
  dbInsertReminderMock,
  dbGetRemindersByTaskIdMock,
  dbCountUnsentRemindersByTaskIdMock,
} = vi.hoisted(() => ({
  sendReminderEmailMock: vi.fn(),
  getUnsentRemaindersMock: vi.fn(),
  markReminderAsSentMock: vi.fn(),
  dbInsertTaskMock: vi.fn(),
  dbInsertReminderMock: vi.fn(),
  dbGetRemindersByTaskIdMock: vi.fn(),
  dbCountUnsentRemindersByTaskIdMock: vi.fn(),
}));

vi.mock('./email', () => ({
  EmailService: vi.fn().mockImplementation(() => ({
    sendReminderEmail: sendReminderEmailMock,
  })),
}));

vi.mock('./reminders', () => ({
  calculateNextReminderTime: vi.fn(),
  getUnsentRemainders: getUnsentRemaindersMock,
  markReminderAsSent: markReminderAsSentMock,
}));

vi.mock('@/db/queries/tasks', () => ({
  dbInsertTask: dbInsertTaskMock,
}));

vi.mock('@/db/queries/reminders', () => ({
  dbInsertReinder: dbInsertReminderMock,
  dbGetRemindersByTaskId: dbGetRemindersByTaskIdMock,
  dbCountUnsentRemindersByTaskId: dbCountUnsentRemindersByTaskIdMock,
}));

import { checkAndSendReminders } from './scheduler';

describe('checkAndSendReminders', () => {
  const baseTask = {
    id: '00000000-0000-0000-0000-000000000100',
    title: 'Review architecture doc',
    description: 'Finalize event flow',
    priority: 'Medium' as const,
    dueDate: new Date('2030-03-30T14:00:00.000Z'),
    recurrence: 'NONE' as const,
    recurringEndDate: null,
  };

  const baseReminder = {
    id: '00000000-0000-0000-0000-000000000101',
    taskId: '00000000-0000-0000-0000-000000000100',
    offsetValue: 1,
    offsetUnit: 'DAYS' as const,
    sentAt: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    getUnsentRemaindersMock.mockResolvedValue([{ reminder: baseReminder, task: baseTask }]);
    dbCountUnsentRemindersByTaskIdMock.mockResolvedValue(1);
    dbGetRemindersByTaskIdMock.mockResolvedValue([baseReminder]);
    dbInsertTaskMock.mockResolvedValue({ id: '00000000-0000-0000-0000-000000000200' });
    dbInsertReminderMock.mockResolvedValue({ id: '00000000-0000-0000-0000-000000000201' });
  });

  it('sends each unsent reminder and marks it sent when email succeeds', async () => {
    sendReminderEmailMock.mockResolvedValue({ success: true });

    await checkAndSendReminders();

    expect(sendReminderEmailMock).toHaveBeenCalledOnce();
    expect(sendReminderEmailMock).toHaveBeenCalledWith(baseTask, baseReminder);
    expect(markReminderAsSentMock).toHaveBeenCalledOnce();
    expect(markReminderAsSentMock).toHaveBeenCalledWith(baseReminder.id);
  });

  it('does not mark reminder as sent when email send fails', async () => {
    sendReminderEmailMock.mockResolvedValue({ success: false, error: 'network timeout' });

    await checkAndSendReminders();

    expect(sendReminderEmailMock).toHaveBeenCalledOnce();
    expect(markReminderAsSentMock).not.toHaveBeenCalled();
  });

  it('logs completion with number of reminders processed', async () => {
    sendReminderEmailMock.mockResolvedValue({ success: true });
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    await checkAndSendReminders();

    expect(logSpy).toHaveBeenCalledWith('Reminder check complete. Processed 1 reminders.');

    logSpy.mockRestore();
  });

  it('creates one recurring task with cloned reminders when all reminders are sent', async () => {
    const recurringTask = {
      ...baseTask,
      dueDate: new Date('2020-03-30T14:00:00.000Z'),
      recurrence: 'DAILY' as const,
    };
    const reminderTemplates = [
      {
        ...baseReminder,
        id: '00000000-0000-0000-0000-000000000300',
        offsetValue: 1,
        offsetUnit: 'DAYS' as const,
      },
      {
        ...baseReminder,
        id: '00000000-0000-0000-0000-000000000301',
        offsetValue: 2,
        offsetUnit: 'HOURS' as const,
      },
    ];

    getUnsentRemaindersMock.mockResolvedValue([{ reminder: baseReminder, task: recurringTask }]);
    sendReminderEmailMock.mockResolvedValue({ success: true });
    dbCountUnsentRemindersByTaskIdMock.mockResolvedValue(0);
    dbGetRemindersByTaskIdMock.mockResolvedValue(reminderTemplates);

    await checkAndSendReminders();

    expect(dbInsertTaskMock).toHaveBeenCalledOnce();
    expect(dbInsertReminderMock).toHaveBeenCalledTimes(2);
    expect(dbInsertReminderMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ taskId: expect.any(String), offsetValue: 1, offsetUnit: 'DAYS', sentAt: null }),
    );
    expect(dbInsertReminderMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ taskId: expect.any(String), offsetValue: 2, offsetUnit: 'HOURS', sentAt: null }),
    );
  });

  it('logs and continues when fetching unsent reminders fails', async () => {
    getUnsentRemaindersMock.mockRejectedValue(new Error('db unavailable'));
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    await checkAndSendReminders();

    expect(errorSpy).toHaveBeenCalledWith('Error processing reminders: db unavailable');
    expect(logSpy).toHaveBeenCalledWith('Reminder check complete. Processed 0 reminders.');

    errorSpy.mockRestore();
    logSpy.mockRestore();
  });
});
