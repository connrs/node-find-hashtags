# Detect Hashtags

[![Travis CI Test Status](https://travis-ci.org/connrs/node-find-hashtags.png)](https://travis-ci.org/connrs/node-find-hashtags)

Get an array of hashtags extracted from a string.

## Usage

    var findHashtags = require('find-hashtags');
    
    console.log(findHashtags('This #text contains a number of #useful hashtags'));
    // ['text', 'useful']

The function returns an array containing the hashtags found within a string. It only matches letters and numbers as components of a hashtag.
