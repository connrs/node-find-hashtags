var test = require('tape');
var hashtags = require('../');

test('no hashtags found', function (t) {
  var content = 'no hashtags in here';

  t.deepEqual(hashtags(content), []);
  t.end();
});

test('one hashtag found', function (t) {
  var content = 'only #one hashtag found';

  t.deepEqual(hashtags(content), ['one']);
  t.end();
});

test('multiple hashtags found', function (t) {
  var content = 'only #two hashtag #found';

  t.deepEqual(hashtags(content), ['two', 'found']);
  t.end();
});

test('unicode characters matched', function (t) {
  var content = 'international #háshtàgs are #übêr';

  t.deepEqual(hashtags(content), ['háshtàgs', 'übêr']);
  t.end();
});

test('matches alphanumerics', function (t) {
  var content = 'matches #a1phanum3ric characters';

  t.deepEqual(hashtags(content), ['a1phanum3ric']);
  t.end();
});

test('duplicate tags are only matched once', function (t) {
  var content = 'the same #tag is #only displayed as a single #tag';

  t.deepEqual(hashtags(content), ['tag', 'only']);
  t.end();
});

test('hashtags are converted to lowercase', function (t) {
  var content = '#Hashtags become #LowerCase';

  t.deepEqual(hashtags(content), ['hashtags', 'lowercase']);
  t.end();
});
