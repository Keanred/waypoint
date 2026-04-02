import type {
  CreateReminderInput,
  CreateSettingInput,
  CreateTaskResponse,
  CreateTaskWithRemindersInput,
  GetTasksResponse,
  ReminderResponse,
  SettingsResponse,
  TaskResponse,
  UpdateTaskInput,
} from '@waypoint/schemas';

const API_BASE = '/api';

type ApiErrorDetails = string | Record<string, unknown> | Array<unknown>;

type ApiSuccess<TData> = {
  success: true;
  data: TData;
};

type ApiFailure = {
  success: false;
  error: ApiErrorDetails;
};

type ApiResponse<TData> = ApiSuccess<TData> | ApiFailure;

type RequestOptions<TBody = unknown> = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: TBody;
  headers?: HeadersInit;
};

type DeleteTaskResponse = {
  message: string;
};

type DeleteReminderResponse = {
  message: string;
};

export class ApiClientError extends Error {
  readonly status: number;
  readonly details: ApiErrorDetails | null;

  constructor(message: string, status: number, details: ApiErrorDetails | null = null) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.details = details;
  }
}

const isBodyInit = (value: unknown): value is BodyInit => {
  if (typeof value === 'string') {
    return true;
  }

  return value instanceof Blob || value instanceof FormData || value instanceof URLSearchParams;
};

const getErrorMessage = (details: ApiErrorDetails | null, fallback: string): string => {
  if (typeof details === 'string' && details.length > 0) {
    return details;
  }

  return fallback;
};

const buildRequestInit = <TBody>(
  method: RequestOptions['method'],
  body: TBody | undefined,
  headers?: HeadersInit,
): RequestInit => {
  const requestHeaders = new Headers(headers);
  const requestInit: RequestInit = { method, headers: requestHeaders };

  if (body === undefined) {
    return requestInit;
  }

  if (isBodyInit(body)) {
    requestInit.body = body;
    return requestInit;
  }

  requestHeaders.set('Content-Type', 'application/json');
  requestInit.body = JSON.stringify(body);
  return requestInit;
};

const parseResponse = async <TResponse>(response: Response): Promise<ApiResponse<TResponse> | null> => {
  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    return null;
  }

  return (await response.json()) as ApiResponse<TResponse>;
};

const unwrapResponse = <TResponse>(response: Response, payload: ApiResponse<TResponse> | null): TResponse => {
  if (!response.ok) {
    const details = payload && !payload.success ? payload.error : null;
    throw new ApiClientError(
      getErrorMessage(details, `Request failed with status ${response.status}`),
      response.status,
      details,
    );
  }

  if (!payload || !payload.success) {
    throw new ApiClientError('Expected a JSON success response from the API', response.status, null);
  }

  return payload.data;
};

const request = async <TResponse, TBody = unknown>(
  path: string,
  { method = 'GET', body, headers }: RequestOptions<TBody> = {},
): Promise<TResponse> => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const response = await fetch(`${API_BASE}${normalizedPath}`, buildRequestInit(method, body, headers));
  const payload = await parseResponse<TResponse>(response);
  return unwrapResponse(response, payload);
};

export const getTasks = (): Promise<GetTasksResponse> => request<GetTasksResponse>('/tasks');

export const createTask = (input: CreateTaskWithRemindersInput): Promise<CreateTaskResponse> =>
  request<CreateTaskResponse, CreateTaskWithRemindersInput>('/tasks', { method: 'POST', body: input });

export const updateTask = (id: string, input: UpdateTaskInput): Promise<TaskResponse> =>
  request<TaskResponse, UpdateTaskInput>(`/tasks/${id}`, { method: 'PATCH', body: input });

export const deleteTask = (id: string): Promise<DeleteTaskResponse> =>
  request<DeleteTaskResponse>(`/tasks/${id}`, { method: 'DELETE' });

export const createReminder = (taskId: string, input: Omit<CreateReminderInput, 'taskId'>): Promise<ReminderResponse> =>
  request<ReminderResponse, Omit<CreateReminderInput, 'taskId'>>(`/tasks/${taskId}/reminders`, {
    method: 'POST',
    body: input,
  });

export const deleteReminder = (taskId: string, reminderId: string): Promise<DeleteReminderResponse> =>
  request<DeleteReminderResponse>(`/tasks/${taskId}/reminders/${reminderId}`, { method: 'DELETE' });

export const getSettings = (): Promise<SettingsResponse> => request<SettingsResponse>('/settings');

export const createSettings = (settings?: CreateSettingInput): Promise<SettingsResponse> =>
  request<SettingsResponse, CreateSettingInput | undefined>('/settings', { method: 'POST', body: settings });

export const updateSettings = (settings: Partial<CreateSettingInput>): Promise<SettingsResponse> =>
  request<SettingsResponse, Partial<CreateSettingInput>>('/settings', { method: 'PATCH', body: settings });
