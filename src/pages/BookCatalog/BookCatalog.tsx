import React, {useState} from 'react';
import Header from 'src/components/Header/Header';
import SideBar from 'src/components/Sidebar/Sidebar';
import BookDashboard from 'src/components/BookDashboard/BookDashboard';
import {IGenres, IAvailability, ILanguages} from 'src/interfaces/filterEntities.interface';

const BookCatalog: React.FC = () => {
  const [isFiltersVisible, setFiltersVisible] = useState<boolean>(true);

  const [availability, setAvailability] = useState<IAvailability>({available: false, rented: false});
  const [languages, setLanguages] = useState<ILanguages>({english: false, spanish: false, french: false});
  const [genres, setGenres] = useState<IGenres>({
    fiction: false,
    nonFiction: false,
    mystery: false,
    fantasy: false,
    romance: false
  });

  const toggleFilters = (): void => {
    setFiltersVisible(!isFiltersVisible);
  };

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAvailability({...availability, [e.target.name]: e.target.checked});
  };

  const handleLanguagesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLanguages({...languages, [e.target.name]: e.target.checked});
  };

  const handleGenresChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setGenres({...genres, [e.target.name]: e.target.checked});
  };

  const books = [...Array(10)].map((_, index) => ({
    title: `Book Title ${index + 1}`,
    author: 'Author Name',
    available: index % 2 === 0
  }));

  return (
    <div className="flex flex-col flex-1">
      <header>
        <Header toggleFilters={toggleFilters} />
      </header>
      <main className="flex flex-grow">
        <SideBar
          isVisible={isFiltersVisible}
          availability={availability}
          languages={languages}
          genres={genres}
          handleAvailabilityChange={handleAvailabilityChange}
          handleLanguagesChange={handleLanguagesChange}
          handleGenresChange={handleGenresChange}
        />
        <BookDashboard books={books} />
      </main>
      <footer></footer>
    </div>
  );
};

export default BookCatalog;
