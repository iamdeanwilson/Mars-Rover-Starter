const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!

  //test 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let result = new Rover(87382098)
    expect(result.position).toBe(87382098);
    expect(result.mode).toBe('NORMAL');
    expect(result.generatorWatts).toBe(110);
  });

  //test 8
  it("response returned by receiveMessage contains the name of the message", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands);
    let result = new Rover(87382098);
    expect(result.receiveMessage(message).message).toBe('Test message');
  });

  //test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands);
    let result = new Rover(87382098);
    expect(result.receiveMessage(message).results.length).toBe(2);
  });

  //test 10
  it("responds correctly to the status check command", function() {
   let commands = [new Command('STATUS_CHECK')];
   let message = new Message('Test message', commands);
   let result = new Rover(87382098);
   expect(result.receiveMessage(message).results[0].roverStatus.generatorWatts).toBe(110);
   expect(result.receiveMessage(message).results[0].roverStatus.mode).toBe('NORMAL');
   expect(result.receiveMessage(message).results[0].roverStatus.position).toBe(87382098);
  }); 

  //test 11
  it("responds correctly to the mode change command", function() {
    let commands = [new Command('MODE_CHANGE', "LOW_POWER")];
    let message = new Message('Test message', commands);
    let result = new Rover(87382098);
    result.receiveMessage(message);
    expect(result.mode).toBe("LOW_POWER");
   }); 

   //test 12
   it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', "LOW_POWER"), new Command('MOVE', 98736154)]; //Second command is an attempt to move to a new location, which should fail
    let message = new Message('Test message', commands);
    let result = new Rover(87382098);
    expect(result.position).toBe(87382098); // Expecting the position to be unchanged from the original position that was first given
    expect(result.receiveMessage(message).results[1].completed).toBe(false);
   }); 

   //test 13
   it("responds with the position for the move command", function() {
    let commands = [new Command('MOVE', 98736154)];
    let message = new Message('Test message', commands);
    let result = new Rover(87382098);
    result.receiveMessage(message);
    expect(result.position).toBe(98736154);
   });    

});
