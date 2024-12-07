export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container max-w-5xl mx-auto">
      {children}
    </section>
  );
}
