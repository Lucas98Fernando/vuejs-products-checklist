interface IFormHandler {
  context: unknown;
}

export const validate = ({ context }: IFormHandler): boolean =>
  (context as Vue & { validate: () => boolean }).validate();

export const resetValidation = ({ context }: IFormHandler): boolean =>
  (context as Vue & { resetValidation: () => boolean }).resetValidation();

export const reset = ({ context }: IFormHandler): boolean =>
  (context as Vue & { reset: () => boolean }).reset();
