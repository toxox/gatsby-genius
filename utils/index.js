exports.makeSlug = function(text) {
  if (!text) throw Error('Text is required');

  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/^-+|-+$/g, ''); // Trim leading and trailing dashes
};
