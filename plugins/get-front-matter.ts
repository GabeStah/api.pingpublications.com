module.exports = getFrontMatter;

function getFrontMatter(options: any) {
  var expected = (options || {}).extname;

  if (!expected) {
    throw new Error('Missing `extname` in options');
  }

  return transformer;

  function transformer(tree: any, file: any) {
    console.debug('---');
    console.log(tree.children[0].data.parsedValue);
    // console.log(tree);
    console.debug('---');
    if (file.extname && file.extname !== expected) {
      file.extname = expected;
    }
  }
}
