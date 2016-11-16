# Detect Hashtags

[![Travis CI Test Status](https://travis-ci.org/connrs/node-find-hashtags.png)](https://travis-ci.org/connrs/node-find-hashtags)

Get an array of hashtags extracted from a string.

## Usage

    var findTags = require('find-hashtags');
    
    console.log(findTags.hashtag('This #text contains a number of #useful hashtags'));
    // ['text', 'useful']
     console.log(findTags.attag('This @text contains a number of @useful ats'));
        // ['text', 'useful']

The function returns an array containing the hashtags or ats found within a string. It only matches letters and numbers as components of a hashtag.
