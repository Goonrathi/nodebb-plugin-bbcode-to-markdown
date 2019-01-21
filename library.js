"use strict";

var converter = {};



function parseQuotes(content) {
	var quote, quoteBlock,
		re = /\[quote=?["]?([\s\S]*?)["]?\]([\s\S]*?)\[\/quote\]/gi;

	while(quote = content.match(re)) {
		quote = quote[0];
		console.log(quote)
		// quote = quote.trim();
		quoteBlock = quote.replace(re, '\n\n<div class="quote">$2</div><br>\n\n')
		quoteBlock = quoteBlock.replace('">\n\n','">\n')
		// .replace(/[\r\n]/g, '\n')		

		// finalize block
		content = content.replace(quote, quoteBlock);
	}

	return content;
}

converter.parse = function(postContent) {
	postContent = postContent
		.replace(/\[\S?color[\s\S]*?\]/gi, '') //color removed entirely
		.replace(/\[list\]/gi,'<ul>') //list open
		.replace(/\[\*\](.+)[\r\n]/gi,'<li>$1</li>') //lists open
		.replace(/\[\/list\]/gi,'</ul>') //list close
		.replace(/\*/g, '\\*') //literal *
		.replace(/\[b\]\s*/gi, '**') //bold open
		.replace(/\s*\[\Sb[s\S]*?\]/gi, '**') //bold close
		.replace(/\[\/?i\]/gi, '*') //italic
		.replace(/\[u\]/gi, '<u>') //underline open
		.replace(/\[\/u\]/gi, '</u>') //underline close
		.replace(/\[s\]/gi, '<s>') //strikethrough open
		.replace(/\[\/s\]/gi, '</s>') //strikethrough close
		.replace(/\[code\]/gi, '```\n') //code close
		.replace(/\[\/code\]/gi, '\n```') //code close
		// .replace(/\[quote:?[\s\S]*?\]([\s\S]*?)\[\/quote:[\s\S]*?\]/gi, '> $1')
		
		

		
		// Highly specific to SomethingAwful
		.replace(/\[video.+?start\=\"([\d]{3,10})\"\]([\[a-zA-Z0-9]*)\[\/video\]/gi,'[timestamped youtube link ($1)](https:youtube.com/watch=$2&t=$1)') //youtube links with start times
		.replace(/\[video type\=\"youtube.*?\]([\[a-zA-Z0-9-]*)\[\/video\]/gi,'{{< youtube $1 >}}') //youtube embeds
		.replace(/\[url\].+?twitter\.com.+?(\d{10,100})\[\/url\]|twitter\.com.+?(\d{10,100})/gi,'{{< tweet $1 >}}') //twitter embeds


		// Customizations for MY BLOG
		.replace(/\:([a-z0-9]{2,8})\:/gi,'<img src="/img/emotes/$1.gif" alt="$1 emote">') //emotes
		.replace(/\[t*img\]([\w\?\.\:\/\=\&]+)\[\/t*img\]/gi,'<img src="$1">') //img and timg //old: \[t*img\].+\/([A-z0-9]+\.[[A-z]{3,4})\[\/t*img\]
		

		// Other literals
		.replace('&#58;', ':')
		.replace(/\</g, '\<')
		.replace(/\>/g, '\>')

		

		//Do urls last to allow for youtube/twitter/SM links to parse first
		.replace(/\[url=(https?:[\s\S]*?)\]([\s\S]*?)\[\/url\]/gi, '[$2]($1)') //urls
		.replace(/\[\S?url[s\S]*?\]/gi, '') // [url]google.com[/url] non-pretty urls
		.replace(/<!--[\s\S]*?href="([\s\S]*?)">([\s\S]*?)<[\s\S]*?-->/gi, '[$2]($1)') //urls

	postContent = parseQuotes(postContent);
	return postContent
};

module.exports = converter;
