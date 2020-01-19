export default (arrayAsString, separator) => {
  return arrayAsString.split(separator).map(str => str.trim());
};
