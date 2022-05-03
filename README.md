# declare.js
Allows declaring tags with html inside and reusing them without rewriting

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
then call it's function later like this:
```js
runDeclareJS()
```
# Declaring 
To declare, you simply add an element with `declare` as the tag of it.  
Then you have to specify the tag you want that is not taken to use with the attribute `name`.  
In this example, the tag we will be using will be `helloworld`.  
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
Then when you load the page it will automatically add the contents of your declared element like this:  
(If observing is not disabled)
```html
<helloworld>
  <p>Hello World</p>
</helloworld>
```
# Scopes
When you want to use your declared html, you always have to remember that it is only usable in it's siblings or parent's children.  
(and all it's children, grand children, and so on)  
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
But this is:
```html
<div>
  <declare name="helloworld">
    <p>Hello World</p>
  </declare>
  <div>
    <!-- They are both in declare element's parent -->
    <helloworld></helloworld>
    <div>
      <helloworld></helloworld>
    </div>
  </div>
</div>
```
# Errors
## Declaration has no attribute 'name'
This error indicates that one of your declarations don't have an attribute called 'name'.  
This is problematic because you will not be able to use the declaration.
## The tag ('name' attribute) 'the-tag-name' is taken
This error is thrown when a tag is already being used or reserved for html.  
(e.g. 'div', 'span', 'h1')
## Other errors
Please open an issue to get further help and support.
