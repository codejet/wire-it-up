import { useState } from 'react';

const SIDEBAR_LINKS = [
  'Home',
  'Creating Packages',
  'API',
  'Configuration',
  'Pluggable Resolvers',
  'Tools',
  'About',
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden bg-primaryBorder text-white px-4 py-2 mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>
      <aside
        className={`pb-4 w-full lg:block ${isOpen ? 'block' : 'hidden'} lg:w-1/4`}
      >
        <nav
          className="space-y-4 text-center w-full lg:text-left lg:w-auto"
          aria-label="Sidebar navigation"
        >
          {SIDEBAR_LINKS.map((item: string) => (
            <a
              key={item}
              href="#"
              className="block text-secondaryLink hover:underline font-bold"
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
};
