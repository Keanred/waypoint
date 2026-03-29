import { describe, expect, it } from 'vitest';
import { calculateNextReminderTime } from './reminders';

describe('calculateNextReminderTime', () => {
  const dueDate = new Date('2026-03-30T14:00:00.000Z');

  it('subtracts minutes for MINUTE', () => {
    const result = calculateNextReminderTime(dueDate, 15, 'MINUTE');
    expect(result.toISOString()).toBe('2026-03-30T13:45:00.000Z');
  });

  it('subtracts minutes for MINUTES', () => {
    const result = calculateNextReminderTime(dueDate, 15, 'MINUTES');
    expect(result.toISOString()).toBe('2026-03-30T13:45:00.000Z');
  });

  it('subtracts hours for HOUR', () => {
    const result = calculateNextReminderTime(dueDate, 2, 'HOUR');
    expect(result.toISOString()).toBe('2026-03-30T12:00:00.000Z');
  });

  it('subtracts hours for HOURS', () => {
    const result = calculateNextReminderTime(dueDate, 2, 'HOURS');
    expect(result.toISOString()).toBe('2026-03-30T12:00:00.000Z');
  });

  it('subtracts days for DAY', () => {
    const result = calculateNextReminderTime(dueDate, 1, 'DAY');
    expect(result.toISOString()).toBe('2026-03-29T14:00:00.000Z');
  });

  it('subtracts days for DAYS', () => {
    const result = calculateNextReminderTime(dueDate, 1, 'DAYS');
    expect(result.toISOString()).toBe('2026-03-29T14:00:00.000Z');
  });

  it('throws for unsupported offset units', () => {
    expect(() => calculateNextReminderTime(dueDate, 1, 'WEEKS' as never)).toThrow(
      'Unsupported offset unit: WEEKS',
    );
  });
});
