/**
*
* @Name : CopyClipboard.js
* @Version : 1.0
* @Programmer : Max
* @Date : 2018-06-23
* @Released under : https://github.com/BaseMax/CopyClipboardJs/blob/master/LICENSE
* @Repository : https://github.com/BaseMax/CopyClipboardJs
*
**/
;(function(window,document)
{
	"use strict";
	var text_default="Text!"
	/**
	* @variable systemPasteReady
	*
	* @goal : true | false
	*
	**/
    var systemPasteReady = false;
	/**
	* @variable systemPasteContent
	*
	* @goal : pasted string for cache
	*
	**/
    var systemPasteContent;
	/**
	* @variable textarea
	*
	* @goal : temp textarea
	*
	**/
	var textarea;
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
	* @function copy_selected
	*
	* @goal : Copy selected text to clipboard.
	*
	* @return void
	**/
	var copy_selected=function()
	{
		//soon
	};
	/**
	* @function copy_text
	*
	* @goal : Copy text to clipboard.
	*
	* @return void
	**/
	var copy_text=function(text)
	{
		/*
		var textarea = document.createElement("textarea");
		textarea.setAttribute("style","width:0px;border:0;display:none;opacity:0;");
		document.body.appendChild(textarea);
		textarea.value = text;
		textarea.select();
		document.execCommand('copy');
		document.body.removeChild(textarea);
		*/
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
	* @function copy_target
	*
	* @goal : Copy value of a element to clipboard.
	*
	* @return void
	**/
	var copy_target=function(target)
	{
		var text=text_default;
		if(target.val !== undefined)
		{
			text=target.val;
		}
		else if(target.innerHTML !== undefined)
		{
			text=target.innerHTML;
		}
		else if(target.value !== undefined)
		{
			text=target.value;
		}
		copy_text(text);
	};
	/**
	* @function get
	*
	* @goal : Get text from clipboard.
	*
	* @return void
	**/
	var get=function(target)
	{
		if(window.clipboardData)
		{
			return window.clipboardData.getData("Text");
		}
		function waitForPaste()
		{
			if(systemPasteReady==false)
			{
				setTimeout(waitForPaste,250);
			}
			else
			{
				var text=systemPasteContent;
				systemPasteReady = false;
				document.body.removeChild(textarea);
				textarea = null;
				return text;
			}
		}
		textarea = document.createElement("textarea");
		textarea.setAttribute("style","width:0px;border:0;display:none;opacity:0;");
		document.body.appendChild(textarea);
		textarea.select();
		return waitForPaste();
	};
	/**
	* @function paste
	*
	* @goal : Paste text from clipboard.
	*
	* @return string
	**/
	var paste=function(target)
	{
		var text=get();
		if(target.val !== undefined)
		{
			target.val=text;
		}
		else if(target.innerHTML !== undefined)
		{
			target.innerHTML=text;
		}
		else if(target.value !== undefined)
		{
			target.value=text;
		}
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
		var text=text_default;
		if(from.hasAttribute("data-copy-text"))
		{
			text=from.getAttribute("data-copy-text");
		}
		copy_text(text);
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
		var text=text_default;
		var target=undefined;
		if(from.hasAttribute("data-copy-from"))
		{
			target=document.querySelector(from.getAttribute("data-copy-from"));
		}
		if(target === undefined)
		{
			copy_text(text);
		}
		else
		{
			copy_target(target);
		}
	};
	/**
	* @struct systemPasteListener
	*
	* @goal : Listener key press whool of web page.
	*
	* @return function
	**/
	function systemPasteListener(evt)
	{
		systemPasteContent = evt.clipboardData.getData("text/plain");
		systemPasteReady = true;
		evt.preventDefault();
	}
	window.addEventListener('paste',systemPasteListener);
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
		copy_selected:copy_selected,
		copy_text:copy_text,
		//use
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
		data_copys = document.querySelectorAll("[data-copy-from]");
		data_copys.forEach(function(item)
		{
			if(item.onclick === null)//onclick not exists
			{
				item.onclick=function()
				{
					window.copy.from(this);
				};
			}
		});
		//////////////////////////////////////////////////////////////////
	},false);
}(window,document));
