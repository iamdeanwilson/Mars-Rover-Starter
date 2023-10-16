class Message {
   // Write code here!
   constructor(name, commands) { //user inputs name, and commands are pulled from command.js
      this.name = name;
      if (!name) {
        throw Error("Name required.");
      }
      this.commands = [];
      for (let i = 0 ; i < commands.length ; i++){
        this.commands.push(commands[i]);
      }
    }

}

module.exports = Message;