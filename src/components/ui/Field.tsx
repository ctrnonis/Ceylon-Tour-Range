import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

/**
 * Form primitives. `Field` renders the label, the control and an optional
 * error/hint, and wires up the id/aria attributes so labels are always
 * associated with their inputs.
 */
interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: (props: { id: string; "aria-invalid"?: boolean; "aria-describedby"?: string }) => ReactNode;
}

export function Field({ label, error, hint, className, children }: FieldProps) {
  const id = useId();
  const describedBy = error || hint ? `${id}-note` : undefined;

  return (
    <div className={cn("field", className)}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy })}
      {error ? (
        <span id={describedBy} className="field-error">
          {error}
        </span>
      ) : hint ? (
        <span id={describedBy} className="text-xs text-ink-400">
          {hint}
        </span>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("input", className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn("input", className)} {...props}>
      {children}
    </select>
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("input", className)} {...props} />;
}

/** Checkbox with an inline label. */
export function Checkbox({ label, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: ReactNode }) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-2 text-sm text-ink-600", className)}>
      <input type="checkbox" className="mt-1 h-4 w-4 accent-ocean-700" {...props} />
      <span>{label}</span>
    </label>
  );
}
