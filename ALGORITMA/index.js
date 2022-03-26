function reverseWordsOnly(word) {
    var numbers = word.match(/\d+/g);
    console.log('numbers', numbers);
    // Step 1. Use the split() method to return a new array
    var splitString = word.split('');
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString
        .map(function (item) {
        if (isNaN(parseFloat(item))) {
            return item;
        }
    })
        .reverse();
    // Step 3. Use concat() to merge arrays and the join() method to join all elements of the array into a string
    var joinArray = reverseArray
        .concat(numbers)
        .join('');
    //Step 4. Return the reversed string
    return joinArray;
}
function getLongWord(sentence) {
    var words = sentence.split(' ');
    var longestWord = '';
    words.forEach(function (word) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    });
    return longestWord;
}
console.log('No. 1 - REVERSE WORD', reverseWordsOnly('NEIGE1'));
console.log('No. 2 - GET LONGEST WORD ON A SENTENCE', getLongWord('Saya sangat senang mengerjakan soal algoritma'));
