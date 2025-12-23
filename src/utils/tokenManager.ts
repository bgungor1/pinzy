import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const saveTokens = async (accessToken: string, refreshToken: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
    console.log('Tokens saved securely with SecureStore.');
  } catch (error) {
    console.error('Error saving tokens with SecureStore:', error);
    throw error;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    return token;
  } catch (error) {
    console.error('Error getting access token from SecureStore:', error);
    return null;
  }
};

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const token = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    return token;
  } catch (error) {
    console.error('Error getting refresh token from SecureStore:', error);
    return null;
  }
};
export const clearTokens = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    console.log('Tokens cleared from SecureStore.');
  } catch (error) {
    console.error('Error clearing tokens from SecureStore:', error);
    throw error;
  }
};