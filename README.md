# declare.js
Allows to declare written html and use them elsewhere without rewriting.

# Import script
You can simply paste this:
```html
<script src="https://charlesyiu.github.io/declare-js/declare.js" defer></script>
```
If you do not want it observe changes with declarations you will have to use this instead:
```html
<script src="https://charlesyiu.github.io/declare-js/declare.js" defer observe=false></script>
```
Or if you want it to not automatically run, you can use this:
```html
<script src="https://charlesyiu.github.io/declare-js/declare.js" autorun=false></script>
```
# Declaring 
To declare, you simply add an element with `declare` as the tag of it.
Then you have to specify the tag you want that is not taken to use with the attribute `name`. 
In this example, the tag we will be using will be `helloworld`
```html
<declare name="helloworld">
  <p>Hello World</p>
</declare>
```
# Using
After you finished step 1 and added some content into it,  
you can add an element with the tag you chose in it. 
```html
<helloworld></helloworld>
```
Then you will see the content that you added in the new element
```html
<helloworld>
  <p>Hello World</p>
</helloworld>
```
# Scopes
When you want to use your declared html, you always have to remember that it is only usable in it's sibilings. (and it's children)  
So using the declared html like this will be invalid:
```html
<div>
  <declare name="helloworld">
    <p>Hello World</p>
  </declare>
</div>
<!-- This is outside of the declaration's scope (the div) -->
<helloworld></helloworld>
```
