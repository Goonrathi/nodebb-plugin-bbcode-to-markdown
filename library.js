"use strict";

var converter = {};



function parseQuotes(content) {
	var quote, quoteBlock,
		re = /\[quote=["]?([\s\S]*?)["]?\]([\s\S]*?)\[\/quote\]/gi;

	while(quote = content.match(re)) {
		quote = quote[0];
		quoteBlock = quote.replace(re, '$2').replace(/[\r\n]/g, '\n>')

		// SomethingAwful Customizations
		// (none yet)
		
		// finalize block
		content = content.replace(quote, quoteBlock);
	}

	return content;
}

converter.parse = function(postContent) {
	postContent = postContent
		.replace('&#58;', ':')
		.replace(/\[\S?color[\s\S]*?\]/gi, '') //colors are removed entirely
		.replace(/\[\S?b[s\S]*?\]/gi, '**') //bolds
		.replace(/\[url=(https?:[\s\S]*?)\]([\s\S]*?)\[\/url\]/gi, '[$2]($1)') //urls
		.replace(/\[\S?url[s\S]*?\]/gi, '') //not sure what this is doing
		.replace(/\[\S?i[s\S]*?\]/gi, '*') //italics
		.replace(/\[quote:[\s\S]*?\]([\s\S]*?)\[\/quote:[\s\S]*?\]/gi, '> $1')
		.replace(/<!--[\s\S]*?href="([\s\S]*?)">([\s\S]*?)<[\s\S]*?-->/gi, '[$2]($1)') //urls


		// SomethingAwful Customizations
		.replace(/\[video.+?([\d]*).\]([\[a-zA-Z0-9]*)\[\/video\]/gi,'[youtube link](https:youtube.com/watch=$2&t=$1)')
		.replace(/\[list\]/,'<ul>') //lists open
		.replace(/\[\*\]([\s\w]+)/,'<li>$1</li>') //lists open
		.replace(/\[\/list\]/,'</ul>') //lists close
		.replace(/./,'')
		//emote customization
		.replace(/\:(.+?)\:/gi,'<img src="/images/emotes/$1.gif" alt="$1 emote">')

	postContent = parseQuotes(postContent);
	return postContent
};

module.exports = converter;
