module.exports = inserter;

function inserter(options: any) {
  var expected = (options || {}).extname;

  if (!expected) {
    throw new Error('Missing `extname` in options');
  }

  return transformer;

  function transformer(tree: any, file: any) {
    if (file.extname && file.extname !== expected) {
      file.extname = expected;
    }
  }
}
