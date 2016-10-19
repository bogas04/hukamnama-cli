# Hukamnama-cli
Fetches hukamnama on basis of ang number provided by user. The service relies on [Sikher API](http://api.sikher.com)

# Installation

* Install [NodeJS](http://nodejs.org/) (v6 or above)
* Open terminal/command prompt and enter `npm install hukamnama-cli -g`
* Use hukamnamajs as `hukamnama-cli <hymn number> <filename>`

# Usage

* Not providing &lt;Hymn number&gt; will open random ang
* Not providing &lt;filename&gt; will save hukamnama as Hukamnama.txt

# Changelog

* 1.0.2
  * Since hukamnama isn't always the last hymn of the ang, app requests you to give hymn number instead. You can find hymn number on popular websites like granth.co etc.
* 1.0.1
  * Default filename is Hukamnama.txt
  * Gurmukhi is prefixed with 5 spaces while english translation isn't
* 1.0.0
  * Initial version
