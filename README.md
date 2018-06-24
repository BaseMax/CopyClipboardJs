# CopyClipboard
 Tiny Library for copy text in clipboard.

![CopyClipboard.min.js File Size](https://img.shields.io/badge/Compressed%20Size-2%20KB-blue.svg) ![CopyClipboard.min.js Validation Code](https://img.shields.io/badge/Validation%20Code-No%20Error-green.svg)


## Features 

  - Fast
  - Compact
  - No dependencies
  - Event after copy (e.g :`AJAX`,send a GET request)


## Arguments 

| Argument Name  | Goal |
| ------------- | ------------- |
| data-copy-text  	| Set Text   |
| data-copy-from  | Set target, to get the text from they |
| data-copy-after  | Execute the code after copying |
| data-copy-link  | Send GET Request to a link after copying |

## Samples

To view the full details, run the [Example.html](https://github.com/BaseMax/CopyClipboard/blob/master/Example.html) file.

#### `data-copy-text`
```
<button data-copy-text="Hello! how are you?">Click , Copy!</button>
```
#### `data-copy-from`
```
Enter Text : <input class="input_text" name="text" type="text">
<br>
<button data-copy-from=".input_text">Click , Copy!</button>
```
#### `data-copy-after`

#### `onclick`

# License

CopyClipboard is licensed under the [GNU General Public License](https://github.com/BaseMax/CopyClipboard/blob/master/LICENSE).
