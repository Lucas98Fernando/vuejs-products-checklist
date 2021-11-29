export const validate = ({ context }: any): boolean => {
  return (context as Vue & { validate: () => boolean }).validate();
};

export const resetValidation = ({ context }: any): boolean => {
  return (
    context as Vue & { resetValidation: () => boolean }
  ).resetValidation();
};

export const reset = ({ context }: any): boolean => {
  return (context as Vue & { reset: () => boolean }).reset();
};
