# MemeScript
MS 0.12

###MS example
```javascript
M3mes hello world
M3mes Wut

WOW "Hello"

DoIt otherThing ~>
  WOW "Hi"
<~

DoIt thing ~> g,h 
  hctf m3me is "Hola"
  WOW m3me
  WOW g
  JustDoIt otherThing
<~

AnothaOne 5 ~>
  WOW "lol"
<~
JustDoIt thing ~> 1,2

```

###To compile to JS 

```javascript
var memes = 
`M3mes hello world
M3mes Wut

WOW "Hello"

DoIt otherThing ~>
  WOW "Hi"
  meme.log "Hi"
<~

DoIt thing ~> g,h 
  hctf m3me is "Hola"
  WOW m3me
  WOW g
  JustDoIt otherThing
<~

AnothaOne 5 ~>
  WOW "lol"
<~
JustDoIt thing ~> 1,2`

lexer(memes); // will return js
```
