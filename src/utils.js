function toTitleCase(str) {
  if (!str || str.length === 0) {
    return str;
  }
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

export {
  toTitleCase,
}
