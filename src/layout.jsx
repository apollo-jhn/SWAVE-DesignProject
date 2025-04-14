import { NavigationBar } from "./components/component_navbar";
import { Outlet } from "react-router";

export function Layout() {
  return (
    <>
      <NavigationBar />
      <main className="grow">
        <Outlet />
      </main>
    </>
  );
}
