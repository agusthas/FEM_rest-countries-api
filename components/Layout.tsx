import { MoonIcon } from "@heroicons/react/24/outline";

const HEADER_HEIGHT = 80;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="font-sans text-very-dark-blue-light">
      <header
        className="shadow-md px-3 absolute w-full z-10"
        style={{
          height: HEADER_HEIGHT,
        }}
      >
        <div className="container mx-auto flex items-center justify-between h-full w-full">
          <h1 className="font-extrabold text-lg lg:text-xl">
            Where in the world?
          </h1>
          <button className="font-semibold flex items-center gap-3">
            <MoonIcon className="h-4 w-4" />
            <span>Dark Mode</span>
          </button>
        </div>
      </header>
      <main
        className="relative px-4 bg-very-light-gray"
        style={{
          top: HEADER_HEIGHT,
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <div className="container mx-auto py-14">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
