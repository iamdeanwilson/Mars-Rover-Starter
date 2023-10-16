class Command {
   constructor(commandType, value) { //commandType tells the rover which action to take, value is the optional value associated with the commandType
     this.commandType = commandType;
     if (!commandType) {
       throw Error("Command type required.");
     }
     this.value = value;
   }
 
 }
 
 module.exports = Command;