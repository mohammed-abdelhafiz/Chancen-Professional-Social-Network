import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";

import { FieldError, FieldLabel, Field } from "@/components/ui/field";
import type { InputHTMLAttributes } from "react";
import { Input } from "../ui/input";

interface ControllerProps<
  T extends FieldValues,
> extends InputHTMLAttributes<HTMLInputElement> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
}

export const FormController = <T extends FieldValues>({
  name,
  control,
  label,
  ...inputProps
}: ControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={String(name)}>{label}</FieldLabel>

          <Input
            {...field}
            {...inputProps}
            id={String(name)}
            aria-invalid={fieldState.invalid}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
