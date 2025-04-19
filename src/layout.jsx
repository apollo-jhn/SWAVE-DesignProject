import { NavigationBar } from "./components/component_navbar";
import { Outlet } from "react-router";

export function Layout() {
  return (
    <>
      <NavigationBar />
      <main className="grow grid grid-cols-1 grid-rows-1">
        <Outlet />
      </main>
    </>
  );
}
