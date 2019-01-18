"use strict";

var converter = {};



function parseQuotes(content) {
	var quote, quoteBlock,
		re = /\[quote=["]?([\s\S]*?)["]?\]([\s\S]*?)\[\/quote\]/gi;

	while(quote = content.match(re)) {
		quote = quote[0];
		quoteBlock = quote.replace(re, '$2').replace(/[\r\n]/g, '\n>')

		// SomethingAwful Customizations
		.replace(/\[video.+?([\d]*).\]([\[a-zA-Z0-9]*)\[\/video\]/gi,'\n >[youtube link](https:youtube.com/watch=$2&t=$1)')
		content = content.replace(quote, quoteBlock);
	}

	return content;
}

converter.parse = function(postContent) {
	postContent = postContent
		.replace('&#58;', ':')
		.replace(/\[\S?color[\s\S]*?\]/gi, '')
		.replace(/\[\S?b:[s\S]*?\]/gi, '**')
		.replace(/\[url=(https?:[\s\S]*?):[\s\S]*?\]([\s\S]*?)\[\/url:[\s\S]*?\]/gi, '[$2]($1)')
		.replace(/\[\S?url:[s\S]*?\]/gi, '')
		.replace(/\[\S?i:[s\S]*?\]/gi, '*')
		.replace(/\[quote:[\s\S]*?\]([\s\S]*?)\[\/quote:[\s\S]*?\]/gi, '> $1')
		.replace(/<!--[\s\S]*?href="([\s\S]*?)">([\s\S]*?)<[\s\S]*?-->/gi, '[$2]($1)')

		// SomethingAwful Customizations
		.replace(/(@.+)/gi,'')

	postContent = parseQuotes(postContent);
	return postContent
};

module.exports = converter;
