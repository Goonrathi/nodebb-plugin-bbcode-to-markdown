"use strict";

var converter = {};



function parseQuotes(content) {
	var quote, quoteBlock,
		re = /\[quote=?["]?([\s\S]*?)["]?\]([\s\S]*?)\[\/quote\]/gi;

	while(quote = content.match(re)) {
		quote = quote[0];
		quoteBlock = quote.replace(re, '<div id="quote">$2</div>')
		// .replace(/[\r\n]/g, '\n>')

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
		.replace('\*', '\\*')
		.replace('\<', '\\<')
		.replace('\>', '\\>')
		.replace(/\[\S?color[\s\S]*?\]/gi, '') //colors are removed entirely
		.replace(/\[\S?b[s\S]*?\]/gi, '**') //bolds
		.replace(/\[\/?i\]/gi, '*') //italics
		.replace(/\[u\]/gi, '<u>') //underline open
		.replace(/\[\/u\]/gi, '</u>') //underline close
		.replace(/\[s\]/gi, '<s>') //strikethrough open
		.replace(/\[\/s\]/gi, '</s>') //strikethrough close
		.replace(/\[code\]/gi, '```html') //code close
		.replace(/\[\/code\]/gi, '```') //code close
		// .replace(/\[quote:?[\s\S]*?\]([\s\S]*?)\[\/quote:[\s\S]*?\]/gi, '> $1')
		
		//emote customization
		.replace(/\:([a-z0-9]{2,6})\:/gi,'<img src="/images/emotes/$1.gif" alt="$1 emote">')

		
		// Highly specific to SomethingAwful
		.replace(/\[video type\=\"youtube.+?\]([\[a-zA-Z0-9]*)\[\/video\]/gi,'{{< youtube $1 >}}') //youtube embeds
		.replace(/\[video.+?start\=\"([\d]{3,10})\"\]([\[a-zA-Z0-9]*)\[\/video\]/gi,'[youtube link](https:youtube.com/watch=$2&t=$1)') //youtube links with start times
		.replace(/\[url\].+?twitter\.com.+?(\d{10,100})\[\/url\]|twitter\.com.+?(\d{10,100})/gi,'{{< tweet $1 >}}') //twitter embeds
		.replace(/\[t*img\].+\/([A-z0-9]+\.[[A-z]{3,4})\[\/t*img\]/gi,'<img src="/images/posts/$1">') //img and timg
		.replace(/\[list\]/gi,'<ul>') //lists open
		.replace(/\[\*\]([\s\w]+)/gi,'<li>$1</li>') //lists open
		.replace(/\[\/list\]/gi,'</ul>') //lists close
		// .replace(/./,'')
		

		//Do urls last to allow for youtube/twitter/SM links to parse first
		.replace(/\[url=(https?:[\s\S]*?)\]([\s\S]*?)\[\/url\]/gi, '[$2]($1)') //urls
		.replace(/\[\S?url[s\S]*?\]/gi, '') // [url]google.com[/url] non-pretty urls
		.replace(/<!--[\s\S]*?href="([\s\S]*?)">([\s\S]*?)<[\s\S]*?-->/gi, '[$2]($1)') //urls

	postContent = parseQuotes(postContent);
	return postContent
};

module.exports = converter;
