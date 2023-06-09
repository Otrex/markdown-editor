export const matchWordsRegex = () => {
  return /[a-zA-Z0-9_'\u0392-\u03c9\u0400-\u04FF\u0027]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|[\u0531-\u0556\u0561-\u0586\u0559\u055A\u055B]+|\w+/g;
};

export function useLocalStore<T = any>(
  name = "001",
  defaultValue: any = undefined
) {
  const storeName = `x-markdown-editor-${name}`;
  return {
    getItem: (): T => {
      const store = localStorage.getItem(storeName);
      if (store === null)
        localStorage.setItem(
          storeName,
          JSON.stringify({ value: defaultValue })
        );
      return JSON.parse(localStorage.getItem(storeName) || "{}").value;
    },
    setItem: (data: T) =>
      localStorage.setItem(storeName, JSON.stringify({ value: data })),
    deleteItem: () => localStorage.removeItem(storeName),
  };
}

export const DEFAULT_FILE_NAME = "Untitled.md";
