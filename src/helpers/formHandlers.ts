export const validate = (context: any) => {
  return (context.$refs.form as Vue & { validate: () => boolean }).validate();
};

export const resetValidation = (context: any) => {
  return (
    context.$refs.form as Vue & { resetValidation: () => boolean }
  ).resetValidation();
};

export const reset = (context: any) => {
  return (context.$refs.form as Vue & { reset: () => boolean }).reset();
};
