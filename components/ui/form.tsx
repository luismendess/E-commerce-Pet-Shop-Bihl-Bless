"use client";

import {
  FormProvider,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  useFormContext,
  Controller,
  Path,
} from "react-hook-form";
import {
  FormHTMLAttributes,
  ReactElement,
  ReactNode,
  ComponentPropsWithoutRef,
} from "react";

interface FormProps<T extends FieldValues>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  children: ReactNode;
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

export function Form<T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form {...props} onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  render: (props: { field: ComponentPropsWithoutRef<any> }) => ReactElement;
}

export function FormField<T extends FieldValues>({
  name,
  render,
}: FormFieldProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => render({ field })}
    />
  );
}

interface FormItemProps {
  children: ReactNode;
}

export function FormItem({ children }: FormItemProps) {
  return <div className="space-y-2">{children}</div>;
}

interface FormLabelProps {
  children: ReactNode;
}

export function FormLabel({ children }: FormLabelProps) {
  return (
    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </label>
  );
}

interface FormControlProps {
  children: ReactNode;
}

export function FormControl({ children }: FormControlProps) {
  return <div className="relative">{children}</div>;
}

interface FormMessageProps {
  name?: string;
}

export function FormMessage({ name }: FormMessageProps) {
  const {
    formState: { errors },
  } = useFormContext();

  if (!name) return null;

  const fieldError = errors[name];

  return fieldError?.message ? (
    <span className="text-sm font-medium text-destructive">
      {fieldError.message.toString()}
    </span>
  ) : null;
}
