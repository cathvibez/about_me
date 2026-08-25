export function Section({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-rule py-12 first:border-t-0">
      {label ? <p className="label mb-6">{label}</p> : null}
      {children}
    </section>
  );
}
