/**
*
* @Name : CopyClipboard.js
* @Version : 1.0
* @Programmer : Max
* @Date : 2018-06-23
* @Released under : https://github.com/BaseMax/CopyClipboard/blob/master/LICENSE
* @Repository : https://github.com/BaseMax/CopyClipboard
*
**/
;(function(window,document)
{
	"use strict";
	/**
	* @function send
	*
	* @goal : Send GET request to a link.
	*
	* @return void
	**/
	var send=function(link)
	{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange=function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				//return this.responseText;
			}
		};
		xhttp.open("GET",link,true);
		xhttp.send();
	};
	/**
	* @function copy
	*
	* @goal : Copy text to clipboard.
	*
	* @return void
	**/
	var copy=function(text)
	{
		function selectElementText(element)
		{
			if (document.selection)
			{
				var range = document.body.createTextRange();
				range.moveToElementText(element);
				range.select();
			}
			else if (window.getSelection)
			{
				var range = document.createRange();
				range.selectNode(element);
				window.getSelection().removeAllRanges();
				window.getSelection().addRange(range);
			}
		}
		var element = document.createElement('div');
		element.textContent = text;
		document.body.appendChild(element);
		selectElementText(element);
		document.execCommand('copy');
		element.remove();
	};
	/**
	* @function paste
	*
	* @goal : Paste text from clipboard.
	*
	* @return void
	**/
	var paste=function()
	{

	};
	/**
	* @function get
	*
	* @goal : Get text from clipboard.
	*
	* @return string
	**/
	var get=function()
	{

	};
	/**
	* @function text
	*
	* @goal : Get Text from argument and Copy to clipboard.
	*
	* @return void
	**/
	var text=function(from)
	{

	};
	/**
	* @function from
	*
	* @goal : Get Text from a element and Copy to clipboard.
	*
	* @return void
	**/
	var from=function(from)
	{

	};
	/**
	* @struct goscroll
	*
	* @goal : access to public functions
	*
	* @return struct
	**/
	window.copy=
	{
		//manual using
		copy:copy,
		paste:paste,
		text:text,
		from:from,
		send:send,
	};
	/**
	* @struct onload
	*
	* @goal : set onclick and events after page load...
	*
	* @return void
	**/
	window.addEventListener("load",function()
	{
		var data_copys;
		data_copys = document.querySelectorAll("[data-copy-text]");
		data_copys.forEach(function(item)
		{
			if(item.onclick === null)//onclick not exists
			{
				item.onclick=function()
				{
					window.copy.text(this);
				};
			}
		});
		//////////////////////////////////////////////////////////////////
	},false);
}(window,document));
