export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto text-center">
      <div className="">{children}</div>
    </section>
  );
}
