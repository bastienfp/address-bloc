const inquirer = require('inquirer');

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
    this.contacts = [];
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
    console.log('addContact called');
    this.main();
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
}
