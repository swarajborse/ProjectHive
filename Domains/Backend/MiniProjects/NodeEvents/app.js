const EventEmitter = require("events");

// Create an instance
const emitter = new EventEmitter();

// Listen for an event
emitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

// Emit (trigger) the event
emitter.emit("greet", "Ogaga");
