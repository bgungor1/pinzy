
import Constants from 'expo-constants';
const API_BASE_URL: string | undefined = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_BASE_URL;

interface ApiResponse {
  message?: string;
  [key: string]: any;
}


export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}


interface MapPin {
  id: number;
  userId: number;
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}


async function makeRequest<T = ApiResponse>(
  endpoint: string,
  method: string = 'GET',
  body: object | null = null,
  token: string | null = null
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not configured.");
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorText = await response.text();
      try {
        const errorData: ApiResponse = JSON.parse(errorText);
        throw new Error(errorData.message || response.statusText || 'Bilinmeyen API Hatası');
      } catch (parseError) {
        console.error(`API Hata Yanıtı (${method} ${endpoint}):`, errorText);
        console.error(`API Yanıt Durumu: ${response.status} ${response.statusText}`);
        console.error(`API Yanıt Başlıkları:`, response.headers);
        throw new Error(`API isteği başarısız oldu: ${response.statusText}. Yanıt formatı beklenmiyor.`);
      }
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {} as T;
  } catch (error: any) {
    console.error(`API İsteği Hatası (${method} ${endpoint}):`, error.message);
    throw error;
  }
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const authApi = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    return makeRequest<LoginResponse>('/auth/login', 'POST', { username, password });
  },
  logout: async (refreshToken: string): Promise<{ message: string }> => {
    return makeRequest<{ message: string }>('/auth/logout', 'POST', null, refreshToken);
  },
  me: async (accessToken: string): Promise<User> => {
    return makeRequest<User>('/auth/me', 'GET', null, accessToken);
  },
  refreshToken: async (refreshToken: string): Promise<{ user: User, accessToken: string, refreshToken: string }> => {
    return makeRequest<{ user: User, accessToken: string, refreshToken: string }>('/auth/refresh', 'POST', null, refreshToken);
  },
  register: async (username: string, password: string, firstName: string, lastName: string): Promise<RegisterResponse> => {
    return makeRequest<RegisterResponse>('/auth/register', 'POST', { username, password, firstName, lastName });
  },
};


export const usersApi = {
  getAllUsers: (role: string | null = null): Promise<User[]> =>
    makeRequest<User[]>(`/users${role ? `?role=${role}` : ''}`, 'GET', null, null), // accessToken parametresi kaldırıldı

  getUserById: (id: number, accessToken: string | null = null): Promise<User> =>
    makeRequest<User>(`/users/${id}`, 'GET', null, accessToken),

  updateUser: (id: number, userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>> & { password?: string }, accessToken: string): Promise<User> =>
    makeRequest<User>(`/users/${id}`, 'PUT', userData, accessToken),

  deleteUser: (id: number, accessToken: string): Promise<{ message: string }> =>
    makeRequest<{ message: string }>(`/users/${id}`, 'DELETE', null, accessToken),
};


export const postsApi = {
  getAllPosts: (accessToken: string, userId: number | null = null): Promise<Post[]> =>
    makeRequest<Post[]>(`/posts${userId ? `?userId=${userId}` : ''}`, 'GET', null, accessToken),

  getPostById: (id: number, accessToken: string): Promise<Post> =>
    makeRequest<Post>(`/posts/${id}`, 'GET', null, accessToken),

  createPost: (title: string, content: string, accessToken: string): Promise<Post> =>
    makeRequest<Post>('/posts', 'POST', { title, content }, accessToken),

  updatePost: (id: number, postData: { title?: string, content?: string }, accessToken: string): Promise<Post> =>
    makeRequest<Post>(`/posts/${id}`, 'PUT', postData, accessToken),

  deletePost: (id: number, accessToken: string): Promise<{ message: string }> =>
    makeRequest<{ message: string }>(`/posts/${id}`, 'DELETE', null, accessToken),
};


export const mapPinsApi = {
  getAllMapPins: (accessToken: string, userId: number | null = null): Promise<MapPin[]> =>
    makeRequest<MapPin[]>(`/map-pins${userId ? `?userId=${userId}` : ''}`, 'GET', null, accessToken),

  getMapPinById: (id: number, accessToken: string): Promise<MapPin> =>
    makeRequest<MapPin>(`/map-pins/${id}`, 'GET', null, accessToken),

  createMapPin: (title: string, latitude: number, longitude: number, description: string = '', accessToken: string): Promise<MapPin> =>
    makeRequest<MapPin>('/map-pins', 'POST', { title, description, latitude, longitude }, accessToken),

  updateMapPin: (id: number, pinData: { title?: string, description?: string, latitude?: number, longitude?: number }, accessToken: string): Promise<MapPin> =>
    makeRequest<MapPin>(`/map-pins/${id}`, 'PUT', pinData, accessToken),

  deleteMapPin: (id: number, accessToken: string): Promise<{ message: string }> =>
    makeRequest<{ message: string }>(`/map-pins/${id}`, 'DELETE', null, accessToken),
};