export const SAVE_ITEM = (key: string, value: any): void => {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }
};

export const GET_ITEM = <T>(key: string): T | null => {
  if (typeof window !== 'undefined') {
    try {
      const jsonItem = window.localStorage.getItem(key);
      return jsonItem ? (JSON.parse(jsonItem) as T) : null;
    } catch (error) {
      console.error("Error getting from localStorage:", error);
      return null;
    }
  }
  return null;
};

export const REMOVE_ITEM = (key: string): void => {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  }
};
