import imgUrl from '../assets/bower-logo.svg';

const HEADER_LINKS = ['Docs', 'Search Packages', 'Blog', 'Stats'];

export const Header = () => (
  <header className="bg-primaryBg p-4 border-b-8 border-primaryBorder">
    <div className="container max-w-screen-lg flex flex-col md:flex-row items-center justify-between mx-auto flex-wrap">
      <div className="flex items-center mb-4 md:mb-0">
        <img src={imgUrl} alt="Bower Logo" className="mr-4 w-10 md:w-36" />
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-secondaryTxt">
            Package Search
          </h1>
          <span>
            Powered by{' '}
            <a href="#" className="text-primaryLink hover:underline">
              libraries.io
            </a>
          </span>
        </div>
      </div>

      <nav
        className="flex flex-wrap justify-center md:justify-end"
        aria-label="Main navigation"
      >
        {HEADER_LINKS.map((item: string) => (
          <a
            key={item}
            href="#"
            className="text-primaryLink py-1 px-2 md:py-2 md:px-3 hover:bg-white font-bold rounded whitespace-nowrap"
          >
            {item}
          </a>
        ))}
      </nav>
    </div>
  </header>
);

export default Header;
