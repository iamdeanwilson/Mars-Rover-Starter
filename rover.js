class Rover {
   // Write code here!
   constructor(position) { // Sets default positions for mode and generatorWatts when first initiated
      this.position = position; // Provided as a parameter when a new Rover is created
      this.mode = 'NORMAL'
      this.generatorWatts = 110
   }
   
   receiveMessage(message){
      let roverCommand = {
         message : message.name, // User-provided name pulled from message.js
         results : []
      }
      for (let i = 0 ; i < message.commands.length ; i++){ // "for loop" to check all commandTypes contained in the message.commands array, and process accordingly
         if (message.commands[i].commandType === "MOVE"){
            if (this.mode === 'NORMAL'){
            roverCommand.results.push({completed : true});
            this.position = message.commands[i].value;
            }
            if (this.mode === 'LOW_POWER'){
               roverCommand.results.push({completed : false});
               }           
         }
         if (message.commands[i].commandType === "STATUS_CHECK"){
            roverCommand.results.push({
               completed : true,
               roverStatus : {
                  mode: this.mode, 
                  generatorWatts : this.generatorWatts,
                  position : this.position
               }
            });
         }
         if (message.commands[i].commandType === "MODE_CHANGE"){
            roverCommand.results.push({completed : true});
            this.mode = message.commands[i].value;
         }
      }
      return roverCommand;
   }


}

module.exports = Rover;