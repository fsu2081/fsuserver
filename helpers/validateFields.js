export const validateFields = (fields: { [key: string]: string }): void => {
  for (const [key, value] of Object.entries(fields)) {
    if (!value || value.trim() === "") {
      throw new Error(`${key} is required.`);
    }
  }
};
