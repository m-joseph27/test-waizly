// soal no. 1
function miniMaxSum(input) {
  const arr = input.split(" ").map(Number);
  arr.sort((a, b) => a - b);

  const minSum = arr.slice(0, 4).reduce((acc, curr) => acc + curr);
  const maxSum = arr.slice(1).reduce((acc, curr) => acc + curr);

  return minSum + " " + maxSum;
}
const input = "1 2 3 4 5";
const output = miniMaxSum(input);
console.log(output);


// soal no 2
function plusMinus(arr) {
  let positive = 0, negative = 0, zero = 0;
  for (let num of arr) {
    if (num > 0) {
      positive++;
    } else if (num < 0) {
      negative++;
    } else {
      zero++;
    } 
  }
  // Menghitung proporsi
  const n = arr.length;
  const positiveRatio = positive / n;
  const negativeRatio = negative / n;
  const zeroRatio = zero / n;

  console.log(positiveRatio.toFixed(6));
  console.log(negativeRatio.toFixed(6));
  console.log(zeroRatio.toFixed(6));
}
const n = 6;
const arr = [-4, 3, -9, 0, 4, 1];
plusMinus(arr);


// soal no 3
function timeConversion(times) {
  const time = times.slice(0, 8);
  const period = times.slice(8);
  const hour = parseInt(times.slice(0, 2));
  // jika AM dan jam adalah 12, ubah menjadi 00
  if (period === 'AM') {
    if (hour === 12) {
      return '00' + time.slice(2);
    } else {
      return time;
    }
  } else {
    // Jika PM dan jam != 12, tambahkan 12 ke jam
    if (hour !== 12) {
      return (hour + 12) + time.slice(2);
    } else {
      return time;
    } 
  } 
}
const time1 = '12:01:00PM';
const time2 = '12:01:00AM';
console.log(timeConversion(time1));
console.log(timeConversion(time2));