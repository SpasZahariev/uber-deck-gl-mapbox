const csvToJson = require("convert-csv-to-json");

const input = "./kaggle_gross_rent.csv";
const output = "./public/gross_rent.json";

csvToJson
  .fieldDelimiter(",")
  .formatValueByType()
  .generateJsonFileFromCsv(input, output);

//   example output

//   "id": 101901,
//   "State_Code": 1,
//   "State_Name": "Alabama",
//   "State_ab": "AL",
//   "County": "Chambers County",
//   "City": "\"Wadley\"",
//   "Place": "Abanda",
//   "Type": "CDP",
//   "Primary": "place",
//   "Zip_Code": 36276,
//   "Area_Code": 256,
//   "ALand": 7764034,
//   "AWater": 34284,
//   "Lat": 33.091627,
//   "Lon": -85.527029,
//   "Mean": 972,
//   "Median": 968,
//   "Stdev": 51,
//   "Samples": 12
//  },
