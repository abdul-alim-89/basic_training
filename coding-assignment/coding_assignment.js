    // Problem 1: Complete the secondLargest function which takes in an array of numbers in input and return the second biggest number in the array. (without using sort)?
function secondLargest(array) {
  let largest = -Infinity;
  let second_largest = -Infinity;

  for (const num of array) {
    if (num > largest) {
      second_largest = largest;
      largest = num;
    } else if (num > second_largest && num != largest) {
      second_largest = num;
    }
  }

  return second_largest;
}

// Problem 2: Complete the calculateFrequency function that takes lowercase string as input and returns frequency of all english alphabet. (using only array, no in-built function)
function calculateFrequency(string) {
  // Write your code here
let feq = {}

for(let i=0; i < string.length; i++){
  let char = string[i];
  if(char >= 'a' && char <= 'z'){
  if(feq[char])
    {
      feq[char] = feq[char] + 1;
    }
  else
    {
      feq[char] = 1;
    }
  }
}
//console.log(feq)
return feq;
  
}

// Problem 3: Complete the flatten function that takes a JS Object, returns a JS Object in flatten format (compressed)
function flatten(unflatObject) {
  // Write your code here
  let result = {};

  function flat(current, key) {
    for (let k in current) {
      let newKey = key ? key + "." + k : k;

      if (typeof current[k] === "object" && current[k] !== null) {
        flat(current[k], newKey);
      } else {
        result[newKey] = current[k];
      }
    }
  }

  flat(unflatObject, "");
  //console.log(result)
  return result;
  
}

// Problem 4: Complete the unflatten function that takes a JS Object, returns a JS Object in unflatten format
function unflatten(flatObject) {
  let result = {} // empty object
  
  for(let key in flatObject){
    let current_obj = result;
    let keys = key.split(".");
    for(let i=0; i < keys.length; i++){
      let current_key = keys[i];
      if(i == keys.length - 1){
        current_obj[current_key] = flatObject[key];
      }
      else
        {
          if(!current_obj[current_key]){
            current_obj[current_key] = {};
          }
          current_obj = current_obj[current_key];
        }
    }
  }
  //console.log(result)
  return result;
}