export const setAuthCookie = (username: string) => {
  document.cookie = `auth=${username}; path=/; max-age=86400`;
};

export const getAuthUsername = (): string | null => {
  const match = document.cookie.match(/(^| )auth=([^;]+)/);
  return match ? decodeURIComponent(match[2]) : null;
};

export const clearAuthCookie = () => {
  document.cookie = `auth=; path=/; max-age=0`;
};
