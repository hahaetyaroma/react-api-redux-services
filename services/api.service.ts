import { apiUrl } from '../app.constants';

type buildSettingsArgs = {
  credentials?: RequestCredentials;
  settings?: {
    headers: Record<string, string>
  };
}

function buildSettings({ settings }: buildSettingsArgs): RequestInit {
  return {
    ...(settings || {}),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...((settings && settings.headers) || {}),
    },
  };
}

async function handleResponse(response: any) {
  if (response.status === 206) {
    return response.blob();
  }

  if (response.ok) {
    return response.json();
  } else {
    throw await response.json();
  }
}

export type ApiServiceType<ResponseType> = {
  get: (url: string, settings?: any) => Promise<ResponseType>
  post: (url: string, data?: any) => Promise<ResponseType>
}

const createApiService = (baseUrl: string | undefined) => {
  if (!baseUrl) throw new Error('Service Settings Have Not Provided');
  return {
    async get<ResponseType>(url: string, settings?: any): Promise<ResponseType> {
      const requestSettings = buildSettings({});
      const params = new URLSearchParams(settings ? settings.params : {}).toString();
      const response = await fetch(`${baseUrl}${url}?${params}`, {
        method: 'GET',
        ...requestSettings
      });
      return handleResponse(response);
    },
    async post<ResponseType, RequestDataType>(url: string, data: RequestDataType): Promise<ResponseType> {
      const requestSettings = buildSettings({});
      const response = await fetch(`${baseUrl}${url}`, {
        method: 'POST',
        ...requestSettings,
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
  }
}


export const ApiService = createApiService(apiUrl);
