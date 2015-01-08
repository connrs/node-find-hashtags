var XRegExp = require('xregexp').XRegExp;
var hashtagExp = XRegExp('\\S*#[\\p{L}\\d]+', 'i');

function FindHashtags() {
  this._nextMatchPosition = 0;
  this._matches = [];
  this._currentMatch = null;
  this._currentMatchText = null;
  this._content = null;
}

FindHashtags.prototype.setContent = function (content) {
  this._content = content;
};

FindHashtags.prototype.getHashtags = function () {
  this._loopMatches();
  return this._getMatches();
};

FindHashtags.prototype._loopMatches = function () {
  this._findNextMatch();

  while (this._foundMatch()) {
    this._setCurrentMatchText();

    if (this._currentMatchIsUnique()) {
      this._addCurrentResultToMatches();
    }

    this._incrementNextMatchPosition();
    this._findNextMatch();
  }
};

FindHashtags.prototype._findNextMatch = function () {
  this._currentMatch = XRegExp.exec(this._content, hashtagExp, this._nextMatchPosition);
};

FindHashtags.prototype._foundMatch = function () {
  return this._currentMatch === null ? false : true;
};

FindHashtags.prototype._setCurrentMatchText = function () {
  this._currentMatchText = this._formatMatchText(this._currentMatch[0]);
};

FindHashtags.prototype._formatMatchText = function (match) {
  return match.substring(1).toLowerCase();
};

FindHashtags.prototype._currentMatchIsUnique = function () {
  return this._matches.indexOf(this._currentMatchText) === -1;
};

FindHashtags.prototype._addCurrentResultToMatches = function () {
  this._matches.push(this._currentMatchText);
};

FindHashtags.prototype._incrementNextMatchPosition = function () {
  this._nextMatchPosition = this._currentMatch.index + this._currentMatch[0].length;
};

FindHashtags.prototype._getMatches = function () {
  return this._matches.length === 0 ? [] : this._matches;
};

function findHashtags(content) {
  var tags = new FindHashtags();
  tags.setContent(content);
  return tags.getHashtags();
}

module.exports = findHashtags;
