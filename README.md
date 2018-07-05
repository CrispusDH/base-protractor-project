### Let's dance firstly
![Let's dance](https://media.giphy.com/media/eZsKqkZUEM5vG/giphy.gif)
### Architecture:
#### `/src` folder
###### This folder contains code for representation your project and helpersfor it.
- `modules` folder contains independent pieces with blocks of pages
- `pages` folder contains pages representation of your project
- `utils` folder contains helpers
  - `fragment` folder contains wrappers for `Fragment` and `ArrayFragment`
  - `waiters` folder contains a lot of helpers with smart waiters and wrappers for Selenium `.wait()` method
---
#### `/test` folder
###### This folder contains our tests.

### Main ideas:
+ **I passion** with `Oleksandr Khotemskyi` idea of ability to split page on smaller components, that's why I use his [repository](https://github.com/Xotabu4/protractor-element-extend). This is a simple module, that helps you build your own page fragments, that are inherited from ElementFinder/ElementArrayFinder objects, that brings awesome posibilities to your ProtractorJS tests. You might heard other names for this pattern: Page Components, Page Composition, HTML Elements, Custom WebElements, WebElement inheritance, Page Elements. This is all about the same. **I extend** his module with some default methods with smart waiters. You could take a look at `utils/fragment` folder.
+ **Protractor has a strong issue** when sends a lot of requests at the same time, it happens when you use methods that send requests in a parallel, such as `map`, `filter`, etc. That's why I have a wrapper for `ArrayFragment` as well. Inside it I make a little trick with method `makeFnSequential` - it method pushed other methods send requests **consequentially** instead of parallel.
+ I implement smart `Verify` class that contains smart waiters. If something fails this waiter will execute `argument` function again (if you pass function as argument).
