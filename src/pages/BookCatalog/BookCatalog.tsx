import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import Header from 'src/components/Header/Header';
import SideBar from 'src/components/Sidebar/Sidebar';
import BookDashboard from 'src/components/BookDashboard/BookDashboard';
import BookDetails from '../BookDetails/BookDetails';
import {Book} from 'src/models/book.type';
import {getBooks, getGenres} from 'src/services/book.service';
import {FilterCategory, Filters} from 'src/types/filterEntities.type';
import UserHistory from '../UserHistory/UserHistory';

const BookCatalog: React.FC = () => {
  const [isFiltersVisible, setFiltersVisible] = useState<boolean>(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    availability: {available: false, rented: false, favorite: false},
    languages: {english: false, spanish: false, french: false},
    genres: {}
  });
  const [likedBooks, setLikedBooks] = useState<number[]>([]);

  const location = useLocation();

  const toggleFilters = (): void => {
    setFiltersVisible(!isFiltersVisible);
  };

  const handleFilterChange = useCallback((category: FilterCategory, name: string, checked: boolean): void => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: checked
      }
    }));
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesAvailability =
        (!filters.availability.available || book.copiesAvailable > 0) &&
        (!filters.availability.rented || book.copiesAvailable < 1) &&
        (!filters.availability.favorite || likedBooks.includes(book.id));

      const matchesGenres = Object.entries(filters.genres).some(([_, isChecked]) => isChecked)
        ? Object.entries(filters.genres).some(([genre, isChecked]) => isChecked && book.genre === genre)
        : true;

      const matchesSearch = searchQuery
        ? book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return matchesAvailability && matchesGenres && matchesSearch;
    });
  }, [books, filters, searchQuery]);

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedBooks') || '[]');
    setLikedBooks(savedLikes);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const books = await getBooks();
      const genres = await getGenres();
      setBooks(books);

      setFilters((prevFilters) => ({
        ...prevFilters,
        genres: genres.reduce(
          (acc, genre) => {
            acc[genre] = false;
            return acc;
          },
          {} as Record<string, boolean>
        )
      }));
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <header>
        <Header toggleFilters={toggleFilters} onSearch={setSearchQuery} />
      </header>
      <main className="flex flex-grow">
        {location.pathname === '/' && (
          <SideBar isVisible={isFiltersVisible} filters={filters} handleFilterChange={handleFilterChange} />
        )}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<BookDashboard books={filteredBooks} />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/activity" element={<UserHistory />} />
          </Routes>
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default BookCatalog;
