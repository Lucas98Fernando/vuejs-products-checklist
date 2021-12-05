interface IFormHandler {
  context: unknown;
}

export const validate = ({ context }: IFormHandler): boolean => {
  return (context as Vue & { validate: () => boolean }).validate();
};

export const resetValidation = ({ context }: IFormHandler): boolean => {
  return (
    context as Vue & { resetValidation: () => boolean }
  ).resetValidation();
};

export const reset = ({ context }: IFormHandler): boolean => {
  return (context as Vue & { reset: () => boolean }).reset();
};
