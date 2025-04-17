
import { useState } from "react";
import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputWithValidationProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function InputWithValidation<T extends FieldValues>({
  id,
  label,
  type = "text",
  placeholder,
  register,
  errors,
  required = false,
  disabled = false,
  className,
}: InputWithValidationProps<T>) {
  const [isFocused, setIsFocused] = useState(false);
  
  const errorMessage = errors[id]?.message as string | undefined;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium leading-none",
            errors[id] ? "text-destructive" : "text-foreground"
          )}
        >
          {label} {required && <span className="text-destructive">*</span>}
        </label>
        {errors[id] && (
          <p className="text-sm text-destructive">
            {errorMessage}
          </p>
        )}
      </div>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={id}
        disabled={disabled}
        {...register(id)}
        className={cn(
          errors[id]
            ? "border-destructive focus-visible:ring-destructive"
            : "border-input",
          isFocused ? "ring-2 ring-ring" : "",
          className
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}
