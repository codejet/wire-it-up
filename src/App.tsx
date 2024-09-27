import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { Search } from './container/Search';

export const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col">
        <main className="flex gap-4 container max-w-screen-lg mx-auto p-6 flex-col lg:flex-row">
          <Sidebar />
          <Search />
        </main>
      </div>
      <Footer />
    </div>
  );
};
