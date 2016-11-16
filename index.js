var XRegExp = require('xregexp').XRegExp;
var hashtagExp = XRegExp('#[\\p{L}\\d]+', 'i');
var atExp = XRegExp('@[\\p{L}\\d]+', 'i');

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

//@@@@@@@@@@@@@@@
function FindAt() {
  this._nextMatchPosition = 0;
  this._matches = [];
  this._currentMatch = null;
  this._currentMatchText = null;
  this._content = null;
}

FindAt.prototype.setContent = function (content) {
  this._content = content;
};

FindAt.prototype.getHashtags = function () {
  this._loopMatches();
  return this._getMatches();
};

FindAt.prototype._loopMatches = function () {
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

FindAt.prototype._findNextMatch = function () {
  this._currentMatch = XRegExp.exec(this._content, atExp, this._nextMatchPosition);
};

FindAt.prototype._foundMatch = function () {
  return this._currentMatch === null ? false : true;
};

FindAt.prototype._setCurrentMatchText = function () {
  this._currentMatchText = this._formatMatchText(this._currentMatch[0]);
};

FindAt.prototype._formatMatchText = function (match) {
  return match.substring(1).toLowerCase();
};

FindAt.prototype._currentMatchIsUnique = function () {
  return this._matches.indexOf(this._currentMatchText) === -1;
};

FindAt.prototype._addCurrentResultToMatches = function () {
  this._matches.push(this._currentMatchText);
};

FindAt.prototype._incrementNextMatchPosition = function () {
  this._nextMatchPosition = this._currentMatch.index + this._currentMatch[0].length;
};

FindAt.prototype._getMatches = function () {
  return this._matches.length === 0 ? [] : this._matches;
};

function findAt(content) {
  var tags = new FindAt();
  tags.setContent(content);
  return tags.getHashtags();
}

module.exports = {
  findHashtags:findHashtags,
  findAt:findAt
};
