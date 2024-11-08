import { cn } from "@/utils/cn";

export default function FormikErrorBox({ formik, name, className }) {
  const showError = formik.errors[name] && formik.touched[name];
  const defaultClassNames =
    "rounded-md bg-danger/5 px-2 py-1 text-sm text-danger border border-danger";
  const errorMessage = formik.errors[name];
  return showError ? (
    <div>
      <div className={cn(defaultClassNames, className)}>{errorMessage}</div>
    </div>
  ) : null;
}
