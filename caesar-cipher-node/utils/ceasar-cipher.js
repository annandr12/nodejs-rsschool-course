const caesarCipher = (str, shift) => {
  // console.log('shift', shift)
  if (shift < 0) {
    return caesarCipher(str, shift + 26);
  }

  let output = '';
  for (let i = 0; i < str.length; i++) {
    let c = str[i];
    if (c.match(/[a-z]/i)) {
      // Get its code
      const code = str.charCodeAt(i);
      // Uppercase letters
      if (code >= 65 && code <= 90) {
        c = String.fromCharCode(((code - 65 + shift) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        // Lowercase letters
        c = String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
    }
    output += c;
  }
  return output;
};

module.exports = {
  caesarCipher
};
