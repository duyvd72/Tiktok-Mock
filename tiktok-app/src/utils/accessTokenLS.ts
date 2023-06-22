export const getAccessToken = (): string | null => {
  const token = localStorage.getItem('token');
  return token;
};

export const setAccessToken = (accessToken: string): void => {
  localStorage.setItem('token', accessToken);
};

export const removeAccessToken = (): void => {
  localStorage.removeItem('token');
};
