function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const partitionedBooks = [[], []];
  books.forEach((book) =>
    !book.borrows[0].returned
      ? partitionedBooks[0].push(book)
      : partitionedBooks[1].push(book)
  );
  return partitionedBooks;
}

function getBorrowersForBook(book, accounts) {
  return book.borrows
    .map((borrow) => {
      const account = accounts.find((accounted) => accounted.id === borrow.id);
      return { ...account, returned: borrow.returned };
    })
    .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
