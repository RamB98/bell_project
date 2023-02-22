const fs = require('fs');
const filePath = './data.txt';

//Function to read the file and execute the main loop 

function readTheDocument(path) {

  const voterID = [];
  const candidateID = [];
  const fileContents = fs.readFileSync(path, 'utf8');
  const lines = fileContents.split('\n');

  for (let i = 0; i < lines.length; i++) {

    setTimeout(() => {
      var splitedLine = lines[i].toString().trim().split(/\s+/g);


      if (voterID.includes(splitedLine[0])) {
        console.log("Fraud detected, you cannot vote multiple times!")
        console.log("Therefore, this vote will not count!")
        console.log("--------------------------------")
        splitedLine[1] = "Invalid"

      }

      else if (!isNaN(splitedLine[0])) {
        voterID.push(splitedLine[0]);
      }

      if (!isNaN(splitedLine[1])) {
        candidateID.push(splitedLine[1]);
        top3(candidateID)
      }
    }, i * 2000);

  }
}


// Function to find the top three most reccuring candidate Ids 

function top3(arr) {

  var map = new Map();

  for (var i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      map.set(arr[i], map.get(arr[i]) + 1)
    } else {
      map.set(arr[i], 1)
    }
  }

  var CandidateList = [...map];
  CandidateList.sort((temp1, temp2) => {
    if (temp1[1] == temp2[1])
      return temp2[0] - temp1[0];
    else
      return temp2[1] - temp1[1];
  })

  var count
  var distinctCount = new Set(arr).size;

  if (distinctCount >= 3) {
    count = 3;
  }
  else {
    count = distinctCount;
  }

  for (var i = 0; i < count; i++)
    if (i == 0) {
      console.log("First:")
      console.log(CandidateList[i][0]);
    }
    else if (i == 1) {
      console.log("Second:")
      console.log(CandidateList[i][0]);
    }

    else {
      console.log("Third:")
      console.log(CandidateList[i][0]);
    }

  console.log("--------------------------------");
}

readTheDocument(filePath);