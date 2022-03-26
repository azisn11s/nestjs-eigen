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
function queryCounter(input, query) {
    var resultNumbers = [];
    query.forEach(function (item, idx) {
        resultNumbers[idx] = 0;
        input.forEach(function (inp) {
            if (item == inp) {
                resultNumbers[idx] += 1;
            }
        });
    });
    return resultNumbers;
}
function substractDiagonalValues(matrixInput) {
    var diag1 = matrixInput
        .map(function (item, idx) {
        return item[idx];
    })
        .reduce(function (diag1, current) { return diag1 + current; }, 0);
    var diag2 = matrixInput
        .map(function (item, idx) {
        var itemLength = item.length;
        return item[itemLength - 1 - idx];
    })
        .reduce(function (diag2, current) { return diag2 + current; }, 0);
    return diag1 - diag2;
}
console.log('No. 1 - REVERSE WORD = ', reverseWordsOnly('NEIGE1'));
console.log('No. 2 - GET LONGEST WORD ON A SENTENCE = ', getLongWord('Saya sangat senang mengerjakan soal algoritma'));
console.log('No. 3 - Count occurences = ', queryCounter(['xc', 'dz', 'bbb', 'dz'], ['bbb', 'ac', 'dz']));
console.log('No. 4 - Substract from two diagonals = ', substractDiagonalValues([
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9],
]));
