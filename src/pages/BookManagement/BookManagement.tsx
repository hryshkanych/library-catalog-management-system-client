import React, {useState, useEffect} from 'react';
import {Box, MenuItem, Typography, useTheme} from '@mui/material';
import {StyledYellowOutlinedButton} from 'src/mui-styled-components/styledYellowOutlinedButton';
import {StyledTextField} from 'src/mui-styled-components/styledTextField';
import {useSnackbar} from 'notistack';
import {addBook, updateBook, getBookById} from 'src/services/book.service';
import {Book} from 'src/models/book.type';
import {useParams, useNavigate} from 'react-router-dom';
import {getGenres} from 'src/services/book.service';

interface BookManagementProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const BookManagement: React.FC<BookManagementProps> = ({books, setBooks}) => {
  const theme = useTheme();
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();
  const {bookId} = useParams();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishedDate: '',
    isbn: '',
    copiesAvailable: 0,
    genre: '',
    language: '',
    description: '',
    imageURL: ''
  });

  const [genres, setGenres] = useState<string[]>([]);
  const languages = ['English', 'Spanish', 'French'];

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await getGenres();
        setGenres(genresData);
      } catch (error) {
        enqueueSnackbar('Failed to fetch genres!', {variant: 'error'});
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    if (bookId) {
      const fetchBookData = async () => {
        try {
          const bookToEdit = await getBookById(Number(bookId));

          const {id, ...bookWithoutId} = bookToEdit;
          const formattedBookData = {
            ...bookWithoutId,
            publishedDate: new Date(bookWithoutId.publishedDate).toISOString().split('T')[0]
          };
          setFormData(formattedBookData);
        } catch (error) {
          enqueueSnackbar('Failed to fetch book data!', {variant: 'error'});
        }
      };
      fetchBookData();
    }
  }, [bookId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: name === 'copiesAvailable' ? parseInt(value) || 0 : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (bookId) {
        const updatedBook = {
          ...formData,
          id: Number(bookId),
          publishedDate: new Date(formData.publishedDate)
        };

        const resUpdatedBook = await updateBook(Number(bookId), updatedBook);
        enqueueSnackbar('Book updated successfully!', {variant: 'success'});

        setBooks(books.map((book) => (book.id === resUpdatedBook.id ? resUpdatedBook : book)));

        navigate('/', {replace: true});
      } else {
        const newBook = {...formData, publishedDate: new Date(formData.publishedDate)};
        const resNewBook = await addBook(newBook);
        enqueueSnackbar('Book added successfully!', {variant: 'success'});

        setBooks([...books, resNewBook]);
        navigate('/', {replace: true});
      }
    } catch (error) {
      enqueueSnackbar('Failed to submit book data!', {variant: 'error'});
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '100%',
          maxWidth: '800px',
          padding: '2rem',
          boxShadow: 1,
          borderRadius: 2,
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.secondary.light
        }}
      >
        <Typography variant="h5" sx={{textAlign: 'center', marginBottom: '1rem'}}>
          {bookId ? 'Edit Book' : 'Add New Book'}
        </Typography>

        <Box sx={{display: 'flex', gap: '1rem'}}>
          <StyledTextField label="Title" name="title" value={formData.title} onChange={handleChange} required sx={{flex: 1}} />
          <StyledTextField label="Author" name="author" value={formData.author} onChange={handleChange} required sx={{flex: 1}} />
        </Box>

        <Box sx={{display: 'flex', gap: '1rem'}}>
          <StyledTextField
            label="Published Date"
            name="publishedDate"
            type="date"
            value={formData.publishedDate}
            onChange={handleChange}
            required
            sx={{flex: 1}}
            InputLabelProps={{
              shrink: true
            }}
          />
          <StyledTextField label="ISBN" name="isbn" value={formData.isbn} onChange={handleChange} required sx={{flex: 1}} />
        </Box>

        <Box sx={{display: 'flex', gap: '1rem'}}>
          <StyledTextField
            label="Copies Available"
            name="copiesAvailable"
            type="number"
            value={formData.copiesAvailable}
            onChange={handleChange}
            required
            sx={{flex: 1}}
          />
          <StyledTextField label="Genre" name="genre" value={formData.genre} onChange={handleChange} select required sx={{flex: 1}}>
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </StyledTextField>
        </Box>

        <Box sx={{display: 'flex', gap: '1rem'}}>
          <StyledTextField label="Language" name="language" value={formData.language} onChange={handleChange} select required sx={{flex: 1}}>
            {languages.map((language) => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
          </StyledTextField>
          <StyledTextField label="Image URL" name="imageURL" value={formData.imageURL} onChange={handleChange} required sx={{flex: 1}} />
        </Box>

        <StyledTextField label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={3} required />

        <StyledYellowOutlinedButton type="submit">{bookId ? 'Update Book' : 'Add Book'}</StyledYellowOutlinedButton>
      </Box>
    </Box>
  );
};

export default BookManagement;
