import { Navigation } from "../../components";
import BaseLayoutCSS from "./BaseLayout.module.css"

export default function BaseLayout({ isLoaded, children }) {
  return (
    <>
      <header className={BaseLayoutCSS.container}>
        <Navigation isLoaded={isLoaded} />
        <h1>The Comic Stand Club</h1>
      </header>
      <div>{children}</div>
      <footer className={BaseLayoutCSS.container}>
        <h2>Footer</h2>
      </footer>
    </>
  );
}
