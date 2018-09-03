<template>
  <div class="">
    <section class="example">
      <button data-addCart class="button button-add-cart"><span>Add To Cart</span></button>
      <div data-successMessage class="callout success hide">
        Added to cart, Yay!
      </div>
    </section>
    <section class="example">
      <div class="button-group-option" data-grouptype="OR">
        <a href="#" class="button success radius">Buy it now</a>
        <a href="#" class="button primary radius">Learn More</a>
      </div>
    </section>
    <section class="example">
      <button class="button-hover-addcart button"><span>Add to cart</span><i class="fa fa-shopping-cart"></i></button>
    </section>
    <section class="example">
      <div class="card card-product">
        <div class="card-product-img-wrapper">
          <a class="button expanded">Add to Cart</a>
          <a href="#"><img src="https://demandware.edgesuite.net/sits_pod15/dw/image/v2/AAJE_PRD/on/demandware.static/-/Sites-pacsun_storefront_catalog/default/dw2dd1a5fe/product_images/0702497750034NEW_00_165.jpg?sw=215&sh=334&sm=fit"></a>
        </div>
        <div class="card-section">
          <a href="#"><h3 class="card-product-name">Kickin with Kraken Tee</h3></a>
          <h5 class="card-product-price">$19.99</h5>
          <p class="card-product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin posuere sem enim, accumsan convallis risus semper.</p>
        </div>
      </div>
    </section>
    <section class="example">
      <div class="checkout-summary">
        <div class="checkout-summary-title">
          <h5>Your Order</h5>
          <h5>2 Items</h5>
        </div>

        <div class="checkout-summary-item">
          <img src="https://placeimg.com/100/80/any">
          <div class="item-name">
            <a>Comfy Knit Blazer</a>
            <p><span class="title">Color: </span>Blue</p>
            <p><span class="title">Size: </span>M</p>
          </div>
          <div class="item-price">
            <p class="title">$24.99</p>
            <a href="#">Remove</a>
          </div>
        </div>
        <div class="checkout-summary-item">
          <img src="https://placeimg.com/100/80/any">
          <div class="item-name">
            <a>Comfy Knit Blazer</a>
            <p><span class="title">Color: </span>Blue</p>
            <p><span class="title">Size: </span>M</p>
          </div>
          <div class="item-price">
            <p class="title">$24.99</p>
            <a href="#">Remove</a>
          </div>
        </div>
        <div class="checkout-summary-details">
          <div class="left">
            <p><strong>Subtotal:</strong></p>
            <p><strong>Tax:</strong></p>
            <p><strong>Total:</strong></p>
          </div>
          <div class="right">
            <p>$10.99</p>
            <p>$2.00</p>
            <p>$12.99</p>
          </div>
        </div>
        <button class="button expanded">Proceed to Checkout</button>
      </div>
    </section>
    <section class="example">
      <div class="ecommerce-footer">
       <div class="ecommerce-footer-links row">
         <div class="small-12 medium-12 large-6 columns">
           <div class="row ecommerce-footer-links-block">
             <div class="small-4 medium-4 large-4 columns">
               <h5>Categories</h5>
               <ul class="menu vertical">
                 <li><a href="#">Category 1</a></li>
                 <li><a href="#">Category 2</a></li>
                 <li><a href="#">Category 3</a></li>
                 <li><a href="#">Category 4</a></li>
                 <li><a href="#">Category 5</a></li>
               </ul>
             </div>
             <div class="small-4 medium-4 large-4 columns more-categories">
               <ul class="menu vertical">
                 <li><a href="#">Category 6</a></li>
                 <li><a href="#">Category 7</a></li>
                 <li><a href="#">Category 8</a></li>
                 <li><a href="#">Category 9</a></li>
                 <li><a href="#">Category 10</a></li>
               </ul>
             </div>
             <div class="small-4 medium-4 large-4 columns">
               <h5>Help</h5>
               <ul class="menu vertical">
                 <li><a href="#">FAQs</a></li>
                 <li><a href="#">Return Policy</a></li>
                 <li><a href="#">Shipping &amp; Delivery</a></li>
               </ul>
             </div>
           </div>

         </div>
         <div class="small-12 medium-12 large-6 columns">
          <div class="row">
            <div class="small-4 medium-4 large-4 columns">
             <h5>My Account</h5>
             <ul class="menu vertical">
               <li><a href="#">Sign In</a></li>
               <li><a href="#">Order Status</a></li>
               <li><a href="#">My Wishlist</a></li>
             </ul>
           </div>
           <div class="small-4 medium-4 large-4 columns">
             <h5>About</h5>
             <ul class="menu vertical">
               <li><a href="#">Company</a></li>
               <li><a href="#">Store Locator</a></li>
               <li><a href="#">Team</a></li>
               <li><a href="#">Support</a></li>
               <li><a href="#">Contact</a></li>
               <li><a href="#">Career</a></li>
             </ul>
           </div>
           <div class="small-4 medium-4 large-4 columns">
             <h5>Social</h5>
             <ul class="menu vertical">
               <li><a href="#">Facebook</a></li>
               <li><a href="#">Twitter</a></li>
               <li><a href="#">Instagram</a></li>
               <li><a href="#">Youtube</a></li>
             </ul>
           </div>
          </div>
         </div>
       </div>
       <div class="ecommerce-footer-bottom-bar row">
         <div class="small-12 medium-5 columns">
           <ul class="bottom-links">
             <li><a href="#">Privacy Policy</a></li>
             <li><a href="#">Terms &amp; Conditions</a></li>
           </ul>
         </div>
         <div class="small-12 medium-2 columns ecommerce-footer-logomark">
           <img src="https://placehold.it/50x50"/>
         </div>
         <div class="small-12 medium-5 columns">
           <div class="bottom-copyright">
             <span>©2017 Company Name. All rights reserved.</span>
           </div>
         </div>
       </div>
     </div>
    </section>
    <section class="example">
      <!-- NOTE: This is the off-canvas menu that appears when you click on the hamburger menu on smaller screens. Everything in the `.off-canvas` div belongs in `src/layouts/default.html`. Copy this section into the `default.html` file and remove it from this file.  -->
      <div class="off-canvas ecommerce-header-off-canvas position-left" id="ecommerce-header" data-off-canvas>

        <!-- Close button -->
        <button class="close-button" aria-label="Close menu" type="button" data-close>
          <span aria-hidden="true">&times;</span>
        </button>

        <ul class="vertical menu">
          <li class="main-nav-link"><a href="categories.html">Category 1</a></li>
          <li class="main-nav-link"><a href="#">Category 2</a></li>
          <li class="main-nav-link"><a href="why.html">Category 3</a></li>
          <li class="main-nav-link"><a href="build.html">Category 4</a></li>
          <li class="main-nav-link"><a href="#">Category 5</a></li>
        </ul>

        <hr>

        <!-- Menu -->
        <ul class="menu vertical">
          <li><a href="#">Help</a></li>
          <li><a href="#">Order Status</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">My Account</a></li>
        </ul>

      </div>

      <!-- NOTE: This is the header menu that appears at the top of your site. -->
      <div class="off-canvas-content" data-off-canvas-content>
        <div class="ecommerce-header-top show-for-large">
          <div class="row align-justify">
            <div class="ecommerce-header-top-message">
              Tagline Message Can Display Here
            </div>
            <div class="ecommerce-header-top-links">
              <ul>
                <li><a href="#">Help</a></li>
                <li><a href="#">Order Status</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">My Account</a></li>
                <li><a href="#" target="_blank"><i class="fa fa-shopping-cart"></i></a></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="ecommerce-header show-for-large">
          <div class="row align-justify align-middle">
            <div class="shrink column">
              <ul class="vertical medium-horizontal menu">
                <li><a href="#"><img class="logo" src="https://placehold.it/160x50"></a></li>
                <li class="main-nav-link"><a href="categories.html">Category 1</a></li>
                <li class="main-nav-link"><a href="#">Category 2</a></li>
                <li class="main-nav-link"><a href="why.html">Category 3</a></li>
                <li class="main-nav-link"><a href="build.html">Category 4</a></li>
                <li class="main-nav-link"><a href="#">Category 5</a></li>
              </ul>
            </div>
            <div class="shrink column">
              <ul class="menu">
                <li><input type="search" placeholder="Search"></li>
                <li><button type="button" class="button search-button"></button></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="ecommerce-header-mobile hide-for-large">
          <div class="ecommerce-header-mobile-left">
            <button class="menu-icon" type="button" data-toggle="ecommerce-header"></button>
            <form class="ecommerce-header-search-exandable">
              <input type="search" placeholder="Search">
            </form>
          </div>
          <div class="ecommerce-header-mobile-center">
            <a href="#"><img class="logo" src="https://placehold.it/130x30"></a>
          </div>
          <div class="ecommerce-header-mobile-right">
            <i class="fa fa-shopping-cart"></i>
          </div>
        </div>
      </div>
    </section>
    <section class="example">
      <div class="ecommerce-hero-slider-small orbit" role="region" aria-label="Favorite Space Pictures" data-orbit>
        <ul class="orbit-container">
          <button class="orbit-previous"><span class="show-for-sr">Previous Slide</span>&#9664;&#xFE0E;</button>
          <button class="orbit-next"><span class="show-for-sr">Next Slide</span>&#9654;&#xFE0E;</button>
          <li class="is-active orbit-slide">
            <div class="hero-slider-slide">
             <div class="row">
               <div class="small-12 medium-3 columns">
                 <img src="https://placehold.it/300x300"/>
               </div>
               <div class="small-12 medium-9 columns">
                <div class="hero-slider-slide-content">
                  <h3>Title Will Display Here</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo consectetur arcu ut aliquam. Nullam rhoncus tellus dolor, eu mollis libero suscipit at. Mauris imperdiet aliquam consectetur. Curabitur ac massa dapibus, viverra neque eu, lacinia nisi.<a href="#"> Learn More</a></p>
                  <div>
                    <button class="hollow button" type="button"><img src="https://placehold.it/20x20"/> Watch Video</button>
                  </div>
                </div>
              </div>
            </div>
           </div>
          </li>
          <li class="orbit-slide">
            <div class="hero-slider-slide">
             <div class="row">
               <div class="small-12 medium-3 columns">
                 <img src="https://placehold.it/300x300"/>
               </div>
               <div class="small-12 medium-9 columns">
                <div class="hero-slider-slide-content">
                  <h3>Title Will Display Here</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo consectetur arcu ut aliquam. Nullam rhoncus tellus dolor, eu mollis libero suscipit at. Mauris imperdiet aliquam consectetur. Curabitur ac massa dapibus, viverra neque eu, lacinia nisi.<a href="#"> Learn More</a></p>
                  <div>
                    <button class="hollow button" type="button"><img src="https://placehold.it/20x20"/> Watch Video</button>
                  </div>
                </div>
              </div>
            </div>
           </div>
          </li>
          <li class="orbit-slide">
            <div class="hero-slider-slide">
             <div class="row">
               <div class="small-12 medium-3 columns">
                 <img src="https://placehold.it/300x300"/>
               </div>
               <div class="small-12 medium-9 columns">
                <div class="hero-slider-slide-content">
                  <h3>Title Will Display Here</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo consectetur arcu ut aliquam. Nullam rhoncus tellus dolor, eu mollis libero suscipit at. Mauris imperdiet aliquam consectetur. Curabitur ac massa dapibus, viverra neque eu, lacinia nisi.<a href="#"> Learn More</a></p>
                  <div>
                    <button class="hollow button" type="button"><img src="https://placehold.it/20x20"/> Watch Video</button>
                  </div>
                </div>
              </div>
            </div>
           </div>
          </li>
        </ul>
        <nav class="orbit-bullets">
          <button class="is-active" data-slide="0"><span class="show-for-sr">First slide details.</span><span class="show-for-sr">Current Slide</span></button>
          <button data-slide="1"><span class="show-for-sr">Second slide details.</span></button>
          <button data-slide="2"><span class="show-for-sr">Third slide details.</span></button>
        </nav>
      </div>
    </section>
    <section class="example">
      <div class="product-card">
        <div class="product-card-thumbnail">
          <a href="#"><img src="https://placehold.it/180x180"/></a>
        </div>
        <h2 class="product-card-title"><a href="#">Product Name</a></h2>
        <span class="product-card-desc">Product Description</span>
        <span class="product-card-price">$9.99</span><span class="product-card-sale">$12.99</span>
        <div class="product-card-colors">
          <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
          <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
          <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
          <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
        </div>
      </div>
    </section>
    <section class="example">
      <div class="row align-center">
        <div class="product-details column medium-6 center-text-for-small-only">
          <h1>Product Name</h1>
          <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id magna ac quam semper.deta</p>
            <div class="row">
              <div class="column small-12 large-6">
                <h6 class="product-color-title">Colors</h6>
                  <form class="product-option-selection">
                    <input type="radio" name="radios" value="red" id="radio1" checked>
                    <label for="radio1" class=" dark-hollow expand"><img src="https://placehold.it/30x30"/></label>
                    <input type="radio" name="radios" value="blue" id="radio2">
                    <label for="radio2" class=" dark-hollow expand"><img src="https://placehold.it/30x30"/></label>
                    <input type="radio" name="radios" value="yellow" id="radio3">
                    <label for="radio3" class=" dark-hollow expand"><img src="https://placehold.it/30x30"/></label>
                    <input type="radio" name="radios" value="orange" id="radio4">
                    <label for="radio4" class=" dark-hollow expand"><img src="https://placehold.it/30x30"/></label>
                    <input type="radio" name="radios" value="green" id="radio5">
                    <label for="radio5" class=" dark-hollow expand"><img src="https://placehold.it/30x30"/></label>
                  </form>
              </div>
              <div class="column small-12 large-6">
                <h6 class="product-color-title">Size</h6>
                  <form class="product-option-selection">
                      <select>
                        <option value="husker">Small</option>
                        <option value="starbuck">Medium</option>
                        <option value="hotdog">Large</option>
                        <option value="apollo">X-Large</option>
                        <option value="apollo">XX-Large</option>
                      </select>
                    </label>
                  </form>
              </div>
            </div>
            <div class="product-details-add-to-cart">
              <p><span class="in-stock">In Stock</span> <span class="dim-text">(Only 3 left in Stock)</span></p>
              <hr>
              <p class="price">$19.99</p>
              <p> <span>Qty:</span> <input class="qty" type="text" value="1"> </p>
              <button class="button expanded">Add to Cart</button>
            </div>
            <p class="shipping">Available for Free Ground Shipping &amp; Return</p>
        </div>
      </div>
    </section>
    <section class="example">
      <div class="product-filters">
        <ul class="mobile-product-filters vertical menu show-for-small-only" data-accordion-menu>
         <li>
           <a href="#"><h2>Products</h2></a>
           <ul class="vertical menu" data-accordion-menu>
            <li class="product-filters-tab">
              <a href="#">Category</a>
              <ul class="categories-menu menu vertical nested is-active">
                 <a href="#" class="clear-all" id="category-clear-all">Clear All</a>
                 <li><input class="category-clear-selection" id="category-checkbox1" type="checkbox"><label for="category-checkbox1">Category 1</label></li>
                 <li><input class="category-clear-selection" id="category-checkbox2" type="checkbox"><label for="category-checkbox2">Category 2</label></li>
                 <li><input class="category-clear-selection" id="category-checkbox3" type="checkbox"><label for="category-checkbox3">Category 3</label></li>
                 <li><input class="category-clear-selection" id="category-checkbox4" type="checkbox"><label for="category-checkbox4">Category 4</label></li>
                 <li><input class="category-clear-selection" id="category-checkbox5" type="checkbox"><label for="category-checkbox5">Category 5</label></li>
                 <li><input class="category-clear-selection" id="category-checkbox6" type="checkbox"><label for="category-checkbox6">Category 6</label></li>
                 <li><input class="category-clear-selection" id="category-checkbox7" type="checkbox"><label for="category-checkbox7">Category 7</label></li>
                 <li><input class="category-clear-selection" id="category-checkbox8" type="checkbox"><label for="category-checkbox8">Category 8</label></li>
                 <li><input class="category-clear-selection" id="category-checkbox9" type="checkbox"><label for="category-checkbox9">Category 9</label></li>
                 <li><input class="category-clear-selection" id="category-checkbox10" type="checkbox"><label for="category-checkbox10">Category 10</label></li>
                 <li><input class="category-clear-selection" id="category-checkbox11" type="checkbox"><label for="category-checkbox11">Category 11</label></li>
                 <li><input class="category-clear-selection" id="category-checkbox12" type="checkbox"><label for="category-checkbox12">Category 12</label></li>
                 <li><input class="category-clear-selection" id="category-checkbox13" type="checkbox"><label for="category-checkbox13">Category 13</label></li>
                 <li><input class="category-clear-selection" id="category-checkbox14" type="checkbox"><label for="category-checkbox14">Category 14</label></li>
                 <li><input class="category-clear-selection" id="category-checkbox15" type="checkbox"><label for="category-checkbox15">Category 15</label></li>
               </ul>
           </li>
           <li class="product-filters-tab">
              <a href="#">Size</a>
              <ul class="categories-menu menu vertical nested is-active">
                <a href="#" class="clear-all" id="size-clear-all">Clear All</a>
                <li><input id="size-checkbox1" type="checkbox"><label for="size-checkbox1">Small</label></li>
                <li><input id="size-checkbox2" type="checkbox"><label for="size-checkbox2">Medium</label></li>
                <li><input id="size-checkbox3" type="checkbox"><label for="size-checkbox3">Large</label></li>
                <li><input id="size-checkbox3" type="checkbox"><label for="size-checkbox3">X-Large</label></li>
                <li><input id="size-checkbox3" type="checkbox"><label for="size-checkbox3">XX-Large</label></li>
              </ul>

            </li>
           <li class="product-filters-tab">
              <a href="#">Color</a>
              <ul class="categories-menu menu vertical nested">
                <a href="#" class="clear-all" id="color-clear-all">Clear All</a>
                <li><input id="color-checkbox1" type="checkbox"><label for="color-checkbox1">All Color</label></li>
                <li><input id="color-checkbox2" type="checkbox"><label for="color-checkbox2">Black</label></li>
                <li><input id="color-checkbox3" type="checkbox"><label for="color-checkbox3">White</label></li>
                <li><input id="color-checkbox4" type="checkbox"><label for="color-checkbox4">Grey</label></li>
                <li><input id="color-checkbox5" type="checkbox"><label for="color-checkbox5">Red</label></li>
                <li><input id="color-checkbox6" type="checkbox"><label for="color-checkbox6">Blue</label></li>
                <li><input id="color-checkbox7" type="checkbox"><label for="color-checkbox7">Green</label></li>
                <li><input id="color-checkbox8" type="checkbox"><label for="color-checkbox8">Purple</label></li>
                <li><input id="color-checkbox8" type="checkbox"><label for="color-checkbox8">Multi-color</label></li>
              </ul>
            </li>
           <li class="product-filters-tab">
              <a href="#">Price</a>
              <ul class="categories-menu menu vertical nested">
                <a href="#" class="clear-all" id="price-clear-all">Clear All</a>
                <li><input id="price-checkbox1" type="checkbox"><label for="price-checkbox1">Under $25</label></li>
                <li><input id="price-checkbox2" type="checkbox"><label for="price-checkbox2">$25–$50</label></li>
                <li><input id="price-checkbox3" type="checkbox"><label for="price-checkbox3">$50–$250</label></li>
                <li><input id="price-checkbox4" type="checkbox"><label for="price-checkbox4">$250–$600</label></li>
                <li><input id="price-checkbox4" type="checkbox"><label for="price-checkbox4">$600–$1,000</label></li>
              </ul>
            </li>
           </ul>
         </li>
       </ul>

       <h1 class="product-filters-header hide-for-small-only">Products</h1>
       <ul class="vertical menu hide-for-small-only" data-accordion-menu>
          <li class="product-filters-tab">
            <a href="#">Category</a>
            <ul class="categories-menu menu vertical nested is-active">
               <a href="#" class="clear-all" id="category-clear-all">Clear All</a>
               <li><input id="category-checkbox1" type="checkbox"><label for="category-checkbox1">Category 1</label></li>
               <li><input id="category-checkbox2" type="checkbox"><label for="category-checkbox2">Category 2</label></li>
               <li><input id="category-checkbox3" type="checkbox"><label for="category-checkbox3">Category 3</label></li>
               <li><input id="category-checkbox4" type="checkbox"><label for="category-checkbox4">Category 4</label></li>
               <li><input id="category-checkbox5" type="checkbox"><label for="category-checkbox5">Category 5</label></li>
               <li><input id="category-checkbox6" type="checkbox"><label for="category-checkbox6">Category 6</label></li>
               <li><input id="category-checkbox7" type="checkbox"><label for="category-checkbox7">Category 7</label></li>
               <li><input id="category-checkbox8" type="checkbox"><label for="category-checkbox8">Category 8</label></li>
               <li><input id="category-checkbox9" type="checkbox"><label for="category-checkbox9">Category 9</label></li>
               <li><input id="category-checkbox10" type="checkbox"><label for="category-checkbox10">Category 10</label></li>
               <li><input id="category-checkbox11" type="checkbox"><label for="category-checkbox11">Category 11</label></li>
               <li><input id="category-checkbox12" type="checkbox"><label for="category-checkbox12">Category 12</label></li>
               <li><input id="category-checkbox13" type="checkbox"><label for="category-checkbox13">Category 13</label></li>
               <li><input id="category-checkbox14" type="checkbox"><label for="category-checkbox14">Category 14</label></li>
               <li><input id="category-checkbox15" type="checkbox"><label for="category-checkbox15">Category 15</label></li>
            </ul>
         </li>
         <li class="product-filters-tab">
            <a href="#">Size</a>
            <ul class="categories-menu menu vertical nested is-active">
              <a href="#" class="clear-all" id="size-clear-all">Clear All</a>
              <li><input id="size-checkbox1" type="checkbox"><label for="size-checkbox1">Small</label></li>
              <li><input id="size-checkbox2" type="checkbox"><label for="size-checkbox2">Medium</label></li>
              <li><input id="size-checkbox3" type="checkbox"><label for="size-checkbox3">Large</label></li>
              <li><input id="size-checkbox3" type="checkbox"><label for="size-checkbox3">X-Large</label></li>
              <li><input id="size-checkbox3" type="checkbox"><label for="size-checkbox3">XX-Large</label></li>
            </ul>
         </li>
         <li class="product-filters-tab">
            <a href="#">Color</a>
            <ul class="categories-menu menu vertical nested">
              <a href="#" class="clear-all" id="color-clear-all">Clear All</a>
              <li><input id="color-checkbox1" type="checkbox"><label for="color-checkbox1">All Color</label></li>
              <li><input id="color-checkbox2" type="checkbox"><label for="color-checkbox2">Black</label></li>
              <li><input id="color-checkbox3" type="checkbox"><label for="color-checkbox3">White</label></li>
              <li><input id="color-checkbox4" type="checkbox"><label for="color-checkbox4">Grey</label></li>
              <li><input id="color-checkbox5" type="checkbox"><label for="color-checkbox5">Red</label></li>
              <li><input id="color-checkbox6" type="checkbox"><label for="color-checkbox6">Blue</label></li>
              <li><input id="color-checkbox7" type="checkbox"><label for="color-checkbox7">Green</label></li>
              <li><input id="color-checkbox8" type="checkbox"><label for="color-checkbox8">Purple</label></li>
              <li><input id="color-checkbox8" type="checkbox"><label for="color-checkbox8">Multi-color</label></li>
            </ul>
         </li>
         <li class="product-filters-tab">
            <a href="#">Price</a>
            <ul class="categories-menu menu vertical nested">
              <a href="#" class="clear-all" id="price-clear-all">Clear All</a>
              <li><input id="price-checkbox1" type="checkbox"><label for="price-checkbox1">Under $25</label></li>
              <li><input id="price-checkbox2" type="checkbox"><label for="price-checkbox2">$25–$50</label></li>
              <li><input id="price-checkbox3" type="checkbox"><label for="price-checkbox3">$50–$250</label></li>
              <li><input id="price-checkbox4" type="checkbox"><label for="price-checkbox4">$250–$600</label></li>
              <li><input id="price-checkbox4" type="checkbox"><label for="price-checkbox4">$600–$1,000</label></li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
    <section class="example">
      <div class="ecommerce-product-slider orbit" role="region" aria-label="Favorite Space Pictures" data-orbit>
        <ul class="orbit-container">
          <button class="orbit-previous"><span class="show-for-sr">Previous Slide</span>&#9664;&#xFE0E;</button>
          <button class="orbit-next"><span class="show-for-sr">Next Slide</span>&#9654;&#xFE0E;</button>
          <li class="is-active orbit-slide">
            <div class="row small-up-2 medium-up-4 large-up-5 align-center">
              <div class="column">
                <div class="product-card">
                  <div class="product-card-thumbnail">
                    <a href="#"><img src="https://placehold.it/180x180"/></a>
                  </div>
                  <h2 class="product-card-title"><a href="#">Product Name</a></h2>
                  <span class="product-card-desc">Product Description</span>
                  <span class="product-card-price">$9.99</span><span class="product-card-sale">$12.99</span>
                  <div class="product-card-colors">
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="product-card">
                  <div class="product-card-thumbnail">
                    <a href="#"><img src="https://placehold.it/180x180"/></a>
                  </div>
                  <h2 class="product-card-title"><a href="#">Product Name</a></h2>
                  <span class="product-card-desc">Product Description</span>
                  <span class="product-card-price">$9.99</span><span class="product-card-sale">$12.99</span>
                  <div class="product-card-colors">
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                  </div>
                </div>
              </div>
              <div class="column hide-for-small-only">
                <div class="product-card">
                  <div class="product-card-thumbnail">
                    <a href="#"><img src="https://placehold.it/180x180"/></a>
                  </div>
                  <h2 class="product-card-title"><a href="#">Product Name</a></h2>
                  <span class="product-card-desc">Product Description</span>
                  <span class="product-card-price">$9.99</span><span class="product-card-sale">$12.99</span>
                  <div class="product-card-colors">
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                  </div>
                </div>
              </div>
              <div class="column show-for-large">
                <div class="product-card">
                  <div class="product-card-thumbnail">
                    <a href="#"><img src="https://placehold.it/180x180"/></a>
                  </div>
                  <h2 class="product-card-title"><a href="#">Product Name</a></h2>
                  <span class="product-card-desc">Product Description</span>
                  <span class="product-card-price">$9.99</span><span class="product-card-sale">$12.99</span>
                  <div class="product-card-colors">
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                  </div>
                </div>
              </div>
              <div class="column show-for-large">
                <div class="product-card">
                  <div class="product-card-thumbnail">
                    <a href="#"><img src="https://placehold.it/180x180"/></a>
                  </div>
                  <h2 class="product-card-title"><a href="#">Product Name</a></h2>
                  <span class="product-card-desc">Product Description</span>
                  <span class="product-card-price">$9.99</span><span class="product-card-sale">$12.99</span>
                  <div class="product-card-colors">
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="is-active orbit-slide">
            <div class="row small-up-2 medium-up-4 large-up-5 align-center">
              <div class="column">
                <div class="product-card">
                  <div class="product-card-thumbnail">
                    <a href="#"><img src="https://placehold.it/180x180"/></a>
                  </div>
                  <h2 class="product-card-title"><a href="#">Product Name</a></h2>
                  <span class="product-card-desc">Product Description</span>
                  <span class="product-card-price">$9.99</span><span class="product-card-sale">$12.99</span>
                  <div class="product-card-colors">
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="product-card">
                  <div class="product-card-thumbnail">
                    <a href="#"><img src="https://placehold.it/180x180"/></a>
                  </div>
                  <h2 class="product-card-title"><a href="#">Product Name</a></h2>
                  <span class="product-card-desc">Product Description</span>
                  <span class="product-card-price">$9.99</span><span class="product-card-sale">$12.99</span>
                  <div class="product-card-colors">
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                  </div>
                </div>
              </div>
              <div class="column hide-for-small-only">
                <div class="product-card">
                  <div class="product-card-thumbnail">
                    <a href="#"><img src="https://placehold.it/180x180"/></a>
                  </div>
                  <h2 class="product-card-title"><a href="#">Product Name</a></h2>
                  <span class="product-card-desc">Product Description</span>
                  <span class="product-card-price">$9.99</span><span class="product-card-sale">$12.99</span>
                  <div class="product-card-colors">
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                  </div>
                </div>
              </div>
              <div class="column show-for-large">
                <div class="product-card">
                  <div class="product-card-thumbnail">
                    <a href="#"><img src="https://placehold.it/180x180"/></a>
                  </div>
                  <h2 class="product-card-title"><a href="#">Product Name</a></h2>
                  <span class="product-card-desc">Product Description</span>
                  <span class="product-card-price">$9.99</span><span class="product-card-sale">$12.99</span>
                  <div class="product-card-colors">
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                  </div>
                </div>
              </div>
              <div class="column show-for-large">
                <div class="product-card">
                  <div class="product-card-thumbnail">
                    <a href="#"><img src="https://placehold.it/180x180"/></a>
                  </div>
                  <h2 class="product-card-title"><a href="#">Product Name</a></h2>
                  <span class="product-card-desc">Product Description</span>
                  <span class="product-card-price">$9.99</span><span class="product-card-sale">$12.99</span>
                  <div class="product-card-colors">
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                    <button href="#" class="product-card-color-option"><img src="https://placehold.it/30x30"/></button>
                  </div>
                </div>
              </div>
            </div>
          </li>
       </ul>
        <nav class="orbit-bullets">
          <button class="is-active" data-slide="0"><span class="show-for-sr">First slide details.</span><span class="show-for-sr">Current Slide</span></button>
          <button data-slide="1"><span class="show-for-sr">Second slide details.</span></button>
        </nav>
      </div>
    </section>
    <section class="example">
      <div class="promo-hero promo-hero-bg-image">
        <div class="promo-hero-content">
          <h1 class="promo-hero-title">Promo Headline Will Display Here</h1>
          <p class="promo-hero-description hide-for-small-only">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tortor ante, varius eget lacinia porta, faucibus ut eros. Donec quis dui id felis pharetra fermentum.</p>
          <div class="promo-hero-ctas">
            <a href="#" class="promo-section-cta button primary">Shop Now</a>
            <a href="#" class="promo-section-cta button white-hollow">Learn More</a>
          </div>
        </div>
      </div>
    </section>
    <section class="example">
      <div class="multi-step-checkout-process">
        <div class="multi-step-checkout-process-step">
          <ul class="accordion" data-accordion>
            <li class="accordion-item is-active" data-accordion-item>
              <a href="#" class="accordion-title">1. Shipping <span class="multi-step-checkout-step-title-subheader">Step 1 of 3</span></a>
              <div class="accordion-content" data-tab-content>
                <form class="multi-step-checkout-form">
                  <div class="row">
                    <div class="small-12 medium-9 column">
                      <div class="shipping-address multi-step-checkout-step-section">
                        <h6 class="multi-step-checkout-step-subheader">Shipping Address</h6>
                        <p class="multi-step-checkout-step-subdesc">Please enter your shipping address. Only USPS ships to APO, FPO, or PO Boxes. <a href="#" class="text-link">Shipping Rates and Delivery Times</a></p>

                        <label>
                          <input type="text" placeholder="First Name" required >
                          <input type="text" placeholder="Last Name" required >
                          <input type="text" placeholder="Address" required >
                          <div class="row">
                            <div class="small-12 medium-7 column">
                              <input type="text" placeholder="City" required >
                            </div>
                            <div class="small-6 medium-2 column">
                              <select required >
                                <option value="state1">AL</option>
                                <option value="state2">AK</option>
                                <option value="state3">AZ</option>
                                <option value="state4">AR</option>
                                <option value="state5">CA</option>
                              </select>
                            </div>
                            <div class="small-6 medium-3 column">
                              <input type="text" placeholder="ZIP" required >
                            </div>
                          </div>

                          <div><hr class="multi-step-checkout-form-divider"></div>
                          <input type="text" placeholder="Email" required >
                          <input type="text" placeholder="Phone" required >
                        </label>
                      </div>
                      <div class="multi-step-checkout-shipping-options multi-step-checkout-step-section">
                        <h6 class="multi-step-checkout-step-subheader">Shipping Options</h6>

                        <div class="row multi-step-checkout-shipping-option">
                          <label>
                            <div class="small-10 column">
                              <input type="radio" name="multi-step-checkout-shipping-option" value="ups-ground-shipping" class="multi-step-checkout-shipping-option-selection" checked="checked"> <span class="multi-step-checkout-shipping-option-title">UPS Ground (4–5 business days) - Recommended</span>
                              <div class="multi-step-checkout-shipping-option-desc">Same-day shipping of in-stock items for orders placed before 3pm EST. Realtime tracking included.</div>
                            </div>
                            <div class="small-2 column multi-step-checkout-shipping-cost">
                              $25.00
                            </div>
                          </label>
                        </div>

                        <div class="row multi-step-checkout-shipping-option">
                          <label>
                            <div class="small-10 column">
                              <input type="radio" name="multi-step-checkout-shipping-option" value="usps-shipping" class="multi-step-checkout-shipping-option-selection"><span class="multi-step-checkout-shipping-option-title">USPS  (6–12 business days)</span>
                              <div class="multi-step-checkout-shipping-option-desc">Tracking is available after 48 hours.</div>
                            </div>
                            <div class="small-2 column multi-step-checkout-shipping-cost">
                              $15.00
                            </div>
                          </label>
                        </div>

                      </div>
                      <div class="multi-step-checkout-enews-sign-up">
                        <fieldset>
                          <input class="multi-step-checkout-enews-sign-up-checkbox" id="multi-step-checkout-enews-sign-up-checkbox" type="checkbox">
                          <label for="#multi-step-checkout-enews-sign-up-checkbox">Please add me to your eNewsletter list so I can receive special promotions and product updates.</label>
                        </fieldset>
                      </div>
                      <button class="primary button expanded">Continue to Payment</button>
                    </div>
                  </div>
                </form>
              </div>
            </li>

            <li class="accordion-item" data-accordion-item>
              <a href="#" class="accordion-title">2. Payment <span class="multi-step-checkout-step-title-subheader">Step 2 of 3</span></a>
              <div class="accordion-content" data-tab-content>
                <form class="multi-step-checkout-form">
                  <div class="row">
                    <div class="small-12 medium-9 column">
                      <div class="multi-step-checkout-billing-address">
                        <fieldset>
                          <input class="multi-step-checkout-billing-address-checkbox" id="multi-step-checkout-billing-address-checkbox" type="checkbox" checked><label for="multi-step-checkout-billing-address-checkbox">My Billing Address is the same as my Shipping Address.</label>
                        </fieldset>
                        <ul class="multi-step-checkout-billing-address-list">
                          <li class="multi-step-checkout-billing-name">John Smith</li>
                          <li class="multi-step-checkout-billing-street">123 Market St.</li>
                          <li class="multi-step-checkout-billing-city-state">San Francisco, CA 94134</li>
                        </ul>
                      </div>
                      <div><hr class="multi-step-checkout-form-divider"></div>

                      <div class="multi-step-checkout-credit-card-info">
                        <h6 class="multi-step-checkout-step-subheader">Credit Card</h6>
                        <ul class="multi-step-checkout-payment-icons">
                          <li><img class="multi-step-checkout-payment-icon" src="https://placehold.it/50x50"/></li>
                          <li><img class="multi-step-checkout-payment-icon" src="https://placehold.it/50x50"/></li>
                          <li><img class="multi-step-checkout-payment-icon" src="https://placehold.it/50x50"/></li>
                          <li><img class="multi-step-checkout-payment-icon" src="https://placehold.it/50x50"/></li>
                        </ul>

                        <input type="text" placeholder="Card Name" required >
                        <input type="text" placeholder="Card Number" required >
                        <div class="row">
                          <div class="small-4 column">
                            <select required >
                              <option value="january">01</option>
                              <option value="february">02</option>
                              <option value="march">03</option>
                              <option value="april">04</option>
                            </select>
                          </div>
                          <div class="small-4 column">
                            <select required >
                              <option value="year1">2019</option>
                              <option value="year2">2018</option>
                              <option value="year3">2017</option>
                              <option value="year4">2016</option>
                            </select>
                          </div>
                          <div class="small-4 column">
                            <input type="text" placeholder="CVV" required >
                          </div>
                        </div>

                        <div><hr class="multi-step-checkout-form-divider"></div>

                        <label for="apply-gift-card-code"> Gift Card <span>(optional)</span>
                          <div class="input-group gift-card">
                             <input class="input-group-field" type="text" placeholder="Code">
                               <div class="input-group-button" placeholder="$">

                                <input type="submit" class="button primary" value="Apply" id="apply-gift-card-code">
                              </div>
                          </div>
                        </label>

                        <div><hr class="multi-step-checkout-form-divider"></div>

                        <button class="primary button expanded">Continue to Review Order</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </li>

            <li class="accordion-item" data-accordion-item>
              <a href="#" class="accordion-title">3. Review Order <span class="multi-step-checkout-step-title-subheader">Step 3 of 3</span></a>
              <div class="accordion-content" data-tab-content>
               <hr class="show-for-small-only order-table-divider">
                <table class="order-table-content stack">
                  <thead>
                    <tr>
                      <th width="120">Order</th>
                      <th width="350"></th>
                      <th width="80">Quantity</th>
                      <th width="100">Price Each</th>
                      <th width="60">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="order-item">
                      <td><img class="order-product-image" src="https://placehold.it/100x100"/></td>
                      <td><span class="order-product-title">Product 1</span> <span class="order-product-vendor">Vendor 1</span>
                        <ul class="order-product-info">
                          <li>In Stock</li>
                          <li>Product SKU: 12345</li>
                          <li>A great Product</li>
                          <li>Details: You won't be sad</li>
                        </ul>
                      </td>
                      <td><span class="show-for-small-only">Qty:</span> 1</td>
                      <td><span class="show-for-small-only">Price Each: </span><span class="order-product-price">$25.00</span>
                      <span class="show-for-small-only">,</span>
                      <br class="hide-for-small-only">
                      <span class="order-product-price-saving">
                        You save:
                        <br class="hide-for-small-only">
                        $2.08 (5%)
                      </span>
                      </td>
                      <td><span class="show-for-small-only">Total: </span><span class="order-product-total">$25.00</span></td>
                    </tr>
                    <tr class="order-item">
                      <td><img class="order-product-image" src="https://placehold.it/100x100"/></td>
                      <td><span class="order-product-title">Product 2</span> <span class="order-product-vendor">Vendor 1</span>
                      <ul class="order-product-info">
                        <li>In Stock</li>
                        <li>Product SKU: 12345</li>
                        <li>A great Product</li>
                        <li>Details: You won't be sad</li>
                      </ul>
                      </td>
                      <td><span class="show-for-small-only">Qty:</span> 1</td>
                      <td><span class="show-for-small-only">Price Each: </span><span class="order-product-price">$25.00</span>
                      <span class="show-for-small-only">,</span>
                      <br class="hide-for-small-only">
                      <span class="order-product-price-saving">
                        You save:
                        <br class="hide-for-small-only">
                        $2.08 (5%)
                      </span>
                      </td>
                      <td><span class="show-for-small-only">Total: </span><span class="order-product-total">$25.00</span></td>
                    </tr>
                    <tr class="order-item">
                      <td><img class="order-product-image" src="https://placehold.it/100x100"/></td>
                      <td><span class="order-product-title">Product 3</span> <span class="order-product-vendor">Vendor 1</span>
                        <ul class="order-product-info">
                          <li>In Stock</li>
                          <li>Product SKU: 12345</li>
                          <li>A great Product</li>
                          <li>Details: You won't be sad</li>
                        </ul>
                      </td>
                      <td><span class="show-for-small-only">Qty:</span> 1</td>
                      <td><span class="show-for-small-only">Price Each: </span><span class="order-product-price">$25.00</span>
                      <span class="show-for-small-only">,</span>
                      <br class="hide-for-small-only">
                      <span class="order-product-price-saving">
                        You save:
                        <br class="hide-for-small-only">
                        $2.08 (5%)
                      </span>
                      </td>
                      <td><span class="show-for-small-only">Total: </span><span class="order-product-total">$25.00</span></td>
                    </tr>
                  </tbody>
                </table>
                <div class="">
                  <div class="row">
                    <div class="small-12 medium-9 column multi-step-checkout-create-account">
                      <h6 class="multi-step-checkout-step-subheader">Create an Account <span>(optional)</span></h6>
                      <p class="create-account-desc">Save and review your orders in your account.</p>
                      <form>
                        <div class="row">
                          <div class="small-12 medium-6 column">
                            <input type="text" placeholder="Password">
                          </div>
                          <div class="small-12 medium-6 column">
                            <input type="text" placeholder="Confirm Password">
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div><hr class="multi-step-checkout-form-divider"></div>

                  <form>
                    <label for="">Comments
                      <textarea name="" id="" cols="30" rows="2"></textarea>
                    </label>
                    <button class="primary button expanded">Submit Order</button>
                  </form>
                </div>

              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="example">
      <!-- Change the `data-field` of buttons and `name` of input field's for multiple plus minus buttons-->
      <div class="input-group plus-minus-input">
        <div class="input-group-button">
          <button type="button" class="button hollow circle" data-quantity="minus" data-field="quantity">
            <i class="fa fa-minus" aria-hidden="true"></i>
          </button>
        </div>
        <input class="input-group-field" type="number" name="quantity" value="0">
        <div class="input-group-button">
          <button type="button" class="button hollow circle" data-quantity="plus" data-field="quantity">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </section>
    <section class="example">
      <ul class="pricing-table">
        <li class="title">Enterprise</li>
        <li class="price">$99.99</li>
        <li class="description">An awesome description</li>
        <li>42 Rad Features</li>
        <li>7GB of Power</li>
        <li><a class="button" href="#">Buy Now</a></li>
      </ul>
    </section>
    <section class="example">
      <section class="product-feature-section">
        <div class="product-feature-section-outer">
          <h4 class="product-feature-section-headline">Yeti Sightings Increase After Unclosed &lt;div&gt; Tag Scare</h4>

          <div class="product-feature-section-inner">

            <div class="product-feature-section-feature top-left">
              <i class="fa fa-shield" aria-hidden="true"></i>
              <div>
                <p class="feature-title">Thick Fur Coat</p>
                <p class="feature-desc">Can withstand extreme cold</p>
              </div>
            </div>

            <div class="product-feature-section-feature top-right">
              <i class="fa fa-heart" aria-hidden="true"></i>
              <div>
                <p class="feature-title">Super Loveable</p>
                <p class="feature-desc">Great at code and hugs</p>
              </div>
            </div>

            <div class="product-feature-section-feature bottom-left">
              <i class="fa fa-coffee" aria-hidden="true"></i>
              <div>
                <p class="feature-title">Cave Expert</p>
                <p class="feature-desc">Makes any hole a home</p>
              </div>
            </div>

            <div class="product-feature-section-feature bottom-right">
              <i class="fa fa-map-marker" aria-hidden="true"></i>
              <div>
                <p class="feature-title">Abominable Snowman</p>
                <p class="feature-desc">Hails from the Himalayans</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </section>
    <section class="example">
      <div class="promotion-hero">
          <div class="promotion-hero-header">
            <h1>50% off all items!</h1>
          </div>

          <div class="promotion-hero-links">
            <ul class="vertical menu promotion-hero-link-menu">
              <li><a href="#">Link 1</a></li>
              <li><a href="#">Link 2</a></li>
              <li><a href="#">Link 3</a></li>
              <li><a href="#">Link 4</a></li>
            </ul>
            <ul class="vertical menu promotion-hero-link-menu">
              <li><a href="#">Link 1</a></li>
              <li><a href="#">Link 2</a></li>
              <li><a href="#">Link 3</a></li>
              <li><a href="#">Link 4</a></li>
            </ul>
            <ul class="vertical menu promotion-hero-link-menu">
              <li><a href="#">Link 1</a></li>
              <li><a href="#">Link 2</a></li>
              <li><a href="#">Link 3</a></li>
              <li><a href="#">Link 4</a></li>
            </ul>
            <ul class="vertical menu promotion-hero-link-menu">
              <li><a href="#">Link 1</a></li>
              <li><a href="#">Link 2</a></li>
              <li><a href="#">Link 3</a></li>
              <li><a href="#">Link 4</a></li>
            </ul>
            <ul class="vertical menu promotion-hero-link-menu">
              <li><a href="#">Link 1</a></li>
              <li><a href="#">Link 2</a></li>
              <li><a href="#">Link 3</a></li>
              <li><a href="#">Link 4</a></li>
            </ul>
          </div>
        </div>
    </section>
    <section class="example">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet">

      <button type="button" class="shopping-cart-button float-right" data-toggle="shopping-cart-dropdown">
        <i class="fa fa-shopping-cart"></i>
        <span class="text">Shopping Cart (3)</span>
      </button>
      <div class="shopping-cart-dropdown-pane">
        <div class="dropdown-pane bottom " id="shopping-cart-dropdown" data-dropdown data-hover="true" data-hover-pane="true">
          <div class="shopping-cart-item">
            <img src="https://placeimg.com/60/80/any">
            <div class="shopping-cart-item-name">
              <a>Style & Co Knit Blazer</a>
              <p><span class="shopping-cart-title">Color: </span>Blue</p>
              <p><span class="shopping-cart-title">Size: </span>M</p>
            </div>
            <div class="shopping-cart-item-price">
              <p class="shopping-cart-title">$24.99</p>
              <a href="#">Remove</a>
            </div>
          </div>

          <div class="shopping-cart-item">
            <img src="https://placeimg.com/60/80/any">
            <div class="shopping-cart-item-name">
              <a>Style & Co Knit Blazer</a>
              <p><span class="shopping-cart-title">Color: </span>Blue</p>
              <p><span class="shopping-cart-title">Size: </span>M</p>
            </div>
            <div class="shopping-cart-item-price">
              <p class="shopping-cart-title">$24.99</p>
              <a href="#">Remove</a>
            </div>
          </div>

          <div class="shopping-cart-item">
            <img src="https://placeimg.com/60/80/any">
            <div class="shopping-cart-item-name">
              <a>Style & Co Knit Blazer</a>
              <p><span class="shopping-cart-title">Color: </span>Blue</p>
              <p><span class="shopping-cart-title">Size: </span>M</p>
            </div>
            <div class="shopping-cart-item-price">
              <p class="shopping-cart-title">$24.99</p>
              <a href="#">Remove</a>
            </div>
          </div>

          <a href="#" class="button shopping-cart-checkout expanded">Checkout</a>

        </div>
      </div>
    </section>
    <section class="example">

    </section>
  </div>
</template>

<script>
export default {
}
</script>
