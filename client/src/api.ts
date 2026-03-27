// API client for Waypoint

const API_BASE = import.meta.env.DEV ? 'http://localhost:3001/api' : '/api'

interface ApiError {
  error: string
}

export async function getTasks() {
  const res = await fetch(`${API_BASE}/tasks`)
  if (!res.ok) {
    const error = (await res.json()) as ApiError
    throw new Error(error.error || 'Failed to fetch tasks')
  }
  return res.json()
}

export async function createTask(input: any) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) {
    const error = (await res.json()) as ApiError
    throw new Error(error.error || 'Failed to create task')
  }
  return res.json()
}

export async function updateTask(id: string, input: any) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) {
    const error = (await res.json()) as ApiError
    throw new Error(error.error || 'Failed to update task')
  }
  return res.json()
}

export async function deleteTask(id: string) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    const error = (await res.json()) as ApiError
    throw new Error(error.error || 'Failed to delete task')
  }
}
