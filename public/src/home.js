function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    acc = !book.borrows[0].returned ? acc + 1 : acc + 0;
    return acc;
  }, 0);
}

function getMostCommonGenres(books) {
  const genreCount = books.reduce((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1;
    return acc;
  }, {});
  const genreCountArray = Object.entries(genreCount);
  genreCountArray.sort(
    (firstGenre, secondGenre) => secondGenre[1] - firstGenre[1]
  );
  // return genreCountArray
  //   .map(([genre, count]) => {
  //     return { name: genre, count };
  //   })
  //   .slice(0, 5);
  return helperCreateTopFiveMap(genreCountArray).slice(0, 5);
}

function getMostPopularBooks(books) {
  const timesBorrowed = books.reduce((acc, book) => {
    acc[book.title] = book.borrows.length;
    return acc;
  }, {});
  const timesBorrowedArray = Object.entries(timesBorrowed);
  timesBorrowedArray.sort(
    (firstElement, secondElement) => secondElement[1] - firstElement[1]
  );
  // return timesBorrowedArray
  //   .map(([name, count]) => {
  //     return { name, count };
  //   })
  //   .slice(0, 5);
  return helperCreateTopFiveMap(timesBorrowedArray).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorBorrowed = books.reduce((acc, book) => {
    const authorFound = authors.find((author) => author.id === book.authorId);
    const authorName = `${authorFound.name.first} ${authorFound.name.last}`;
    acc[authorName] = (acc[authorName] || 0) + book.borrows.length;
    return acc;
  }, {});
  const authorBorrowedArray = Object.entries(authorBorrowed);
  authorBorrowedArray.sort(
    (firstAuthor, secondAuthor) => secondAuthor[1] - firstAuthor[1]
  );
  return helperCreateTopFiveMap(authorBorrowedArray).slice(0, 5);
}

function helperCreateTopFiveMap(objectEntriesArray) {
  return objectEntriesArray.map(([name, count]) => {
    return { name, count };
  });
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
