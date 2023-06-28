import {
  randFirstName,
  randLastName,
  randNumber,
  randState,
} from "https://cdn.jsdelivr.net/npm/@ngneat/falso@6.4.0/+esm";

Alpine.store("data").falso = [
  {
    function: randFirstName,
    text: "First Name",
    category: "Person",
    config: {
      withAccents: false,
    },
  },
  {
    function: randLastName,
    text: "Last Name",
    category: "Person",
    config: {
      withAccents: false,
    },
  },
  {
    function: randNumber,
    text: "Integer",
    category: "Numbers",
    config: {
      min: 0,
      max: 1000,
    },
    userInput: [
      { configModel: "min", type: "number" },
      { text: "to" },
      { configModel: "max", type: "number" },
    ],
  },
  {
    function: randNumber,
    text: "Digit",
    category: "Numbers",
    config: {
      min: 0,
      max: 9,
    },
  },
  {
    function: randState,
    text: "State",
    category: "Location",
    config: {},
  },
];
