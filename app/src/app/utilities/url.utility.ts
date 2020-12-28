export const urlHost = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch (_) {
    return url || '';
  }
};
