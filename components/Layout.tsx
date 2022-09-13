import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/theme-provider";

const HEADER_HEIGHT = 80;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mode, toggleTheme } = useTheme();

  const Icon = mode === "light" ? MoonIcon : SunIcon;

  return (
    <div className={`${mode === "dark" && "dark"}`}>
      <div className="font-sans text-very-dark-blue-light dark:text-very-light-gray">
        <header
          className="shadow-md px-3 absolute w-full z-10 dark:bg-dark-blue"
          style={{
            height: HEADER_HEIGHT,
          }}
        >
          <div className="container mx-auto flex items-center justify-between h-full w-full">
            <h1 className="font-extrabold text-lg lg:text-xl">
              Where in the world?
            </h1>
            <button
              className="font-semibold flex items-center gap-3"
              onClick={() => toggleTheme()}
            >
              <Icon className="h-4 w-4" />
              <span>{mode === "light" ? "Dark" : "Light"} mode</span>
            </button>
          </div>
        </header>
        <main
          className="relative px-4 bg-very-light-gray dark:bg-very-dark-blue-dark"
          style={{
            top: HEADER_HEIGHT,
            minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
        >
          <div className="container mx-auto py-14">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
