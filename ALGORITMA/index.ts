function reverseWordsOnly(word: string) {
  const numbers = word.match(/\d+/g);
  console.log('numbers', numbers);

  // Step 1. Use the split() method to return a new array
  const splitString = word.split('');

  // Step 2. Use the reverse() method to reverse the new created array
  const reverseArray = splitString
    .map((item) => {
      if (isNaN(parseFloat(item))) {
        return item;
      }
    })
    .reverse();

  // Step 3. Use concat() to merge arrays and the join() method to join all elements of the array into a string
  const joinArray = reverseArray
    .concat(numbers)
    .join('');

  //Step 4. Return the reversed string
  return joinArray;
}

function getLongWord(sentence: string) {
  const words = sentence.split(' ');

  let longestWord = '';

  words.forEach(function (word) {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  });

  return longestWord;
}

console.log(
  'No. 1 - REVERSE WORD = ',
  reverseWordsOnly('NEIGE1'),
);

console.log(
  'No. 2 - GET LONGEST WORD ON A SENTENCE = ',
  getLongWord(
    'Saya sangat senang mengerjakan soal algoritma',
  ),
);
