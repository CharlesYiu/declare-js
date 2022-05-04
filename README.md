# [declare.js](https://charlesyiu.github.io/declare-js/declare.js)
Allows declaring tags with html inside and reusing them without rewriting
# Documentation
## Import the script
```html
<script src="https://charlesyiu.github.io/declare-js/declare.js" defer></script>
```
*Note: For other options please check below*
### If you don't want it to observe the page
```html
<script src="https://charlesyiu.github.io/declare-js/declare.js" defer observe=false></script>
```
*Note: Changes to `declare` and reference elements will not be updated and you will have to re-run the function shown below.*   
### If you want it to not automatically run
```html
<script src="https://charlesyiu.github.io/declare-js/declare.js" autorun=false></script>
```
*Note: You will have to run the function shown below*
### Run with the function
```js
runDeclareJS()
```
*Note: If you don't want it to observe changes you will have to specify it like this:*
```js
runDeclareJS(observe=false)
```
## Declaring it
To declare, you simply add an element with `declare` as the tag of it.  
Then you have to specify the tag you want that is not taken in the scope to use with the attribute `name`.  
In this example, the tag we will be using will be `helloworld`.  
```html
<declare name="helloworld">
  <p>Hello World</p>
</declare>
```
## Using it
After you finished step 1 and added some content into it,  
you can add an element with the tag you chose in it. 
```html
<helloworld></helloworld>
```
Then when you load the page it will automatically add the contents of your `declare` element like this:  
```html
<helloworld>
  <p>Hello World</p>
</helloworld>
```
## Understanding Scopes
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
But these will be valid:
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
```html
<div>
  <declare name="helloworld">
    <p>Hello World</p>
  </declare>
  <helloworld></helloworld>
</div>
<div>
  <!-- This is valid because it is defined in another scope -->
  <declare name="helloworld">
    <p>Hello World 2</p>
  </declare>
  <!-- So this will display 'Hello World 2' instead of 'Hello World' -->
  <helloworld></helloworld>
</div>
```
## Understanding Parents
The attribute `parent` is used in a element in the `declare` element.  
When used, it appends every child in the reference element into the element with the attribute.  
This is useful for declaring templates.
```html
<declare name="helloworld">
  <p>Hello elements underneath!</p>
  <div parent></div>
</declare>
<helloworld>
  <p>The element underneath.</p>
</helloworld>
```
Parent elements is also not limited to one, so this works too:
```html
<declare name="helloworld">
  <p>Hello elements underneath!</p>
  <div parent></div>
  <p>Hello elements underneath!.. again</p>
  <div parent></div>
</declare>
<helloworld>
  <p>The element underneath.</p>
</helloworld>
```
## Including other attributes
Attributes in `declare` elements will be transfered to the reference element like this:
```html
<declare name="helloworld" class="hello">
  <p>Hello World</p>
</declare>
<helloworld class="hello"></helloworld>
<!-- Before: <helloworld></helloworld> -->
```
But as you see, the `name` and `hidden` attribute is not transferred because it is reserved for the `declare` element's use.  
## Errors
### Declaration has no attribute 'name'
This error indicates that one of your declarations don't have an attribute called 'name'.  
This is problematic because you will not be able to use the declaration.
### The tag ('name' attribute) 'the-tag-name' is taken
This error is thrown when a tag is already being used or reserved for html.  
(e.g. 'div', 'span', 'h1')
### Other errors
Please open an issue to get further help and support.
