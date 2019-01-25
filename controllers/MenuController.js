const inquirer = require("inquirer");
const ContactController = require("./ContactController");

module.exports = class MenuController {
  constructor(){
    this.mainMenuQuestions = [
      {
        type: "list",
        name: "mainMenuChoice",
        message: "Please choose from an option below: ",
        choices: [
          "Add new contact",
          "Show current date",
          "Exit"
        ]
      }
    ];
    this.book = new ContactController();
  }

  main(){
    console.log(`Welcome to AdressBloc!`);
    inquirer.prompt(this.mainMenuQuestions).then((response) => {
      switch (response.mainMenuChoice) {
        case "Add new contact":
          this.addContact();
          break;
        case "Show current date":
          this.getDate();
          break;
        case "Exit":
          this.exit();
          break;
        default:
        console.log("Invalid input");
        this.main();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  clear(){
    console.log('\x1Bc');
  }

  addContact(){
    this.clear();
    inquirer.prompt(this.book.addContactQuestions).then((answers) => {
      this.book.addContact(answers.name, answers.phone, answers.email).then((contact) => {
        console.log("Contact added successfully!");
        this.main();
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  getDate(){
    this.clear();
    let todayDate = new Date();
    let formattedDate = todayDate.toLocaleDateString();
    let formattedTime = todayDate.toLocaleTimeString();
    console.log('Today is ' + formattedDate);
    console.log('It is ' + formattedTime);
    this.main();
  }

  exit(){
    console.log("Thanks for using AddressBloc!");
    process.exit();
  }

  getContactCount(){
    return this.contacts.length;
  }

  remindMe(){
    return 'Learning is a life-long pursuit';
  }
}
