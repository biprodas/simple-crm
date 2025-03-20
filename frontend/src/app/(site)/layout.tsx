const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default SiteLayout;
