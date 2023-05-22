import { Navigation } from "../../components";

export default function BaseLayout({ isLoaded, children }) {
  return (
    <>
      <header>
        <h1>The Comic Stand Club</h1>
        <Navigation isLoaded={isLoaded} />
      </header>
      <div>{children}</div>
      <footer>
        <h2>Footer</h2>
      </footer>
    </>
  );
}
