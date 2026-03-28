// API client for Waypoint

import type { CreateTaskInput, UpdateTaskInput } from '@waypoint/schemas';

const API_BASE = import.meta.env.DEV ? 'http://localhost:3001/api' : '/api';

interface ApiError {
  error: string;
}

export const getTasks = async () => {
  const res = await fetch(`${API_BASE}/tasks`);
  if (!res.ok) {
    const error = (await res.json()) as ApiError;
    throw new Error(error.error || 'Failed to fetch tasks');
  }
  return res.json();
}

export const createTask = async (input: CreateTaskInput) => {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const error = (await res.json()) as ApiError;
    throw new Error(error.error || 'Failed to create task');
  }
  return res.json();
}

export const updateTask = async (id: string, input: UpdateTaskInput) => {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const error = (await res.json()) as ApiError;
    throw new Error(error.error || 'Failed to update task');
  }
  return res.json();
}

export const deleteTask = async (id: string) => {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const error = (await res.json()) as ApiError;
    throw new Error(error.error || 'Failed to delete task');
  }
}
