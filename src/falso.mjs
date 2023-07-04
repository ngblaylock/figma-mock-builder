import {
  // rand,
  randAccessory,
  randAlphaNumeric,
  randBrand,
  randCatchPhrase,
  randCompanyName,
  randDepartment,
  randDirectoryPath,
  randEmail,
  randFileExt,
  randFileName,
  randFileType,
  randFirstName,
  randFullName,
  randGender,
  randJobArea,
  randJobDescriptor,
  randJobTitle,
  randJobType,
  randLastName,
  randNumber,
  randPersonTitle,
  randPhrase,
  randProductAdjective,
  randProductCategory,
  randProductDescription,
  randProductName,
  randQuote,
  randRole,
  randSkill,
  randState,
  randUserName,
  randUuid,
  randVerb,
  randWord,
} from "https://cdn.jsdelivr.net/npm/@ngneat/falso@6.4.0/+esm";

Alpine.store("data").falso = [
  // Person
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
    function: randFullName,
    text: "Full Name",
    category: "Person",
    config: {
      withAccents: false,
    },
  },
  {
    function: randGender,
    text: "Gender",
    category: "Person",
    config: {},
  },
  {
    function: randPersonTitle,
    text: "Title",
    category: "Person",
    config: {},
  },
  {
    function: randUserName,
    text: "Username",
    category: "Person",
    config: {},
  },
  {
    function: randEmail,
    text: "Email",
    category: "Person",
    config: {},
  },
  // Numbers
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
    function: randAlphaNumeric,
    text: "Alphanumeric",
    category: "Numbers",
    config: {},
  },
  {
    function: randUuid,
    text: "UUID",
    category: "Numbers",
    config: {},
  },
  // Location
  {
    function: randState,
    text: "State",
    category: "Location",
    config: {},
  },
  // Company
  {
    function: randBrand,
    text: "Brand",
    category: "Company",
    config: {},
  },
  {
    function: randCompanyName,
    text: "Company Name",
    category: "Company",
    config: {},
  },
  {
    function: randJobArea,
    text: "Job Area",
    category: "Company",
    config: {},
  },
  {
    function: randJobDescriptor,
    text: "Job Description",
    category: "Company",
    config: {},
  },
  {
    function: randJobTitle,
    text: "Job Title",
    category: "Company",
    config: {},
  },
  {
    function: randJobType,
    text: "Job Type",
    category: "Company",
    config: {},
  },
  {
    function: randRole,
    text: "Role",
    category: "Company",
    config: {},
  },
  // Commerce
  {
    function: randAccessory,
    text: "Accessory",
    category: "Commerce",
    config: {},
  },
  {
    function: randDepartment,
    text: "Department",
    category: "Commerce",
    config: {},
  },
  {
    function: randProductName,
    text: "Product Name",
    category: "Commerce",
    config: {},
  },
  {
    function: randProductDescription,
    text: "Product Description",
    category: "Commerce",
    config: {},
  },
  {
    function: randProductCategory,
    text: "Category",
    category: "Commerce",
    config: {},
  },
  // System
  {
    function: randDirectoryPath,
    text: "Directory Path",
    category: "System",
    config: {},
  },
  {
    function: randFileName,
    text: "File Name",
    category: "System",
    config: {},
  },
  {
    function: randFileExt,
    text: "File Extension",
    category: "System",
    config: {},
  },
  {
    function: randFileType,
    text: "File Type",
    category: "System",
    config: {},
  },
  // Words
  {
    function: randProductAdjective,
    text: "Adjective",
    category: "Words",
    config: {},
  },
  {
    function: randVerb,
    text: "Verb",
    category: "Words",
    config: {},
  },
  {
    function: randSkill,
    text: "Skill",
    category: "Words",
    config: {},
  },
  {
    function: randWord,
    text: "Word",
    category: "Words",
    config: {},
  },
  {
    function: randCatchPhrase,
    text: "Catch Phrase",
    category: "Words",
    config: {},
  },
  {
    function: randPhrase,
    text: "Phrase",
    category: "Words",
    config: {},
  },
  {
    function: randQuote,
    text: "Quote",
    category: "Words",
    config: {},
  },
  // {
  //   function: rand,
  //   text: "Random Of",
  //   category: "Words",
  //   config: {
  //     string: 'hey'
  //   },
  //   userInput: [
  //     { configModel: "string", type: "text" },
  //   ],
  // },
];
