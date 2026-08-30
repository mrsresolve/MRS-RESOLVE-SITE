export function AdminHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="admin__header">
      <h1>{title}</h1>
      {children}
    </header>
  );
}
