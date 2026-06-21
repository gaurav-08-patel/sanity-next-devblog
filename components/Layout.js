// components/Layout.js — Nav + footer wrapper (placeholder)
export default function Layout({ children }) {
  return (
    <div>
      <header>
        <nav>{/* Navigation will go here */}</nav>
      </header>
      <main>{children}</main>
      <footer>{/* Footer will go here */}</footer>
    </div>
  );
}
