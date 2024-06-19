#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Library {
    books = [];
    addBook(book) {
        this.books.push(book);
    }
    findBooks(query) {
        return this.books.filter((book) => book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase()));
    }
    listBooks() {
        if (this.books.length === 0) {
            console.log(chalk.yellow("There are currently no books in the library."));
            return;
        }
        console.log(chalk.bold("Available Books:"));
        this.books.forEach((book) => console.log(`${book.title} by ${book.author}`));
    }
}
const library = new Library();
async function startProgram() {
    console.log(chalk.bold.magentaBright("*** Welcome to the Library! ***"));
    do {
        const answer = await inquirer.prompt([
            {
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: ["Add Book", "Find Book", "List Books", "Exit"],
            },
        ]);
        switch (answer.action) {
            case "Add Book":
                const newBook = await inquirer.prompt([
                    {
                        name: "title",
                        type: "input",
                        message: "Enter the book title:",
                    },
                    {
                        name: "author",
                        type: "input",
                        message: "Enter the book author:",
                    },
                ]);
                library.addBook({ title: newBook.title, author: newBook.author });
                console.log(chalk.green("Book added successfully!"));
                break;
            case "Find Book":
                const searchTerm = await inquirer.prompt([
                    {
                        name: "query",
                        type: "input",
                        message: "Enter the book title or author to search:",
                    },
                ]);
                const foundBooks = library.findBooks(searchTerm.query);
                if (foundBooks.length > 0) {
                    console.log(chalk.green("Books found:"));
                    foundBooks.forEach((book) => console.log(`${book.title} by ${book.author}`));
                }
                else {
                    console.log(chalk.yellow("No matching books found."));
                }
                break;
            case "List Books":
                library.listBooks();
                break;
            case "Exit":
                console.log(chalk.bold.magenta("*** Thank you for visiting the Library! ***"));
                process.exit();
        }
    } while (true);
}
startProgram();
