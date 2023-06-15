export const checkValid = (validate: any, value: any, setError: (errors: any) => {}) => {
  const errors: any = {};
  Object.keys(validate).map((key: string) => {
    const current = validate[key] || {};
    if (current.required && !value[key]) {
      errors[key] = current.required;
    }
  });
  return errors;
};
