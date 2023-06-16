import {
  randFirstName,
  randLastName,
  randNumber,
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
  },
];