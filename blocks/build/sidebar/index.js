/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************************!*\
  !*** ./blocks/src/sidebar/index.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


(function (wp) {
  const {
    __
  } = wp.i18n;
  const {
    registerPlugin
  } = wp.plugins;
  const {
    PluginDocumentSettingPanel
  } = wp.editPost;
  const {
    Component
  } = wp.element;
  const {
    Spinner,
    CheckboxControl
  } = wp.components;
  const {
    withSelect,
    withDispatch
  } = wp.data;
  const {
    compose
  } = wp.compose;
  const RestrictionSelectControl = compose(withDispatch(function (dispatch, props) {
    return {
      setMetaValue: function (value) {
        dispatch('core/editor').editPost({
          meta: {
            [props.metaKey]: value
          }
        });
      }
    };
  }), withSelect(function (select, props) {
    return {
      metaValue: select('core/editor').getEditedPostAttribute('meta')[props.metaKey]
    };
  }))(function (props) {
    const product_checkboxes = props.products.map(product => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
        key: product.id,
        label: product.name,
        checked: props.metaValue.includes(product.id),
        onChange: () => {
          let newValue = [...props.metaValue];

          if (newValue.includes(product.id)) {
            newValue = newValue.filter(item => item !== product.id);
          } else {
            newValue.push(product.id);
          }

          props.setMetaValue(newValue);
        }
      });
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("fragment", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, __('Select products to restrict by:', 'restrict-with-stripe')), product_checkboxes);
  });

  class RWStripeSidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        productList: [],
        loadingProducts: true
      };
    }

    componentDidMount() {
      this.fetchProducts();
    }

    fetchProducts() {
      wp.apiFetch({
        path: 'rwstripe/v1/products'
      }).then(data => {
        this.setState({
          productList: data,
          loadingProducts: false
        });
      }).catch(error => {
        this.setState({
          productList: error.message,
          loadingProducts: false
        });
      });
    }

    render() {
      var sidebar_content = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Spinner, null);

      if (!this.state.loadingProducts) {
        if (!Array.isArray(this.state.productList)) {
          sidebar_content = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, __('Could not connect to Stripe. Please check your Stripe connection on the Restrict With Stripe settings page.', 'restrict-with-stripe'));
        } else if (this.state.productList.length === 0) {
          sidebar_content = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, __('No products found. Please create a product in Stripe.', 'restrict-with-stripe'));
        } else {
          sidebar_content = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RestrictionSelectControl, {
            label: __('Stripe Product', 'restrict-with-stripe'),
            metaKey: 'rwstripe_stripe_product_ids',
            products: this.state.productList
          });
        }
      }

      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PluginDocumentSettingPanel, {
        name: "rwstripe-sidebar-panel",
        title: __('Restrict With Stripe', 'restrict-with-stripe')
      }, sidebar_content);
    }

  }

  registerPlugin('rwstripe-sidebar', {
    icon: 'lock',
    render: RWStripeSidebar
  });
})(window.wp);
})();

/******/ })()
;
//# sourceMappingURL=index.js.map