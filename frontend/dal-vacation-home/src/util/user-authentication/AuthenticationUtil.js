export const encryptCipherText = (cipherText, shift) => {
  let encryptedText = ""
  for (let i = 0; i < cipherText.length; i++) {
    let char = cipherText[i];
    if(char === " ") {
      continue;
    }
    if (char === char.toUpperCase()) {
      let shiftedChar = String.fromCharCode((char.charCodeAt(0) + shift - 65) % 26 + 65);
      encryptedText += shiftedChar;
    }
    else {
      let shiftedChar = String.fromCharCode((char.charCodeAt(0) + shift - 97) % 26 + 97);
      encryptedText += shiftedChar;
    }
  }
  return encryptedText;
}