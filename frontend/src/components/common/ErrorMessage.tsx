interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="rounded-md bg-red-50 p-4">
    <div className="text-sm text-red-700">{message}</div>
  </div>
);
