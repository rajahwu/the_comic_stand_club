import { Navigation } from "../../components";
import BaseLayoutCSS from "./BaseLayout.module.css";

export default function BaseLayout({ isLoaded, children }) {
  return (
    <div className={BaseLayoutCSS["container"]}>
      <header className={BaseLayoutCSS["header"]}>
        <Navigation isLoaded={isLoaded} />
        <h1 className={BaseLayoutCSS["title"]}>The Comic <span className={BaseLayoutCSS["title-span"]}>Stand</span> Club</h1>
      </header>
      <div style={{ pointerEvents: "auto" }}>{children}</div>
      <footer>
        <h2>Footer</h2>
      </footer>
    </div>
  );
}
