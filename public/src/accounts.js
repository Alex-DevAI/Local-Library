function findAccountById(accounts, id) {
  const foundAccount = accounts.find((account) => account.id === id);
  return foundAccount;
}

function sortAccountsByLastName(accounts) {
  const AccountsByLastName = accounts.sort((firstElement, secondElement) =>
    firstElement.name.last
      .toUpperCase()
      .localeCompare(secondElement.name.last.toUpperCase())
  );
  return AccountsByLastName;
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc, book) => {
    const checkBorrowed = book.borrows.filter(
      (borrowed) => borrowed.id === account.id
    ).length;
    return acc + checkBorrowed;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  return books
    .filter((book) =>
      book.borrows.some(
        (borrow) => borrow.id === account.id && !borrow.returned
      )
    )
    .map(({ id, title, genre, authorId, borrows }) => ({
      id,
      title,
      genre,
      authorId,
      author: authors.find((linkedAuthor) => linkedAuthor.id === authorId),
      borrows,
    }));
}
// function getBooksPossessedByAccount(account, books, authors) {
//   return books
//     .filter((book) =>
//       book.borrows.some(
//         (borrow) => borrow.id === account.id && !borrow.returned
//       )
//     )
//     .map((book) => ({
//       ...book, // Spread operator to keep all original book properties
//       author: authors.find((author) => author.id === book.authorId), // Add author object
//     }));
// }

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
