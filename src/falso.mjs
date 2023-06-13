import {
  randFirstName,
  randLastName,
  randNumber,
} from "https://cdn.jsdelivr.net/npm/@ngneat/falso@6.4.0/+esm";

window.falso = [];

window.falso.push(
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
      min: 1000, 
      max: 100000,
    },
  },
);