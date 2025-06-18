export function Label({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <label
      className="mb-1 block text-sm font-medium text-indigo-200/65"
      htmlFor={id}
    >
      {children}
    </label>
  );
}
