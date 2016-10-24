/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _chart = __webpack_require__(1);

	var _chart2 = _interopRequireDefault(_chart);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 * @Author: JerryC (huangjerryc@gmail.com)
	 * @Date: 2016-10-24 15:09:42
	 * @Last Modified by: JerryC
	 * @Last Modified time: 2016-10-24 17:17:10
	 * @Description
	 */

	// css
	__webpack_require__(151);

	// ChartJS


	var ctx = document.getElementById("myChart");
	var myChart = new _chart2.default(ctx, {
	  type: 'line',
	  data: {
	    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
	    datasets: [{
	      label: '# of Votes',
	      data: [12, 19, 3, 5, 2, 3],
	      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
	      borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
	      borderWidth: 1
	    }]
	  },
	  options: {
	    scales: {
	      yAxes: [{
	        ticks: {
	          beginAtZero: true
	        }
	      }]
	    }
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @namespace Chart
	 */
	var Chart = __webpack_require__(2)();

	__webpack_require__(3)(Chart);
	__webpack_require__(9)(Chart);
	__webpack_require__(10)(Chart);
	__webpack_require__(11)(Chart);
	__webpack_require__(12)(Chart);
	__webpack_require__(13)(Chart);
	__webpack_require__(14)(Chart);
	__webpack_require__(15)(Chart);
	__webpack_require__(16)(Chart);
	__webpack_require__(17)(Chart);
	__webpack_require__(18)(Chart);
	__webpack_require__(19)(Chart);
	__webpack_require__(20)(Chart);

	__webpack_require__(21)(Chart);
	__webpack_require__(22)(Chart);
	__webpack_require__(23)(Chart);
	__webpack_require__(24)(Chart);

	__webpack_require__(25)(Chart);
	__webpack_require__(26)(Chart);
	__webpack_require__(27)(Chart);
	__webpack_require__(28)(Chart);
	__webpack_require__(29)(Chart);
	__webpack_require__(30)(Chart);

	// Controllers must be loaded after elements
	// See Chart.core.datasetController.dataElementType
	__webpack_require__(138)(Chart);
	__webpack_require__(139)(Chart);
	__webpack_require__(140)(Chart);
	__webpack_require__(141)(Chart);
	__webpack_require__(142)(Chart);
	__webpack_require__(143)(Chart);

	__webpack_require__(144)(Chart);
	__webpack_require__(145)(Chart);
	__webpack_require__(146)(Chart);
	__webpack_require__(147)(Chart);
	__webpack_require__(148)(Chart);
	__webpack_require__(149)(Chart);
	__webpack_require__(150)(Chart);

	window.Chart = module.exports = Chart;


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function() {

		// Occupy the global variable of Chart, and create a simple base class
		var Chart = function(context, config) {
			var me = this;
			var helpers = Chart.helpers;
			me.config = config || {
				data: {
					datasets: []
				}
			};

			// Support a jQuery'd canvas element
			if (context.length && context[0].getContext) {
				context = context[0];
			}

			// Support a canvas domnode
			if (context.getContext) {
				context = context.getContext('2d');
			}

			me.ctx = context;
			me.canvas = context.canvas;

			context.canvas.style.display = context.canvas.style.display || 'block';

			// Figure out what the size of the chart will be.
			// If the canvas has a specified width and height, we use those else
			// we look to see if the canvas node has a CSS width and height.
			// If there is still no height, fill the parent container
			me.width = context.canvas.width || parseInt(helpers.getStyle(context.canvas, 'width'), 10) || helpers.getMaximumWidth(context.canvas);
			me.height = context.canvas.height || parseInt(helpers.getStyle(context.canvas, 'height'), 10) || helpers.getMaximumHeight(context.canvas);

			me.aspectRatio = me.width / me.height;

			if (isNaN(me.aspectRatio) || isFinite(me.aspectRatio) === false) {
				// If the canvas has no size, try and figure out what the aspect ratio will be.
				// Some charts prefer square canvases (pie, radar, etc). If that is specified, use that
				// else use the canvas default ratio of 2
				me.aspectRatio = config.aspectRatio !== undefined ? config.aspectRatio : 2;
			}

			// Store the original style of the element so we can set it back
			me.originalCanvasStyleWidth = context.canvas.style.width;
			me.originalCanvasStyleHeight = context.canvas.style.height;

			// High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
			helpers.retinaScale(me);
			me.controller = new Chart.Controller(me);

			// Always bind this so that if the responsive state changes we still work
			helpers.addResizeListener(context.canvas.parentNode, function() {
				if (me.controller && me.controller.config.options.responsive) {
					me.controller.resize();
				}
			});

			return me.controller ? me.controller : me;

		};

		// Globally expose the defaults to allow for user updating/changing
		Chart.defaults = {
			global: {
				responsive: true,
				responsiveAnimationDuration: 0,
				maintainAspectRatio: true,
				events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
				hover: {
					onHover: null,
					mode: 'single',
					animationDuration: 400
				},
				onClick: null,
				defaultColor: 'rgba(0,0,0,0.1)',
				defaultFontColor: '#666',
				defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
				defaultFontSize: 12,
				defaultFontStyle: 'normal',
				showLines: true,

				// Element defaults defined in element extensions
				elements: {},

				// Legend callback string
				legendCallback: function(chart) {
					var text = [];
					text.push('<ul class="' + chart.id + '-legend">');
					for (var i = 0; i < chart.data.datasets.length; i++) {
						text.push('<li><span style="background-color:' + chart.data.datasets[i].backgroundColor + '"></span>');
						if (chart.data.datasets[i].label) {
							text.push(chart.data.datasets[i].label);
						}
						text.push('</li>');
					}
					text.push('</ul>');

					return text.join('');
				}
			}
		};

		Chart.Chart = Chart;

		return Chart;

	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* global window: false */
	/* global document: false */
	'use strict';

	var color = __webpack_require__(4);

	module.exports = function(Chart) {
		// Global Chart helpers object for utility methods and classes
		var helpers = Chart.helpers = {};

		// -- Basic js utility methods
		helpers.each = function(loopable, callback, self, reverse) {
			// Check to see if null or undefined firstly.
			var i, len;
			if (helpers.isArray(loopable)) {
				len = loopable.length;
				if (reverse) {
					for (i = len - 1; i >= 0; i--) {
						callback.call(self, loopable[i], i);
					}
				} else {
					for (i = 0; i < len; i++) {
						callback.call(self, loopable[i], i);
					}
				}
			} else if (typeof loopable === 'object') {
				var keys = Object.keys(loopable);
				len = keys.length;
				for (i = 0; i < len; i++) {
					callback.call(self, loopable[keys[i]], keys[i]);
				}
			}
		};
		helpers.clone = function(obj) {
			var objClone = {};
			helpers.each(obj, function(value, key) {
				if (helpers.isArray(value)) {
					objClone[key] = value.slice(0);
				} else if (typeof value === 'object' && value !== null) {
					objClone[key] = helpers.clone(value);
				} else {
					objClone[key] = value;
				}
			});
			return objClone;
		};
		helpers.extend = function(base) {
			var setFn = function(value, key) {
				base[key] = value;
			};
			for (var i = 1, ilen = arguments.length; i < ilen; i++) {
				helpers.each(arguments[i], setFn);
			}
			return base;
		};
		// Need a special merge function to chart configs since they are now grouped
		helpers.configMerge = function(_base) {
			var base = helpers.clone(_base);
			helpers.each(Array.prototype.slice.call(arguments, 1), function(extension) {
				helpers.each(extension, function(value, key) {
					if (key === 'scales') {
						// Scale config merging is complex. Add out own function here for that
						base[key] = helpers.scaleMerge(base.hasOwnProperty(key) ? base[key] : {}, value);

					} else if (key === 'scale') {
						// Used in polar area & radar charts since there is only one scale
						base[key] = helpers.configMerge(base.hasOwnProperty(key) ? base[key] : {}, Chart.scaleService.getScaleDefaults(value.type), value);
					} else if (base.hasOwnProperty(key) && helpers.isArray(base[key]) && helpers.isArray(value)) {
						// In this case we have an array of objects replacing another array. Rather than doing a strict replace,
						// merge. This allows easy scale option merging
						var baseArray = base[key];

						helpers.each(value, function(valueObj, index) {

							if (index < baseArray.length) {
								if (typeof baseArray[index] === 'object' && baseArray[index] !== null && typeof valueObj === 'object' && valueObj !== null) {
									// Two objects are coming together. Do a merge of them.
									baseArray[index] = helpers.configMerge(baseArray[index], valueObj);
								} else {
									// Just overwrite in this case since there is nothing to merge
									baseArray[index] = valueObj;
								}
							} else {
								baseArray.push(valueObj); // nothing to merge
							}
						});

					} else if (base.hasOwnProperty(key) && typeof base[key] === 'object' && base[key] !== null && typeof value === 'object') {
						// If we are overwriting an object with an object, do a merge of the properties.
						base[key] = helpers.configMerge(base[key], value);

					} else {
						// can just overwrite the value in this case
						base[key] = value;
					}
				});
			});

			return base;
		};
		helpers.scaleMerge = function(_base, extension) {
			var base = helpers.clone(_base);

			helpers.each(extension, function(value, key) {
				if (key === 'xAxes' || key === 'yAxes') {
					// These properties are arrays of items
					if (base.hasOwnProperty(key)) {
						helpers.each(value, function(valueObj, index) {
							var axisType = helpers.getValueOrDefault(valueObj.type, key === 'xAxes' ? 'category' : 'linear');
							var axisDefaults = Chart.scaleService.getScaleDefaults(axisType);
							if (index >= base[key].length || !base[key][index].type) {
								base[key].push(helpers.configMerge(axisDefaults, valueObj));
							} else if (valueObj.type && valueObj.type !== base[key][index].type) {
								// Type changed. Bring in the new defaults before we bring in valueObj so that valueObj can override the correct scale defaults
								base[key][index] = helpers.configMerge(base[key][index], axisDefaults, valueObj);
							} else {
								// Type is the same
								base[key][index] = helpers.configMerge(base[key][index], valueObj);
							}
						});
					} else {
						base[key] = [];
						helpers.each(value, function(valueObj) {
							var axisType = helpers.getValueOrDefault(valueObj.type, key === 'xAxes' ? 'category' : 'linear');
							base[key].push(helpers.configMerge(Chart.scaleService.getScaleDefaults(axisType), valueObj));
						});
					}
				} else if (base.hasOwnProperty(key) && typeof base[key] === 'object' && base[key] !== null && typeof value === 'object') {
					// If we are overwriting an object with an object, do a merge of the properties.
					base[key] = helpers.configMerge(base[key], value);

				} else {
					// can just overwrite the value in this case
					base[key] = value;
				}
			});

			return base;
		};
		helpers.getValueAtIndexOrDefault = function(value, index, defaultValue) {
			if (value === undefined || value === null) {
				return defaultValue;
			}

			if (helpers.isArray(value)) {
				return index < value.length ? value[index] : defaultValue;
			}

			return value;
		};
		helpers.getValueOrDefault = function(value, defaultValue) {
			return value === undefined ? defaultValue : value;
		};
		helpers.indexOf = Array.prototype.indexOf?
			function(array, item) {
				return array.indexOf(item);
			}:
			function(array, item) {
				for (var i = 0, ilen = array.length; i < ilen; ++i) {
					if (array[i] === item) {
						return i;
					}
				}
				return -1;
			};
		helpers.where = function(collection, filterCallback) {
			if (helpers.isArray(collection) && Array.prototype.filter) {
				return collection.filter(filterCallback);
			}
			var filtered = [];

			helpers.each(collection, function(item) {
				if (filterCallback(item)) {
					filtered.push(item);
				}
			});

			return filtered;
		};
		helpers.findIndex = Array.prototype.findIndex?
			function(array, callback, scope) {
				return array.findIndex(callback, scope);
			} :
			function(array, callback, scope) {
				scope = scope === undefined? array : scope;
				for (var i = 0, ilen = array.length; i < ilen; ++i) {
					if (callback.call(scope, array[i], i, array)) {
						return i;
					}
				}
				return -1;
			};
		helpers.findNextWhere = function(arrayToSearch, filterCallback, startIndex) {
			// Default to start of the array
			if (startIndex === undefined || startIndex === null) {
				startIndex = -1;
			}
			for (var i = startIndex + 1; i < arrayToSearch.length; i++) {
				var currentItem = arrayToSearch[i];
				if (filterCallback(currentItem)) {
					return currentItem;
				}
			}
		};
		helpers.findPreviousWhere = function(arrayToSearch, filterCallback, startIndex) {
			// Default to end of the array
			if (startIndex === undefined || startIndex === null) {
				startIndex = arrayToSearch.length;
			}
			for (var i = startIndex - 1; i >= 0; i--) {
				var currentItem = arrayToSearch[i];
				if (filterCallback(currentItem)) {
					return currentItem;
				}
			}
		};
		helpers.inherits = function(extensions) {
			// Basic javascript inheritance based on the model created in Backbone.js
			var me = this;
			var ChartElement = (extensions && extensions.hasOwnProperty('constructor')) ? extensions.constructor : function() {
				return me.apply(this, arguments);
			};

			var Surrogate = function() {
				this.constructor = ChartElement;
			};
			Surrogate.prototype = me.prototype;
			ChartElement.prototype = new Surrogate();

			ChartElement.extend = helpers.inherits;

			if (extensions) {
				helpers.extend(ChartElement.prototype, extensions);
			}

			ChartElement.__super__ = me.prototype;

			return ChartElement;
		};
		helpers.noop = function() {};
		helpers.uid = (function() {
			var id = 0;
			return function() {
				return id++;
			};
		}());
		// -- Math methods
		helpers.isNumber = function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		};
		helpers.almostEquals = function(x, y, epsilon) {
			return Math.abs(x - y) < epsilon;
		};
		helpers.max = function(array) {
			return array.reduce(function(max, value) {
				if (!isNaN(value)) {
					return Math.max(max, value);
				}
				return max;
			}, Number.NEGATIVE_INFINITY);
		};
		helpers.min = function(array) {
			return array.reduce(function(min, value) {
				if (!isNaN(value)) {
					return Math.min(min, value);
				}
				return min;
			}, Number.POSITIVE_INFINITY);
		};
		helpers.sign = Math.sign?
			function(x) {
				return Math.sign(x);
			} :
			function(x) {
				x = +x; // convert to a number
				if (x === 0 || isNaN(x)) {
					return x;
				}
				return x > 0 ? 1 : -1;
			};
		helpers.log10 = Math.log10?
			function(x) {
				return Math.log10(x);
			} :
			function(x) {
				return Math.log(x) / Math.LN10;
			};
		helpers.toRadians = function(degrees) {
			return degrees * (Math.PI / 180);
		};
		helpers.toDegrees = function(radians) {
			return radians * (180 / Math.PI);
		};
		// Gets the angle from vertical upright to the point about a centre.
		helpers.getAngleFromPoint = function(centrePoint, anglePoint) {
			var distanceFromXCenter = anglePoint.x - centrePoint.x,
				distanceFromYCenter = anglePoint.y - centrePoint.y,
				radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);

			var angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);

			if (angle < (-0.5 * Math.PI)) {
				angle += 2.0 * Math.PI; // make sure the returned angle is in the range of (-PI/2, 3PI/2]
			}

			return {
				angle: angle,
				distance: radialDistanceFromCenter
			};
		};
		helpers.aliasPixel = function(pixelWidth) {
			return (pixelWidth % 2 === 0) ? 0 : 0.5;
		};
		helpers.splineCurve = function(firstPoint, middlePoint, afterPoint, t) {
			// Props to Rob Spencer at scaled innovation for his post on splining between points
			// http://scaledinnovation.com/analytics/splines/aboutSplines.html

			// This function must also respect "skipped" points

			var previous = firstPoint.skip ? middlePoint : firstPoint,
				current = middlePoint,
				next = afterPoint.skip ? middlePoint : afterPoint;

			var d01 = Math.sqrt(Math.pow(current.x - previous.x, 2) + Math.pow(current.y - previous.y, 2));
			var d12 = Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2));

			var s01 = d01 / (d01 + d12);
			var s12 = d12 / (d01 + d12);

			// If all points are the same, s01 & s02 will be inf
			s01 = isNaN(s01) ? 0 : s01;
			s12 = isNaN(s12) ? 0 : s12;

			var fa = t * s01; // scaling factor for triangle Ta
			var fb = t * s12;

			return {
				previous: {
					x: current.x - fa * (next.x - previous.x),
					y: current.y - fa * (next.y - previous.y)
				},
				next: {
					x: current.x + fb * (next.x - previous.x),
					y: current.y + fb * (next.y - previous.y)
				}
			};
		};
		helpers.EPSILON = Number.EPSILON || 1e-14;
		helpers.splineCurveMonotone = function(points) {
			// This function calculates Bézier control points in a similar way than |splineCurve|,
			// but preserves monotonicity of the provided data and ensures no local extremums are added
			// between the dataset discrete points due to the interpolation.
			// See : https://en.wikipedia.org/wiki/Monotone_cubic_interpolation

			var pointsWithTangents = (points || []).map(function(point) {
				return {
					model: point._model,
					deltaK: 0,
					mK: 0
				};
			});

			// Calculate slopes (deltaK) and initialize tangents (mK)
			var pointsLen = pointsWithTangents.length;
			var i, pointBefore, pointCurrent, pointAfter;
			for (i = 0; i < pointsLen; ++i) {
				pointCurrent = pointsWithTangents[i];
				if (pointCurrent.model.skip) {
					continue;
				}

				pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
				pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
				if (pointAfter && !pointAfter.model.skip) {
					pointCurrent.deltaK = (pointAfter.model.y - pointCurrent.model.y) / (pointAfter.model.x - pointCurrent.model.x);
				}

				if (!pointBefore || pointBefore.model.skip) {
					pointCurrent.mK = pointCurrent.deltaK;
				} else if (!pointAfter || pointAfter.model.skip) {
					pointCurrent.mK = pointBefore.deltaK;
				} else if (this.sign(pointBefore.deltaK) !== this.sign(pointCurrent.deltaK)) {
					pointCurrent.mK = 0;
				} else {
					pointCurrent.mK = (pointBefore.deltaK + pointCurrent.deltaK) / 2;
				}
			}

			// Adjust tangents to ensure monotonic properties
			var alphaK, betaK, tauK, squaredMagnitude;
			for (i = 0; i < pointsLen - 1; ++i) {
				pointCurrent = pointsWithTangents[i];
				pointAfter = pointsWithTangents[i + 1];
				if (pointCurrent.model.skip || pointAfter.model.skip) {
					continue;
				}

				if (helpers.almostEquals(pointCurrent.deltaK, 0, this.EPSILON)) {
					pointCurrent.mK = pointAfter.mK = 0;
					continue;
				}

				alphaK = pointCurrent.mK / pointCurrent.deltaK;
				betaK = pointAfter.mK / pointCurrent.deltaK;
				squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
				if (squaredMagnitude <= 9) {
					continue;
				}

				tauK = 3 / Math.sqrt(squaredMagnitude);
				pointCurrent.mK = alphaK * tauK * pointCurrent.deltaK;
				pointAfter.mK = betaK * tauK * pointCurrent.deltaK;
			}

			// Compute control points
			var deltaX;
			for (i = 0; i < pointsLen; ++i) {
				pointCurrent = pointsWithTangents[i];
				if (pointCurrent.model.skip) {
					continue;
				}

				pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
				pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
				if (pointBefore && !pointBefore.model.skip) {
					deltaX = (pointCurrent.model.x - pointBefore.model.x) / 3;
					pointCurrent.model.controlPointPreviousX = pointCurrent.model.x - deltaX;
					pointCurrent.model.controlPointPreviousY = pointCurrent.model.y - deltaX * pointCurrent.mK;
				}
				if (pointAfter && !pointAfter.model.skip) {
					deltaX = (pointAfter.model.x - pointCurrent.model.x) / 3;
					pointCurrent.model.controlPointNextX = pointCurrent.model.x + deltaX;
					pointCurrent.model.controlPointNextY = pointCurrent.model.y + deltaX * pointCurrent.mK;
				}
			}
		};
		helpers.nextItem = function(collection, index, loop) {
			if (loop) {
				return index >= collection.length - 1 ? collection[0] : collection[index + 1];
			}
			return index >= collection.length - 1 ? collection[collection.length - 1] : collection[index + 1];
		};
		helpers.previousItem = function(collection, index, loop) {
			if (loop) {
				return index <= 0 ? collection[collection.length - 1] : collection[index - 1];
			}
			return index <= 0 ? collection[0] : collection[index - 1];
		};
		// Implementation of the nice number algorithm used in determining where axis labels will go
		helpers.niceNum = function(range, round) {
			var exponent = Math.floor(helpers.log10(range));
			var fraction = range / Math.pow(10, exponent);
			var niceFraction;

			if (round) {
				if (fraction < 1.5) {
					niceFraction = 1;
				} else if (fraction < 3) {
					niceFraction = 2;
				} else if (fraction < 7) {
					niceFraction = 5;
				} else {
					niceFraction = 10;
				}
			} else if (fraction <= 1.0) {
				niceFraction = 1;
			} else if (fraction <= 2) {
				niceFraction = 2;
			} else if (fraction <= 5) {
				niceFraction = 5;
			} else {
				niceFraction = 10;
			}

			return niceFraction * Math.pow(10, exponent);
		};
		// Easing functions adapted from Robert Penner's easing equations
		// http://www.robertpenner.com/easing/
		var easingEffects = helpers.easingEffects = {
			linear: function(t) {
				return t;
			},
			easeInQuad: function(t) {
				return t * t;
			},
			easeOutQuad: function(t) {
				return -1 * t * (t - 2);
			},
			easeInOutQuad: function(t) {
				if ((t /= 1 / 2) < 1) {
					return 1 / 2 * t * t;
				}
				return -1 / 2 * ((--t) * (t - 2) - 1);
			},
			easeInCubic: function(t) {
				return t * t * t;
			},
			easeOutCubic: function(t) {
				return 1 * ((t = t / 1 - 1) * t * t + 1);
			},
			easeInOutCubic: function(t) {
				if ((t /= 1 / 2) < 1) {
					return 1 / 2 * t * t * t;
				}
				return 1 / 2 * ((t -= 2) * t * t + 2);
			},
			easeInQuart: function(t) {
				return t * t * t * t;
			},
			easeOutQuart: function(t) {
				return -1 * ((t = t / 1 - 1) * t * t * t - 1);
			},
			easeInOutQuart: function(t) {
				if ((t /= 1 / 2) < 1) {
					return 1 / 2 * t * t * t * t;
				}
				return -1 / 2 * ((t -= 2) * t * t * t - 2);
			},
			easeInQuint: function(t) {
				return 1 * (t /= 1) * t * t * t * t;
			},
			easeOutQuint: function(t) {
				return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
			},
			easeInOutQuint: function(t) {
				if ((t /= 1 / 2) < 1) {
					return 1 / 2 * t * t * t * t * t;
				}
				return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
			},
			easeInSine: function(t) {
				return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
			},
			easeOutSine: function(t) {
				return 1 * Math.sin(t / 1 * (Math.PI / 2));
			},
			easeInOutSine: function(t) {
				return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
			},
			easeInExpo: function(t) {
				return (t === 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
			},
			easeOutExpo: function(t) {
				return (t === 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
			},
			easeInOutExpo: function(t) {
				if (t === 0) {
					return 0;
				}
				if (t === 1) {
					return 1;
				}
				if ((t /= 1 / 2) < 1) {
					return 1 / 2 * Math.pow(2, 10 * (t - 1));
				}
				return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
			},
			easeInCirc: function(t) {
				if (t >= 1) {
					return t;
				}
				return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
			},
			easeOutCirc: function(t) {
				return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
			},
			easeInOutCirc: function(t) {
				if ((t /= 1 / 2) < 1) {
					return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
				}
				return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
			},
			easeInElastic: function(t) {
				var s = 1.70158;
				var p = 0;
				var a = 1;
				if (t === 0) {
					return 0;
				}
				if ((t /= 1) === 1) {
					return 1;
				}
				if (!p) {
					p = 1 * 0.3;
				}
				if (a < Math.abs(1)) {
					a = 1;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(1 / a);
				}
				return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
			},
			easeOutElastic: function(t) {
				var s = 1.70158;
				var p = 0;
				var a = 1;
				if (t === 0) {
					return 0;
				}
				if ((t /= 1) === 1) {
					return 1;
				}
				if (!p) {
					p = 1 * 0.3;
				}
				if (a < Math.abs(1)) {
					a = 1;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(1 / a);
				}
				return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
			},
			easeInOutElastic: function(t) {
				var s = 1.70158;
				var p = 0;
				var a = 1;
				if (t === 0) {
					return 0;
				}
				if ((t /= 1 / 2) === 2) {
					return 1;
				}
				if (!p) {
					p = 1 * (0.3 * 1.5);
				}
				if (a < Math.abs(1)) {
					a = 1;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(1 / a);
				}
				if (t < 1) {
					return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
				}
				return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * 0.5 + 1;
			},
			easeInBack: function(t) {
				var s = 1.70158;
				return 1 * (t /= 1) * t * ((s + 1) * t - s);
			},
			easeOutBack: function(t) {
				var s = 1.70158;
				return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
			},
			easeInOutBack: function(t) {
				var s = 1.70158;
				if ((t /= 1 / 2) < 1) {
					return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
				}
				return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
			},
			easeInBounce: function(t) {
				return 1 - easingEffects.easeOutBounce(1 - t);
			},
			easeOutBounce: function(t) {
				if ((t /= 1) < (1 / 2.75)) {
					return 1 * (7.5625 * t * t);
				} else if (t < (2 / 2.75)) {
					return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
				} else if (t < (2.5 / 2.75)) {
					return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
				}
				return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
			},
			easeInOutBounce: function(t) {
				if (t < 1 / 2) {
					return easingEffects.easeInBounce(t * 2) * 0.5;
				}
				return easingEffects.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5;
			}
		};
		// Request animation polyfill - http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
		helpers.requestAnimFrame = (function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function(callback) {
					return window.setTimeout(callback, 1000 / 60);
				};
		}());
		helpers.cancelAnimFrame = (function() {
			return window.cancelAnimationFrame ||
				window.webkitCancelAnimationFrame ||
				window.mozCancelAnimationFrame ||
				window.oCancelAnimationFrame ||
				window.msCancelAnimationFrame ||
				function(callback) {
					return window.clearTimeout(callback, 1000 / 60);
				};
		}());
		// -- DOM methods
		helpers.getRelativePosition = function(evt, chart) {
			var mouseX, mouseY;
			var e = evt.originalEvent || evt,
				canvas = evt.currentTarget || evt.srcElement,
				boundingRect = canvas.getBoundingClientRect();

			var touches = e.touches;
			if (touches && touches.length > 0) {
				mouseX = touches[0].clientX;
				mouseY = touches[0].clientY;

			} else {
				mouseX = e.clientX;
				mouseY = e.clientY;
			}

			// Scale mouse coordinates into canvas coordinates
			// by following the pattern laid out by 'jerryj' in the comments of
			// http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
			var paddingLeft = parseFloat(helpers.getStyle(canvas, 'padding-left'));
			var paddingTop = parseFloat(helpers.getStyle(canvas, 'padding-top'));
			var paddingRight = parseFloat(helpers.getStyle(canvas, 'padding-right'));
			var paddingBottom = parseFloat(helpers.getStyle(canvas, 'padding-bottom'));
			var width = boundingRect.right - boundingRect.left - paddingLeft - paddingRight;
			var height = boundingRect.bottom - boundingRect.top - paddingTop - paddingBottom;

			// We divide by the current device pixel ratio, because the canvas is scaled up by that amount in each direction. However
			// the backend model is in unscaled coordinates. Since we are going to deal with our model coordinates, we go back here
			mouseX = Math.round((mouseX - boundingRect.left - paddingLeft) / (width) * canvas.width / chart.currentDevicePixelRatio);
			mouseY = Math.round((mouseY - boundingRect.top - paddingTop) / (height) * canvas.height / chart.currentDevicePixelRatio);

			return {
				x: mouseX,
				y: mouseY
			};

		};
		helpers.addEvent = function(node, eventType, method) {
			if (node.addEventListener) {
				node.addEventListener(eventType, method);
			} else if (node.attachEvent) {
				node.attachEvent('on' + eventType, method);
			} else {
				node['on' + eventType] = method;
			}
		};
		helpers.removeEvent = function(node, eventType, handler) {
			if (node.removeEventListener) {
				node.removeEventListener(eventType, handler, false);
			} else if (node.detachEvent) {
				node.detachEvent('on' + eventType, handler);
			} else {
				node['on' + eventType] = helpers.noop;
			}
		};
		helpers.bindEvents = function(chartInstance, arrayOfEvents, handler) {
			// Create the events object if it's not already present
			var events = chartInstance.events = chartInstance.events || {};

			helpers.each(arrayOfEvents, function(eventName) {
				events[eventName] = function() {
					handler.apply(chartInstance, arguments);
				};
				helpers.addEvent(chartInstance.chart.canvas, eventName, events[eventName]);
			});
		};
		helpers.unbindEvents = function(chartInstance, arrayOfEvents) {
			var canvas = chartInstance.chart.canvas;
			helpers.each(arrayOfEvents, function(handler, eventName) {
				helpers.removeEvent(canvas, eventName, handler);
			});
		};

		// Private helper function to convert max-width/max-height values that may be percentages into a number
		function parseMaxStyle(styleValue, node, parentProperty) {
			var valueInPixels;
			if (typeof(styleValue) === 'string') {
				valueInPixels = parseInt(styleValue, 10);

				if (styleValue.indexOf('%') !== -1) {
					// percentage * size in dimension
					valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
				}
			} else {
				valueInPixels = styleValue;
			}

			return valueInPixels;
		}

		/**
		 * Returns if the given value contains an effective constraint.
		 * @private
		 */
		function isConstrainedValue(value) {
			return value !== undefined && value !== null && value !== 'none';
		}

		// Private helper to get a constraint dimension
		// @param domNode : the node to check the constraint on
		// @param maxStyle : the style that defines the maximum for the direction we are using (maxWidth / maxHeight)
		// @param percentageProperty : property of parent to use when calculating width as a percentage
		// @see http://www.nathanaeljones.com/blog/2013/reading-max-width-cross-browser
		function getConstraintDimension(domNode, maxStyle, percentageProperty) {
			var view = document.defaultView;
			var parentNode = domNode.parentNode;
			var constrainedNode = view.getComputedStyle(domNode)[maxStyle];
			var constrainedContainer = view.getComputedStyle(parentNode)[maxStyle];
			var hasCNode = isConstrainedValue(constrainedNode);
			var hasCContainer = isConstrainedValue(constrainedContainer);
			var infinity = Number.POSITIVE_INFINITY;

			if (hasCNode || hasCContainer) {
				return Math.min(
					hasCNode? parseMaxStyle(constrainedNode, domNode, percentageProperty) : infinity,
					hasCContainer? parseMaxStyle(constrainedContainer, parentNode, percentageProperty) : infinity);
			}

			return 'none';
		}
		// returns Number or undefined if no constraint
		helpers.getConstraintWidth = function(domNode) {
			return getConstraintDimension(domNode, 'max-width', 'clientWidth');
		};
		// returns Number or undefined if no constraint
		helpers.getConstraintHeight = function(domNode) {
			return getConstraintDimension(domNode, 'max-height', 'clientHeight');
		};
		helpers.getMaximumWidth = function(domNode) {
			var container = domNode.parentNode;
			var paddingLeft = parseInt(helpers.getStyle(container, 'padding-left'), 10);
			var paddingRight = parseInt(helpers.getStyle(container, 'padding-right'), 10);
			var w = container.clientWidth - paddingLeft - paddingRight;
			var cw = helpers.getConstraintWidth(domNode);
			return isNaN(cw)? w : Math.min(w, cw);
		};
		helpers.getMaximumHeight = function(domNode) {
			var container = domNode.parentNode;
			var paddingTop = parseInt(helpers.getStyle(container, 'padding-top'), 10);
			var paddingBottom = parseInt(helpers.getStyle(container, 'padding-bottom'), 10);
			var h = container.clientHeight - paddingTop - paddingBottom;
			var ch = helpers.getConstraintHeight(domNode);
			return isNaN(ch)? h : Math.min(h, ch);
		};
		helpers.getStyle = function(el, property) {
			return el.currentStyle ?
				el.currentStyle[property] :
				document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
		};
		helpers.retinaScale = function(chart) {
			var ctx = chart.ctx;
			var canvas = chart.canvas;
			var width = canvas.width;
			var height = canvas.height;
			var pixelRatio = chart.currentDevicePixelRatio = window.devicePixelRatio || 1;

			if (pixelRatio !== 1) {
				canvas.height = height * pixelRatio;
				canvas.width = width * pixelRatio;
				ctx.scale(pixelRatio, pixelRatio);

				// Store the device pixel ratio so that we can go backwards in `destroy`.
				// The devicePixelRatio changes with zoom, so there are no guarantees that it is the same
				// when destroy is called
				chart.originalDevicePixelRatio = chart.originalDevicePixelRatio || pixelRatio;
			}

			canvas.style.width = width + 'px';
			canvas.style.height = height + 'px';
		};
		// -- Canvas methods
		helpers.clear = function(chart) {
			chart.ctx.clearRect(0, 0, chart.width, chart.height);
		};
		helpers.fontString = function(pixelSize, fontStyle, fontFamily) {
			return fontStyle + ' ' + pixelSize + 'px ' + fontFamily;
		};
		helpers.longestText = function(ctx, font, arrayOfThings, cache) {
			cache = cache || {};
			var data = cache.data = cache.data || {};
			var gc = cache.garbageCollect = cache.garbageCollect || [];

			if (cache.font !== font) {
				data = cache.data = {};
				gc = cache.garbageCollect = [];
				cache.font = font;
			}

			ctx.font = font;
			var longest = 0;
			helpers.each(arrayOfThings, function(thing) {
				// Undefined strings and arrays should not be measured
				if (thing !== undefined && thing !== null && helpers.isArray(thing) !== true) {
					longest = helpers.measureText(ctx, data, gc, longest, thing);
				} else if (helpers.isArray(thing)) {
					// if it is an array lets measure each element
					// to do maybe simplify this function a bit so we can do this more recursively?
					helpers.each(thing, function(nestedThing) {
						// Undefined strings and arrays should not be measured
						if (nestedThing !== undefined && nestedThing !== null && !helpers.isArray(nestedThing)) {
							longest = helpers.measureText(ctx, data, gc, longest, nestedThing);
						}
					});
				}
			});

			var gcLen = gc.length / 2;
			if (gcLen > arrayOfThings.length) {
				for (var i = 0; i < gcLen; i++) {
					delete data[gc[i]];
				}
				gc.splice(0, gcLen);
			}
			return longest;
		};
		helpers.measureText = function(ctx, data, gc, longest, string) {
			var textWidth = data[string];
			if (!textWidth) {
				textWidth = data[string] = ctx.measureText(string).width;
				gc.push(string);
			}
			if (textWidth > longest) {
				longest = textWidth;
			}
			return longest;
		};
		helpers.numberOfLabelLines = function(arrayOfThings) {
			var numberOfLines = 1;
			helpers.each(arrayOfThings, function(thing) {
				if (helpers.isArray(thing)) {
					if (thing.length > numberOfLines) {
						numberOfLines = thing.length;
					}
				}
			});
			return numberOfLines;
		};
		helpers.drawRoundedRectangle = function(ctx, x, y, width, height, radius) {
			ctx.beginPath();
			ctx.moveTo(x + radius, y);
			ctx.lineTo(x + width - radius, y);
			ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
			ctx.lineTo(x + width, y + height - radius);
			ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
			ctx.lineTo(x + radius, y + height);
			ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
			ctx.lineTo(x, y + radius);
			ctx.quadraticCurveTo(x, y, x + radius, y);
			ctx.closePath();
		};
		helpers.color = function(c) {
			if (!color) {
				console.error('Color.js not found!');
				return c;
			}

			/* global CanvasGradient */
			if (c instanceof CanvasGradient) {
				return color(Chart.defaults.global.defaultColor);
			}

			return color(c);
		};
		helpers.addResizeListener = function(node, callback) {
			// Hide an iframe before the node
			var hiddenIframe = document.createElement('iframe');
			var hiddenIframeClass = 'chartjs-hidden-iframe';

			if (hiddenIframe.classlist) {
				// can use classlist
				hiddenIframe.classlist.add(hiddenIframeClass);
			} else {
				hiddenIframe.setAttribute('class', hiddenIframeClass);
			}

			// Set the style
			hiddenIframe.tabIndex = -1;
			var style = hiddenIframe.style;
			style.width = '100%';
			style.display = 'block';
			style.border = 0;
			style.height = 0;
			style.margin = 0;
			style.position = 'absolute';
			style.left = 0;
			style.right = 0;
			style.top = 0;
			style.bottom = 0;

			// Insert the iframe so that contentWindow is available
			node.insertBefore(hiddenIframe, node.firstChild);

			(hiddenIframe.contentWindow || hiddenIframe).onresize = function() {
				if (callback) {
					return callback();
				}
			};
		};
		helpers.removeResizeListener = function(node) {
			var hiddenIframe = node.querySelector('.chartjs-hidden-iframe');

			// Remove the resize detect iframe
			if (hiddenIframe) {
				hiddenIframe.parentNode.removeChild(hiddenIframe);
			}
		};
		helpers.isArray = Array.isArray?
			function(obj) {
				return Array.isArray(obj);
			} :
			function(obj) {
				return Object.prototype.toString.call(obj) === '[object Array]';
			};
		// ! @see http://stackoverflow.com/a/14853974
		helpers.arrayEquals = function(a0, a1) {
			var i, ilen, v0, v1;

			if (!a0 || !a1 || a0.length !== a1.length) {
				return false;
			}

			for (i = 0, ilen=a0.length; i < ilen; ++i) {
				v0 = a0[i];
				v1 = a1[i];

				if (v0 instanceof Array && v1 instanceof Array) {
					if (!helpers.arrayEquals(v0, v1)) {
						return false;
					}
				} else if (v0 !== v1) {
					// NOTE: two different object instances will never be equal: {x:20} != {x:20}
					return false;
				}
			}

			return true;
		};
		helpers.callCallback = function(fn, args, _tArg) {
			if (fn && typeof fn.call === 'function') {
				fn.apply(_tArg, args);
			}
		};
		helpers.getHoverColor = function(colorValue) {
			/* global CanvasPattern */
			return (colorValue instanceof CanvasPattern) ?
				colorValue :
				helpers.color(colorValue).saturate(0.5).darken(0.1).rgbString();
		};
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* MIT license */
	var convert = __webpack_require__(5);
	var string = __webpack_require__(7);

	var Color = function (obj) {
		if (obj instanceof Color) {
			return obj;
		}
		if (!(this instanceof Color)) {
			return new Color(obj);
		}

		this.values = {
			rgb: [0, 0, 0],
			hsl: [0, 0, 0],
			hsv: [0, 0, 0],
			hwb: [0, 0, 0],
			cmyk: [0, 0, 0, 0],
			alpha: 1
		};

		// parse Color() argument
		var vals;
		if (typeof obj === 'string') {
			vals = string.getRgba(obj);
			if (vals) {
				this.setValues('rgb', vals);
			} else if (vals = string.getHsla(obj)) {
				this.setValues('hsl', vals);
			} else if (vals = string.getHwb(obj)) {
				this.setValues('hwb', vals);
			} else {
				throw new Error('Unable to parse color from string "' + obj + '"');
			}
		} else if (typeof obj === 'object') {
			vals = obj;
			if (vals.r !== undefined || vals.red !== undefined) {
				this.setValues('rgb', vals);
			} else if (vals.l !== undefined || vals.lightness !== undefined) {
				this.setValues('hsl', vals);
			} else if (vals.v !== undefined || vals.value !== undefined) {
				this.setValues('hsv', vals);
			} else if (vals.w !== undefined || vals.whiteness !== undefined) {
				this.setValues('hwb', vals);
			} else if (vals.c !== undefined || vals.cyan !== undefined) {
				this.setValues('cmyk', vals);
			} else {
				throw new Error('Unable to parse color from object ' + JSON.stringify(obj));
			}
		}
	};

	Color.prototype = {
		rgb: function () {
			return this.setSpace('rgb', arguments);
		},
		hsl: function () {
			return this.setSpace('hsl', arguments);
		},
		hsv: function () {
			return this.setSpace('hsv', arguments);
		},
		hwb: function () {
			return this.setSpace('hwb', arguments);
		},
		cmyk: function () {
			return this.setSpace('cmyk', arguments);
		},

		rgbArray: function () {
			return this.values.rgb;
		},
		hslArray: function () {
			return this.values.hsl;
		},
		hsvArray: function () {
			return this.values.hsv;
		},
		hwbArray: function () {
			var values = this.values;
			if (values.alpha !== 1) {
				return values.hwb.concat([values.alpha]);
			}
			return values.hwb;
		},
		cmykArray: function () {
			return this.values.cmyk;
		},
		rgbaArray: function () {
			var values = this.values;
			return values.rgb.concat([values.alpha]);
		},
		hslaArray: function () {
			var values = this.values;
			return values.hsl.concat([values.alpha]);
		},
		alpha: function (val) {
			if (val === undefined) {
				return this.values.alpha;
			}
			this.setValues('alpha', val);
			return this;
		},

		red: function (val) {
			return this.setChannel('rgb', 0, val);
		},
		green: function (val) {
			return this.setChannel('rgb', 1, val);
		},
		blue: function (val) {
			return this.setChannel('rgb', 2, val);
		},
		hue: function (val) {
			if (val) {
				val %= 360;
				val = val < 0 ? 360 + val : val;
			}
			return this.setChannel('hsl', 0, val);
		},
		saturation: function (val) {
			return this.setChannel('hsl', 1, val);
		},
		lightness: function (val) {
			return this.setChannel('hsl', 2, val);
		},
		saturationv: function (val) {
			return this.setChannel('hsv', 1, val);
		},
		whiteness: function (val) {
			return this.setChannel('hwb', 1, val);
		},
		blackness: function (val) {
			return this.setChannel('hwb', 2, val);
		},
		value: function (val) {
			return this.setChannel('hsv', 2, val);
		},
		cyan: function (val) {
			return this.setChannel('cmyk', 0, val);
		},
		magenta: function (val) {
			return this.setChannel('cmyk', 1, val);
		},
		yellow: function (val) {
			return this.setChannel('cmyk', 2, val);
		},
		black: function (val) {
			return this.setChannel('cmyk', 3, val);
		},

		hexString: function () {
			return string.hexString(this.values.rgb);
		},
		rgbString: function () {
			return string.rgbString(this.values.rgb, this.values.alpha);
		},
		rgbaString: function () {
			return string.rgbaString(this.values.rgb, this.values.alpha);
		},
		percentString: function () {
			return string.percentString(this.values.rgb, this.values.alpha);
		},
		hslString: function () {
			return string.hslString(this.values.hsl, this.values.alpha);
		},
		hslaString: function () {
			return string.hslaString(this.values.hsl, this.values.alpha);
		},
		hwbString: function () {
			return string.hwbString(this.values.hwb, this.values.alpha);
		},
		keyword: function () {
			return string.keyword(this.values.rgb, this.values.alpha);
		},

		rgbNumber: function () {
			var rgb = this.values.rgb;
			return (rgb[0] << 16) | (rgb[1] << 8) | rgb[2];
		},

		luminosity: function () {
			// http://www.w3.org/TR/WCAG20/#relativeluminancedef
			var rgb = this.values.rgb;
			var lum = [];
			for (var i = 0; i < rgb.length; i++) {
				var chan = rgb[i] / 255;
				lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
			}
			return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
		},

		contrast: function (color2) {
			// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
			var lum1 = this.luminosity();
			var lum2 = color2.luminosity();
			if (lum1 > lum2) {
				return (lum1 + 0.05) / (lum2 + 0.05);
			}
			return (lum2 + 0.05) / (lum1 + 0.05);
		},

		level: function (color2) {
			var contrastRatio = this.contrast(color2);
			if (contrastRatio >= 7.1) {
				return 'AAA';
			}

			return (contrastRatio >= 4.5) ? 'AA' : '';
		},

		dark: function () {
			// YIQ equation from http://24ways.org/2010/calculating-color-contrast
			var rgb = this.values.rgb;
			var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
			return yiq < 128;
		},

		light: function () {
			return !this.dark();
		},

		negate: function () {
			var rgb = [];
			for (var i = 0; i < 3; i++) {
				rgb[i] = 255 - this.values.rgb[i];
			}
			this.setValues('rgb', rgb);
			return this;
		},

		lighten: function (ratio) {
			var hsl = this.values.hsl;
			hsl[2] += hsl[2] * ratio;
			this.setValues('hsl', hsl);
			return this;
		},

		darken: function (ratio) {
			var hsl = this.values.hsl;
			hsl[2] -= hsl[2] * ratio;
			this.setValues('hsl', hsl);
			return this;
		},

		saturate: function (ratio) {
			var hsl = this.values.hsl;
			hsl[1] += hsl[1] * ratio;
			this.setValues('hsl', hsl);
			return this;
		},

		desaturate: function (ratio) {
			var hsl = this.values.hsl;
			hsl[1] -= hsl[1] * ratio;
			this.setValues('hsl', hsl);
			return this;
		},

		whiten: function (ratio) {
			var hwb = this.values.hwb;
			hwb[1] += hwb[1] * ratio;
			this.setValues('hwb', hwb);
			return this;
		},

		blacken: function (ratio) {
			var hwb = this.values.hwb;
			hwb[2] += hwb[2] * ratio;
			this.setValues('hwb', hwb);
			return this;
		},

		greyscale: function () {
			var rgb = this.values.rgb;
			// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
			var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
			this.setValues('rgb', [val, val, val]);
			return this;
		},

		clearer: function (ratio) {
			var alpha = this.values.alpha;
			this.setValues('alpha', alpha - (alpha * ratio));
			return this;
		},

		opaquer: function (ratio) {
			var alpha = this.values.alpha;
			this.setValues('alpha', alpha + (alpha * ratio));
			return this;
		},

		rotate: function (degrees) {
			var hsl = this.values.hsl;
			var hue = (hsl[0] + degrees) % 360;
			hsl[0] = hue < 0 ? 360 + hue : hue;
			this.setValues('hsl', hsl);
			return this;
		},

		/**
		 * Ported from sass implementation in C
		 * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
		 */
		mix: function (mixinColor, weight) {
			var color1 = this;
			var color2 = mixinColor;
			var p = weight === undefined ? 0.5 : weight;

			var w = 2 * p - 1;
			var a = color1.alpha() - color2.alpha();

			var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
			var w2 = 1 - w1;

			return this
				.rgb(
					w1 * color1.red() + w2 * color2.red(),
					w1 * color1.green() + w2 * color2.green(),
					w1 * color1.blue() + w2 * color2.blue()
				)
				.alpha(color1.alpha() * p + color2.alpha() * (1 - p));
		},

		toJSON: function () {
			return this.rgb();
		},

		clone: function () {
			// NOTE(SB): using node-clone creates a dependency to Buffer when using browserify,
			// making the final build way to big to embed in Chart.js. So let's do it manually,
			// assuming that values to clone are 1 dimension arrays containing only numbers,
			// except 'alpha' which is a number.
			var result = new Color();
			var source = this.values;
			var target = result.values;
			var value, type;

			for (var prop in source) {
				if (source.hasOwnProperty(prop)) {
					value = source[prop];
					type = ({}).toString.call(value);
					if (type === '[object Array]') {
						target[prop] = value.slice(0);
					} else if (type === '[object Number]') {
						target[prop] = value;
					} else {
						console.error('unexpected color value:', value);
					}
				}
			}

			return result;
		}
	};

	Color.prototype.spaces = {
		rgb: ['red', 'green', 'blue'],
		hsl: ['hue', 'saturation', 'lightness'],
		hsv: ['hue', 'saturation', 'value'],
		hwb: ['hue', 'whiteness', 'blackness'],
		cmyk: ['cyan', 'magenta', 'yellow', 'black']
	};

	Color.prototype.maxes = {
		rgb: [255, 255, 255],
		hsl: [360, 100, 100],
		hsv: [360, 100, 100],
		hwb: [360, 100, 100],
		cmyk: [100, 100, 100, 100]
	};

	Color.prototype.getValues = function (space) {
		var values = this.values;
		var vals = {};

		for (var i = 0; i < space.length; i++) {
			vals[space.charAt(i)] = values[space][i];
		}

		if (values.alpha !== 1) {
			vals.a = values.alpha;
		}

		// {r: 255, g: 255, b: 255, a: 0.4}
		return vals;
	};

	Color.prototype.setValues = function (space, vals) {
		var values = this.values;
		var spaces = this.spaces;
		var maxes = this.maxes;
		var alpha = 1;
		var i;

		if (space === 'alpha') {
			alpha = vals;
		} else if (vals.length) {
			// [10, 10, 10]
			values[space] = vals.slice(0, space.length);
			alpha = vals[space.length];
		} else if (vals[space.charAt(0)] !== undefined) {
			// {r: 10, g: 10, b: 10}
			for (i = 0; i < space.length; i++) {
				values[space][i] = vals[space.charAt(i)];
			}

			alpha = vals.a;
		} else if (vals[spaces[space][0]] !== undefined) {
			// {red: 10, green: 10, blue: 10}
			var chans = spaces[space];

			for (i = 0; i < space.length; i++) {
				values[space][i] = vals[chans[i]];
			}

			alpha = vals.alpha;
		}

		values.alpha = Math.max(0, Math.min(1, (alpha === undefined ? values.alpha : alpha)));

		if (space === 'alpha') {
			return false;
		}

		var capped;

		// cap values of the space prior converting all values
		for (i = 0; i < space.length; i++) {
			capped = Math.max(0, Math.min(maxes[space][i], values[space][i]));
			values[space][i] = Math.round(capped);
		}

		// convert to all the other color spaces
		for (var sname in spaces) {
			if (sname !== space) {
				values[sname] = convert[space][sname](values[space]);
			}
		}

		return true;
	};

	Color.prototype.setSpace = function (space, args) {
		var vals = args[0];

		if (vals === undefined) {
			// color.rgb()
			return this.getValues(space);
		}

		// color.rgb(10, 10, 10)
		if (typeof vals === 'number') {
			vals = Array.prototype.slice.call(args);
		}

		this.setValues(space, vals);
		return this;
	};

	Color.prototype.setChannel = function (space, index, val) {
		var svalues = this.values[space];
		if (val === undefined) {
			// color.red()
			return svalues[index];
		} else if (val === svalues[index]) {
			// color.red(color.red())
			return this;
		}

		// color.red(100)
		svalues[index] = val;
		this.setValues(space, svalues);

		return this;
	};

	if (typeof window !== 'undefined') {
		window.Color = Color;
	}

	module.exports = Color;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var conversions = __webpack_require__(6);

	var convert = function() {
	   return new Converter();
	}

	for (var func in conversions) {
	  // export Raw versions
	  convert[func + "Raw"] =  (function(func) {
	    // accept array or plain args
	    return function(arg) {
	      if (typeof arg == "number")
	        arg = Array.prototype.slice.call(arguments);
	      return conversions[func](arg);
	    }
	  })(func);

	  var pair = /(\w+)2(\w+)/.exec(func),
	      from = pair[1],
	      to = pair[2];

	  // export rgb2hsl and ["rgb"]["hsl"]
	  convert[from] = convert[from] || {};

	  convert[from][to] = convert[func] = (function(func) { 
	    return function(arg) {
	      if (typeof arg == "number")
	        arg = Array.prototype.slice.call(arguments);
	      
	      var val = conversions[func](arg);
	      if (typeof val == "string" || val === undefined)
	        return val; // keyword

	      for (var i = 0; i < val.length; i++)
	        val[i] = Math.round(val[i]);
	      return val;
	    }
	  })(func);
	}


	/* Converter does lazy conversion and caching */
	var Converter = function() {
	   this.convs = {};
	};

	/* Either get the values for a space or
	  set the values for a space, depending on args */
	Converter.prototype.routeSpace = function(space, args) {
	   var values = args[0];
	   if (values === undefined) {
	      // color.rgb()
	      return this.getValues(space);
	   }
	   // color.rgb(10, 10, 10)
	   if (typeof values == "number") {
	      values = Array.prototype.slice.call(args);        
	   }

	   return this.setValues(space, values);
	};
	  
	/* Set the values for a space, invalidating cache */
	Converter.prototype.setValues = function(space, values) {
	   this.space = space;
	   this.convs = {};
	   this.convs[space] = values;
	   return this;
	};

	/* Get the values for a space. If there's already
	  a conversion for the space, fetch it, otherwise
	  compute it */
	Converter.prototype.getValues = function(space) {
	   var vals = this.convs[space];
	   if (!vals) {
	      var fspace = this.space,
	          from = this.convs[fspace];
	      vals = convert[fspace][space](from);

	      this.convs[space] = vals;
	   }
	  return vals;
	};

	["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(space) {
	   Converter.prototype[space] = function(vals) {
	      return this.routeSpace(space, arguments);
	   }
	});

	module.exports = convert;

/***/ },
/* 6 */
/***/ function(module, exports) {

	/* MIT license */

	module.exports = {
	  rgb2hsl: rgb2hsl,
	  rgb2hsv: rgb2hsv,
	  rgb2hwb: rgb2hwb,
	  rgb2cmyk: rgb2cmyk,
	  rgb2keyword: rgb2keyword,
	  rgb2xyz: rgb2xyz,
	  rgb2lab: rgb2lab,
	  rgb2lch: rgb2lch,

	  hsl2rgb: hsl2rgb,
	  hsl2hsv: hsl2hsv,
	  hsl2hwb: hsl2hwb,
	  hsl2cmyk: hsl2cmyk,
	  hsl2keyword: hsl2keyword,

	  hsv2rgb: hsv2rgb,
	  hsv2hsl: hsv2hsl,
	  hsv2hwb: hsv2hwb,
	  hsv2cmyk: hsv2cmyk,
	  hsv2keyword: hsv2keyword,

	  hwb2rgb: hwb2rgb,
	  hwb2hsl: hwb2hsl,
	  hwb2hsv: hwb2hsv,
	  hwb2cmyk: hwb2cmyk,
	  hwb2keyword: hwb2keyword,

	  cmyk2rgb: cmyk2rgb,
	  cmyk2hsl: cmyk2hsl,
	  cmyk2hsv: cmyk2hsv,
	  cmyk2hwb: cmyk2hwb,
	  cmyk2keyword: cmyk2keyword,

	  keyword2rgb: keyword2rgb,
	  keyword2hsl: keyword2hsl,
	  keyword2hsv: keyword2hsv,
	  keyword2hwb: keyword2hwb,
	  keyword2cmyk: keyword2cmyk,
	  keyword2lab: keyword2lab,
	  keyword2xyz: keyword2xyz,

	  xyz2rgb: xyz2rgb,
	  xyz2lab: xyz2lab,
	  xyz2lch: xyz2lch,

	  lab2xyz: lab2xyz,
	  lab2rgb: lab2rgb,
	  lab2lch: lab2lch,

	  lch2lab: lch2lab,
	  lch2xyz: lch2xyz,
	  lch2rgb: lch2rgb
	}


	function rgb2hsl(rgb) {
	  var r = rgb[0]/255,
	      g = rgb[1]/255,
	      b = rgb[2]/255,
	      min = Math.min(r, g, b),
	      max = Math.max(r, g, b),
	      delta = max - min,
	      h, s, l;

	  if (max == min)
	    h = 0;
	  else if (r == max)
	    h = (g - b) / delta;
	  else if (g == max)
	    h = 2 + (b - r) / delta;
	  else if (b == max)
	    h = 4 + (r - g)/ delta;

	  h = Math.min(h * 60, 360);

	  if (h < 0)
	    h += 360;

	  l = (min + max) / 2;

	  if (max == min)
	    s = 0;
	  else if (l <= 0.5)
	    s = delta / (max + min);
	  else
	    s = delta / (2 - max - min);

	  return [h, s * 100, l * 100];
	}

	function rgb2hsv(rgb) {
	  var r = rgb[0],
	      g = rgb[1],
	      b = rgb[2],
	      min = Math.min(r, g, b),
	      max = Math.max(r, g, b),
	      delta = max - min,
	      h, s, v;

	  if (max == 0)
	    s = 0;
	  else
	    s = (delta/max * 1000)/10;

	  if (max == min)
	    h = 0;
	  else if (r == max)
	    h = (g - b) / delta;
	  else if (g == max)
	    h = 2 + (b - r) / delta;
	  else if (b == max)
	    h = 4 + (r - g) / delta;

	  h = Math.min(h * 60, 360);

	  if (h < 0)
	    h += 360;

	  v = ((max / 255) * 1000) / 10;

	  return [h, s, v];
	}

	function rgb2hwb(rgb) {
	  var r = rgb[0],
	      g = rgb[1],
	      b = rgb[2],
	      h = rgb2hsl(rgb)[0],
	      w = 1/255 * Math.min(r, Math.min(g, b)),
	      b = 1 - 1/255 * Math.max(r, Math.max(g, b));

	  return [h, w * 100, b * 100];
	}

	function rgb2cmyk(rgb) {
	  var r = rgb[0] / 255,
	      g = rgb[1] / 255,
	      b = rgb[2] / 255,
	      c, m, y, k;

	  k = Math.min(1 - r, 1 - g, 1 - b);
	  c = (1 - r - k) / (1 - k) || 0;
	  m = (1 - g - k) / (1 - k) || 0;
	  y = (1 - b - k) / (1 - k) || 0;
	  return [c * 100, m * 100, y * 100, k * 100];
	}

	function rgb2keyword(rgb) {
	  return reverseKeywords[JSON.stringify(rgb)];
	}

	function rgb2xyz(rgb) {
	  var r = rgb[0] / 255,
	      g = rgb[1] / 255,
	      b = rgb[2] / 255;

	  // assume sRGB
	  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	  var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	  var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	  var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	  return [x * 100, y *100, z * 100];
	}

	function rgb2lab(rgb) {
	  var xyz = rgb2xyz(rgb),
	        x = xyz[0],
	        y = xyz[1],
	        z = xyz[2],
	        l, a, b;

	  x /= 95.047;
	  y /= 100;
	  z /= 108.883;

	  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
	  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
	  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

	  l = (116 * y) - 16;
	  a = 500 * (x - y);
	  b = 200 * (y - z);

	  return [l, a, b];
	}

	function rgb2lch(args) {
	  return lab2lch(rgb2lab(args));
	}

	function hsl2rgb(hsl) {
	  var h = hsl[0] / 360,
	      s = hsl[1] / 100,
	      l = hsl[2] / 100,
	      t1, t2, t3, rgb, val;

	  if (s == 0) {
	    val = l * 255;
	    return [val, val, val];
	  }

	  if (l < 0.5)
	    t2 = l * (1 + s);
	  else
	    t2 = l + s - l * s;
	  t1 = 2 * l - t2;

	  rgb = [0, 0, 0];
	  for (var i = 0; i < 3; i++) {
	    t3 = h + 1 / 3 * - (i - 1);
	    t3 < 0 && t3++;
	    t3 > 1 && t3--;

	    if (6 * t3 < 1)
	      val = t1 + (t2 - t1) * 6 * t3;
	    else if (2 * t3 < 1)
	      val = t2;
	    else if (3 * t3 < 2)
	      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
	    else
	      val = t1;

	    rgb[i] = val * 255;
	  }

	  return rgb;
	}

	function hsl2hsv(hsl) {
	  var h = hsl[0],
	      s = hsl[1] / 100,
	      l = hsl[2] / 100,
	      sv, v;

	  if(l === 0) {
	      // no need to do calc on black
	      // also avoids divide by 0 error
	      return [0, 0, 0];
	  }

	  l *= 2;
	  s *= (l <= 1) ? l : 2 - l;
	  v = (l + s) / 2;
	  sv = (2 * s) / (l + s);
	  return [h, sv * 100, v * 100];
	}

	function hsl2hwb(args) {
	  return rgb2hwb(hsl2rgb(args));
	}

	function hsl2cmyk(args) {
	  return rgb2cmyk(hsl2rgb(args));
	}

	function hsl2keyword(args) {
	  return rgb2keyword(hsl2rgb(args));
	}


	function hsv2rgb(hsv) {
	  var h = hsv[0] / 60,
	      s = hsv[1] / 100,
	      v = hsv[2] / 100,
	      hi = Math.floor(h) % 6;

	  var f = h - Math.floor(h),
	      p = 255 * v * (1 - s),
	      q = 255 * v * (1 - (s * f)),
	      t = 255 * v * (1 - (s * (1 - f))),
	      v = 255 * v;

	  switch(hi) {
	    case 0:
	      return [v, t, p];
	    case 1:
	      return [q, v, p];
	    case 2:
	      return [p, v, t];
	    case 3:
	      return [p, q, v];
	    case 4:
	      return [t, p, v];
	    case 5:
	      return [v, p, q];
	  }
	}

	function hsv2hsl(hsv) {
	  var h = hsv[0],
	      s = hsv[1] / 100,
	      v = hsv[2] / 100,
	      sl, l;

	  l = (2 - s) * v;
	  sl = s * v;
	  sl /= (l <= 1) ? l : 2 - l;
	  sl = sl || 0;
	  l /= 2;
	  return [h, sl * 100, l * 100];
	}

	function hsv2hwb(args) {
	  return rgb2hwb(hsv2rgb(args))
	}

	function hsv2cmyk(args) {
	  return rgb2cmyk(hsv2rgb(args));
	}

	function hsv2keyword(args) {
	  return rgb2keyword(hsv2rgb(args));
	}

	// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
	function hwb2rgb(hwb) {
	  var h = hwb[0] / 360,
	      wh = hwb[1] / 100,
	      bl = hwb[2] / 100,
	      ratio = wh + bl,
	      i, v, f, n;

	  // wh + bl cant be > 1
	  if (ratio > 1) {
	    wh /= ratio;
	    bl /= ratio;
	  }

	  i = Math.floor(6 * h);
	  v = 1 - bl;
	  f = 6 * h - i;
	  if ((i & 0x01) != 0) {
	    f = 1 - f;
	  }
	  n = wh + f * (v - wh);  // linear interpolation

	  switch (i) {
	    default:
	    case 6:
	    case 0: r = v; g = n; b = wh; break;
	    case 1: r = n; g = v; b = wh; break;
	    case 2: r = wh; g = v; b = n; break;
	    case 3: r = wh; g = n; b = v; break;
	    case 4: r = n; g = wh; b = v; break;
	    case 5: r = v; g = wh; b = n; break;
	  }

	  return [r * 255, g * 255, b * 255];
	}

	function hwb2hsl(args) {
	  return rgb2hsl(hwb2rgb(args));
	}

	function hwb2hsv(args) {
	  return rgb2hsv(hwb2rgb(args));
	}

	function hwb2cmyk(args) {
	  return rgb2cmyk(hwb2rgb(args));
	}

	function hwb2keyword(args) {
	  return rgb2keyword(hwb2rgb(args));
	}

	function cmyk2rgb(cmyk) {
	  var c = cmyk[0] / 100,
	      m = cmyk[1] / 100,
	      y = cmyk[2] / 100,
	      k = cmyk[3] / 100,
	      r, g, b;

	  r = 1 - Math.min(1, c * (1 - k) + k);
	  g = 1 - Math.min(1, m * (1 - k) + k);
	  b = 1 - Math.min(1, y * (1 - k) + k);
	  return [r * 255, g * 255, b * 255];
	}

	function cmyk2hsl(args) {
	  return rgb2hsl(cmyk2rgb(args));
	}

	function cmyk2hsv(args) {
	  return rgb2hsv(cmyk2rgb(args));
	}

	function cmyk2hwb(args) {
	  return rgb2hwb(cmyk2rgb(args));
	}

	function cmyk2keyword(args) {
	  return rgb2keyword(cmyk2rgb(args));
	}


	function xyz2rgb(xyz) {
	  var x = xyz[0] / 100,
	      y = xyz[1] / 100,
	      z = xyz[2] / 100,
	      r, g, b;

	  r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	  g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	  b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	  // assume sRGB
	  r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
	    : r = (r * 12.92);

	  g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
	    : g = (g * 12.92);

	  b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
	    : b = (b * 12.92);

	  r = Math.min(Math.max(0, r), 1);
	  g = Math.min(Math.max(0, g), 1);
	  b = Math.min(Math.max(0, b), 1);

	  return [r * 255, g * 255, b * 255];
	}

	function xyz2lab(xyz) {
	  var x = xyz[0],
	      y = xyz[1],
	      z = xyz[2],
	      l, a, b;

	  x /= 95.047;
	  y /= 100;
	  z /= 108.883;

	  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
	  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
	  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

	  l = (116 * y) - 16;
	  a = 500 * (x - y);
	  b = 200 * (y - z);

	  return [l, a, b];
	}

	function xyz2lch(args) {
	  return lab2lch(xyz2lab(args));
	}

	function lab2xyz(lab) {
	  var l = lab[0],
	      a = lab[1],
	      b = lab[2],
	      x, y, z, y2;

	  if (l <= 8) {
	    y = (l * 100) / 903.3;
	    y2 = (7.787 * (y / 100)) + (16 / 116);
	  } else {
	    y = 100 * Math.pow((l + 16) / 116, 3);
	    y2 = Math.pow(y / 100, 1/3);
	  }

	  x = x / 95.047 <= 0.008856 ? x = (95.047 * ((a / 500) + y2 - (16 / 116))) / 7.787 : 95.047 * Math.pow((a / 500) + y2, 3);

	  z = z / 108.883 <= 0.008859 ? z = (108.883 * (y2 - (b / 200) - (16 / 116))) / 7.787 : 108.883 * Math.pow(y2 - (b / 200), 3);

	  return [x, y, z];
	}

	function lab2lch(lab) {
	  var l = lab[0],
	      a = lab[1],
	      b = lab[2],
	      hr, h, c;

	  hr = Math.atan2(b, a);
	  h = hr * 360 / 2 / Math.PI;
	  if (h < 0) {
	    h += 360;
	  }
	  c = Math.sqrt(a * a + b * b);
	  return [l, c, h];
	}

	function lab2rgb(args) {
	  return xyz2rgb(lab2xyz(args));
	}

	function lch2lab(lch) {
	  var l = lch[0],
	      c = lch[1],
	      h = lch[2],
	      a, b, hr;

	  hr = h / 360 * 2 * Math.PI;
	  a = c * Math.cos(hr);
	  b = c * Math.sin(hr);
	  return [l, a, b];
	}

	function lch2xyz(args) {
	  return lab2xyz(lch2lab(args));
	}

	function lch2rgb(args) {
	  return lab2rgb(lch2lab(args));
	}

	function keyword2rgb(keyword) {
	  return cssKeywords[keyword];
	}

	function keyword2hsl(args) {
	  return rgb2hsl(keyword2rgb(args));
	}

	function keyword2hsv(args) {
	  return rgb2hsv(keyword2rgb(args));
	}

	function keyword2hwb(args) {
	  return rgb2hwb(keyword2rgb(args));
	}

	function keyword2cmyk(args) {
	  return rgb2cmyk(keyword2rgb(args));
	}

	function keyword2lab(args) {
	  return rgb2lab(keyword2rgb(args));
	}

	function keyword2xyz(args) {
	  return rgb2xyz(keyword2rgb(args));
	}

	var cssKeywords = {
	  aliceblue:  [240,248,255],
	  antiquewhite: [250,235,215],
	  aqua: [0,255,255],
	  aquamarine: [127,255,212],
	  azure:  [240,255,255],
	  beige:  [245,245,220],
	  bisque: [255,228,196],
	  black:  [0,0,0],
	  blanchedalmond: [255,235,205],
	  blue: [0,0,255],
	  blueviolet: [138,43,226],
	  brown:  [165,42,42],
	  burlywood:  [222,184,135],
	  cadetblue:  [95,158,160],
	  chartreuse: [127,255,0],
	  chocolate:  [210,105,30],
	  coral:  [255,127,80],
	  cornflowerblue: [100,149,237],
	  cornsilk: [255,248,220],
	  crimson:  [220,20,60],
	  cyan: [0,255,255],
	  darkblue: [0,0,139],
	  darkcyan: [0,139,139],
	  darkgoldenrod:  [184,134,11],
	  darkgray: [169,169,169],
	  darkgreen:  [0,100,0],
	  darkgrey: [169,169,169],
	  darkkhaki:  [189,183,107],
	  darkmagenta:  [139,0,139],
	  darkolivegreen: [85,107,47],
	  darkorange: [255,140,0],
	  darkorchid: [153,50,204],
	  darkred:  [139,0,0],
	  darksalmon: [233,150,122],
	  darkseagreen: [143,188,143],
	  darkslateblue:  [72,61,139],
	  darkslategray:  [47,79,79],
	  darkslategrey:  [47,79,79],
	  darkturquoise:  [0,206,209],
	  darkviolet: [148,0,211],
	  deeppink: [255,20,147],
	  deepskyblue:  [0,191,255],
	  dimgray:  [105,105,105],
	  dimgrey:  [105,105,105],
	  dodgerblue: [30,144,255],
	  firebrick:  [178,34,34],
	  floralwhite:  [255,250,240],
	  forestgreen:  [34,139,34],
	  fuchsia:  [255,0,255],
	  gainsboro:  [220,220,220],
	  ghostwhite: [248,248,255],
	  gold: [255,215,0],
	  goldenrod:  [218,165,32],
	  gray: [128,128,128],
	  green:  [0,128,0],
	  greenyellow:  [173,255,47],
	  grey: [128,128,128],
	  honeydew: [240,255,240],
	  hotpink:  [255,105,180],
	  indianred:  [205,92,92],
	  indigo: [75,0,130],
	  ivory:  [255,255,240],
	  khaki:  [240,230,140],
	  lavender: [230,230,250],
	  lavenderblush:  [255,240,245],
	  lawngreen:  [124,252,0],
	  lemonchiffon: [255,250,205],
	  lightblue:  [173,216,230],
	  lightcoral: [240,128,128],
	  lightcyan:  [224,255,255],
	  lightgoldenrodyellow: [250,250,210],
	  lightgray:  [211,211,211],
	  lightgreen: [144,238,144],
	  lightgrey:  [211,211,211],
	  lightpink:  [255,182,193],
	  lightsalmon:  [255,160,122],
	  lightseagreen:  [32,178,170],
	  lightskyblue: [135,206,250],
	  lightslategray: [119,136,153],
	  lightslategrey: [119,136,153],
	  lightsteelblue: [176,196,222],
	  lightyellow:  [255,255,224],
	  lime: [0,255,0],
	  limegreen:  [50,205,50],
	  linen:  [250,240,230],
	  magenta:  [255,0,255],
	  maroon: [128,0,0],
	  mediumaquamarine: [102,205,170],
	  mediumblue: [0,0,205],
	  mediumorchid: [186,85,211],
	  mediumpurple: [147,112,219],
	  mediumseagreen: [60,179,113],
	  mediumslateblue:  [123,104,238],
	  mediumspringgreen:  [0,250,154],
	  mediumturquoise:  [72,209,204],
	  mediumvioletred:  [199,21,133],
	  midnightblue: [25,25,112],
	  mintcream:  [245,255,250],
	  mistyrose:  [255,228,225],
	  moccasin: [255,228,181],
	  navajowhite:  [255,222,173],
	  navy: [0,0,128],
	  oldlace:  [253,245,230],
	  olive:  [128,128,0],
	  olivedrab:  [107,142,35],
	  orange: [255,165,0],
	  orangered:  [255,69,0],
	  orchid: [218,112,214],
	  palegoldenrod:  [238,232,170],
	  palegreen:  [152,251,152],
	  paleturquoise:  [175,238,238],
	  palevioletred:  [219,112,147],
	  papayawhip: [255,239,213],
	  peachpuff:  [255,218,185],
	  peru: [205,133,63],
	  pink: [255,192,203],
	  plum: [221,160,221],
	  powderblue: [176,224,230],
	  purple: [128,0,128],
	  rebeccapurple: [102, 51, 153],
	  red:  [255,0,0],
	  rosybrown:  [188,143,143],
	  royalblue:  [65,105,225],
	  saddlebrown:  [139,69,19],
	  salmon: [250,128,114],
	  sandybrown: [244,164,96],
	  seagreen: [46,139,87],
	  seashell: [255,245,238],
	  sienna: [160,82,45],
	  silver: [192,192,192],
	  skyblue:  [135,206,235],
	  slateblue:  [106,90,205],
	  slategray:  [112,128,144],
	  slategrey:  [112,128,144],
	  snow: [255,250,250],
	  springgreen:  [0,255,127],
	  steelblue:  [70,130,180],
	  tan:  [210,180,140],
	  teal: [0,128,128],
	  thistle:  [216,191,216],
	  tomato: [255,99,71],
	  turquoise:  [64,224,208],
	  violet: [238,130,238],
	  wheat:  [245,222,179],
	  white:  [255,255,255],
	  whitesmoke: [245,245,245],
	  yellow: [255,255,0],
	  yellowgreen:  [154,205,50]
	};

	var reverseKeywords = {};
	for (var key in cssKeywords) {
	  reverseKeywords[JSON.stringify(cssKeywords[key])] = key;
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* MIT license */
	var colorNames = __webpack_require__(8);

	module.exports = {
	   getRgba: getRgba,
	   getHsla: getHsla,
	   getRgb: getRgb,
	   getHsl: getHsl,
	   getHwb: getHwb,
	   getAlpha: getAlpha,

	   hexString: hexString,
	   rgbString: rgbString,
	   rgbaString: rgbaString,
	   percentString: percentString,
	   percentaString: percentaString,
	   hslString: hslString,
	   hslaString: hslaString,
	   hwbString: hwbString,
	   keyword: keyword
	}

	function getRgba(string) {
	   if (!string) {
	      return;
	   }
	   var abbr =  /^#([a-fA-F0-9]{3})$/,
	       hex =  /^#([a-fA-F0-9]{6})$/,
	       rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
	       per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
	       keyword = /(\w+)/;

	   var rgb = [0, 0, 0],
	       a = 1,
	       match = string.match(abbr);
	   if (match) {
	      match = match[1];
	      for (var i = 0; i < rgb.length; i++) {
	         rgb[i] = parseInt(match[i] + match[i], 16);
	      }
	   }
	   else if (match = string.match(hex)) {
	      match = match[1];
	      for (var i = 0; i < rgb.length; i++) {
	         rgb[i] = parseInt(match.slice(i * 2, i * 2 + 2), 16);
	      }
	   }
	   else if (match = string.match(rgba)) {
	      for (var i = 0; i < rgb.length; i++) {
	         rgb[i] = parseInt(match[i + 1]);
	      }
	      a = parseFloat(match[4]);
	   }
	   else if (match = string.match(per)) {
	      for (var i = 0; i < rgb.length; i++) {
	         rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
	      }
	      a = parseFloat(match[4]);
	   }
	   else if (match = string.match(keyword)) {
	      if (match[1] == "transparent") {
	         return [0, 0, 0, 0];
	      }
	      rgb = colorNames[match[1]];
	      if (!rgb) {
	         return;
	      }
	   }

	   for (var i = 0; i < rgb.length; i++) {
	      rgb[i] = scale(rgb[i], 0, 255);
	   }
	   if (!a && a != 0) {
	      a = 1;
	   }
	   else {
	      a = scale(a, 0, 1);
	   }
	   rgb[3] = a;
	   return rgb;
	}

	function getHsla(string) {
	   if (!string) {
	      return;
	   }
	   var hsl = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
	   var match = string.match(hsl);
	   if (match) {
	      var alpha = parseFloat(match[4]);
	      var h = scale(parseInt(match[1]), 0, 360),
	          s = scale(parseFloat(match[2]), 0, 100),
	          l = scale(parseFloat(match[3]), 0, 100),
	          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
	      return [h, s, l, a];
	   }
	}

	function getHwb(string) {
	   if (!string) {
	      return;
	   }
	   var hwb = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
	   var match = string.match(hwb);
	   if (match) {
	    var alpha = parseFloat(match[4]);
	      var h = scale(parseInt(match[1]), 0, 360),
	          w = scale(parseFloat(match[2]), 0, 100),
	          b = scale(parseFloat(match[3]), 0, 100),
	          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
	      return [h, w, b, a];
	   }
	}

	function getRgb(string) {
	   var rgba = getRgba(string);
	   return rgba && rgba.slice(0, 3);
	}

	function getHsl(string) {
	  var hsla = getHsla(string);
	  return hsla && hsla.slice(0, 3);
	}

	function getAlpha(string) {
	   var vals = getRgba(string);
	   if (vals) {
	      return vals[3];
	   }
	   else if (vals = getHsla(string)) {
	      return vals[3];
	   }
	   else if (vals = getHwb(string)) {
	      return vals[3];
	   }
	}

	// generators
	function hexString(rgb) {
	   return "#" + hexDouble(rgb[0]) + hexDouble(rgb[1])
	              + hexDouble(rgb[2]);
	}

	function rgbString(rgba, alpha) {
	   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
	      return rgbaString(rgba, alpha);
	   }
	   return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
	}

	function rgbaString(rgba, alpha) {
	   if (alpha === undefined) {
	      alpha = (rgba[3] !== undefined ? rgba[3] : 1);
	   }
	   return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2]
	           + ", " + alpha + ")";
	}

	function percentString(rgba, alpha) {
	   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
	      return percentaString(rgba, alpha);
	   }
	   var r = Math.round(rgba[0]/255 * 100),
	       g = Math.round(rgba[1]/255 * 100),
	       b = Math.round(rgba[2]/255 * 100);

	   return "rgb(" + r + "%, " + g + "%, " + b + "%)";
	}

	function percentaString(rgba, alpha) {
	   var r = Math.round(rgba[0]/255 * 100),
	       g = Math.round(rgba[1]/255 * 100),
	       b = Math.round(rgba[2]/255 * 100);
	   return "rgba(" + r + "%, " + g + "%, " + b + "%, " + (alpha || rgba[3] || 1) + ")";
	}

	function hslString(hsla, alpha) {
	   if (alpha < 1 || (hsla[3] && hsla[3] < 1)) {
	      return hslaString(hsla, alpha);
	   }
	   return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
	}

	function hslaString(hsla, alpha) {
	   if (alpha === undefined) {
	      alpha = (hsla[3] !== undefined ? hsla[3] : 1);
	   }
	   return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, "
	           + alpha + ")";
	}

	// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
	// (hwb have alpha optional & 1 is default value)
	function hwbString(hwb, alpha) {
	   if (alpha === undefined) {
	      alpha = (hwb[3] !== undefined ? hwb[3] : 1);
	   }
	   return "hwb(" + hwb[0] + ", " + hwb[1] + "%, " + hwb[2] + "%"
	           + (alpha !== undefined && alpha !== 1 ? ", " + alpha : "") + ")";
	}

	function keyword(rgb) {
	  return reverseNames[rgb.slice(0, 3)];
	}

	// helpers
	function scale(num, min, max) {
	   return Math.min(Math.max(min, num), max);
	}

	function hexDouble(num) {
	  var str = num.toString(16).toUpperCase();
	  return (str.length < 2) ? "0" + str : str;
	}


	//create a list of reverse color names
	var reverseNames = {};
	for (var name in colorNames) {
	   reverseNames[colorNames[name]] = name;
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = {
		"aliceblue": [240, 248, 255],
		"antiquewhite": [250, 235, 215],
		"aqua": [0, 255, 255],
		"aquamarine": [127, 255, 212],
		"azure": [240, 255, 255],
		"beige": [245, 245, 220],
		"bisque": [255, 228, 196],
		"black": [0, 0, 0],
		"blanchedalmond": [255, 235, 205],
		"blue": [0, 0, 255],
		"blueviolet": [138, 43, 226],
		"brown": [165, 42, 42],
		"burlywood": [222, 184, 135],
		"cadetblue": [95, 158, 160],
		"chartreuse": [127, 255, 0],
		"chocolate": [210, 105, 30],
		"coral": [255, 127, 80],
		"cornflowerblue": [100, 149, 237],
		"cornsilk": [255, 248, 220],
		"crimson": [220, 20, 60],
		"cyan": [0, 255, 255],
		"darkblue": [0, 0, 139],
		"darkcyan": [0, 139, 139],
		"darkgoldenrod": [184, 134, 11],
		"darkgray": [169, 169, 169],
		"darkgreen": [0, 100, 0],
		"darkgrey": [169, 169, 169],
		"darkkhaki": [189, 183, 107],
		"darkmagenta": [139, 0, 139],
		"darkolivegreen": [85, 107, 47],
		"darkorange": [255, 140, 0],
		"darkorchid": [153, 50, 204],
		"darkred": [139, 0, 0],
		"darksalmon": [233, 150, 122],
		"darkseagreen": [143, 188, 143],
		"darkslateblue": [72, 61, 139],
		"darkslategray": [47, 79, 79],
		"darkslategrey": [47, 79, 79],
		"darkturquoise": [0, 206, 209],
		"darkviolet": [148, 0, 211],
		"deeppink": [255, 20, 147],
		"deepskyblue": [0, 191, 255],
		"dimgray": [105, 105, 105],
		"dimgrey": [105, 105, 105],
		"dodgerblue": [30, 144, 255],
		"firebrick": [178, 34, 34],
		"floralwhite": [255, 250, 240],
		"forestgreen": [34, 139, 34],
		"fuchsia": [255, 0, 255],
		"gainsboro": [220, 220, 220],
		"ghostwhite": [248, 248, 255],
		"gold": [255, 215, 0],
		"goldenrod": [218, 165, 32],
		"gray": [128, 128, 128],
		"green": [0, 128, 0],
		"greenyellow": [173, 255, 47],
		"grey": [128, 128, 128],
		"honeydew": [240, 255, 240],
		"hotpink": [255, 105, 180],
		"indianred": [205, 92, 92],
		"indigo": [75, 0, 130],
		"ivory": [255, 255, 240],
		"khaki": [240, 230, 140],
		"lavender": [230, 230, 250],
		"lavenderblush": [255, 240, 245],
		"lawngreen": [124, 252, 0],
		"lemonchiffon": [255, 250, 205],
		"lightblue": [173, 216, 230],
		"lightcoral": [240, 128, 128],
		"lightcyan": [224, 255, 255],
		"lightgoldenrodyellow": [250, 250, 210],
		"lightgray": [211, 211, 211],
		"lightgreen": [144, 238, 144],
		"lightgrey": [211, 211, 211],
		"lightpink": [255, 182, 193],
		"lightsalmon": [255, 160, 122],
		"lightseagreen": [32, 178, 170],
		"lightskyblue": [135, 206, 250],
		"lightslategray": [119, 136, 153],
		"lightslategrey": [119, 136, 153],
		"lightsteelblue": [176, 196, 222],
		"lightyellow": [255, 255, 224],
		"lime": [0, 255, 0],
		"limegreen": [50, 205, 50],
		"linen": [250, 240, 230],
		"magenta": [255, 0, 255],
		"maroon": [128, 0, 0],
		"mediumaquamarine": [102, 205, 170],
		"mediumblue": [0, 0, 205],
		"mediumorchid": [186, 85, 211],
		"mediumpurple": [147, 112, 219],
		"mediumseagreen": [60, 179, 113],
		"mediumslateblue": [123, 104, 238],
		"mediumspringgreen": [0, 250, 154],
		"mediumturquoise": [72, 209, 204],
		"mediumvioletred": [199, 21, 133],
		"midnightblue": [25, 25, 112],
		"mintcream": [245, 255, 250],
		"mistyrose": [255, 228, 225],
		"moccasin": [255, 228, 181],
		"navajowhite": [255, 222, 173],
		"navy": [0, 0, 128],
		"oldlace": [253, 245, 230],
		"olive": [128, 128, 0],
		"olivedrab": [107, 142, 35],
		"orange": [255, 165, 0],
		"orangered": [255, 69, 0],
		"orchid": [218, 112, 214],
		"palegoldenrod": [238, 232, 170],
		"palegreen": [152, 251, 152],
		"paleturquoise": [175, 238, 238],
		"palevioletred": [219, 112, 147],
		"papayawhip": [255, 239, 213],
		"peachpuff": [255, 218, 185],
		"peru": [205, 133, 63],
		"pink": [255, 192, 203],
		"plum": [221, 160, 221],
		"powderblue": [176, 224, 230],
		"purple": [128, 0, 128],
		"rebeccapurple": [102, 51, 153],
		"red": [255, 0, 0],
		"rosybrown": [188, 143, 143],
		"royalblue": [65, 105, 225],
		"saddlebrown": [139, 69, 19],
		"salmon": [250, 128, 114],
		"sandybrown": [244, 164, 96],
		"seagreen": [46, 139, 87],
		"seashell": [255, 245, 238],
		"sienna": [160, 82, 45],
		"silver": [192, 192, 192],
		"skyblue": [135, 206, 235],
		"slateblue": [106, 90, 205],
		"slategray": [112, 128, 144],
		"slategrey": [112, 128, 144],
		"snow": [255, 250, 250],
		"springgreen": [0, 255, 127],
		"steelblue": [70, 130, 180],
		"tan": [210, 180, 140],
		"teal": [0, 128, 128],
		"thistle": [216, 191, 216],
		"tomato": [255, 99, 71],
		"turquoise": [64, 224, 208],
		"violet": [238, 130, 238],
		"wheat": [245, 222, 179],
		"white": [255, 255, 255],
		"whitesmoke": [245, 245, 245],
		"yellow": [255, 255, 0],
		"yellowgreen": [154, 205, 50]
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {
		// Global Chart canvas helpers object for drawing items to canvas
		var helpers = Chart.canvasHelpers = {};

		helpers.drawPoint = function(ctx, pointStyle, radius, x, y) {
			var type, edgeLength, xOffset, yOffset, height, size;

			if (typeof pointStyle === 'object') {
				type = pointStyle.toString();
				if (type === '[object HTMLImageElement]' || type === '[object HTMLCanvasElement]') {
					ctx.drawImage(pointStyle, x - pointStyle.width / 2, y - pointStyle.height / 2);
					return;
				}
			}

			if (isNaN(radius) || radius <= 0) {
				return;
			}

			switch (pointStyle) {
			// Default includes circle
			default:
				ctx.beginPath();
				ctx.arc(x, y, radius, 0, Math.PI * 2);
				ctx.closePath();
				ctx.fill();
				break;
			case 'triangle':
				ctx.beginPath();
				edgeLength = 3 * radius / Math.sqrt(3);
				height = edgeLength * Math.sqrt(3) / 2;
				ctx.moveTo(x - edgeLength / 2, y + height / 3);
				ctx.lineTo(x + edgeLength / 2, y + height / 3);
				ctx.lineTo(x, y - 2 * height / 3);
				ctx.closePath();
				ctx.fill();
				break;
			case 'rect':
				size = 1 / Math.SQRT2 * radius;
				ctx.beginPath();
				ctx.fillRect(x - size, y - size, 2 * size, 2 * size);
				ctx.strokeRect(x - size, y - size, 2 * size, 2 * size);
				break;
			case 'rectRot':
				size = 1 / Math.SQRT2 * radius;
				ctx.beginPath();
				ctx.moveTo(x - size, y);
				ctx.lineTo(x, y + size);
				ctx.lineTo(x + size, y);
				ctx.lineTo(x, y - size);
				ctx.closePath();
				ctx.fill();
				break;
			case 'cross':
				ctx.beginPath();
				ctx.moveTo(x, y + radius);
				ctx.lineTo(x, y - radius);
				ctx.moveTo(x - radius, y);
				ctx.lineTo(x + radius, y);
				ctx.closePath();
				break;
			case 'crossRot':
				ctx.beginPath();
				xOffset = Math.cos(Math.PI / 4) * radius;
				yOffset = Math.sin(Math.PI / 4) * radius;
				ctx.moveTo(x - xOffset, y - yOffset);
				ctx.lineTo(x + xOffset, y + yOffset);
				ctx.moveTo(x - xOffset, y + yOffset);
				ctx.lineTo(x + xOffset, y - yOffset);
				ctx.closePath();
				break;
			case 'star':
				ctx.beginPath();
				ctx.moveTo(x, y + radius);
				ctx.lineTo(x, y - radius);
				ctx.moveTo(x - radius, y);
				ctx.lineTo(x + radius, y);
				xOffset = Math.cos(Math.PI / 4) * radius;
				yOffset = Math.sin(Math.PI / 4) * radius;
				ctx.moveTo(x - xOffset, y - yOffset);
				ctx.lineTo(x + xOffset, y + yOffset);
				ctx.moveTo(x - xOffset, y + yOffset);
				ctx.lineTo(x + xOffset, y - yOffset);
				ctx.closePath();
				break;
			case 'line':
				ctx.beginPath();
				ctx.moveTo(x - radius, y);
				ctx.lineTo(x + radius, y);
				ctx.closePath();
				break;
			case 'dash':
				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.lineTo(x + radius, y);
				ctx.closePath();
				break;
			}

			ctx.stroke();
		};
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;

		Chart.elements = {};

		Chart.Element = function(configuration) {
			helpers.extend(this, configuration);
			this.initialize.apply(this, arguments);
		};

		helpers.extend(Chart.Element.prototype, {

			initialize: function() {
				this.hidden = false;
			},

			pivot: function() {
				var me = this;
				if (!me._view) {
					me._view = helpers.clone(me._model);
				}
				me._start = helpers.clone(me._view);
				return me;
			},

			transition: function(ease) {
				var me = this;

				if (!me._view) {
					me._view = helpers.clone(me._model);
				}

				// No animation -> No Transition
				if (ease === 1) {
					me._view = me._model;
					me._start = null;
					return me;
				}

				if (!me._start) {
					me.pivot();
				}

				helpers.each(me._model, function(value, key) {

					if (key[0] === '_') {
						// Only non-underscored properties
					// Init if doesn't exist
					} else if (!me._view.hasOwnProperty(key)) {
						if (typeof value === 'number' && !isNaN(me._view[key])) {
							me._view[key] = value * ease;
						} else {
							me._view[key] = value;
						}
					// No unnecessary computations
					} else if (value === me._view[key]) {
						// It's the same! Woohoo!
					// Color transitions if possible
					} else if (typeof value === 'string') {
						try {
							var color = helpers.color(me._model[key]).mix(helpers.color(me._start[key]), ease);
							me._view[key] = color.rgbString();
						} catch (err) {
							me._view[key] = value;
						}
					// Number transitions
					} else if (typeof value === 'number') {
						var startVal = me._start[key] !== undefined && isNaN(me._start[key]) === false ? me._start[key] : 0;
						me._view[key] = ((me._model[key] - startVal) * ease) + startVal;
					// Everything else
					} else {
						me._view[key] = value;
					}
				}, me);

				return me;
			},

			tooltipPosition: function() {
				return {
					x: this._model.x,
					y: this._model.y
				};
			},

			hasValue: function() {
				return helpers.isNumber(this._model.x) && helpers.isNumber(this._model.y);
			}
		});

		Chart.Element.extend = helpers.inherits;

	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	/* global window: false */
	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;

		Chart.defaults.global.animation = {
			duration: 1000,
			easing: 'easeOutQuart',
			onProgress: helpers.noop,
			onComplete: helpers.noop
		};

		Chart.Animation = Chart.Element.extend({
			currentStep: null, // the current animation step
			numSteps: 60, // default number of steps
			easing: '', // the easing to use for this animation
			render: null, // render function used by the animation service

			onAnimationProgress: null, // user specified callback to fire on each step of the animation
			onAnimationComplete: null // user specified callback to fire when the animation finishes
		});

		Chart.animationService = {
			frameDuration: 17,
			animations: [],
			dropFrames: 0,
			request: null,
			addAnimation: function(chartInstance, animationObject, duration, lazy) {
				var me = this;

				if (!lazy) {
					chartInstance.animating = true;
				}

				for (var index = 0; index < me.animations.length; ++index) {
					if (me.animations[index].chartInstance === chartInstance) {
						// replacing an in progress animation
						me.animations[index].animationObject = animationObject;
						return;
					}
				}

				me.animations.push({
					chartInstance: chartInstance,
					animationObject: animationObject
				});

				// If there are no animations queued, manually kickstart a digest, for lack of a better word
				if (me.animations.length === 1) {
					me.requestAnimationFrame();
				}
			},
			// Cancel the animation for a given chart instance
			cancelAnimation: function(chartInstance) {
				var index = helpers.findIndex(this.animations, function(animationWrapper) {
					return animationWrapper.chartInstance === chartInstance;
				});

				if (index !== -1) {
					this.animations.splice(index, 1);
					chartInstance.animating = false;
				}
			},
			requestAnimationFrame: function() {
				var me = this;
				if (me.request === null) {
					// Skip animation frame requests until the active one is executed.
					// This can happen when processing mouse events, e.g. 'mousemove'
					// and 'mouseout' events will trigger multiple renders.
					me.request = helpers.requestAnimFrame.call(window, function() {
						me.request = null;
						me.startDigest();
					});
				}
			},
			startDigest: function() {
				var me = this;

				var startTime = Date.now();
				var framesToDrop = 0;

				if (me.dropFrames > 1) {
					framesToDrop = Math.floor(me.dropFrames);
					me.dropFrames = me.dropFrames % 1;
				}

				var i = 0;
				while (i < me.animations.length) {
					if (me.animations[i].animationObject.currentStep === null) {
						me.animations[i].animationObject.currentStep = 0;
					}

					me.animations[i].animationObject.currentStep += 1 + framesToDrop;

					if (me.animations[i].animationObject.currentStep > me.animations[i].animationObject.numSteps) {
						me.animations[i].animationObject.currentStep = me.animations[i].animationObject.numSteps;
					}

					me.animations[i].animationObject.render(me.animations[i].chartInstance, me.animations[i].animationObject);
					if (me.animations[i].animationObject.onAnimationProgress && me.animations[i].animationObject.onAnimationProgress.call) {
						me.animations[i].animationObject.onAnimationProgress.call(me.animations[i].chartInstance, me.animations[i]);
					}

					if (me.animations[i].animationObject.currentStep === me.animations[i].animationObject.numSteps) {
						if (me.animations[i].animationObject.onAnimationComplete && me.animations[i].animationObject.onAnimationComplete.call) {
							me.animations[i].animationObject.onAnimationComplete.call(me.animations[i].chartInstance, me.animations[i]);
						}

						// executed the last frame. Remove the animation.
						me.animations[i].chartInstance.animating = false;

						me.animations.splice(i, 1);
					} else {
						++i;
					}
				}

				var endTime = Date.now();
				var dropFrames = (endTime - startTime) / me.frameDuration;

				me.dropFrames += dropFrames;

				// Do we have more stuff to animate?
				if (me.animations.length > 0) {
					me.requestAnimationFrame();
				}
			}
		};
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;
		// Create a dictionary of chart types, to allow for extension of existing types
		Chart.types = {};

		// Store a reference to each instance - allowing us to globally resize chart instances on window resize.
		// Destroy method on the chart will remove the instance of the chart from this reference.
		Chart.instances = {};

		// Controllers available for dataset visualization eg. bar, line, slice, etc.
		Chart.controllers = {};

		/**
		 * @class Chart.Controller
		 * The main controller of a chart.
		 */
		Chart.Controller = function(instance) {

			this.chart = instance;
			this.config = instance.config;
			this.options = this.config.options = helpers.configMerge(Chart.defaults.global, Chart.defaults[this.config.type], this.config.options || {});
			this.id = helpers.uid();

			Object.defineProperty(this, 'data', {
				get: function() {
					return this.config.data;
				}
			});

			// Add the chart instance to the global namespace
			Chart.instances[this.id] = this;

			if (this.options.responsive) {
				// Silent resize before chart draws
				this.resize(true);
			}

			this.initialize();

			return this;
		};

		helpers.extend(Chart.Controller.prototype, /** @lends Chart.Controller */ {

			initialize: function() {
				var me = this;
				// Before init plugin notification
				Chart.plugins.notify('beforeInit', [me]);

				me.bindEvents();

				// Make sure controllers are built first so that each dataset is bound to an axis before the scales
				// are built
				me.ensureScalesHaveIDs();
				me.buildOrUpdateControllers();
				me.buildScales();
				me.updateLayout();
				me.resetElements();
				me.initToolTip();
				me.update();

				// After init plugin notification
				Chart.plugins.notify('afterInit', [me]);

				return me;
			},

			clear: function() {
				helpers.clear(this.chart);
				return this;
			},

			stop: function() {
				// Stops any current animation loop occuring
				Chart.animationService.cancelAnimation(this);
				return this;
			},

			resize: function(silent) {
				var me = this;
				var chart = me.chart;
				var canvas = chart.canvas;
				var newWidth = helpers.getMaximumWidth(canvas);
				var aspectRatio = chart.aspectRatio;
				var newHeight = (me.options.maintainAspectRatio && isNaN(aspectRatio) === false && isFinite(aspectRatio) && aspectRatio !== 0) ? newWidth / aspectRatio : helpers.getMaximumHeight(canvas);

				var sizeChanged = chart.width !== newWidth || chart.height !== newHeight;

				if (!sizeChanged) {
					return me;
				}

				canvas.width = chart.width = newWidth;
				canvas.height = chart.height = newHeight;

				helpers.retinaScale(chart);

				// Notify any plugins about the resize
				var newSize = {width: newWidth, height: newHeight};
				Chart.plugins.notify('resize', [me, newSize]);

				// Notify of resize
				if (me.options.onResize) {
					me.options.onResize(me, newSize);
				}

				if (!silent) {
					me.stop();
					me.update(me.options.responsiveAnimationDuration);
				}

				return me;
			},

			ensureScalesHaveIDs: function() {
				var options = this.options;
				var scalesOptions = options.scales || {};
				var scaleOptions = options.scale;

				helpers.each(scalesOptions.xAxes, function(xAxisOptions, index) {
					xAxisOptions.id = xAxisOptions.id || ('x-axis-' + index);
				});

				helpers.each(scalesOptions.yAxes, function(yAxisOptions, index) {
					yAxisOptions.id = yAxisOptions.id || ('y-axis-' + index);
				});

				if (scaleOptions) {
					scaleOptions.id = scaleOptions.id || 'scale';
				}
			},

			/**
			 * Builds a map of scale ID to scale object for future lookup.
			 */
			buildScales: function() {
				var me = this;
				var options = me.options;
				var scales = me.scales = {};
				var items = [];

				if (options.scales) {
					items = items.concat(
						(options.scales.xAxes || []).map(function(xAxisOptions) {
							return {options: xAxisOptions, dtype: 'category'};
						}),
						(options.scales.yAxes || []).map(function(yAxisOptions) {
							return {options: yAxisOptions, dtype: 'linear'};
						})
					);
				}

				if (options.scale) {
					items.push({options: options.scale, dtype: 'radialLinear', isDefault: true});
				}

				helpers.each(items, function(item) {
					var scaleOptions = item.options;
					var scaleType = helpers.getValueOrDefault(scaleOptions.type, item.dtype);
					var scaleClass = Chart.scaleService.getScaleConstructor(scaleType);
					if (!scaleClass) {
						return;
					}

					var scale = new scaleClass({
						id: scaleOptions.id,
						options: scaleOptions,
						ctx: me.chart.ctx,
						chart: me
					});

					scales[scale.id] = scale;

					// TODO(SB): I think we should be able to remove this custom case (options.scale)
					// and consider it as a regular scale part of the "scales"" map only! This would
					// make the logic easier and remove some useless? custom code.
					if (item.isDefault) {
						me.scale = scale;
					}
				});

				Chart.scaleService.addScalesToLayout(this);
			},

			updateLayout: function() {
				Chart.layoutService.update(this, this.chart.width, this.chart.height);
			},

			buildOrUpdateControllers: function() {
				var me = this;
				var types = [];
				var newControllers = [];

				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					var meta = me.getDatasetMeta(datasetIndex);
					if (!meta.type) {
						meta.type = dataset.type || me.config.type;
					}

					types.push(meta.type);

					if (meta.controller) {
						meta.controller.updateIndex(datasetIndex);
					} else {
						meta.controller = new Chart.controllers[meta.type](me, datasetIndex);
						newControllers.push(meta.controller);
					}
				}, me);

				if (types.length > 1) {
					for (var i = 1; i < types.length; i++) {
						if (types[i] !== types[i - 1]) {
							me.isCombo = true;
							break;
						}
					}
				}

				return newControllers;
			},

			resetElements: function() {
				var me = this;
				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					me.getDatasetMeta(datasetIndex).controller.reset();
				}, me);
			},

			update: function(animationDuration, lazy) {
				var me = this;
				Chart.plugins.notify('beforeUpdate', [me]);

				// In case the entire data object changed
				me.tooltip._data = me.data;

				// Make sure dataset controllers are updated and new controllers are reset
				var newControllers = me.buildOrUpdateControllers();

				// Make sure all dataset controllers have correct meta data counts
				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					me.getDatasetMeta(datasetIndex).controller.buildOrUpdateElements();
				}, me);

				Chart.layoutService.update(me, me.chart.width, me.chart.height);

				// Apply changes to the dataets that require the scales to have been calculated i.e BorderColor chages
				Chart.plugins.notify('afterScaleUpdate', [me]);

				// Can only reset the new controllers after the scales have been updated
				helpers.each(newControllers, function(controller) {
					controller.reset();
				});

				me.updateDatasets();

				// Do this before render so that any plugins that need final scale updates can use it
				Chart.plugins.notify('afterUpdate', [me]);

				me.render(animationDuration, lazy);
			},

			/**
			 * @method beforeDatasetsUpdate
			 * @description Called before all datasets are updated. If a plugin returns false,
			 * the datasets update will be cancelled until another chart update is triggered.
			 * @param {Object} instance the chart instance being updated.
			 * @returns {Boolean} false to cancel the datasets update.
			 * @memberof Chart.PluginBase
			 * @since version 2.1.5
			 * @instance
			 */

			/**
			 * @method afterDatasetsUpdate
			 * @description Called after all datasets have been updated. Note that this
			 * extension will not be called if the datasets update has been cancelled.
			 * @param {Object} instance the chart instance being updated.
			 * @memberof Chart.PluginBase
			 * @since version 2.1.5
			 * @instance
			 */

			/**
			 * Updates all datasets unless a plugin returns false to the beforeDatasetsUpdate
			 * extension, in which case no datasets will be updated and the afterDatasetsUpdate
			 * notification will be skipped.
			 * @protected
			 * @instance
			 */
			updateDatasets: function() {
				var me = this;
				var i, ilen;

				if (Chart.plugins.notify('beforeDatasetsUpdate', [me])) {
					for (i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
						me.getDatasetMeta(i).controller.update();
					}

					Chart.plugins.notify('afterDatasetsUpdate', [me]);
				}
			},

			render: function(duration, lazy) {
				var me = this;
				Chart.plugins.notify('beforeRender', [me]);

				var animationOptions = me.options.animation;
				if (animationOptions && ((typeof duration !== 'undefined' && duration !== 0) || (typeof duration === 'undefined' && animationOptions.duration !== 0))) {
					var animation = new Chart.Animation();
					animation.numSteps = (duration || animationOptions.duration) / 16.66; // 60 fps
					animation.easing = animationOptions.easing;

					// render function
					animation.render = function(chartInstance, animationObject) {
						var easingFunction = helpers.easingEffects[animationObject.easing];
						var stepDecimal = animationObject.currentStep / animationObject.numSteps;
						var easeDecimal = easingFunction(stepDecimal);

						chartInstance.draw(easeDecimal, stepDecimal, animationObject.currentStep);
					};

					// user events
					animation.onAnimationProgress = animationOptions.onProgress;
					animation.onAnimationComplete = animationOptions.onComplete;

					Chart.animationService.addAnimation(me, animation, duration, lazy);
				} else {
					me.draw();
					if (animationOptions && animationOptions.onComplete && animationOptions.onComplete.call) {
						animationOptions.onComplete.call(me);
					}
				}
				return me;
			},

			draw: function(ease) {
				var me = this;
				var easingDecimal = ease || 1;
				me.clear();

				Chart.plugins.notify('beforeDraw', [me, easingDecimal]);

				// Draw all the scales
				helpers.each(me.boxes, function(box) {
					box.draw(me.chartArea);
				}, me);
				if (me.scale) {
					me.scale.draw();
				}

				Chart.plugins.notify('beforeDatasetsDraw', [me, easingDecimal]);

				// Draw each dataset via its respective controller (reversed to support proper line stacking)
				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					if (me.isDatasetVisible(datasetIndex)) {
						me.getDatasetMeta(datasetIndex).controller.draw(ease);
					}
				}, me, true);

				Chart.plugins.notify('afterDatasetsDraw', [me, easingDecimal]);

				// Finally draw the tooltip
				me.tooltip.transition(easingDecimal).draw();

				Chart.plugins.notify('afterDraw', [me, easingDecimal]);
			},

			// Get the single element that was clicked on
			// @return : An object containing the dataset index and element index of the matching element. Also contains the rectangle that was draw
			getElementAtEvent: function(e) {
				var me = this;
				var eventPosition = helpers.getRelativePosition(e, me.chart);
				var elementsArray = [];

				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					if (me.isDatasetVisible(datasetIndex)) {
						var meta = me.getDatasetMeta(datasetIndex);
						helpers.each(meta.data, function(element) {
							if (element.inRange(eventPosition.x, eventPosition.y)) {
								elementsArray.push(element);
								return elementsArray;
							}
						});
					}
				});

				return elementsArray.slice(0, 1);
			},

			getElementsAtEvent: function(e) {
				var me = this;
				var eventPosition = helpers.getRelativePosition(e, me.chart);
				var elementsArray = [];

				var found = function() {
					if (me.data.datasets) {
						for (var i = 0; i < me.data.datasets.length; i++) {
							var meta = me.getDatasetMeta(i);
							if (me.isDatasetVisible(i)) {
								for (var j = 0; j < meta.data.length; j++) {
									if (meta.data[j].inRange(eventPosition.x, eventPosition.y)) {
										return meta.data[j];
									}
								}
							}
						}
					}
				}.call(me);

				if (!found) {
					return elementsArray;
				}

				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					if (me.isDatasetVisible(datasetIndex)) {
						var meta = me.getDatasetMeta(datasetIndex),
							element = meta.data[found._index];
						if (element && !element._view.skip) {
							elementsArray.push(element);
						}
					}
				}, me);

				return elementsArray;
			},

			getElementsAtXAxis: function(e) {
				var me = this;
				var eventPosition = helpers.getRelativePosition(e, me.chart);
				var elementsArray = [];

				var found = function() {
					if (me.data.datasets) {
						for (var i = 0; i < me.data.datasets.length; i++) {
							var meta = me.getDatasetMeta(i);
							if (me.isDatasetVisible(i)) {
								for (var j = 0; j < meta.data.length; j++) {
									if (meta.data[j].inLabelRange(eventPosition.x, eventPosition.y)) {
										return meta.data[j];
									}
								}
							}
						}
					}
				}.call(me);

				if (!found) {
					return elementsArray;
				}

				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					if (me.isDatasetVisible(datasetIndex)) {
						var meta = me.getDatasetMeta(datasetIndex);
						var index = helpers.findIndex(meta.data, function(it) {
							return found._model.x === it._model.x;
						});
						if (index !== -1 && !meta.data[index]._view.skip) {
							elementsArray.push(meta.data[index]);
						}
					}
				}, me);

				return elementsArray;
			},

			getElementsAtEventForMode: function(e, mode) {
				var me = this;
				switch (mode) {
				case 'single':
					return me.getElementAtEvent(e);
				case 'label':
					return me.getElementsAtEvent(e);
				case 'dataset':
					return me.getDatasetAtEvent(e);
				case 'x-axis':
					return me.getElementsAtXAxis(e);
				default:
					return e;
				}
			},

			getDatasetAtEvent: function(e) {
				var elementsArray = this.getElementAtEvent(e);

				if (elementsArray.length > 0) {
					elementsArray = this.getDatasetMeta(elementsArray[0]._datasetIndex).data;
				}

				return elementsArray;
			},

			getDatasetMeta: function(datasetIndex) {
				var me = this;
				var dataset = me.data.datasets[datasetIndex];
				if (!dataset._meta) {
					dataset._meta = {};
				}

				var meta = dataset._meta[me.id];
				if (!meta) {
					meta = dataset._meta[me.id] = {
						type: null,
						data: [],
						dataset: null,
						controller: null,
						hidden: null,			// See isDatasetVisible() comment
						xAxisID: null,
						yAxisID: null
					};
				}

				return meta;
			},

			getVisibleDatasetCount: function() {
				var count = 0;
				for (var i = 0, ilen = this.data.datasets.length; i<ilen; ++i) {
					if (this.isDatasetVisible(i)) {
						count++;
					}
				}
				return count;
			},

			isDatasetVisible: function(datasetIndex) {
				var meta = this.getDatasetMeta(datasetIndex);

				// meta.hidden is a per chart dataset hidden flag override with 3 states: if true or false,
				// the dataset.hidden value is ignored, else if null, the dataset hidden state is returned.
				return typeof meta.hidden === 'boolean'? !meta.hidden : !this.data.datasets[datasetIndex].hidden;
			},

			generateLegend: function() {
				return this.options.legendCallback(this);
			},

			destroy: function() {
				var me = this;
				me.stop();
				me.clear();
				helpers.unbindEvents(me, me.events);
				helpers.removeResizeListener(me.chart.canvas.parentNode);

				// Reset canvas height/width attributes
				var canvas = me.chart.canvas;
				canvas.width = me.chart.width;
				canvas.height = me.chart.height;

				// if we scaled the canvas in response to a devicePixelRatio !== 1, we need to undo that transform here
				if (me.chart.originalDevicePixelRatio !== undefined) {
					me.chart.ctx.scale(1 / me.chart.originalDevicePixelRatio, 1 / me.chart.originalDevicePixelRatio);
				}

				// Reset to the old style since it may have been changed by the device pixel ratio changes
				canvas.style.width = me.chart.originalCanvasStyleWidth;
				canvas.style.height = me.chart.originalCanvasStyleHeight;

				Chart.plugins.notify('destroy', [me]);

				delete Chart.instances[me.id];
			},

			toBase64Image: function() {
				return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments);
			},

			initToolTip: function() {
				var me = this;
				me.tooltip = new Chart.Tooltip({
					_chart: me.chart,
					_chartInstance: me,
					_data: me.data,
					_options: me.options.tooltips
				}, me);
			},

			bindEvents: function() {
				var me = this;
				helpers.bindEvents(me, me.options.events, function(evt) {
					me.eventHandler(evt);
				});
			},

			updateHoverStyle: function(elements, mode, enabled) {
				var method = enabled? 'setHoverStyle' : 'removeHoverStyle';
				var element, i, ilen;

				switch (mode) {
				case 'single':
					elements = [elements[0]];
					break;
				case 'label':
				case 'dataset':
				case 'x-axis':
					// elements = elements;
					break;
				default:
					// unsupported mode
					return;
				}

				for (i=0, ilen=elements.length; i<ilen; ++i) {
					element = elements[i];
					if (element) {
						this.getDatasetMeta(element._datasetIndex).controller[method](element);
					}
				}
			},

			eventHandler: function(e) {
				var me = this;
				var tooltip = me.tooltip;
				var options = me.options || {};
				var hoverOptions = options.hover;
				var tooltipsOptions = options.tooltips;

				me.lastActive = me.lastActive || [];
				me.lastTooltipActive = me.lastTooltipActive || [];

				// Find Active Elements for hover and tooltips
				if (e.type === 'mouseout') {
					me.active = [];
					me.tooltipActive = [];
				} else {
					me.active = me.getElementsAtEventForMode(e, hoverOptions.mode);
					me.tooltipActive = me.getElementsAtEventForMode(e, tooltipsOptions.mode);
				}

				// On Hover hook
				if (hoverOptions.onHover) {
					hoverOptions.onHover.call(me, me.active);
				}

				if (me.legend && me.legend.handleEvent) {
					me.legend.handleEvent(e);
				}

				if (e.type === 'mouseup' || e.type === 'click') {
					if (options.onClick) {
						options.onClick.call(me, e, me.active);
					}
				}

				// Remove styling for last active (even if it may still be active)
				if (me.lastActive.length) {
					me.updateHoverStyle(me.lastActive, hoverOptions.mode, false);
				}

				// Built in hover styling
				if (me.active.length && hoverOptions.mode) {
					me.updateHoverStyle(me.active, hoverOptions.mode, true);
				}

				// Built in Tooltips
				if (tooltipsOptions.enabled || tooltipsOptions.custom) {
					tooltip.initialize();
					tooltip._active = me.tooltipActive;
					tooltip.update(true);
				}

				// Hover animations
				tooltip.pivot();

				if (!me.animating) {
					// If entering, leaving, or changing elements, animate the change via pivot
					if (!helpers.arrayEquals(me.active, me.lastActive) ||
						!helpers.arrayEquals(me.tooltipActive, me.lastTooltipActive)) {

						me.stop();

						if (tooltipsOptions.enabled || tooltipsOptions.custom) {
							tooltip.update(true);
						}

						// We only need to render at this point. Updating will cause scales to be
						// recomputed generating flicker & using more memory than necessary.
						me.render(hoverOptions.animationDuration, true);
					}
				}

				// Remember Last Actives
				me.lastActive = me.active;
				me.lastTooltipActive = me.tooltipActive;
				return me;
			}
		});
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;
		var noop = helpers.noop;

		// Base class for all dataset controllers (line, bar, etc)
		Chart.DatasetController = function(chart, datasetIndex) {
			this.initialize(chart, datasetIndex);
		};

		helpers.extend(Chart.DatasetController.prototype, {

			/**
			 * Element type used to generate a meta dataset (e.g. Chart.element.Line).
			 * @type {Chart.core.element}
			 */
			datasetElementType: null,

			/**
			 * Element type used to generate a meta data (e.g. Chart.element.Point).
			 * @type {Chart.core.element}
			 */
			dataElementType: null,

			initialize: function(chart, datasetIndex) {
				var me = this;
				me.chart = chart;
				me.index = datasetIndex;
				me.linkScales();
				me.addElements();
			},

			updateIndex: function(datasetIndex) {
				this.index = datasetIndex;
			},

			linkScales: function() {
				var me = this;
				var meta = me.getMeta();
				var dataset = me.getDataset();

				if (meta.xAxisID === null) {
					meta.xAxisID = dataset.xAxisID || me.chart.options.scales.xAxes[0].id;
				}
				if (meta.yAxisID === null) {
					meta.yAxisID = dataset.yAxisID || me.chart.options.scales.yAxes[0].id;
				}
			},

			getDataset: function() {
				return this.chart.data.datasets[this.index];
			},

			getMeta: function() {
				return this.chart.getDatasetMeta(this.index);
			},

			getScaleForId: function(scaleID) {
				return this.chart.scales[scaleID];
			},

			reset: function() {
				this.update(true);
			},

			createMetaDataset: function() {
				var me = this;
				var type = me.datasetElementType;
				return type && new type({
					_chart: me.chart.chart,
					_datasetIndex: me.index
				});
			},

			createMetaData: function(index) {
				var me = this;
				var type = me.dataElementType;
				return type && new type({
					_chart: me.chart.chart,
					_datasetIndex: me.index,
					_index: index
				});
			},

			addElements: function() {
				var me = this;
				var meta = me.getMeta();
				var data = me.getDataset().data || [];
				var metaData = meta.data;
				var i, ilen;

				for (i=0, ilen=data.length; i<ilen; ++i) {
					metaData[i] = metaData[i] || me.createMetaData(meta, i);
				}

				meta.dataset = meta.dataset || me.createMetaDataset();
			},

			addElementAndReset: function(index) {
				var me = this;
				var element = me.createMetaData(index);
				me.getMeta().data.splice(index, 0, element);
				me.updateElement(element, index, true);
			},

			buildOrUpdateElements: function() {
				// Handle the number of data points changing
				var meta = this.getMeta(),
					md = meta.data,
					numData = this.getDataset().data.length,
					numMetaData = md.length;

				// Make sure that we handle number of datapoints changing
				if (numData < numMetaData) {
					// Remove excess bars for data points that have been removed
					md.splice(numData, numMetaData - numData);
				} else if (numData > numMetaData) {
					// Add new elements
					for (var index = numMetaData; index < numData; ++index) {
						this.addElementAndReset(index);
					}
				}
			},

			update: noop,

			draw: function(ease) {
				var easingDecimal = ease || 1;
				helpers.each(this.getMeta().data, function(element) {
					element.transition(easingDecimal).draw();
				});
			},

			removeHoverStyle: function(element, elementOpts) {
				var dataset = this.chart.data.datasets[element._datasetIndex],
					index = element._index,
					custom = element.custom || {},
					valueOrDefault = helpers.getValueAtIndexOrDefault,
					model = element._model;

				model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : valueOrDefault(dataset.backgroundColor, index, elementOpts.backgroundColor);
				model.borderColor = custom.borderColor ? custom.borderColor : valueOrDefault(dataset.borderColor, index, elementOpts.borderColor);
				model.borderWidth = custom.borderWidth ? custom.borderWidth : valueOrDefault(dataset.borderWidth, index, elementOpts.borderWidth);
			},

			setHoverStyle: function(element) {
				var dataset = this.chart.data.datasets[element._datasetIndex],
					index = element._index,
					custom = element.custom || {},
					valueOrDefault = helpers.getValueAtIndexOrDefault,
					getHoverColor = helpers.getHoverColor,
					model = element._model;

				model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : valueOrDefault(dataset.hoverBackgroundColor, index, getHoverColor(model.backgroundColor));
				model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : valueOrDefault(dataset.hoverBorderColor, index, getHoverColor(model.borderColor));
				model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : valueOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
			}

		});

		Chart.DatasetController.extend = helpers.inherits;
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;

		// The layout service is very self explanatory.  It's responsible for the layout within a chart.
		// Scales, Legends and Plugins all rely on the layout service and can easily register to be placed anywhere they need
		// It is this service's responsibility of carrying out that layout.
		Chart.layoutService = {
			defaults: {},

			// Register a box to a chartInstance. A box is simply a reference to an object that requires layout. eg. Scales, Legend, Plugins.
			addBox: function(chartInstance, box) {
				if (!chartInstance.boxes) {
					chartInstance.boxes = [];
				}
				chartInstance.boxes.push(box);
			},

			removeBox: function(chartInstance, box) {
				if (!chartInstance.boxes) {
					return;
				}
				chartInstance.boxes.splice(chartInstance.boxes.indexOf(box), 1);
			},

			// The most important function
			update: function(chartInstance, width, height) {

				if (!chartInstance) {
					return;
				}

				var xPadding = 0;
				var yPadding = 0;

				var leftBoxes = helpers.where(chartInstance.boxes, function(box) {
					return box.options.position === 'left';
				});
				var rightBoxes = helpers.where(chartInstance.boxes, function(box) {
					return box.options.position === 'right';
				});
				var topBoxes = helpers.where(chartInstance.boxes, function(box) {
					return box.options.position === 'top';
				});
				var bottomBoxes = helpers.where(chartInstance.boxes, function(box) {
					return box.options.position === 'bottom';
				});

				// Boxes that overlay the chartarea such as the radialLinear scale
				var chartAreaBoxes = helpers.where(chartInstance.boxes, function(box) {
					return box.options.position === 'chartArea';
				});

				// Ensure that full width boxes are at the very top / bottom
				topBoxes.sort(function(a, b) {
					return (b.options.fullWidth ? 1 : 0) - (a.options.fullWidth ? 1 : 0);
				});
				bottomBoxes.sort(function(a, b) {
					return (a.options.fullWidth ? 1 : 0) - (b.options.fullWidth ? 1 : 0);
				});

				// Essentially we now have any number of boxes on each of the 4 sides.
				// Our canvas looks like the following.
				// The areas L1 and L2 are the left axes. R1 is the right axis, T1 is the top axis and
				// B1 is the bottom axis
				// There are also 4 quadrant-like locations (left to right instead of clockwise) reserved for chart overlays
				// These locations are single-box locations only, when trying to register a chartArea location that is already taken,
				// an error will be thrown.
				//
				// |----------------------------------------------------|
				// |                  T1 (Full Width)                   |
				// |----------------------------------------------------|
				// |    |    |                 T2                  |    |
				// |    |----|-------------------------------------|----|
				// |    |    | C1 |                           | C2 |    |
				// |    |    |----|                           |----|    |
				// |    |    |                                     |    |
				// | L1 | L2 |           ChartArea (C0)            | R1 |
				// |    |    |                                     |    |
				// |    |    |----|                           |----|    |
				// |    |    | C3 |                           | C4 |    |
				// |    |----|-------------------------------------|----|
				// |    |    |                 B1                  |    |
				// |----------------------------------------------------|
				// |                  B2 (Full Width)                   |
				// |----------------------------------------------------|
				//
				// What we do to find the best sizing, we do the following
				// 1. Determine the minimum size of the chart area.
				// 2. Split the remaining width equally between each vertical axis
				// 3. Split the remaining height equally between each horizontal axis
				// 4. Give each layout the maximum size it can be. The layout will return it's minimum size
				// 5. Adjust the sizes of each axis based on it's minimum reported size.
				// 6. Refit each axis
				// 7. Position each axis in the final location
				// 8. Tell the chart the final location of the chart area
				// 9. Tell any axes that overlay the chart area the positions of the chart area

				// Step 1
				var chartWidth = width - (2 * xPadding);
				var chartHeight = height - (2 * yPadding);
				var chartAreaWidth = chartWidth / 2; // min 50%
				var chartAreaHeight = chartHeight / 2; // min 50%

				// Step 2
				var verticalBoxWidth = (width - chartAreaWidth) / (leftBoxes.length + rightBoxes.length);

				// Step 3
				var horizontalBoxHeight = (height - chartAreaHeight) / (topBoxes.length + bottomBoxes.length);

				// Step 4
				var maxChartAreaWidth = chartWidth;
				var maxChartAreaHeight = chartHeight;
				var minBoxSizes = [];

				function getMinimumBoxSize(box) {
					var minSize;
					var isHorizontal = box.isHorizontal();

					if (isHorizontal) {
						minSize = box.update(box.options.fullWidth ? chartWidth : maxChartAreaWidth, horizontalBoxHeight);
						maxChartAreaHeight -= minSize.height;
					} else {
						minSize = box.update(verticalBoxWidth, chartAreaHeight);
						maxChartAreaWidth -= minSize.width;
					}

					minBoxSizes.push({
						horizontal: isHorizontal,
						minSize: minSize,
						box: box
					});
				}

				helpers.each(leftBoxes.concat(rightBoxes, topBoxes, bottomBoxes), getMinimumBoxSize);

				// At this point, maxChartAreaHeight and maxChartAreaWidth are the size the chart area could
				// be if the axes are drawn at their minimum sizes.

				// Steps 5 & 6
				var totalLeftBoxesWidth = xPadding;
				var totalRightBoxesWidth = xPadding;
				var totalTopBoxesHeight = yPadding;
				var totalBottomBoxesHeight = yPadding;

				// Function to fit a box
				function fitBox(box) {
					var minBoxSize = helpers.findNextWhere(minBoxSizes, function(minBox) {
						return minBox.box === box;
					});

					if (minBoxSize) {
						if (box.isHorizontal()) {
							var scaleMargin = {
								left: totalLeftBoxesWidth,
								right: totalRightBoxesWidth,
								top: 0,
								bottom: 0
							};

							// Don't use min size here because of label rotation. When the labels are rotated, their rotation highly depends
							// on the margin. Sometimes they need to increase in size slightly
							box.update(box.options.fullWidth ? chartWidth : maxChartAreaWidth, chartHeight / 2, scaleMargin);
						} else {
							box.update(minBoxSize.minSize.width, maxChartAreaHeight);
						}
					}
				}

				// Update, and calculate the left and right margins for the horizontal boxes
				helpers.each(leftBoxes.concat(rightBoxes), fitBox);

				helpers.each(leftBoxes, function(box) {
					totalLeftBoxesWidth += box.width;
				});

				helpers.each(rightBoxes, function(box) {
					totalRightBoxesWidth += box.width;
				});

				// Set the Left and Right margins for the horizontal boxes
				helpers.each(topBoxes.concat(bottomBoxes), fitBox);

				// Figure out how much margin is on the top and bottom of the vertical boxes
				helpers.each(topBoxes, function(box) {
					totalTopBoxesHeight += box.height;
				});

				helpers.each(bottomBoxes, function(box) {
					totalBottomBoxesHeight += box.height;
				});

				function finalFitVerticalBox(box) {
					var minBoxSize = helpers.findNextWhere(minBoxSizes, function(minSize) {
						return minSize.box === box;
					});

					var scaleMargin = {
						left: 0,
						right: 0,
						top: totalTopBoxesHeight,
						bottom: totalBottomBoxesHeight
					};

					if (minBoxSize) {
						box.update(minBoxSize.minSize.width, maxChartAreaHeight, scaleMargin);
					}
				}

				// Let the left layout know the final margin
				helpers.each(leftBoxes.concat(rightBoxes), finalFitVerticalBox);

				// Recalculate because the size of each layout might have changed slightly due to the margins (label rotation for instance)
				totalLeftBoxesWidth = xPadding;
				totalRightBoxesWidth = xPadding;
				totalTopBoxesHeight = yPadding;
				totalBottomBoxesHeight = yPadding;

				helpers.each(leftBoxes, function(box) {
					totalLeftBoxesWidth += box.width;
				});

				helpers.each(rightBoxes, function(box) {
					totalRightBoxesWidth += box.width;
				});

				helpers.each(topBoxes, function(box) {
					totalTopBoxesHeight += box.height;
				});
				helpers.each(bottomBoxes, function(box) {
					totalBottomBoxesHeight += box.height;
				});

				// Figure out if our chart area changed. This would occur if the dataset layout label rotation
				// changed due to the application of the margins in step 6. Since we can only get bigger, this is safe to do
				// without calling `fit` again
				var newMaxChartAreaHeight = height - totalTopBoxesHeight - totalBottomBoxesHeight;
				var newMaxChartAreaWidth = width - totalLeftBoxesWidth - totalRightBoxesWidth;

				if (newMaxChartAreaWidth !== maxChartAreaWidth || newMaxChartAreaHeight !== maxChartAreaHeight) {
					helpers.each(leftBoxes, function(box) {
						box.height = newMaxChartAreaHeight;
					});

					helpers.each(rightBoxes, function(box) {
						box.height = newMaxChartAreaHeight;
					});

					helpers.each(topBoxes, function(box) {
						if (!box.options.fullWidth) {
							box.width = newMaxChartAreaWidth;
						}
					});

					helpers.each(bottomBoxes, function(box) {
						if (!box.options.fullWidth) {
							box.width = newMaxChartAreaWidth;
						}
					});

					maxChartAreaHeight = newMaxChartAreaHeight;
					maxChartAreaWidth = newMaxChartAreaWidth;
				}

				// Step 7 - Position the boxes
				var left = xPadding;
				var top = yPadding;

				function placeBox(box) {
					if (box.isHorizontal()) {
						box.left = box.options.fullWidth ? xPadding : totalLeftBoxesWidth;
						box.right = box.options.fullWidth ? width - xPadding : totalLeftBoxesWidth + maxChartAreaWidth;
						box.top = top;
						box.bottom = top + box.height;

						// Move to next point
						top = box.bottom;

					} else {

						box.left = left;
						box.right = left + box.width;
						box.top = totalTopBoxesHeight;
						box.bottom = totalTopBoxesHeight + maxChartAreaHeight;

						// Move to next point
						left = box.right;
					}
				}

				helpers.each(leftBoxes.concat(topBoxes), placeBox);

				// Account for chart width and height
				left += maxChartAreaWidth;
				top += maxChartAreaHeight;

				helpers.each(rightBoxes, placeBox);
				helpers.each(bottomBoxes, placeBox);

				// Step 8
				chartInstance.chartArea = {
					left: totalLeftBoxesWidth,
					top: totalTopBoxesHeight,
					right: totalLeftBoxesWidth + maxChartAreaWidth,
					bottom: totalTopBoxesHeight + maxChartAreaHeight
				};

				// Step 9
				helpers.each(chartAreaBoxes, function(box) {
					box.left = chartInstance.chartArea.left;
					box.top = chartInstance.chartArea.top;
					box.right = chartInstance.chartArea.right;
					box.bottom = chartInstance.chartArea.bottom;

					box.update(maxChartAreaWidth, maxChartAreaHeight);
				});
			}
		};
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;

		Chart.scaleService = {
			// Scale registration object. Extensions can register new scale types (such as log or DB scales) and then
			// use the new chart options to grab the correct scale
			constructors: {},
			// Use a registration function so that we can move to an ES6 map when we no longer need to support
			// old browsers

			// Scale config defaults
			defaults: {},
			registerScaleType: function(type, scaleConstructor, defaults) {
				this.constructors[type] = scaleConstructor;
				this.defaults[type] = helpers.clone(defaults);
			},
			getScaleConstructor: function(type) {
				return this.constructors.hasOwnProperty(type) ? this.constructors[type] : undefined;
			},
			getScaleDefaults: function(type) {
				// Return the scale defaults merged with the global settings so that we always use the latest ones
				return this.defaults.hasOwnProperty(type) ? helpers.scaleMerge(Chart.defaults.scale, this.defaults[type]) : {};
			},
			updateScaleDefaults: function(type, additions) {
				var defaults = this.defaults;
				if (defaults.hasOwnProperty(type)) {
					defaults[type] = helpers.extend(defaults[type], additions);
				}
			},
			addScalesToLayout: function(chartInstance) {
				// Adds each scale to the chart.boxes array to be sized accordingly
				helpers.each(chartInstance.scales, function(scale) {
					Chart.layoutService.addBox(chartInstance, scale);
				});
			}
		};
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var noop = Chart.helpers.noop;

		/**
		 * The plugin service singleton
		 * @namespace Chart.plugins
		 * @since 2.1.0
		 */
		Chart.plugins = {
			_plugins: [],

			/**
			 * Registers the given plugin(s) if not already registered.
			 * @param {Array|Object} plugins plugin instance(s).
			 */
			register: function(plugins) {
				var p = this._plugins;
				([]).concat(plugins).forEach(function(plugin) {
					if (p.indexOf(plugin) === -1) {
						p.push(plugin);
					}
				});
			},

			/**
			 * Unregisters the given plugin(s) only if registered.
			 * @param {Array|Object} plugins plugin instance(s).
			 */
			unregister: function(plugins) {
				var p = this._plugins;
				([]).concat(plugins).forEach(function(plugin) {
					var idx = p.indexOf(plugin);
					if (idx !== -1) {
						p.splice(idx, 1);
					}
				});
			},

			/**
			 * Remove all registered p^lugins.
			 * @since 2.1.5
			 */
			clear: function() {
				this._plugins = [];
			},

			/**
			 * Returns the number of registered plugins?
			 * @returns {Number}
			 * @since 2.1.5
			 */
			count: function() {
				return this._plugins.length;
			},

			/**
			 * Returns all registered plugin intances.
			 * @returns {Array} array of plugin objects.
			 * @since 2.1.5
			 */
			getAll: function() {
				return this._plugins;
			},

			/**
			 * Calls registered plugins on the specified extension, with the given args. This
			 * method immediately returns as soon as a plugin explicitly returns false. The
			 * returned value can be used, for instance, to interrupt the current action.
			 * @param {String} extension the name of the plugin method to call (e.g. 'beforeUpdate').
			 * @param {Array} [args] extra arguments to apply to the extension call.
			 * @returns {Boolean} false if any of the plugins return false, else returns true.
			 */
			notify: function(extension, args) {
				var plugins = this._plugins;
				var ilen = plugins.length;
				var i, plugin;

				for (i=0; i<ilen; ++i) {
					plugin = plugins[i];
					if (typeof plugin[extension] === 'function') {
						if (plugin[extension].apply(plugin, args || []) === false) {
							return false;
						}
					}
				}

				return true;
			}
		};

		/**
		 * Plugin extension methods.
		 * @interface Chart.PluginBase
		 * @since 2.1.0
		 */
		Chart.PluginBase = Chart.Element.extend({
			// Called at start of chart init
			beforeInit: noop,

			// Called at end of chart init
			afterInit: noop,

			// Called at start of update
			beforeUpdate: noop,

			// Called at end of update
			afterUpdate: noop,

			// Called at start of draw
			beforeDraw: noop,

			// Called at end of draw
			afterDraw: noop,

			// Called during destroy
			destroy: noop
		});

		/**
		 * Provided for backward compatibility, use Chart.plugins instead
		 * @namespace Chart.pluginService
		 * @deprecated since version 2.1.5
		 * @todo remove me at version 3
		 */
		Chart.pluginService = Chart.plugins;
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;

		Chart.defaults.scale = {
			display: true,
			position: 'left',

			// grid line settings
			gridLines: {
				display: true,
				color: 'rgba(0, 0, 0, 0.1)',
				lineWidth: 1,
				drawBorder: true,
				drawOnChartArea: true,
				drawTicks: true,
				tickMarkLength: 10,
				zeroLineWidth: 1,
				zeroLineColor: 'rgba(0,0,0,0.25)',
				offsetGridLines: false,
				borderDash: [],
				borderDashOffset: 0.0
			},

			// scale label
			scaleLabel: {
				// actual label
				labelString: '',

				// display property
				display: false
			},

			// label settings
			ticks: {
				beginAtZero: false,
				minRotation: 0,
				maxRotation: 50,
				mirror: false,
				padding: 10,
				reverse: false,
				display: true,
				autoSkip: true,
				autoSkipPadding: 0,
				labelOffset: 0,
				// We pass through arrays to be rendered as multiline labels, we convert Others to strings here.
				callback: function(value) {
					return helpers.isArray(value) ? value : '' + value;
				}
			}
		};

		Chart.Scale = Chart.Element.extend({

			// These methods are ordered by lifecyle. Utilities then follow.
			// Any function defined here is inherited by all scale types.
			// Any function can be extended by the scale type

			beforeUpdate: function() {
				helpers.callCallback(this.options.beforeUpdate, [this]);
			},
			update: function(maxWidth, maxHeight, margins) {
				var me = this;

				// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
				me.beforeUpdate();

				// Absorb the master measurements
				me.maxWidth = maxWidth;
				me.maxHeight = maxHeight;
				me.margins = helpers.extend({
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				}, margins);

				// Dimensions
				me.beforeSetDimensions();
				me.setDimensions();
				me.afterSetDimensions();

				// Data min/max
				me.beforeDataLimits();
				me.determineDataLimits();
				me.afterDataLimits();

				// Ticks
				me.beforeBuildTicks();
				me.buildTicks();
				me.afterBuildTicks();

				me.beforeTickToLabelConversion();
				me.convertTicksToLabels();
				me.afterTickToLabelConversion();

				// Tick Rotation
				me.beforeCalculateTickRotation();
				me.calculateTickRotation();
				me.afterCalculateTickRotation();
				// Fit
				me.beforeFit();
				me.fit();
				me.afterFit();
				//
				me.afterUpdate();

				return me.minSize;

			},
			afterUpdate: function() {
				helpers.callCallback(this.options.afterUpdate, [this]);
			},

			//

			beforeSetDimensions: function() {
				helpers.callCallback(this.options.beforeSetDimensions, [this]);
			},
			setDimensions: function() {
				var me = this;
				// Set the unconstrained dimension before label rotation
				if (me.isHorizontal()) {
					// Reset position before calculating rotation
					me.width = me.maxWidth;
					me.left = 0;
					me.right = me.width;
				} else {
					me.height = me.maxHeight;

					// Reset position before calculating rotation
					me.top = 0;
					me.bottom = me.height;
				}

				// Reset padding
				me.paddingLeft = 0;
				me.paddingTop = 0;
				me.paddingRight = 0;
				me.paddingBottom = 0;
			},
			afterSetDimensions: function() {
				helpers.callCallback(this.options.afterSetDimensions, [this]);
			},

			// Data limits
			beforeDataLimits: function() {
				helpers.callCallback(this.options.beforeDataLimits, [this]);
			},
			determineDataLimits: helpers.noop,
			afterDataLimits: function() {
				helpers.callCallback(this.options.afterDataLimits, [this]);
			},

			//
			beforeBuildTicks: function() {
				helpers.callCallback(this.options.beforeBuildTicks, [this]);
			},
			buildTicks: helpers.noop,
			afterBuildTicks: function() {
				helpers.callCallback(this.options.afterBuildTicks, [this]);
			},

			beforeTickToLabelConversion: function() {
				helpers.callCallback(this.options.beforeTickToLabelConversion, [this]);
			},
			convertTicksToLabels: function() {
				var me = this;
				// Convert ticks to strings
				me.ticks = me.ticks.map(function(numericalTick, index, ticks) {
					if (me.options.ticks.userCallback) {
						return me.options.ticks.userCallback(numericalTick, index, ticks);
					}
					return me.options.ticks.callback(numericalTick, index, ticks);
				},
				me);
			},
			afterTickToLabelConversion: function() {
				helpers.callCallback(this.options.afterTickToLabelConversion, [this]);
			},

			//

			beforeCalculateTickRotation: function() {
				helpers.callCallback(this.options.beforeCalculateTickRotation, [this]);
			},
			calculateTickRotation: function() {
				var me = this;
				var context = me.ctx;
				var globalDefaults = Chart.defaults.global;
				var optionTicks = me.options.ticks;

				// Get the width of each grid by calculating the difference
				// between x offsets between 0 and 1.
				var tickFontSize = helpers.getValueOrDefault(optionTicks.fontSize, globalDefaults.defaultFontSize);
				var tickFontStyle = helpers.getValueOrDefault(optionTicks.fontStyle, globalDefaults.defaultFontStyle);
				var tickFontFamily = helpers.getValueOrDefault(optionTicks.fontFamily, globalDefaults.defaultFontFamily);
				var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
				context.font = tickLabelFont;

				var firstWidth = context.measureText(me.ticks[0]).width;
				var lastWidth = context.measureText(me.ticks[me.ticks.length - 1]).width;
				var firstRotated;

				me.labelRotation = optionTicks.minRotation || 0;
				me.paddingRight = 0;
				me.paddingLeft = 0;

				if (me.options.display) {
					if (me.isHorizontal()) {
						me.paddingRight = lastWidth / 2 + 3;
						me.paddingLeft = firstWidth / 2 + 3;

						if (!me.longestTextCache) {
							me.longestTextCache = {};
						}
						var originalLabelWidth = helpers.longestText(context, tickLabelFont, me.ticks, me.longestTextCache);
						var labelWidth = originalLabelWidth;
						var cosRotation;
						var sinRotation;

						// Allow 3 pixels x2 padding either side for label readability
						// only the index matters for a dataset scale, but we want a consistent interface between scales
						var tickWidth = me.getPixelForTick(1) - me.getPixelForTick(0) - 6;

						// Max label rotation can be set or default to 90 - also act as a loop counter
						while (labelWidth > tickWidth && me.labelRotation < optionTicks.maxRotation) {
							cosRotation = Math.cos(helpers.toRadians(me.labelRotation));
							sinRotation = Math.sin(helpers.toRadians(me.labelRotation));

							firstRotated = cosRotation * firstWidth;

							// We're right aligning the text now.
							if (firstRotated + tickFontSize / 2 > me.yLabelWidth) {
								me.paddingLeft = firstRotated + tickFontSize / 2;
							}

							me.paddingRight = tickFontSize / 2;

							if (sinRotation * originalLabelWidth > me.maxHeight) {
								// go back one step
								me.labelRotation--;
								break;
							}

							me.labelRotation++;
							labelWidth = cosRotation * originalLabelWidth;
						}
					}
				}

				if (me.margins) {
					me.paddingLeft = Math.max(me.paddingLeft - me.margins.left, 0);
					me.paddingRight = Math.max(me.paddingRight - me.margins.right, 0);
				}
			},
			afterCalculateTickRotation: function() {
				helpers.callCallback(this.options.afterCalculateTickRotation, [this]);
			},

			//

			beforeFit: function() {
				helpers.callCallback(this.options.beforeFit, [this]);
			},
			fit: function() {
				var me = this;
				// Reset
				var minSize = me.minSize = {
					width: 0,
					height: 0
				};

				var opts = me.options;
				var globalDefaults = Chart.defaults.global;
				var tickOpts = opts.ticks;
				var scaleLabelOpts = opts.scaleLabel;
				var gridLineOpts = opts.gridLines;
				var display = opts.display;
				var isHorizontal = me.isHorizontal();

				var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
				var tickFontStyle = helpers.getValueOrDefault(tickOpts.fontStyle, globalDefaults.defaultFontStyle);
				var tickFontFamily = helpers.getValueOrDefault(tickOpts.fontFamily, globalDefaults.defaultFontFamily);
				var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);

				var scaleLabelFontSize = helpers.getValueOrDefault(scaleLabelOpts.fontSize, globalDefaults.defaultFontSize);

				var tickMarkLength = opts.gridLines.tickMarkLength;

				// Width
				if (isHorizontal) {
					// subtract the margins to line up with the chartArea if we are a full width scale
					minSize.width = me.isFullWidth() ? me.maxWidth - me.margins.left - me.margins.right : me.maxWidth;
				} else {
					minSize.width = display && gridLineOpts.drawTicks ? tickMarkLength : 0;
				}

				// height
				if (isHorizontal) {
					minSize.height = display && gridLineOpts.drawTicks ? tickMarkLength : 0;
				} else {
					minSize.height = me.maxHeight; // fill all the height
				}

				// Are we showing a title for the scale?
				if (scaleLabelOpts.display && display) {
					if (isHorizontal) {
						minSize.height += (scaleLabelFontSize * 1.5);
					} else {
						minSize.width += (scaleLabelFontSize * 1.5);
					}
				}

				if (tickOpts.display && display) {
					// Don't bother fitting the ticks if we are not showing them
					if (!me.longestTextCache) {
						me.longestTextCache = {};
					}

					var largestTextWidth = helpers.longestText(me.ctx, tickLabelFont, me.ticks, me.longestTextCache);
					var tallestLabelHeightInLines = helpers.numberOfLabelLines(me.ticks);
					var lineSpace = tickFontSize * 0.5;

					if (isHorizontal) {
						// A horizontal axis is more constrained by the height.
						me.longestLabelWidth = largestTextWidth;

						// TODO - improve this calculation
						var labelHeight = (Math.sin(helpers.toRadians(me.labelRotation)) * me.longestLabelWidth) + (tickFontSize * tallestLabelHeightInLines) + (lineSpace * tallestLabelHeightInLines);

						minSize.height = Math.min(me.maxHeight, minSize.height + labelHeight);
						me.ctx.font = tickLabelFont;

						var firstLabelWidth = me.ctx.measureText(me.ticks[0]).width;
						var lastLabelWidth = me.ctx.measureText(me.ticks[me.ticks.length - 1]).width;

						// Ensure that our ticks are always inside the canvas. When rotated, ticks are right aligned which means that the right padding is dominated
						// by the font height
						var cosRotation = Math.cos(helpers.toRadians(me.labelRotation));
						var sinRotation = Math.sin(helpers.toRadians(me.labelRotation));
						me.paddingLeft = me.labelRotation !== 0 ? (cosRotation * firstLabelWidth) + 3 : firstLabelWidth / 2 + 3; // add 3 px to move away from canvas edges
						me.paddingRight = me.labelRotation !== 0 ? (sinRotation * (tickFontSize / 2)) + 3 : lastLabelWidth / 2 + 3; // when rotated
					} else {
						// A vertical axis is more constrained by the width. Labels are the dominant factor here, so get that length first
						var maxLabelWidth = me.maxWidth - minSize.width;

						// Account for padding
						var mirror = tickOpts.mirror;
						if (!mirror) {
							largestTextWidth += me.options.ticks.padding;
						} else {
							// If mirrored text is on the inside so don't expand
							largestTextWidth = 0;
						}

						if (largestTextWidth < maxLabelWidth) {
							// We don't need all the room
							minSize.width += largestTextWidth;
						} else {
							// Expand to max size
							minSize.width = me.maxWidth;
						}

						me.paddingTop = tickFontSize / 2;
						me.paddingBottom = tickFontSize / 2;
					}
				}

				if (me.margins) {
					me.paddingLeft = Math.max(me.paddingLeft - me.margins.left, 0);
					me.paddingTop = Math.max(me.paddingTop - me.margins.top, 0);
					me.paddingRight = Math.max(me.paddingRight - me.margins.right, 0);
					me.paddingBottom = Math.max(me.paddingBottom - me.margins.bottom, 0);
				}

				me.width = minSize.width;
				me.height = minSize.height;

			},
			afterFit: function() {
				helpers.callCallback(this.options.afterFit, [this]);
			},

			// Shared Methods
			isHorizontal: function() {
				return this.options.position === 'top' || this.options.position === 'bottom';
			},
			isFullWidth: function() {
				return (this.options.fullWidth);
			},

			// Get the correct value. NaN bad inputs, If the value type is object get the x or y based on whether we are horizontal or not
			getRightValue: function(rawValue) {
				// Null and undefined values first
				if (rawValue === null || typeof(rawValue) === 'undefined') {
					return NaN;
				}
				// isNaN(object) returns true, so make sure NaN is checking for a number
				if (typeof(rawValue) === 'number' && isNaN(rawValue)) {
					return NaN;
				}
				// If it is in fact an object, dive in one more level
				if (typeof(rawValue) === 'object') {
					if ((rawValue instanceof Date) || (rawValue.isValid)) {
						return rawValue;
					}
					return this.getRightValue(this.isHorizontal() ? rawValue.x : rawValue.y);
				}

				// Value is good, return it
				return rawValue;
			},

			// Used to get the value to display in the tooltip for the data at the given index
			// function getLabelForIndex(index, datasetIndex)
			getLabelForIndex: helpers.noop,

			// Used to get data value locations.  Value can either be an index or a numerical value
			getPixelForValue: helpers.noop,

			// Used to get the data value from a given pixel. This is the inverse of getPixelForValue
			getValueForPixel: helpers.noop,

			// Used for tick location, should
			getPixelForTick: function(index, includeOffset) {
				var me = this;
				if (me.isHorizontal()) {
					var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
					var tickWidth = innerWidth / Math.max((me.ticks.length - ((me.options.gridLines.offsetGridLines) ? 0 : 1)), 1);
					var pixel = (tickWidth * index) + me.paddingLeft;

					if (includeOffset) {
						pixel += tickWidth / 2;
					}

					var finalVal = me.left + Math.round(pixel);
					finalVal += me.isFullWidth() ? me.margins.left : 0;
					return finalVal;
				}
				var innerHeight = me.height - (me.paddingTop + me.paddingBottom);
				return me.top + (index * (innerHeight / (me.ticks.length - 1)));
			},

			// Utility for getting the pixel location of a percentage of scale
			getPixelForDecimal: function(decimal /* , includeOffset*/) {
				var me = this;
				if (me.isHorizontal()) {
					var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
					var valueOffset = (innerWidth * decimal) + me.paddingLeft;

					var finalVal = me.left + Math.round(valueOffset);
					finalVal += me.isFullWidth() ? me.margins.left : 0;
					return finalVal;
				}
				return me.top + (decimal * me.height);
			},

			getBasePixel: function() {
				var me = this;
				var min = me.min;
				var max = me.max;

				return me.getPixelForValue(
					me.beginAtZero? 0:
					min < 0 && max < 0? max :
					min > 0 && max > 0? min :
					0);
			},

			// Actualy draw the scale on the canvas
			// @param {rectangle} chartArea : the area of the chart to draw full grid lines on
			draw: function(chartArea) {
				var me = this;
				var options = me.options;
				if (!options.display) {
					return;
				}

				var context = me.ctx;
				var globalDefaults = Chart.defaults.global;
				var optionTicks = options.ticks;
				var gridLines = options.gridLines;
				var scaleLabel = options.scaleLabel;

				var isRotated = me.labelRotation !== 0;
				var skipRatio;
				var useAutoskipper = optionTicks.autoSkip;
				var isHorizontal = me.isHorizontal();

				// figure out the maximum number of gridlines to show
				var maxTicks;
				if (optionTicks.maxTicksLimit) {
					maxTicks = optionTicks.maxTicksLimit;
				}

				var tickFontColor = helpers.getValueOrDefault(optionTicks.fontColor, globalDefaults.defaultFontColor);
				var tickFontSize = helpers.getValueOrDefault(optionTicks.fontSize, globalDefaults.defaultFontSize);
				var tickFontStyle = helpers.getValueOrDefault(optionTicks.fontStyle, globalDefaults.defaultFontStyle);
				var tickFontFamily = helpers.getValueOrDefault(optionTicks.fontFamily, globalDefaults.defaultFontFamily);
				var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
				var tl = gridLines.tickMarkLength;
				var borderDash = helpers.getValueOrDefault(gridLines.borderDash, globalDefaults.borderDash);
				var borderDashOffset = helpers.getValueOrDefault(gridLines.borderDashOffset, globalDefaults.borderDashOffset);

				var scaleLabelFontColor = helpers.getValueOrDefault(scaleLabel.fontColor, globalDefaults.defaultFontColor);
				var scaleLabelFontSize = helpers.getValueOrDefault(scaleLabel.fontSize, globalDefaults.defaultFontSize);
				var scaleLabelFontStyle = helpers.getValueOrDefault(scaleLabel.fontStyle, globalDefaults.defaultFontStyle);
				var scaleLabelFontFamily = helpers.getValueOrDefault(scaleLabel.fontFamily, globalDefaults.defaultFontFamily);
				var scaleLabelFont = helpers.fontString(scaleLabelFontSize, scaleLabelFontStyle, scaleLabelFontFamily);

				var labelRotationRadians = helpers.toRadians(me.labelRotation);
				var cosRotation = Math.cos(labelRotationRadians);
				var longestRotatedLabel = me.longestLabelWidth * cosRotation;

				// Make sure we draw text in the correct color and font
				context.fillStyle = tickFontColor;

				var itemsToDraw = [];

				if (isHorizontal) {
					skipRatio = false;

					// Only calculate the skip ratio with the half width of longestRotateLabel if we got an actual rotation
					// See #2584
					if (isRotated) {
						longestRotatedLabel /= 2;
					}

					if ((longestRotatedLabel + optionTicks.autoSkipPadding) * me.ticks.length > (me.width - (me.paddingLeft + me.paddingRight))) {
						skipRatio = 1 + Math.floor(((longestRotatedLabel + optionTicks.autoSkipPadding) * me.ticks.length) / (me.width - (me.paddingLeft + me.paddingRight)));
					}

					// if they defined a max number of optionTicks,
					// increase skipRatio until that number is met
					if (maxTicks && me.ticks.length > maxTicks) {
						while (!skipRatio || me.ticks.length / (skipRatio || 1) > maxTicks) {
							if (!skipRatio) {
								skipRatio = 1;
							}
							skipRatio += 1;
						}
					}

					if (!useAutoskipper) {
						skipRatio = false;
					}
				}


				var xTickStart = options.position === 'right' ? me.left : me.right - tl;
				var xTickEnd = options.position === 'right' ? me.left + tl : me.right;
				var yTickStart = options.position === 'bottom' ? me.top : me.bottom - tl;
				var yTickEnd = options.position === 'bottom' ? me.top + tl : me.bottom;

				helpers.each(me.ticks, function(label, index) {
					// If the callback returned a null or undefined value, do not draw this line
					if (label === undefined || label === null) {
						return;
					}

					var isLastTick = me.ticks.length === index + 1;

					// Since we always show the last tick,we need may need to hide the last shown one before
					var shouldSkip = (skipRatio > 1 && index % skipRatio > 0) || (index % skipRatio === 0 && index + skipRatio >= me.ticks.length);
					if (shouldSkip && !isLastTick || (label === undefined || label === null)) {
						return;
					}

					var lineWidth, lineColor;
					if (index === (typeof me.zeroLineIndex !== 'undefined' ? me.zeroLineIndex : 0)) {
						// Draw the first index specially
						lineWidth = gridLines.zeroLineWidth;
						lineColor = gridLines.zeroLineColor;
					} else {
						lineWidth = helpers.getValueAtIndexOrDefault(gridLines.lineWidth, index);
						lineColor = helpers.getValueAtIndexOrDefault(gridLines.color, index);
					}

					// Common properties
					var tx1, ty1, tx2, ty2, x1, y1, x2, y2, labelX, labelY;
					var textAlign = 'middle';
					var textBaseline = 'middle';

					if (isHorizontal) {
						if (!isRotated) {
							textBaseline = options.position === 'top' ? 'bottom' : 'top';
						}

						textAlign = isRotated ? 'right' : 'center';

						var xLineValue = me.getPixelForTick(index) + helpers.aliasPixel(lineWidth); // xvalues for grid lines
						labelX = me.getPixelForTick(index, gridLines.offsetGridLines) + optionTicks.labelOffset; // x values for optionTicks (need to consider offsetLabel option)
						labelY = (isRotated) ? me.top + 12 : options.position === 'top' ? me.bottom - tl : me.top + tl;

						tx1 = tx2 = x1 = x2 = xLineValue;
						ty1 = yTickStart;
						ty2 = yTickEnd;
						y1 = chartArea.top;
						y2 = chartArea.bottom;
					} else {
						if (options.position === 'left') {
							if (optionTicks.mirror) {
								labelX = me.right + optionTicks.padding;
								textAlign = 'left';
							} else {
								labelX = me.right - optionTicks.padding;
								textAlign = 'right';
							}
						// right side
						} else if (optionTicks.mirror) {
							labelX = me.left - optionTicks.padding;
							textAlign = 'right';
						} else {
							labelX = me.left + optionTicks.padding;
							textAlign = 'left';
						}

						var yLineValue = me.getPixelForTick(index); // xvalues for grid lines
						yLineValue += helpers.aliasPixel(lineWidth);
						labelY = me.getPixelForTick(index, gridLines.offsetGridLines);

						tx1 = xTickStart;
						tx2 = xTickEnd;
						x1 = chartArea.left;
						x2 = chartArea.right;
						ty1 = ty2 = y1 = y2 = yLineValue;
					}

					itemsToDraw.push({
						tx1: tx1,
						ty1: ty1,
						tx2: tx2,
						ty2: ty2,
						x1: x1,
						y1: y1,
						x2: x2,
						y2: y2,
						labelX: labelX,
						labelY: labelY,
						glWidth: lineWidth,
						glColor: lineColor,
						glBorderDash: borderDash,
						glBorderDashOffset: borderDashOffset,
						rotation: -1 * labelRotationRadians,
						label: label,
						textBaseline: textBaseline,
						textAlign: textAlign
					});
				});

				// Draw all of the tick labels, tick marks, and grid lines at the correct places
				helpers.each(itemsToDraw, function(itemToDraw) {
					if (gridLines.display) {
						context.save();
						context.lineWidth = itemToDraw.glWidth;
						context.strokeStyle = itemToDraw.glColor;
						if (context.setLineDash) {
							context.setLineDash(itemToDraw.glBorderDash);
							context.lineDashOffset = itemToDraw.glBorderDashOffset;
						}

						context.beginPath();

						if (gridLines.drawTicks) {
							context.moveTo(itemToDraw.tx1, itemToDraw.ty1);
							context.lineTo(itemToDraw.tx2, itemToDraw.ty2);
						}

						if (gridLines.drawOnChartArea) {
							context.moveTo(itemToDraw.x1, itemToDraw.y1);
							context.lineTo(itemToDraw.x2, itemToDraw.y2);
						}

						context.stroke();
						context.restore();
					}

					if (optionTicks.display) {
						context.save();
						context.translate(itemToDraw.labelX, itemToDraw.labelY);
						context.rotate(itemToDraw.rotation);
						context.font = tickLabelFont;
						context.textBaseline = itemToDraw.textBaseline;
						context.textAlign = itemToDraw.textAlign;

						var label = itemToDraw.label;
						if (helpers.isArray(label)) {
							for (var i = 0, y = -(label.length - 1)*tickFontSize*0.75; i < label.length; ++i) {
								// We just make sure the multiline element is a string here..
								context.fillText('' + label[i], 0, y);
								// apply same lineSpacing as calculated @ L#320
								y += (tickFontSize * 1.5);
							}
						} else {
							context.fillText(label, 0, 0);
						}
						context.restore();
					}
				});

				if (scaleLabel.display) {
					// Draw the scale label
					var scaleLabelX;
					var scaleLabelY;
					var rotation = 0;

					if (isHorizontal) {
						scaleLabelX = me.left + ((me.right - me.left) / 2); // midpoint of the width
						scaleLabelY = options.position === 'bottom' ? me.bottom - (scaleLabelFontSize / 2) : me.top + (scaleLabelFontSize / 2);
					} else {
						var isLeft = options.position === 'left';
						scaleLabelX = isLeft ? me.left + (scaleLabelFontSize / 2) : me.right - (scaleLabelFontSize / 2);
						scaleLabelY = me.top + ((me.bottom - me.top) / 2);
						rotation = isLeft ? -0.5 * Math.PI : 0.5 * Math.PI;
					}

					context.save();
					context.translate(scaleLabelX, scaleLabelY);
					context.rotate(rotation);
					context.textAlign = 'center';
					context.textBaseline = 'middle';
					context.fillStyle = scaleLabelFontColor; // render in correct colour
					context.font = scaleLabelFont;
					context.fillText(scaleLabel.labelString, 0, 0);
					context.restore();
				}

				if (gridLines.drawBorder) {
					// Draw the line at the edge of the axis
					context.lineWidth = helpers.getValueAtIndexOrDefault(gridLines.lineWidth, 0);
					context.strokeStyle = helpers.getValueAtIndexOrDefault(gridLines.color, 0);
					var x1 = me.left,
						x2 = me.right,
						y1 = me.top,
						y2 = me.bottom;

					var aliasPixel = helpers.aliasPixel(context.lineWidth);
					if (isHorizontal) {
						y1 = y2 = options.position === 'top' ? me.bottom : me.top;
						y1 += aliasPixel;
						y2 += aliasPixel;
					} else {
						x1 = x2 = options.position === 'left' ? me.right : me.left;
						x1 += aliasPixel;
						x2 += aliasPixel;
					}

					context.beginPath();
					context.moveTo(x1, y1);
					context.lineTo(x2, y2);
					context.stroke();
				}
			}
		});
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;

		Chart.defaults.global.title = {
			display: false,
			position: 'top',
			fullWidth: true, // marks that this box should take the full width of the canvas (pushing down other boxes)

			fontStyle: 'bold',
			padding: 10,

			// actual title
			text: ''
		};

		var noop = helpers.noop;
		Chart.Title = Chart.Element.extend({

			initialize: function(config) {
				var me = this;
				helpers.extend(me, config);
				me.options = helpers.configMerge(Chart.defaults.global.title, config.options);

				// Contains hit boxes for each dataset (in dataset order)
				me.legendHitBoxes = [];
			},

			// These methods are ordered by lifecyle. Utilities then follow.

			beforeUpdate: function() {
				var chartOpts = this.chart.options;
				if (chartOpts && chartOpts.title) {
					this.options = helpers.configMerge(Chart.defaults.global.title, chartOpts.title);
				}
			},
			update: function(maxWidth, maxHeight, margins) {
				var me = this;

				// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
				me.beforeUpdate();

				// Absorb the master measurements
				me.maxWidth = maxWidth;
				me.maxHeight = maxHeight;
				me.margins = margins;

				// Dimensions
				me.beforeSetDimensions();
				me.setDimensions();
				me.afterSetDimensions();
				// Labels
				me.beforeBuildLabels();
				me.buildLabels();
				me.afterBuildLabels();

				// Fit
				me.beforeFit();
				me.fit();
				me.afterFit();
				//
				me.afterUpdate();

				return me.minSize;

			},
			afterUpdate: noop,

			//

			beforeSetDimensions: noop,
			setDimensions: function() {
				var me = this;
				// Set the unconstrained dimension before label rotation
				if (me.isHorizontal()) {
					// Reset position before calculating rotation
					me.width = me.maxWidth;
					me.left = 0;
					me.right = me.width;
				} else {
					me.height = me.maxHeight;

					// Reset position before calculating rotation
					me.top = 0;
					me.bottom = me.height;
				}

				// Reset padding
				me.paddingLeft = 0;
				me.paddingTop = 0;
				me.paddingRight = 0;
				me.paddingBottom = 0;

				// Reset minSize
				me.minSize = {
					width: 0,
					height: 0
				};
			},
			afterSetDimensions: noop,

			//

			beforeBuildLabels: noop,
			buildLabels: noop,
			afterBuildLabels: noop,

			//

			beforeFit: noop,
			fit: function() {
				var me = this,
					valueOrDefault = helpers.getValueOrDefault,
					opts = me.options,
					globalDefaults = Chart.defaults.global,
					display = opts.display,
					fontSize = valueOrDefault(opts.fontSize, globalDefaults.defaultFontSize),
					minSize = me.minSize;

				if (me.isHorizontal()) {
					minSize.width = me.maxWidth; // fill all the width
					minSize.height = display ? fontSize + (opts.padding * 2) : 0;
				} else {
					minSize.width = display ? fontSize + (opts.padding * 2) : 0;
					minSize.height = me.maxHeight; // fill all the height
				}

				me.width = minSize.width;
				me.height = minSize.height;

			},
			afterFit: noop,

			// Shared Methods
			isHorizontal: function() {
				var pos = this.options.position;
				return pos === 'top' || pos === 'bottom';
			},

			// Actualy draw the title block on the canvas
			draw: function() {
				var me = this,
					ctx = me.ctx,
					valueOrDefault = helpers.getValueOrDefault,
					opts = me.options,
					globalDefaults = Chart.defaults.global;

				if (opts.display) {
					var fontSize = valueOrDefault(opts.fontSize, globalDefaults.defaultFontSize),
						fontStyle = valueOrDefault(opts.fontStyle, globalDefaults.defaultFontStyle),
						fontFamily = valueOrDefault(opts.fontFamily, globalDefaults.defaultFontFamily),
						titleFont = helpers.fontString(fontSize, fontStyle, fontFamily),
						rotation = 0,
						titleX,
						titleY,
						top = me.top,
						left = me.left,
						bottom = me.bottom,
						right = me.right;

					ctx.fillStyle = valueOrDefault(opts.fontColor, globalDefaults.defaultFontColor); // render in correct colour
					ctx.font = titleFont;

					// Horizontal
					if (me.isHorizontal()) {
						titleX = left + ((right - left) / 2); // midpoint of the width
						titleY = top + ((bottom - top) / 2); // midpoint of the height
					} else {
						titleX = opts.position === 'left' ? left + (fontSize / 2) : right - (fontSize / 2);
						titleY = top + ((bottom - top) / 2);
						rotation = Math.PI * (opts.position === 'left' ? -0.5 : 0.5);
					}

					ctx.save();
					ctx.translate(titleX, titleY);
					ctx.rotate(rotation);
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';
					ctx.fillText(opts.text, 0, 0);
					ctx.restore();
				}
			}
		});

		// Register the title plugin
		Chart.plugins.register({
			beforeInit: function(chartInstance) {
				var opts = chartInstance.options;
				var titleOpts = opts.title;

				if (titleOpts) {
					chartInstance.titleBlock = new Chart.Title({
						ctx: chartInstance.chart.ctx,
						options: titleOpts,
						chart: chartInstance
					});

					Chart.layoutService.addBox(chartInstance, chartInstance.titleBlock);
				}
			}
		});
	};


/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;
		var noop = helpers.noop;

		Chart.defaults.global.legend = {

			display: true,
			position: 'top',
			fullWidth: true, // marks that this box should take the full width of the canvas (pushing down other boxes)
			reverse: false,

			// a callback that will handle
			onClick: function(e, legendItem) {
				var index = legendItem.datasetIndex;
				var ci = this.chart;
				var meta = ci.getDatasetMeta(index);

				// See controller.isDatasetVisible comment
				meta.hidden = meta.hidden === null? !ci.data.datasets[index].hidden : null;

				// We hid a dataset ... rerender the chart
				ci.update();
			},

			onHover: null,

			labels: {
				boxWidth: 40,
				padding: 10,
				// Generates labels shown in the legend
				// Valid properties to return:
				// text : text to display
				// fillStyle : fill of coloured box
				// strokeStyle: stroke of coloured box
				// hidden : if this legend item refers to a hidden item
				// lineCap : cap style for line
				// lineDash
				// lineDashOffset :
				// lineJoin :
				// lineWidth :
				generateLabels: function(chart) {
					var data = chart.data;
					return helpers.isArray(data.datasets) ? data.datasets.map(function(dataset, i) {
						return {
							text: dataset.label,
							fillStyle: (!helpers.isArray(dataset.backgroundColor) ? dataset.backgroundColor : dataset.backgroundColor[0]),
							hidden: !chart.isDatasetVisible(i),
							lineCap: dataset.borderCapStyle,
							lineDash: dataset.borderDash,
							lineDashOffset: dataset.borderDashOffset,
							lineJoin: dataset.borderJoinStyle,
							lineWidth: dataset.borderWidth,
							strokeStyle: dataset.borderColor,
							pointStyle: dataset.pointStyle,

							// Below is extra data used for toggling the datasets
							datasetIndex: i
						};
					}, this) : [];
				}
			}
		};

		Chart.Legend = Chart.Element.extend({

			initialize: function(config) {
				helpers.extend(this, config);

				// Contains hit boxes for each dataset (in dataset order)
				this.legendHitBoxes = [];

				// Are we in doughnut mode which has a different data type
				this.doughnutMode = false;
			},

			// These methods are ordered by lifecyle. Utilities then follow.
			// Any function defined here is inherited by all legend types.
			// Any function can be extended by the legend type

			beforeUpdate: noop,
			update: function(maxWidth, maxHeight, margins) {
				var me = this;

				// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
				me.beforeUpdate();

				// Absorb the master measurements
				me.maxWidth = maxWidth;
				me.maxHeight = maxHeight;
				me.margins = margins;

				// Dimensions
				me.beforeSetDimensions();
				me.setDimensions();
				me.afterSetDimensions();
				// Labels
				me.beforeBuildLabels();
				me.buildLabels();
				me.afterBuildLabels();

				// Fit
				me.beforeFit();
				me.fit();
				me.afterFit();
				//
				me.afterUpdate();

				return me.minSize;
			},
			afterUpdate: noop,

			//

			beforeSetDimensions: noop,
			setDimensions: function() {
				var me = this;
				// Set the unconstrained dimension before label rotation
				if (me.isHorizontal()) {
					// Reset position before calculating rotation
					me.width = me.maxWidth;
					me.left = 0;
					me.right = me.width;
				} else {
					me.height = me.maxHeight;

					// Reset position before calculating rotation
					me.top = 0;
					me.bottom = me.height;
				}

				// Reset padding
				me.paddingLeft = 0;
				me.paddingTop = 0;
				me.paddingRight = 0;
				me.paddingBottom = 0;

				// Reset minSize
				me.minSize = {
					width: 0,
					height: 0
				};
			},
			afterSetDimensions: noop,

			//

			beforeBuildLabels: noop,
			buildLabels: function() {
				var me = this;
				me.legendItems = me.options.labels.generateLabels.call(me, me.chart);
				if (me.options.reverse) {
					me.legendItems.reverse();
				}
			},
			afterBuildLabels: noop,

			//

			beforeFit: noop,
			fit: function() {
				var me = this;
				var opts = me.options;
				var labelOpts = opts.labels;
				var display = opts.display;

				var ctx = me.ctx;

				var globalDefault = Chart.defaults.global,
					itemOrDefault = helpers.getValueOrDefault,
					fontSize = itemOrDefault(labelOpts.fontSize, globalDefault.defaultFontSize),
					fontStyle = itemOrDefault(labelOpts.fontStyle, globalDefault.defaultFontStyle),
					fontFamily = itemOrDefault(labelOpts.fontFamily, globalDefault.defaultFontFamily),
					labelFont = helpers.fontString(fontSize, fontStyle, fontFamily);

				// Reset hit boxes
				var hitboxes = me.legendHitBoxes = [];

				var minSize = me.minSize;
				var isHorizontal = me.isHorizontal();

				if (isHorizontal) {
					minSize.width = me.maxWidth; // fill all the width
					minSize.height = display ? 10 : 0;
				} else {
					minSize.width = display ? 10 : 0;
					minSize.height = me.maxHeight; // fill all the height
				}

				// Increase sizes here
				if (display) {
					ctx.font = labelFont;

					if (isHorizontal) {
						// Labels

						// Width of each line of legend boxes. Labels wrap onto multiple lines when there are too many to fit on one
						var lineWidths = me.lineWidths = [0];
						var totalHeight = me.legendItems.length ? fontSize + (labelOpts.padding) : 0;

						ctx.textAlign = 'left';
						ctx.textBaseline = 'top';

						helpers.each(me.legendItems, function(legendItem, i) {
							var boxWidth = labelOpts.usePointStyle ?
								fontSize * Math.sqrt(2) :
								labelOpts.boxWidth;

							var width = boxWidth + (fontSize / 2) + ctx.measureText(legendItem.text).width;
							if (lineWidths[lineWidths.length - 1] + width + labelOpts.padding >= me.width) {
								totalHeight += fontSize + (labelOpts.padding);
								lineWidths[lineWidths.length] = me.left;
							}

							// Store the hitbox width and height here. Final position will be updated in `draw`
							hitboxes[i] = {
								left: 0,
								top: 0,
								width: width,
								height: fontSize
							};

							lineWidths[lineWidths.length - 1] += width + labelOpts.padding;
						});

						minSize.height += totalHeight;

					} else {
						var vPadding = labelOpts.padding;
						var columnWidths = me.columnWidths = [];
						var totalWidth = labelOpts.padding;
						var currentColWidth = 0;
						var currentColHeight = 0;
						var itemHeight = fontSize + vPadding;

						helpers.each(me.legendItems, function(legendItem, i) {
							// If usePointStyle is set, multiple boxWidth by 2 since it represents
							// the radius and not truly the width
							var boxWidth = labelOpts.usePointStyle ? 2 * labelOpts.boxWidth : labelOpts.boxWidth;

							var itemWidth = boxWidth + (fontSize / 2) + ctx.measureText(legendItem.text).width;

							// If too tall, go to new column
							if (currentColHeight + itemHeight > minSize.height) {
								totalWidth += currentColWidth + labelOpts.padding;
								columnWidths.push(currentColWidth); // previous column width

								currentColWidth = 0;
								currentColHeight = 0;
							}

							// Get max width
							currentColWidth = Math.max(currentColWidth, itemWidth);
							currentColHeight += itemHeight;

							// Store the hitbox width and height here. Final position will be updated in `draw`
							hitboxes[i] = {
								left: 0,
								top: 0,
								width: itemWidth,
								height: fontSize
							};
						});

						totalWidth += currentColWidth;
						columnWidths.push(currentColWidth);
						minSize.width += totalWidth;
					}
				}

				me.width = minSize.width;
				me.height = minSize.height;
			},
			afterFit: noop,

			// Shared Methods
			isHorizontal: function() {
				return this.options.position === 'top' || this.options.position === 'bottom';
			},

			// Actualy draw the legend on the canvas
			draw: function() {
				var me = this;
				var opts = me.options;
				var labelOpts = opts.labels;
				var globalDefault = Chart.defaults.global,
					lineDefault = globalDefault.elements.line,
					legendWidth = me.width,
					lineWidths = me.lineWidths;

				if (opts.display) {
					var ctx = me.ctx,
						cursor,
						itemOrDefault = helpers.getValueOrDefault,
						fontColor = itemOrDefault(labelOpts.fontColor, globalDefault.defaultFontColor),
						fontSize = itemOrDefault(labelOpts.fontSize, globalDefault.defaultFontSize),
						fontStyle = itemOrDefault(labelOpts.fontStyle, globalDefault.defaultFontStyle),
						fontFamily = itemOrDefault(labelOpts.fontFamily, globalDefault.defaultFontFamily),
						labelFont = helpers.fontString(fontSize, fontStyle, fontFamily);

					// Canvas setup
					ctx.textAlign = 'left';
					ctx.textBaseline = 'top';
					ctx.lineWidth = 0.5;
					ctx.strokeStyle = fontColor; // for strikethrough effect
					ctx.fillStyle = fontColor; // render in correct colour
					ctx.font = labelFont;

					var boxWidth = labelOpts.boxWidth,
						hitboxes = me.legendHitBoxes;

					// current position
					var drawLegendBox = function(x, y, legendItem) {
						if (isNaN(boxWidth) || boxWidth <= 0) {
							return;
						}

						// Set the ctx for the box
						ctx.save();

						ctx.fillStyle = itemOrDefault(legendItem.fillStyle, globalDefault.defaultColor);
						ctx.lineCap = itemOrDefault(legendItem.lineCap, lineDefault.borderCapStyle);
						ctx.lineDashOffset = itemOrDefault(legendItem.lineDashOffset, lineDefault.borderDashOffset);
						ctx.lineJoin = itemOrDefault(legendItem.lineJoin, lineDefault.borderJoinStyle);
						ctx.lineWidth = itemOrDefault(legendItem.lineWidth, lineDefault.borderWidth);
						ctx.strokeStyle = itemOrDefault(legendItem.strokeStyle, globalDefault.defaultColor);
						var isLineWidthZero = (itemOrDefault(legendItem.lineWidth, lineDefault.borderWidth) === 0);

						if (ctx.setLineDash) {
							// IE 9 and 10 do not support line dash
							ctx.setLineDash(itemOrDefault(legendItem.lineDash, lineDefault.borderDash));
						}

						if (opts.labels && opts.labels.usePointStyle) {
							// Recalulate x and y for drawPoint() because its expecting
							// x and y to be center of figure (instead of top left)
							var radius = fontSize * Math.SQRT2 / 2;
							var offSet = radius / Math.SQRT2;
							var centerX = x + offSet;
							var centerY = y + offSet;

							// Draw pointStyle as legend symbol
							Chart.canvasHelpers.drawPoint(ctx, legendItem.pointStyle, radius, centerX, centerY);
						} else {
							// Draw box as legend symbol
							if (!isLineWidthZero) {
								ctx.strokeRect(x, y, boxWidth, fontSize);
							}
							ctx.fillRect(x, y, boxWidth, fontSize);
						}

						ctx.restore();
					};
					var fillText = function(x, y, legendItem, textWidth) {
						ctx.fillText(legendItem.text, boxWidth + (fontSize / 2) + x, y);

						if (legendItem.hidden) {
							// Strikethrough the text if hidden
							ctx.beginPath();
							ctx.lineWidth = 2;
							ctx.moveTo(boxWidth + (fontSize / 2) + x, y + (fontSize / 2));
							ctx.lineTo(boxWidth + (fontSize / 2) + x + textWidth, y + (fontSize / 2));
							ctx.stroke();
						}
					};

					// Horizontal
					var isHorizontal = me.isHorizontal();
					if (isHorizontal) {
						cursor = {
							x: me.left + ((legendWidth - lineWidths[0]) / 2),
							y: me.top + labelOpts.padding,
							line: 0
						};
					} else {
						cursor = {
							x: me.left + labelOpts.padding,
							y: me.top + labelOpts.padding,
							line: 0
						};
					}

					var itemHeight = fontSize + labelOpts.padding;
					helpers.each(me.legendItems, function(legendItem, i) {
						var textWidth = ctx.measureText(legendItem.text).width,
							width = labelOpts.usePointStyle ?
								fontSize + (fontSize / 2) + textWidth :
								boxWidth + (fontSize / 2) + textWidth,
							x = cursor.x,
							y = cursor.y;

						if (isHorizontal) {
							if (x + width >= legendWidth) {
								y = cursor.y += itemHeight;
								cursor.line++;
								x = cursor.x = me.left + ((legendWidth - lineWidths[cursor.line]) / 2);
							}
						} else if (y + itemHeight > me.bottom) {
							x = cursor.x = x + me.columnWidths[cursor.line] + labelOpts.padding;
							y = cursor.y = me.top;
							cursor.line++;
						}

						drawLegendBox(x, y, legendItem);

						hitboxes[i].left = x;
						hitboxes[i].top = y;

						// Fill the actual label
						fillText(x, y, legendItem, textWidth);

						if (isHorizontal) {
							cursor.x += width + (labelOpts.padding);
						} else {
							cursor.y += itemHeight;
						}

					});
				}
			},

			// Handle an event
			handleEvent: function(e) {
				var me = this;
				var opts = me.options;
				var type = e.type === 'mouseup' ? 'click' : e.type;

				if (type === 'mousemove') {
					if (!opts.onHover) {
						return;
					}
				} else if (type === 'click') {
					if (!opts.onClick) {
						return;
					}
				} else {
					return;
				}

				var position = helpers.getRelativePosition(e, me.chart.chart),
					x = position.x,
					y = position.y;

				if (x >= me.left && x <= me.right && y >= me.top && y <= me.bottom) {
					// See if we are touching one of the dataset boxes
					var lh = me.legendHitBoxes;
					for (var i = 0; i < lh.length; ++i) {
						var hitBox = lh[i];

						if (x >= hitBox.left && x <= hitBox.left + hitBox.width && y >= hitBox.top && y <= hitBox.top + hitBox.height) {
							// Touching an element
							if (type === 'click') {
								opts.onClick.call(me, e, me.legendItems[i]);
								break;
							} else if (type === 'mousemove') {
								opts.onHover.call(me, e, me.legendItems[i]);
								break;
							}
						}
					}
				}
			}
		});

		// Register the legend plugin
		Chart.plugins.register({
			beforeInit: function(chartInstance) {
				var opts = chartInstance.options;
				var legendOpts = opts.legend;

				if (legendOpts) {
					chartInstance.legend = new Chart.Legend({
						ctx: chartInstance.chart.ctx,
						options: legendOpts,
						chart: chartInstance
					});

					Chart.layoutService.addBox(chartInstance, chartInstance.legend);
				}
			}
		});
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;

		Chart.defaults.global.tooltips = {
			enabled: true,
			custom: null,
			mode: 'single',
			backgroundColor: 'rgba(0,0,0,0.8)',
			titleFontStyle: 'bold',
			titleSpacing: 2,
			titleMarginBottom: 6,
			titleFontColor: '#fff',
			titleAlign: 'left',
			bodySpacing: 2,
			bodyFontColor: '#fff',
			bodyAlign: 'left',
			footerFontStyle: 'bold',
			footerSpacing: 2,
			footerMarginTop: 6,
			footerFontColor: '#fff',
			footerAlign: 'left',
			yPadding: 6,
			xPadding: 6,
			yAlign: 'center',
			xAlign: 'center',
			caretSize: 5,
			cornerRadius: 6,
			multiKeyBackground: '#fff',
			callbacks: {
				// Args are: (tooltipItems, data)
				beforeTitle: helpers.noop,
				title: function(tooltipItems, data) {
					// Pick first xLabel for now
					var title = '';
					var labels = data.labels;
					var labelCount = labels ? labels.length : 0;

					if (tooltipItems.length > 0) {
						var item = tooltipItems[0];

						if (item.xLabel) {
							title = item.xLabel;
						} else if (labelCount > 0 && item.index < labelCount) {
							title = labels[item.index];
						}
					}

					return title;
				},
				afterTitle: helpers.noop,

				// Args are: (tooltipItems, data)
				beforeBody: helpers.noop,

				// Args are: (tooltipItem, data)
				beforeLabel: helpers.noop,
				label: function(tooltipItem, data) {
					var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
					return datasetLabel + ': ' + tooltipItem.yLabel;
				},
				labelColor: function(tooltipItem, chartInstance) {
					var meta = chartInstance.getDatasetMeta(tooltipItem.datasetIndex);
					var activeElement = meta.data[tooltipItem.index];
					var view = activeElement._view;
					return {
						borderColor: view.borderColor,
						backgroundColor: view.backgroundColor
					};
				},
				afterLabel: helpers.noop,

				// Args are: (tooltipItems, data)
				afterBody: helpers.noop,

				// Args are: (tooltipItems, data)
				beforeFooter: helpers.noop,
				footer: helpers.noop,
				afterFooter: helpers.noop
			}
		};

		// Helper to push or concat based on if the 2nd parameter is an array or not
		function pushOrConcat(base, toPush) {
			if (toPush) {
				if (helpers.isArray(toPush)) {
					// base = base.concat(toPush);
					Array.prototype.push.apply(base, toPush);
				} else {
					base.push(toPush);
				}
			}

			return base;
		}

		function getAveragePosition(elements) {
			if (!elements.length) {
				return false;
			}

			var i, len;
			var xPositions = [];
			var yPositions = [];

			for (i = 0, len = elements.length; i < len; ++i) {
				var el = elements[i];
				if (el && el.hasValue()) {
					var pos = el.tooltipPosition();
					xPositions.push(pos.x);
					yPositions.push(pos.y);
				}
			}

			var x = 0,
				y = 0;
			for (i = 0; i < xPositions.length; ++i) {
				if (xPositions[i]) {
					x += xPositions[i];
					y += yPositions[i];
				}
			}

			return {
				x: Math.round(x / xPositions.length),
				y: Math.round(y / xPositions.length)
			};
		}

		// Private helper to create a tooltip iteam model
		// @param element : the chart element (point, arc, bar) to create the tooltip item for
		// @return : new tooltip item
		function createTooltipItem(element) {
			var xScale = element._xScale;
			var yScale = element._yScale || element._scale; // handle radar || polarArea charts
			var index = element._index,
				datasetIndex = element._datasetIndex;

			return {
				xLabel: xScale ? xScale.getLabelForIndex(index, datasetIndex) : '',
				yLabel: yScale ? yScale.getLabelForIndex(index, datasetIndex) : '',
				index: index,
				datasetIndex: datasetIndex
			};
		}

		Chart.Tooltip = Chart.Element.extend({
			initialize: function() {
				var me = this;
				var globalDefaults = Chart.defaults.global;
				var tooltipOpts = me._options;
				var getValueOrDefault = helpers.getValueOrDefault;

				helpers.extend(me, {
					_model: {
						// Positioning
						xPadding: tooltipOpts.xPadding,
						yPadding: tooltipOpts.yPadding,
						xAlign: tooltipOpts.xAlign,
						yAlign: tooltipOpts.yAlign,

						// Body
						bodyFontColor: tooltipOpts.bodyFontColor,
						_bodyFontFamily: getValueOrDefault(tooltipOpts.bodyFontFamily, globalDefaults.defaultFontFamily),
						_bodyFontStyle: getValueOrDefault(tooltipOpts.bodyFontStyle, globalDefaults.defaultFontStyle),
						_bodyAlign: tooltipOpts.bodyAlign,
						bodyFontSize: getValueOrDefault(tooltipOpts.bodyFontSize, globalDefaults.defaultFontSize),
						bodySpacing: tooltipOpts.bodySpacing,

						// Title
						titleFontColor: tooltipOpts.titleFontColor,
						_titleFontFamily: getValueOrDefault(tooltipOpts.titleFontFamily, globalDefaults.defaultFontFamily),
						_titleFontStyle: getValueOrDefault(tooltipOpts.titleFontStyle, globalDefaults.defaultFontStyle),
						titleFontSize: getValueOrDefault(tooltipOpts.titleFontSize, globalDefaults.defaultFontSize),
						_titleAlign: tooltipOpts.titleAlign,
						titleSpacing: tooltipOpts.titleSpacing,
						titleMarginBottom: tooltipOpts.titleMarginBottom,

						// Footer
						footerFontColor: tooltipOpts.footerFontColor,
						_footerFontFamily: getValueOrDefault(tooltipOpts.footerFontFamily, globalDefaults.defaultFontFamily),
						_footerFontStyle: getValueOrDefault(tooltipOpts.footerFontStyle, globalDefaults.defaultFontStyle),
						footerFontSize: getValueOrDefault(tooltipOpts.footerFontSize, globalDefaults.defaultFontSize),
						_footerAlign: tooltipOpts.footerAlign,
						footerSpacing: tooltipOpts.footerSpacing,
						footerMarginTop: tooltipOpts.footerMarginTop,

						// Appearance
						caretSize: tooltipOpts.caretSize,
						cornerRadius: tooltipOpts.cornerRadius,
						backgroundColor: tooltipOpts.backgroundColor,
						opacity: 0,
						legendColorBackground: tooltipOpts.multiKeyBackground
					}
				});
			},

			// Get the title
			// Args are: (tooltipItem, data)
			getTitle: function() {
				var me = this;
				var opts = me._options;
				var callbacks = opts.callbacks;

				var beforeTitle = callbacks.beforeTitle.apply(me, arguments),
					title = callbacks.title.apply(me, arguments),
					afterTitle = callbacks.afterTitle.apply(me, arguments);

				var lines = [];
				lines = pushOrConcat(lines, beforeTitle);
				lines = pushOrConcat(lines, title);
				lines = pushOrConcat(lines, afterTitle);

				return lines;
			},

			// Args are: (tooltipItem, data)
			getBeforeBody: function() {
				var lines = this._options.callbacks.beforeBody.apply(this, arguments);
				return helpers.isArray(lines) ? lines : lines !== undefined ? [lines] : [];
			},

			// Args are: (tooltipItem, data)
			getBody: function(tooltipItems, data) {
				var me = this;
				var callbacks = me._options.callbacks;
				var bodyItems = [];

				helpers.each(tooltipItems, function(tooltipItem) {
					var bodyItem = {
						before: [],
						lines: [],
						after: []
					};
					pushOrConcat(bodyItem.before, callbacks.beforeLabel.call(me, tooltipItem, data));
					pushOrConcat(bodyItem.lines, callbacks.label.call(me, tooltipItem, data));
					pushOrConcat(bodyItem.after, callbacks.afterLabel.call(me, tooltipItem, data));

					bodyItems.push(bodyItem);
				});

				return bodyItems;
			},

			// Args are: (tooltipItem, data)
			getAfterBody: function() {
				var lines = this._options.callbacks.afterBody.apply(this, arguments);
				return helpers.isArray(lines) ? lines : lines !== undefined ? [lines] : [];
			},

			// Get the footer and beforeFooter and afterFooter lines
			// Args are: (tooltipItem, data)
			getFooter: function() {
				var me = this;
				var callbacks = me._options.callbacks;

				var beforeFooter = callbacks.beforeFooter.apply(me, arguments);
				var footer = callbacks.footer.apply(me, arguments);
				var afterFooter = callbacks.afterFooter.apply(me, arguments);

				var lines = [];
				lines = pushOrConcat(lines, beforeFooter);
				lines = pushOrConcat(lines, footer);
				lines = pushOrConcat(lines, afterFooter);

				return lines;
			},

			update: function(changed) {
				var me = this;
				var opts = me._options;
				var model = me._model;
				var active = me._active;

				var data = me._data;
				var chartInstance = me._chartInstance;

				var i, len;

				if (active.length) {
					model.opacity = 1;

					var labelColors = [],
						tooltipPosition = getAveragePosition(active);

					var tooltipItems = [];
					for (i = 0, len = active.length; i < len; ++i) {
						tooltipItems.push(createTooltipItem(active[i]));
					}

					// If the user provided a sorting function, use it to modify the tooltip items
					if (opts.itemSort) {
						tooltipItems = tooltipItems.sort(function(a, b) {
							return opts.itemSort(a, b, data);
						});
					}

					// If there is more than one item, show color items
					if (active.length > 1) {
						helpers.each(tooltipItems, function(tooltipItem) {
							labelColors.push(opts.callbacks.labelColor.call(me, tooltipItem, chartInstance));
						});
					}

					// Build the Text Lines
					helpers.extend(model, {
						title: me.getTitle(tooltipItems, data),
						beforeBody: me.getBeforeBody(tooltipItems, data),
						body: me.getBody(tooltipItems, data),
						afterBody: me.getAfterBody(tooltipItems, data),
						footer: me.getFooter(tooltipItems, data),
						x: Math.round(tooltipPosition.x),
						y: Math.round(tooltipPosition.y),
						caretPadding: helpers.getValueOrDefault(tooltipPosition.padding, 2),
						labelColors: labelColors
					});

					// We need to determine alignment of
					var tooltipSize = me.getTooltipSize(model);
					me.determineAlignment(tooltipSize); // Smart Tooltip placement to stay on the canvas

					helpers.extend(model, me.getBackgroundPoint(model, tooltipSize));
				} else {
					me._model.opacity = 0;
				}

				if (changed && opts.custom) {
					opts.custom.call(me, model);
				}

				return me;
			},
			getTooltipSize: function(vm) {
				var ctx = this._chart.ctx;

				var size = {
					height: vm.yPadding * 2, // Tooltip Padding
					width: 0
				};

				// Count of all lines in the body
				var body = vm.body;
				var combinedBodyLength = body.reduce(function(count, bodyItem) {
					return count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length;
				}, 0);
				combinedBodyLength += vm.beforeBody.length + vm.afterBody.length;

				var titleLineCount = vm.title.length;
				var footerLineCount = vm.footer.length;
				var titleFontSize = vm.titleFontSize,
					bodyFontSize = vm.bodyFontSize,
					footerFontSize = vm.footerFontSize;

				size.height += titleLineCount * titleFontSize; // Title Lines
				size.height += (titleLineCount - 1) * vm.titleSpacing; // Title Line Spacing
				size.height += titleLineCount ? vm.titleMarginBottom : 0; // Title's bottom Margin
				size.height += combinedBodyLength * bodyFontSize; // Body Lines
				size.height += combinedBodyLength ? (combinedBodyLength - 1) * vm.bodySpacing : 0; // Body Line Spacing
				size.height += footerLineCount ? vm.footerMarginTop : 0; // Footer Margin
				size.height += footerLineCount * (footerFontSize); // Footer Lines
				size.height += footerLineCount ? (footerLineCount - 1) * vm.footerSpacing : 0; // Footer Line Spacing

				// Title width
				var widthPadding = 0;
				var maxLineWidth = function(line) {
					size.width = Math.max(size.width, ctx.measureText(line).width + widthPadding);
				};

				ctx.font = helpers.fontString(titleFontSize, vm._titleFontStyle, vm._titleFontFamily);
				helpers.each(vm.title, maxLineWidth);

				// Body width
				ctx.font = helpers.fontString(bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);
				helpers.each(vm.beforeBody.concat(vm.afterBody), maxLineWidth);

				// Body lines may include some extra width due to the color box
				widthPadding = body.length > 1 ? (bodyFontSize + 2) : 0;
				helpers.each(body, function(bodyItem) {
					helpers.each(bodyItem.before, maxLineWidth);
					helpers.each(bodyItem.lines, maxLineWidth);
					helpers.each(bodyItem.after, maxLineWidth);
				});

				// Reset back to 0
				widthPadding = 0;

				// Footer width
				ctx.font = helpers.fontString(footerFontSize, vm._footerFontStyle, vm._footerFontFamily);
				helpers.each(vm.footer, maxLineWidth);

				// Add padding
				size.width += 2 * vm.xPadding;

				return size;
			},
			determineAlignment: function(size) {
				var me = this;
				var model = me._model;
				var chart = me._chart;
				var chartArea = me._chartInstance.chartArea;

				if (model.y < size.height) {
					model.yAlign = 'top';
				} else if (model.y > (chart.height - size.height)) {
					model.yAlign = 'bottom';
				}

				var lf, rf; // functions to determine left, right alignment
				var olf, orf; // functions to determine if left/right alignment causes tooltip to go outside chart
				var yf; // function to get the y alignment if the tooltip goes outside of the left or right edges
				var midX = (chartArea.left + chartArea.right) / 2;
				var midY = (chartArea.top + chartArea.bottom) / 2;

				if (model.yAlign === 'center') {
					lf = function(x) {
						return x <= midX;
					};
					rf = function(x) {
						return x > midX;
					};
				} else {
					lf = function(x) {
						return x <= (size.width / 2);
					};
					rf = function(x) {
						return x >= (chart.width - (size.width / 2));
					};
				}

				olf = function(x) {
					return x + size.width > chart.width;
				};
				orf = function(x) {
					return x - size.width < 0;
				};
				yf = function(y) {
					return y <= midY ? 'top' : 'bottom';
				};

				if (lf(model.x)) {
					model.xAlign = 'left';

					// Is tooltip too wide and goes over the right side of the chart.?
					if (olf(model.x)) {
						model.xAlign = 'center';
						model.yAlign = yf(model.y);
					}
				} else if (rf(model.x)) {
					model.xAlign = 'right';

					// Is tooltip too wide and goes outside left edge of canvas?
					if (orf(model.x)) {
						model.xAlign = 'center';
						model.yAlign = yf(model.y);
					}
				}
			},
			getBackgroundPoint: function(vm, size) {
				// Background Position
				var pt = {
					x: vm.x,
					y: vm.y
				};

				var caretSize = vm.caretSize,
					caretPadding = vm.caretPadding,
					cornerRadius = vm.cornerRadius,
					xAlign = vm.xAlign,
					yAlign = vm.yAlign,
					paddingAndSize = caretSize + caretPadding,
					radiusAndPadding = cornerRadius + caretPadding;

				if (xAlign === 'right') {
					pt.x -= size.width;
				} else if (xAlign === 'center') {
					pt.x -= (size.width / 2);
				}

				if (yAlign === 'top') {
					pt.y += paddingAndSize;
				} else if (yAlign === 'bottom') {
					pt.y -= size.height + paddingAndSize;
				} else {
					pt.y -= (size.height / 2);
				}

				if (yAlign === 'center') {
					if (xAlign === 'left') {
						pt.x += paddingAndSize;
					} else if (xAlign === 'right') {
						pt.x -= paddingAndSize;
					}
				} else if (xAlign === 'left') {
					pt.x -= radiusAndPadding;
				} else if (xAlign === 'right') {
					pt.x += radiusAndPadding;
				}

				return pt;
			},
			drawCaret: function(tooltipPoint, size, opacity) {
				var vm = this._view;
				var ctx = this._chart.ctx;
				var x1, x2, x3;
				var y1, y2, y3;
				var caretSize = vm.caretSize;
				var cornerRadius = vm.cornerRadius;
				var xAlign = vm.xAlign,
					yAlign = vm.yAlign;
				var ptX = tooltipPoint.x,
					ptY = tooltipPoint.y;
				var width = size.width,
					height = size.height;

				if (yAlign === 'center') {
					// Left or right side
					if (xAlign === 'left') {
						x1 = ptX;
						x2 = x1 - caretSize;
						x3 = x1;
					} else {
						x1 = ptX + width;
						x2 = x1 + caretSize;
						x3 = x1;
					}

					y2 = ptY + (height / 2);
					y1 = y2 - caretSize;
					y3 = y2 + caretSize;
				} else {
					if (xAlign === 'left') {
						x1 = ptX + cornerRadius;
						x2 = x1 + caretSize;
						x3 = x2 + caretSize;
					} else if (xAlign === 'right') {
						x1 = ptX + width - cornerRadius;
						x2 = x1 - caretSize;
						x3 = x2 - caretSize;
					} else {
						x2 = ptX + (width / 2);
						x1 = x2 - caretSize;
						x3 = x2 + caretSize;
					}

					if (yAlign === 'top') {
						y1 = ptY;
						y2 = y1 - caretSize;
						y3 = y1;
					} else {
						y1 = ptY + height;
						y2 = y1 + caretSize;
						y3 = y1;
					}
				}

				var bgColor = helpers.color(vm.backgroundColor);
				ctx.fillStyle = bgColor.alpha(opacity * bgColor.alpha()).rgbString();
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.lineTo(x3, y3);
				ctx.closePath();
				ctx.fill();
			},
			drawTitle: function(pt, vm, ctx, opacity) {
				var title = vm.title;

				if (title.length) {
					ctx.textAlign = vm._titleAlign;
					ctx.textBaseline = 'top';

					var titleFontSize = vm.titleFontSize,
						titleSpacing = vm.titleSpacing;

					var titleFontColor = helpers.color(vm.titleFontColor);
					ctx.fillStyle = titleFontColor.alpha(opacity * titleFontColor.alpha()).rgbString();
					ctx.font = helpers.fontString(titleFontSize, vm._titleFontStyle, vm._titleFontFamily);

					var i, len;
					for (i = 0, len = title.length; i < len; ++i) {
						ctx.fillText(title[i], pt.x, pt.y);
						pt.y += titleFontSize + titleSpacing; // Line Height and spacing

						if (i + 1 === title.length) {
							pt.y += vm.titleMarginBottom - titleSpacing; // If Last, add margin, remove spacing
						}
					}
				}
			},
			drawBody: function(pt, vm, ctx, opacity) {
				var bodyFontSize = vm.bodyFontSize;
				var bodySpacing = vm.bodySpacing;
				var body = vm.body;

				ctx.textAlign = vm._bodyAlign;
				ctx.textBaseline = 'top';

				var bodyFontColor = helpers.color(vm.bodyFontColor);
				var textColor = bodyFontColor.alpha(opacity * bodyFontColor.alpha()).rgbString();
				ctx.fillStyle = textColor;
				ctx.font = helpers.fontString(bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);

				// Before Body
				var xLinePadding = 0;
				var fillLineOfText = function(line) {
					ctx.fillText(line, pt.x + xLinePadding, pt.y);
					pt.y += bodyFontSize + bodySpacing;
				};

				// Before body lines
				helpers.each(vm.beforeBody, fillLineOfText);

				var drawColorBoxes = body.length > 1;
				xLinePadding = drawColorBoxes ? (bodyFontSize + 2) : 0;

				// Draw body lines now
				helpers.each(body, function(bodyItem, i) {
					helpers.each(bodyItem.before, fillLineOfText);

					helpers.each(bodyItem.lines, function(line) {
						// Draw Legend-like boxes if needed
						if (drawColorBoxes) {
							// Fill a white rect so that colours merge nicely if the opacity is < 1
							ctx.fillStyle = helpers.color(vm.legendColorBackground).alpha(opacity).rgbaString();
							ctx.fillRect(pt.x, pt.y, bodyFontSize, bodyFontSize);

							// Border
							ctx.strokeStyle = helpers.color(vm.labelColors[i].borderColor).alpha(opacity).rgbaString();
							ctx.strokeRect(pt.x, pt.y, bodyFontSize, bodyFontSize);

							// Inner square
							ctx.fillStyle = helpers.color(vm.labelColors[i].backgroundColor).alpha(opacity).rgbaString();
							ctx.fillRect(pt.x + 1, pt.y + 1, bodyFontSize - 2, bodyFontSize - 2);

							ctx.fillStyle = textColor;
						}

						fillLineOfText(line);
					});

					helpers.each(bodyItem.after, fillLineOfText);
				});

				// Reset back to 0 for after body
				xLinePadding = 0;

				// After body lines
				helpers.each(vm.afterBody, fillLineOfText);
				pt.y -= bodySpacing; // Remove last body spacing
			},
			drawFooter: function(pt, vm, ctx, opacity) {
				var footer = vm.footer;

				if (footer.length) {
					pt.y += vm.footerMarginTop;

					ctx.textAlign = vm._footerAlign;
					ctx.textBaseline = 'top';

					var footerFontColor = helpers.color(vm.footerFontColor);
					ctx.fillStyle = footerFontColor.alpha(opacity * footerFontColor.alpha()).rgbString();
					ctx.font = helpers.fontString(vm.footerFontSize, vm._footerFontStyle, vm._footerFontFamily);

					helpers.each(footer, function(line) {
						ctx.fillText(line, pt.x, pt.y);
						pt.y += vm.footerFontSize + vm.footerSpacing;
					});
				}
			},
			draw: function() {
				var ctx = this._chart.ctx;
				var vm = this._view;

				if (vm.opacity === 0) {
					return;
				}

				var tooltipSize = this.getTooltipSize(vm);
				var pt = {
					x: vm.x,
					y: vm.y
				};

				// IE11/Edge does not like very small opacities, so snap to 0
				var opacity = Math.abs(vm.opacity < 1e-3) ? 0 : vm.opacity;

				if (this._options.enabled) {
					// Draw Background
					var bgColor = helpers.color(vm.backgroundColor);
					ctx.fillStyle = bgColor.alpha(opacity * bgColor.alpha()).rgbString();
					helpers.drawRoundedRectangle(ctx, pt.x, pt.y, tooltipSize.width, tooltipSize.height, vm.cornerRadius);
					ctx.fill();

					// Draw Caret
					this.drawCaret(pt, tooltipSize, opacity);

					// Draw Title, Body, and Footer
					pt.x += vm.xPadding;
					pt.y += vm.yPadding;

					// Titles
					this.drawTitle(pt, vm, ctx, opacity);

					// Body
					this.drawBody(pt, vm, ctx, opacity);

					// Footer
					this.drawFooter(pt, vm, ctx, opacity);
				}
			}
		});
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers,
			globalOpts = Chart.defaults.global;

		globalOpts.elements.arc = {
			backgroundColor: globalOpts.defaultColor,
			borderColor: '#fff',
			borderWidth: 2
		};

		Chart.elements.Arc = Chart.Element.extend({
			inLabelRange: function(mouseX) {
				var vm = this._view;

				if (vm) {
					return (Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hoverRadius, 2));
				}
				return false;
			},
			inRange: function(chartX, chartY) {
				var vm = this._view;

				if (vm) {
					var pointRelativePosition = helpers.getAngleFromPoint(vm, {
							x: chartX,
							y: chartY
						}),
						angle = pointRelativePosition.angle,
						distance = pointRelativePosition.distance;

					// Sanitise angle range
					var startAngle = vm.startAngle;
					var endAngle = vm.endAngle;
					while (endAngle < startAngle) {
						endAngle += 2.0 * Math.PI;
					}
					while (angle > endAngle) {
						angle -= 2.0 * Math.PI;
					}
					while (angle < startAngle) {
						angle += 2.0 * Math.PI;
					}

					// Check if within the range of the open/close angle
					var betweenAngles = (angle >= startAngle && angle <= endAngle),
						withinRadius = (distance >= vm.innerRadius && distance <= vm.outerRadius);

					return (betweenAngles && withinRadius);
				}
				return false;
			},
			tooltipPosition: function() {
				var vm = this._view;

				var centreAngle = vm.startAngle + ((vm.endAngle - vm.startAngle) / 2),
					rangeFromCentre = (vm.outerRadius - vm.innerRadius) / 2 + vm.innerRadius;
				return {
					x: vm.x + (Math.cos(centreAngle) * rangeFromCentre),
					y: vm.y + (Math.sin(centreAngle) * rangeFromCentre)
				};
			},
			draw: function() {

				var ctx = this._chart.ctx,
					vm = this._view,
					sA = vm.startAngle,
					eA = vm.endAngle;

				ctx.beginPath();

				ctx.arc(vm.x, vm.y, vm.outerRadius, sA, eA);
				ctx.arc(vm.x, vm.y, vm.innerRadius, eA, sA, true);

				ctx.closePath();
				ctx.strokeStyle = vm.borderColor;
				ctx.lineWidth = vm.borderWidth;

				ctx.fillStyle = vm.backgroundColor;

				ctx.fill();
				ctx.lineJoin = 'bevel';

				if (vm.borderWidth) {
					ctx.stroke();
				}
			}
		});
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;
		var globalDefaults = Chart.defaults.global;

		Chart.defaults.global.elements.line = {
			tension: 0.4,
			backgroundColor: globalDefaults.defaultColor,
			borderWidth: 3,
			borderColor: globalDefaults.defaultColor,
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			capBezierPoints: true,
			fill: true // do we fill in the area between the line and its base axis
		};

		Chart.elements.Line = Chart.Element.extend({
			draw: function() {
				var me = this;
				var vm = me._view;
				var spanGaps = vm.spanGaps;
				var scaleZero = vm.scaleZero;
				var loop = me._loop;

				var ctx = me._chart.ctx;
				ctx.save();

				// Helper function to draw a line to a point
				function lineToPoint(previousPoint, point) {
					var pointVM = point._view;
					if (point._view.steppedLine === true) {
						ctx.lineTo(pointVM.x, previousPoint._view.y);
						ctx.lineTo(pointVM.x, pointVM.y);
					} else if (point._view.tension === 0) {
						ctx.lineTo(pointVM.x, pointVM.y);
					} else {
						ctx.bezierCurveTo(
							previousPoint._view.controlPointNextX,
							previousPoint._view.controlPointNextY,
							pointVM.controlPointPreviousX,
							pointVM.controlPointPreviousY,
							pointVM.x,
							pointVM.y
						);
					}
				}

				var points = me._children.slice(); // clone array
				var lastDrawnIndex = -1;

				// If we are looping, adding the first point again
				if (loop && points.length) {
					points.push(points[0]);
				}

				var index, current, previous, currentVM;

				// Fill Line
				if (points.length && vm.fill) {
					ctx.beginPath();

					for (index = 0; index < points.length; ++index) {
						current = points[index];
						previous = helpers.previousItem(points, index);
						currentVM = current._view;

						// First point moves to it's starting position no matter what
						if (index === 0) {
							if (loop) {
								ctx.moveTo(scaleZero.x, scaleZero.y);
							} else {
								ctx.moveTo(currentVM.x, scaleZero);
							}

							if (!currentVM.skip) {
								lastDrawnIndex = index;
								ctx.lineTo(currentVM.x, currentVM.y);
							}
						} else {
							previous = lastDrawnIndex === -1 ? previous : points[lastDrawnIndex];

							if (currentVM.skip) {
								// Only do this if this is the first point that is skipped
								if (!spanGaps && lastDrawnIndex === (index - 1)) {
									if (loop) {
										ctx.lineTo(scaleZero.x, scaleZero.y);
									} else {
										ctx.lineTo(previous._view.x, scaleZero);
									}
								}
							} else {
								if (lastDrawnIndex !== (index - 1)) {
									// There was a gap and this is the first point after the gap. If we've never drawn a point, this is a special case.
									// If the first data point is NaN, then there is no real gap to skip
									if (spanGaps && lastDrawnIndex !== -1) {
										// We are spanning the gap, so simple draw a line to this point
										lineToPoint(previous, current);
									} else if (loop) {
										ctx.lineTo(currentVM.x, currentVM.y);
									} else {
										ctx.lineTo(currentVM.x, scaleZero);
										ctx.lineTo(currentVM.x, currentVM.y);
									}
								} else {
									// Line to next point
									lineToPoint(previous, current);
								}
								lastDrawnIndex = index;
							}
						}
					}

					if (!loop && lastDrawnIndex !== -1) {
						ctx.lineTo(points[lastDrawnIndex]._view.x, scaleZero);
					}

					ctx.fillStyle = vm.backgroundColor || globalDefaults.defaultColor;
					ctx.closePath();
					ctx.fill();
				}

				// Stroke Line Options
				var globalOptionLineElements = globalDefaults.elements.line;
				ctx.lineCap = vm.borderCapStyle || globalOptionLineElements.borderCapStyle;

				// IE 9 and 10 do not support line dash
				if (ctx.setLineDash) {
					ctx.setLineDash(vm.borderDash || globalOptionLineElements.borderDash);
				}

				ctx.lineDashOffset = vm.borderDashOffset || globalOptionLineElements.borderDashOffset;
				ctx.lineJoin = vm.borderJoinStyle || globalOptionLineElements.borderJoinStyle;
				ctx.lineWidth = vm.borderWidth || globalOptionLineElements.borderWidth;
				ctx.strokeStyle = vm.borderColor || globalDefaults.defaultColor;

				// Stroke Line
				ctx.beginPath();
				lastDrawnIndex = -1;

				for (index = 0; index < points.length; ++index) {
					current = points[index];
					previous = helpers.previousItem(points, index);
					currentVM = current._view;

					// First point moves to it's starting position no matter what
					if (index === 0) {
						if (!currentVM.skip) {
							ctx.moveTo(currentVM.x, currentVM.y);
							lastDrawnIndex = index;
						}
					} else {
						previous = lastDrawnIndex === -1 ? previous : points[lastDrawnIndex];

						if (!currentVM.skip) {
							if ((lastDrawnIndex !== (index - 1) && !spanGaps) || lastDrawnIndex === -1) {
								// There was a gap and this is the first point after the gap
								ctx.moveTo(currentVM.x, currentVM.y);
							} else {
								// Line to next point
								lineToPoint(previous, current);
							}
							lastDrawnIndex = index;
						}
					}
				}

				ctx.stroke();
				ctx.restore();
			}
		});
	};


/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers,
			globalOpts = Chart.defaults.global,
			defaultColor = globalOpts.defaultColor;

		globalOpts.elements.point = {
			radius: 3,
			pointStyle: 'circle',
			backgroundColor: defaultColor,
			borderWidth: 1,
			borderColor: defaultColor,
			// Hover
			hitRadius: 1,
			hoverRadius: 4,
			hoverBorderWidth: 1
		};

		Chart.elements.Point = Chart.Element.extend({
			inRange: function(mouseX, mouseY) {
				var vm = this._view;
				return vm ? ((Math.pow(mouseX - vm.x, 2) + Math.pow(mouseY - vm.y, 2)) < Math.pow(vm.hitRadius + vm.radius, 2)) : false;
			},
			inLabelRange: function(mouseX) {
				var vm = this._view;
				return vm ? (Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hitRadius, 2)) : false;
			},
			tooltipPosition: function() {
				var vm = this._view;
				return {
					x: vm.x,
					y: vm.y,
					padding: vm.radius + vm.borderWidth
				};
			},
			draw: function() {
				var vm = this._view;
				var ctx = this._chart.ctx;
				var pointStyle = vm.pointStyle;
				var radius = vm.radius;
				var x = vm.x;
				var y = vm.y;

				if (vm.skip) {
					return;
				}

				ctx.strokeStyle = vm.borderColor || defaultColor;
				ctx.lineWidth = helpers.getValueOrDefault(vm.borderWidth, globalOpts.elements.point.borderWidth);
				ctx.fillStyle = vm.backgroundColor || defaultColor;

				Chart.canvasHelpers.drawPoint(ctx, pointStyle, radius, x, y);
			}
		});
	};


/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var globalOpts = Chart.defaults.global;

		globalOpts.elements.rectangle = {
			backgroundColor: globalOpts.defaultColor,
			borderWidth: 0,
			borderColor: globalOpts.defaultColor,
			borderSkipped: 'bottom'
		};

		Chart.elements.Rectangle = Chart.Element.extend({
			draw: function() {
				var ctx = this._chart.ctx;
				var vm = this._view;

				var halfWidth = vm.width / 2,
					leftX = vm.x - halfWidth,
					rightX = vm.x + halfWidth,
					top = vm.base - (vm.base - vm.y),
					halfStroke = vm.borderWidth / 2;

				// Canvas doesn't allow us to stroke inside the width so we can
				// adjust the sizes to fit if we're setting a stroke on the line
				if (vm.borderWidth) {
					leftX += halfStroke;
					rightX -= halfStroke;
					top += halfStroke;
				}

				ctx.beginPath();
				ctx.fillStyle = vm.backgroundColor;
				ctx.strokeStyle = vm.borderColor;
				ctx.lineWidth = vm.borderWidth;

				// Corner points, from bottom-left to bottom-right clockwise
				// | 1 2 |
				// | 0 3 |
				var corners = [
					[leftX, vm.base],
					[leftX, top],
					[rightX, top],
					[rightX, vm.base]
				];

				// Find first (starting) corner with fallback to 'bottom'
				var borders = ['bottom', 'left', 'top', 'right'];
				var startCorner = borders.indexOf(vm.borderSkipped, 0);
				if (startCorner === -1) {
					startCorner = 0;
				}

				function cornerAt(index) {
					return corners[(startCorner + index) % 4];
				}

				// Draw rectangle from 'startCorner'
				ctx.moveTo.apply(ctx, cornerAt(0));
				for (var i = 1; i < 4; i++) {
					ctx.lineTo.apply(ctx, cornerAt(i));
				}

				ctx.fill();
				if (vm.borderWidth) {
					ctx.stroke();
				}
			},
			height: function() {
				var vm = this._view;
				return vm.base - vm.y;
			},
			inRange: function(mouseX, mouseY) {
				var vm = this._view;
				return vm ?
						(vm.y < vm.base ?
							(mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2) && (mouseY >= vm.y && mouseY <= vm.base) :
							(mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2) && (mouseY >= vm.base && mouseY <= vm.y)) :
						false;
			},
			inLabelRange: function(mouseX) {
				var vm = this._view;
				return vm ? (mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2) : false;
			},
			tooltipPosition: function() {
				var vm = this._view;
				return {
					x: vm.x,
					y: vm.y
				};
			}
		});

	};


/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers,
			noop = helpers.noop;

		Chart.LinearScaleBase = Chart.Scale.extend({
			handleTickRangeOptions: function() {
				var me = this;
				var opts = me.options;
				var tickOpts = opts.ticks;

				// If we are forcing it to begin at 0, but 0 will already be rendered on the chart,
				// do nothing since that would make the chart weird. If the user really wants a weird chart
				// axis, they can manually override it
				if (tickOpts.beginAtZero) {
					var minSign = helpers.sign(me.min);
					var maxSign = helpers.sign(me.max);

					if (minSign < 0 && maxSign < 0) {
						// move the top up to 0
						me.max = 0;
					} else if (minSign > 0 && maxSign > 0) {
						// move the botttom down to 0
						me.min = 0;
					}
				}

				if (tickOpts.min !== undefined) {
					me.min = tickOpts.min;
				} else if (tickOpts.suggestedMin !== undefined) {
					me.min = Math.min(me.min, tickOpts.suggestedMin);
				}

				if (tickOpts.max !== undefined) {
					me.max = tickOpts.max;
				} else if (tickOpts.suggestedMax !== undefined) {
					me.max = Math.max(me.max, tickOpts.suggestedMax);
				}

				if (me.min === me.max) {
					me.max++;

					if (!tickOpts.beginAtZero) {
						me.min--;
					}
				}
			},
			getTickLimit: noop,
			handleDirectionalChanges: noop,

			buildTicks: function() {
				var me = this;
				var opts = me.options;
				var ticks = me.ticks = [];
				var tickOpts = opts.ticks;
				var getValueOrDefault = helpers.getValueOrDefault;

				// Figure out what the max number of ticks we can support it is based on the size of
				// the axis area. For now, we say that the minimum tick spacing in pixels must be 50
				// We also limit the maximum number of ticks to 11 which gives a nice 10 squares on
				// the graph

				var maxTicks = me.getTickLimit();

				// Make sure we always have at least 2 ticks
				maxTicks = Math.max(2, maxTicks);

				// To get a "nice" value for the tick spacing, we will use the appropriately named
				// "nice number" algorithm. See http://stackoverflow.com/questions/8506881/nice-label-algorithm-for-charts-with-minimum-ticks
				// for details.

				var spacing;
				var fixedStepSizeSet = (tickOpts.fixedStepSize && tickOpts.fixedStepSize > 0) || (tickOpts.stepSize && tickOpts.stepSize > 0);
				if (fixedStepSizeSet) {
					spacing = getValueOrDefault(tickOpts.fixedStepSize, tickOpts.stepSize);
				} else {
					var niceRange = helpers.niceNum(me.max - me.min, false);
					spacing = helpers.niceNum(niceRange / (maxTicks - 1), true);
				}
				var niceMin = Math.floor(me.min / spacing) * spacing;
				var niceMax = Math.ceil(me.max / spacing) * spacing;
				var numSpaces = (niceMax - niceMin) / spacing;

				// If very close to our rounded value, use it.
				if (helpers.almostEquals(numSpaces, Math.round(numSpaces), spacing / 1000)) {
					numSpaces = Math.round(numSpaces);
				} else {
					numSpaces = Math.ceil(numSpaces);
				}

				// Put the values into the ticks array
				ticks.push(tickOpts.min !== undefined ? tickOpts.min : niceMin);
				for (var j = 1; j < numSpaces; ++j) {
					ticks.push(niceMin + (j * spacing));
				}
				ticks.push(tickOpts.max !== undefined ? tickOpts.max : niceMax);

				me.handleDirectionalChanges();

				// At this point, we need to update our max and min given the tick values since we have expanded the
				// range of the scale
				me.max = helpers.max(ticks);
				me.min = helpers.min(ticks);

				if (tickOpts.reverse) {
					ticks.reverse();

					me.start = me.max;
					me.end = me.min;
				} else {
					me.start = me.min;
					me.end = me.max;
				}
			},
			convertTicksToLabels: function() {
				var me = this;
				me.ticksAsNumbers = me.ticks.slice();
				me.zeroLineIndex = me.ticks.indexOf(0);

				Chart.Scale.prototype.convertTicksToLabels.call(me);
			}
		});
	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;
		// Default config for a category scale
		var defaultConfig = {
			position: 'bottom'
		};

		var DatasetScale = Chart.Scale.extend({
			/**
			* Internal function to get the correct labels. If data.xLabels or data.yLabels are defined, use tose
			* else fall back to data.labels
			* @private
			*/
			getLabels: function() {
				var data = this.chart.data;
				return (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels;
			},
			// Implement this so that
			determineDataLimits: function() {
				var me = this;
				var labels = me.getLabels();
				me.minIndex = 0;
				me.maxIndex = labels.length - 1;
				var findIndex;

				if (me.options.ticks.min !== undefined) {
					// user specified min value
					findIndex = helpers.indexOf(labels, me.options.ticks.min);
					me.minIndex = findIndex !== -1 ? findIndex : me.minIndex;
				}

				if (me.options.ticks.max !== undefined) {
					// user specified max value
					findIndex = helpers.indexOf(labels, me.options.ticks.max);
					me.maxIndex = findIndex !== -1 ? findIndex : me.maxIndex;
				}

				me.min = labels[me.minIndex];
				me.max = labels[me.maxIndex];
			},

			buildTicks: function() {
				var me = this;
				var labels = me.getLabels();
				// If we are viewing some subset of labels, slice the original array
				me.ticks = (me.minIndex === 0 && me.maxIndex === labels.length - 1) ? labels : labels.slice(me.minIndex, me.maxIndex + 1);
			},

			getLabelForIndex: function(index, datasetIndex) {
				var me = this;
				var data = me.chart.data;
				var isHorizontal = me.isHorizontal();

				if ((data.xLabels && isHorizontal) || (data.yLabels && !isHorizontal)) {
					return me.getRightValue(data.datasets[datasetIndex].data[index]);
				}
				return me.ticks[index];
			},

			// Used to get data value locations.  Value can either be an index or a numerical value
			getPixelForValue: function(value, index, datasetIndex, includeOffset) {
				var me = this;
				// 1 is added because we need the length but we have the indexes
				var offsetAmt = Math.max((me.maxIndex + 1 - me.minIndex - ((me.options.gridLines.offsetGridLines) ? 0 : 1)), 1);

				if (value !== undefined && isNaN(index)) {
					var labels = me.getLabels();
					var idx = labels.indexOf(value);
					index = idx !== -1 ? idx : index;
				}

				if (me.isHorizontal()) {
					var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
					var valueWidth = innerWidth / offsetAmt;
					var widthOffset = (valueWidth * (index - me.minIndex)) + me.paddingLeft;

					if (me.options.gridLines.offsetGridLines && includeOffset || me.maxIndex === me.minIndex && includeOffset) {
						widthOffset += (valueWidth / 2);
					}

					return me.left + Math.round(widthOffset);
				}
				var innerHeight = me.height - (me.paddingTop + me.paddingBottom);
				var valueHeight = innerHeight / offsetAmt;
				var heightOffset = (valueHeight * (index - me.minIndex)) + me.paddingTop;

				if (me.options.gridLines.offsetGridLines && includeOffset) {
					heightOffset += (valueHeight / 2);
				}

				return me.top + Math.round(heightOffset);
			},
			getPixelForTick: function(index, includeOffset) {
				return this.getPixelForValue(this.ticks[index], index + this.minIndex, null, includeOffset);
			},
			getValueForPixel: function(pixel) {
				var me = this;
				var value;
				var offsetAmt = Math.max((me.ticks.length - ((me.options.gridLines.offsetGridLines) ? 0 : 1)), 1);
				var horz = me.isHorizontal();
				var innerDimension = horz ? me.width - (me.paddingLeft + me.paddingRight) : me.height - (me.paddingTop + me.paddingBottom);
				var valueDimension = innerDimension / offsetAmt;

				pixel -= horz ? me.left : me.top;

				if (me.options.gridLines.offsetGridLines) {
					pixel -= (valueDimension / 2);
				}
				pixel -= horz ? me.paddingLeft : me.paddingTop;

				if (pixel <= 0) {
					value = 0;
				} else {
					value = Math.round(pixel / valueDimension);
				}

				return value;
			},
			getBasePixel: function() {
				return this.bottom;
			}
		});

		Chart.scaleService.registerScaleType('category', DatasetScale, defaultConfig);

	};


/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;

		var defaultConfig = {
			position: 'left',
			ticks: {
				callback: function(tickValue, index, ticks) {
					// If we have lots of ticks, don't use the ones
					var delta = ticks.length > 3 ? ticks[2] - ticks[1] : ticks[1] - ticks[0];

					// If we have a number like 2.5 as the delta, figure out how many decimal places we need
					if (Math.abs(delta) > 1) {
						if (tickValue !== Math.floor(tickValue)) {
							// not an integer
							delta = tickValue - Math.floor(tickValue);
						}
					}

					var logDelta = helpers.log10(Math.abs(delta));
					var tickString = '';

					if (tickValue !== 0) {
						var numDecimal = -1 * Math.floor(logDelta);
						numDecimal = Math.max(Math.min(numDecimal, 20), 0); // toFixed has a max of 20 decimal places
						tickString = tickValue.toFixed(numDecimal);
					} else {
						tickString = '0'; // never show decimal places for 0
					}

					return tickString;
				}
			}
		};

		var LinearScale = Chart.LinearScaleBase.extend({
			determineDataLimits: function() {
				var me = this;
				var opts = me.options;
				var chart = me.chart;
				var data = chart.data;
				var datasets = data.datasets;
				var isHorizontal = me.isHorizontal();

				function IDMatches(meta) {
					return isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id;
				}

				// First Calculate the range
				me.min = null;
				me.max = null;

				if (opts.stacked) {
					var valuesPerType = {};

					helpers.each(datasets, function(dataset, datasetIndex) {
						var meta = chart.getDatasetMeta(datasetIndex);
						if (valuesPerType[meta.type] === undefined) {
							valuesPerType[meta.type] = {
								positiveValues: [],
								negativeValues: []
							};
						}

						// Store these per type
						var positiveValues = valuesPerType[meta.type].positiveValues;
						var negativeValues = valuesPerType[meta.type].negativeValues;

						if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
							helpers.each(dataset.data, function(rawValue, index) {
								var value = +me.getRightValue(rawValue);
								if (isNaN(value) || meta.data[index].hidden) {
									return;
								}

								positiveValues[index] = positiveValues[index] || 0;
								negativeValues[index] = negativeValues[index] || 0;

								if (opts.relativePoints) {
									positiveValues[index] = 100;
								} else if (value < 0) {
									negativeValues[index] += value;
								} else {
									positiveValues[index] += value;
								}
							});
						}
					});

					helpers.each(valuesPerType, function(valuesForType) {
						var values = valuesForType.positiveValues.concat(valuesForType.negativeValues);
						var minVal = helpers.min(values);
						var maxVal = helpers.max(values);
						me.min = me.min === null ? minVal : Math.min(me.min, minVal);
						me.max = me.max === null ? maxVal : Math.max(me.max, maxVal);
					});

				} else {
					helpers.each(datasets, function(dataset, datasetIndex) {
						var meta = chart.getDatasetMeta(datasetIndex);
						if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
							helpers.each(dataset.data, function(rawValue, index) {
								var value = +me.getRightValue(rawValue);
								if (isNaN(value) || meta.data[index].hidden) {
									return;
								}

								if (me.min === null) {
									me.min = value;
								} else if (value < me.min) {
									me.min = value;
								}

								if (me.max === null) {
									me.max = value;
								} else if (value > me.max) {
									me.max = value;
								}
							});
						}
					});
				}

				// Common base implementation to handle ticks.min, ticks.max, ticks.beginAtZero
				this.handleTickRangeOptions();
			},
			getTickLimit: function() {
				var maxTicks;
				var me = this;
				var tickOpts = me.options.ticks;

				if (me.isHorizontal()) {
					maxTicks = Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(me.width / 50));
				} else {
					// The factor of 2 used to scale the font size has been experimentally determined.
					var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, Chart.defaults.global.defaultFontSize);
					maxTicks = Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(me.height / (2 * tickFontSize)));
				}

				return maxTicks;
			},
			// Called after the ticks are built. We need
			handleDirectionalChanges: function() {
				if (!this.isHorizontal()) {
					// We are in a vertical orientation. The top value is the highest. So reverse the array
					this.ticks.reverse();
				}
			},
			getLabelForIndex: function(index, datasetIndex) {
				return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
			},
			// Utils
			getPixelForValue: function(value) {
				// This must be called after fit has been run so that
				// this.left, this.top, this.right, and this.bottom have been defined
				var me = this;
				var paddingLeft = me.paddingLeft;
				var paddingBottom = me.paddingBottom;
				var start = me.start;

				var rightValue = +me.getRightValue(value);
				var pixel;
				var innerDimension;
				var range = me.end - start;

				if (me.isHorizontal()) {
					innerDimension = me.width - (paddingLeft + me.paddingRight);
					pixel = me.left + (innerDimension / range * (rightValue - start));
					return Math.round(pixel + paddingLeft);
				}
				innerDimension = me.height - (me.paddingTop + paddingBottom);
				pixel = (me.bottom - paddingBottom) - (innerDimension / range * (rightValue - start));
				return Math.round(pixel);
			},
			getValueForPixel: function(pixel) {
				var me = this;
				var isHorizontal = me.isHorizontal();
				var paddingLeft = me.paddingLeft;
				var paddingBottom = me.paddingBottom;
				var innerDimension = isHorizontal ? me.width - (paddingLeft + me.paddingRight) : me.height - (me.paddingTop + paddingBottom);
				var offset = (isHorizontal ? pixel - me.left - paddingLeft : me.bottom - paddingBottom - pixel) / innerDimension;
				return me.start + ((me.end - me.start) * offset);
			},
			getPixelForTick: function(index) {
				return this.getPixelForValue(this.ticksAsNumbers[index]);
			}
		});
		Chart.scaleService.registerScaleType('linear', LinearScale, defaultConfig);

	};


/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;

		var defaultConfig = {
			position: 'left',

			// label settings
			ticks: {
				callback: function(value, index, arr) {
					var remain = value / (Math.pow(10, Math.floor(helpers.log10(value))));

					if (value === 0) {
						return '0';
					} else if (remain === 1 || remain === 2 || remain === 5 || index === 0 || index === arr.length - 1) {
						return value.toExponential();
					}
					return '';
				}
			}
		};

		var LogarithmicScale = Chart.Scale.extend({
			determineDataLimits: function() {
				var me = this;
				var opts = me.options;
				var tickOpts = opts.ticks;
				var chart = me.chart;
				var data = chart.data;
				var datasets = data.datasets;
				var getValueOrDefault = helpers.getValueOrDefault;
				var isHorizontal = me.isHorizontal();
				function IDMatches(meta) {
					return isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id;
				}

				// Calculate Range
				me.min = null;
				me.max = null;
				me.minNotZero = null;

				if (opts.stacked) {
					var valuesPerType = {};

					helpers.each(datasets, function(dataset, datasetIndex) {
						var meta = chart.getDatasetMeta(datasetIndex);
						if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
							if (valuesPerType[meta.type] === undefined) {
								valuesPerType[meta.type] = [];
							}

							helpers.each(dataset.data, function(rawValue, index) {
								var values = valuesPerType[meta.type];
								var value = +me.getRightValue(rawValue);
								if (isNaN(value) || meta.data[index].hidden) {
									return;
								}

								values[index] = values[index] || 0;

								if (opts.relativePoints) {
									values[index] = 100;
								} else {
									// Don't need to split positive and negative since the log scale can't handle a 0 crossing
									values[index] += value;
								}
							});
						}
					});

					helpers.each(valuesPerType, function(valuesForType) {
						var minVal = helpers.min(valuesForType);
						var maxVal = helpers.max(valuesForType);
						me.min = me.min === null ? minVal : Math.min(me.min, minVal);
						me.max = me.max === null ? maxVal : Math.max(me.max, maxVal);
					});

				} else {
					helpers.each(datasets, function(dataset, datasetIndex) {
						var meta = chart.getDatasetMeta(datasetIndex);
						if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
							helpers.each(dataset.data, function(rawValue, index) {
								var value = +me.getRightValue(rawValue);
								if (isNaN(value) || meta.data[index].hidden) {
									return;
								}

								if (me.min === null) {
									me.min = value;
								} else if (value < me.min) {
									me.min = value;
								}

								if (me.max === null) {
									me.max = value;
								} else if (value > me.max) {
									me.max = value;
								}

								if (value !== 0 && (me.minNotZero === null || value < me.minNotZero)) {
									me.minNotZero = value;
								}
							});
						}
					});
				}

				me.min = getValueOrDefault(tickOpts.min, me.min);
				me.max = getValueOrDefault(tickOpts.max, me.max);

				if (me.min === me.max) {
					if (me.min !== 0 && me.min !== null) {
						me.min = Math.pow(10, Math.floor(helpers.log10(me.min)) - 1);
						me.max = Math.pow(10, Math.floor(helpers.log10(me.max)) + 1);
					} else {
						me.min = 1;
						me.max = 10;
					}
				}
			},
			buildTicks: function() {
				var me = this;
				var opts = me.options;
				var tickOpts = opts.ticks;
				var getValueOrDefault = helpers.getValueOrDefault;

				// Reset the ticks array. Later on, we will draw a grid line at these positions
				// The array simply contains the numerical value of the spots where ticks will be
				var ticks = me.ticks = [];

				// Figure out what the max number of ticks we can support it is based on the size of
				// the axis area. For now, we say that the minimum tick spacing in pixels must be 50
				// We also limit the maximum number of ticks to 11 which gives a nice 10 squares on
				// the graph

				var tickVal = getValueOrDefault(tickOpts.min, Math.pow(10, Math.floor(helpers.log10(me.min))));

				while (tickVal < me.max) {
					ticks.push(tickVal);

					var exp;
					var significand;

					if (tickVal === 0) {
						exp = Math.floor(helpers.log10(me.minNotZero));
						significand = Math.round(me.minNotZero / Math.pow(10, exp));
					} else {
						exp = Math.floor(helpers.log10(tickVal));
						significand = Math.floor(tickVal / Math.pow(10, exp)) + 1;
					}

					if (significand === 10) {
						significand = 1;
						++exp;
					}

					tickVal = significand * Math.pow(10, exp);
				}

				var lastTick = getValueOrDefault(tickOpts.max, tickVal);
				ticks.push(lastTick);

				if (!me.isHorizontal()) {
					// We are in a vertical orientation. The top value is the highest. So reverse the array
					ticks.reverse();
				}

				// At this point, we need to update our max and min given the tick values since we have expanded the
				// range of the scale
				me.max = helpers.max(ticks);
				me.min = helpers.min(ticks);

				if (tickOpts.reverse) {
					ticks.reverse();

					me.start = me.max;
					me.end = me.min;
				} else {
					me.start = me.min;
					me.end = me.max;
				}
			},
			convertTicksToLabels: function() {
				this.tickValues = this.ticks.slice();

				Chart.Scale.prototype.convertTicksToLabels.call(this);
			},
			// Get the correct tooltip label
			getLabelForIndex: function(index, datasetIndex) {
				return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
			},
			getPixelForTick: function(index) {
				return this.getPixelForValue(this.tickValues[index]);
			},
			getPixelForValue: function(value) {
				var me = this;
				var innerDimension;
				var pixel;

				var start = me.start;
				var newVal = +me.getRightValue(value);
				var range;
				var paddingTop = me.paddingTop;
				var paddingBottom = me.paddingBottom;
				var paddingLeft = me.paddingLeft;
				var opts = me.options;
				var tickOpts = opts.ticks;

				if (me.isHorizontal()) {
					range = helpers.log10(me.end) - helpers.log10(start); // todo: if start === 0
					if (newVal === 0) {
						pixel = me.left + paddingLeft;
					} else {
						innerDimension = me.width - (paddingLeft + me.paddingRight);
						pixel = me.left + (innerDimension / range * (helpers.log10(newVal) - helpers.log10(start)));
						pixel += paddingLeft;
					}
				} else {
					// Bottom - top since pixels increase downard on a screen
					innerDimension = me.height - (paddingTop + paddingBottom);
					if (start === 0 && !tickOpts.reverse) {
						range = helpers.log10(me.end) - helpers.log10(me.minNotZero);
						if (newVal === start) {
							pixel = me.bottom - paddingBottom;
						} else if (newVal === me.minNotZero) {
							pixel = me.bottom - paddingBottom - innerDimension * 0.02;
						} else {
							pixel = me.bottom - paddingBottom - innerDimension * 0.02 - (innerDimension * 0.98/ range * (helpers.log10(newVal)-helpers.log10(me.minNotZero)));
						}
					} else if (me.end === 0 && tickOpts.reverse) {
						range = helpers.log10(me.start) - helpers.log10(me.minNotZero);
						if (newVal === me.end) {
							pixel = me.top + paddingTop;
						} else if (newVal === me.minNotZero) {
							pixel = me.top + paddingTop + innerDimension * 0.02;
						} else {
							pixel = me.top + paddingTop + innerDimension * 0.02 + (innerDimension * 0.98/ range * (helpers.log10(newVal)-helpers.log10(me.minNotZero)));
						}
					} else {
						range = helpers.log10(me.end) - helpers.log10(start);
						innerDimension = me.height - (paddingTop + paddingBottom);
						pixel = (me.bottom - paddingBottom) - (innerDimension / range * (helpers.log10(newVal) - helpers.log10(start)));
					}
				}
				return pixel;
			},
			getValueForPixel: function(pixel) {
				var me = this;
				var range = helpers.log10(me.end) - helpers.log10(me.start);
				var value, innerDimension;

				if (me.isHorizontal()) {
					innerDimension = me.width - (me.paddingLeft + me.paddingRight);
					value = me.start * Math.pow(10, (pixel - me.left - me.paddingLeft) * range / innerDimension);
				} else {  // todo: if start === 0
					innerDimension = me.height - (me.paddingTop + me.paddingBottom);
					value = Math.pow(10, (me.bottom - me.paddingBottom - pixel) * range / innerDimension) / me.start;
				}
				return value;
			}
		});
		Chart.scaleService.registerScaleType('logarithmic', LogarithmicScale, defaultConfig);

	};


/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;
		var globalDefaults = Chart.defaults.global;

		var defaultConfig = {
			display: true,

			// Boolean - Whether to animate scaling the chart from the centre
			animate: true,
			lineArc: false,
			position: 'chartArea',

			angleLines: {
				display: true,
				color: 'rgba(0, 0, 0, 0.1)',
				lineWidth: 1
			},

			// label settings
			ticks: {
				// Boolean - Show a backdrop to the scale label
				showLabelBackdrop: true,

				// String - The colour of the label backdrop
				backdropColor: 'rgba(255,255,255,0.75)',

				// Number - The backdrop padding above & below the label in pixels
				backdropPaddingY: 2,

				// Number - The backdrop padding to the side of the label in pixels
				backdropPaddingX: 2
			},

			pointLabels: {
				// Number - Point label font size in pixels
				fontSize: 10,

				// Function - Used to convert point labels
				callback: function(label) {
					return label;
				}
			}
		};

		var LinearRadialScale = Chart.LinearScaleBase.extend({
			getValueCount: function() {
				return this.chart.data.labels.length;
			},
			setDimensions: function() {
				var me = this;
				var opts = me.options;
				var tickOpts = opts.ticks;
				// Set the unconstrained dimension before label rotation
				me.width = me.maxWidth;
				me.height = me.maxHeight;
				me.xCenter = Math.round(me.width / 2);
				me.yCenter = Math.round(me.height / 2);

				var minSize = helpers.min([me.height, me.width]);
				var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
				me.drawingArea = opts.display ? (minSize / 2) - (tickFontSize / 2 + tickOpts.backdropPaddingY) : (minSize / 2);
			},
			determineDataLimits: function() {
				var me = this;
				var chart = me.chart;
				me.min = null;
				me.max = null;


				helpers.each(chart.data.datasets, function(dataset, datasetIndex) {
					if (chart.isDatasetVisible(datasetIndex)) {
						var meta = chart.getDatasetMeta(datasetIndex);

						helpers.each(dataset.data, function(rawValue, index) {
							var value = +me.getRightValue(rawValue);
							if (isNaN(value) || meta.data[index].hidden) {
								return;
							}

							if (me.min === null) {
								me.min = value;
							} else if (value < me.min) {
								me.min = value;
							}

							if (me.max === null) {
								me.max = value;
							} else if (value > me.max) {
								me.max = value;
							}
						});
					}
				});

				// Common base implementation to handle ticks.min, ticks.max, ticks.beginAtZero
				me.handleTickRangeOptions();
			},
			getTickLimit: function() {
				var tickOpts = this.options.ticks;
				var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
				return Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * tickFontSize)));
			},
			convertTicksToLabels: function() {
				var me = this;
				Chart.LinearScaleBase.prototype.convertTicksToLabels.call(me);

				// Point labels
				me.pointLabels = me.chart.data.labels.map(me.options.pointLabels.callback, me);
			},
			getLabelForIndex: function(index, datasetIndex) {
				return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
			},
			fit: function() {
				/*
				 * Right, this is really confusing and there is a lot of maths going on here
				 * The gist of the problem is here: https://gist.github.com/nnnick/696cc9c55f4b0beb8fe9
				 *
				 * Reaction: https://dl.dropboxusercontent.com/u/34601363/toomuchscience.gif
				 *
				 * Solution:
				 *
				 * We assume the radius of the polygon is half the size of the canvas at first
				 * at each index we check if the text overlaps.
				 *
				 * Where it does, we store that angle and that index.
				 *
				 * After finding the largest index and angle we calculate how much we need to remove
				 * from the shape radius to move the point inwards by that x.
				 *
				 * We average the left and right distances to get the maximum shape radius that can fit in the box
				 * along with labels.
				 *
				 * Once we have that, we can find the centre point for the chart, by taking the x text protrusion
				 * on each side, removing that from the size, halving it and adding the left x protrusion width.
				 *
				 * This will mean we have a shape fitted to the canvas, as large as it can be with the labels
				 * and position it in the most space efficient manner
				 *
				 * https://dl.dropboxusercontent.com/u/34601363/yeahscience.gif
				 */

				var pointLabels = this.options.pointLabels;
				var pointLabelFontSize = helpers.getValueOrDefault(pointLabels.fontSize, globalDefaults.defaultFontSize);
				var pointLabeFontStyle = helpers.getValueOrDefault(pointLabels.fontStyle, globalDefaults.defaultFontStyle);
				var pointLabeFontFamily = helpers.getValueOrDefault(pointLabels.fontFamily, globalDefaults.defaultFontFamily);
				var pointLabeFont = helpers.fontString(pointLabelFontSize, pointLabeFontStyle, pointLabeFontFamily);

				// Get maximum radius of the polygon. Either half the height (minus the text width) or half the width.
				// Use this to calculate the offset + change. - Make sure L/R protrusion is at least 0 to stop issues with centre points
				var largestPossibleRadius = helpers.min([(this.height / 2 - pointLabelFontSize - 5), this.width / 2]),
					pointPosition,
					i,
					textWidth,
					halfTextWidth,
					furthestRight = this.width,
					furthestRightIndex,
					furthestRightAngle,
					furthestLeft = 0,
					furthestLeftIndex,
					furthestLeftAngle,
					xProtrusionLeft,
					xProtrusionRight,
					radiusReductionRight,
					radiusReductionLeft;
				this.ctx.font = pointLabeFont;

				for (i = 0; i < this.getValueCount(); i++) {
					// 5px to space the text slightly out - similar to what we do in the draw function.
					pointPosition = this.getPointPosition(i, largestPossibleRadius);
					textWidth = this.ctx.measureText(this.pointLabels[i] ? this.pointLabels[i] : '').width + 5;

					// Add quarter circle to make degree 0 mean top of circle
					var angleRadians = this.getIndexAngle(i) + (Math.PI / 2);
					var angle = (angleRadians * 360 / (2 * Math.PI)) % 360;

					if (angle === 0 || angle === 180) {
						// At angle 0 and 180, we're at exactly the top/bottom
						// of the radar chart, so text will be aligned centrally, so we'll half it and compare
						// w/left and right text sizes
						halfTextWidth = textWidth / 2;
						if (pointPosition.x + halfTextWidth > furthestRight) {
							furthestRight = pointPosition.x + halfTextWidth;
							furthestRightIndex = i;
						}
						if (pointPosition.x - halfTextWidth < furthestLeft) {
							furthestLeft = pointPosition.x - halfTextWidth;
							furthestLeftIndex = i;
						}
					} else if (angle < 180) {
						// Less than half the values means we'll left align the text
						if (pointPosition.x + textWidth > furthestRight) {
							furthestRight = pointPosition.x + textWidth;
							furthestRightIndex = i;
						}
					// More than half the values means we'll right align the text
					} else if (pointPosition.x - textWidth < furthestLeft) {
						furthestLeft = pointPosition.x - textWidth;
						furthestLeftIndex = i;
					}
				}

				xProtrusionLeft = furthestLeft;
				xProtrusionRight = Math.ceil(furthestRight - this.width);

				furthestRightAngle = this.getIndexAngle(furthestRightIndex);
				furthestLeftAngle = this.getIndexAngle(furthestLeftIndex);

				radiusReductionRight = xProtrusionRight / Math.sin(furthestRightAngle + Math.PI / 2);
				radiusReductionLeft = xProtrusionLeft / Math.sin(furthestLeftAngle + Math.PI / 2);

				// Ensure we actually need to reduce the size of the chart
				radiusReductionRight = (helpers.isNumber(radiusReductionRight)) ? radiusReductionRight : 0;
				radiusReductionLeft = (helpers.isNumber(radiusReductionLeft)) ? radiusReductionLeft : 0;

				this.drawingArea = Math.round(largestPossibleRadius - (radiusReductionLeft + radiusReductionRight) / 2);
				this.setCenterPoint(radiusReductionLeft, radiusReductionRight);
			},
			setCenterPoint: function(leftMovement, rightMovement) {
				var me = this;
				var maxRight = me.width - rightMovement - me.drawingArea,
					maxLeft = leftMovement + me.drawingArea;

				me.xCenter = Math.round(((maxLeft + maxRight) / 2) + me.left);
				// Always vertically in the centre as the text height doesn't change
				me.yCenter = Math.round((me.height / 2) + me.top);
			},

			getIndexAngle: function(index) {
				var angleMultiplier = (Math.PI * 2) / this.getValueCount();
				var startAngle = this.chart.options && this.chart.options.startAngle ?
					this.chart.options.startAngle :
					0;

				var startAngleRadians = startAngle * Math.PI * 2 / 360;

				// Start from the top instead of right, so remove a quarter of the circle
				return index * angleMultiplier - (Math.PI / 2) + startAngleRadians;
			},
			getDistanceFromCenterForValue: function(value) {
				var me = this;

				if (value === null) {
					return 0; // null always in center
				}

				// Take into account half font size + the yPadding of the top value
				var scalingFactor = me.drawingArea / (me.max - me.min);
				if (me.options.reverse) {
					return (me.max - value) * scalingFactor;
				}
				return (value - me.min) * scalingFactor;
			},
			getPointPosition: function(index, distanceFromCenter) {
				var me = this;
				var thisAngle = me.getIndexAngle(index);
				return {
					x: Math.round(Math.cos(thisAngle) * distanceFromCenter) + me.xCenter,
					y: Math.round(Math.sin(thisAngle) * distanceFromCenter) + me.yCenter
				};
			},
			getPointPositionForValue: function(index, value) {
				return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
			},

			getBasePosition: function() {
				var me = this;
				var min = me.min;
				var max = me.max;

				return me.getPointPositionForValue(0,
					me.beginAtZero? 0:
					min < 0 && max < 0? max :
					min > 0 && max > 0? min :
					0);
			},

			draw: function() {
				var me = this;
				var opts = me.options;
				var gridLineOpts = opts.gridLines;
				var tickOpts = opts.ticks;
				var angleLineOpts = opts.angleLines;
				var pointLabelOpts = opts.pointLabels;
				var getValueOrDefault = helpers.getValueOrDefault;

				if (opts.display) {
					var ctx = me.ctx;

					// Tick Font
					var tickFontSize = getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
					var tickFontStyle = getValueOrDefault(tickOpts.fontStyle, globalDefaults.defaultFontStyle);
					var tickFontFamily = getValueOrDefault(tickOpts.fontFamily, globalDefaults.defaultFontFamily);
					var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);

					helpers.each(me.ticks, function(label, index) {
						// Don't draw a centre value (if it is minimum)
						if (index > 0 || opts.reverse) {
							var yCenterOffset = me.getDistanceFromCenterForValue(me.ticksAsNumbers[index]);
							var yHeight = me.yCenter - yCenterOffset;

							// Draw circular lines around the scale
							if (gridLineOpts.display && index !== 0) {
								ctx.strokeStyle = helpers.getValueAtIndexOrDefault(gridLineOpts.color, index - 1);
								ctx.lineWidth = helpers.getValueAtIndexOrDefault(gridLineOpts.lineWidth, index - 1);

								if (opts.lineArc) {
									// Draw circular arcs between the points
									ctx.beginPath();
									ctx.arc(me.xCenter, me.yCenter, yCenterOffset, 0, Math.PI * 2);
									ctx.closePath();
									ctx.stroke();
								} else {
									// Draw straight lines connecting each index
									ctx.beginPath();
									for (var i = 0; i < me.getValueCount(); i++) {
										var pointPosition = me.getPointPosition(i, yCenterOffset);
										if (i === 0) {
											ctx.moveTo(pointPosition.x, pointPosition.y);
										} else {
											ctx.lineTo(pointPosition.x, pointPosition.y);
										}
									}
									ctx.closePath();
									ctx.stroke();
								}
							}

							if (tickOpts.display) {
								var tickFontColor = getValueOrDefault(tickOpts.fontColor, globalDefaults.defaultFontColor);
								ctx.font = tickLabelFont;

								if (tickOpts.showLabelBackdrop) {
									var labelWidth = ctx.measureText(label).width;
									ctx.fillStyle = tickOpts.backdropColor;
									ctx.fillRect(
										me.xCenter - labelWidth / 2 - tickOpts.backdropPaddingX,
										yHeight - tickFontSize / 2 - tickOpts.backdropPaddingY,
										labelWidth + tickOpts.backdropPaddingX * 2,
										tickFontSize + tickOpts.backdropPaddingY * 2
									);
								}

								ctx.textAlign = 'center';
								ctx.textBaseline = 'middle';
								ctx.fillStyle = tickFontColor;
								ctx.fillText(label, me.xCenter, yHeight);
							}
						}
					});

					if (!opts.lineArc) {
						ctx.lineWidth = angleLineOpts.lineWidth;
						ctx.strokeStyle = angleLineOpts.color;

						var outerDistance = me.getDistanceFromCenterForValue(opts.reverse ? me.min : me.max);

						// Point Label Font
						var pointLabelFontSize = getValueOrDefault(pointLabelOpts.fontSize, globalDefaults.defaultFontSize);
						var pointLabeFontStyle = getValueOrDefault(pointLabelOpts.fontStyle, globalDefaults.defaultFontStyle);
						var pointLabeFontFamily = getValueOrDefault(pointLabelOpts.fontFamily, globalDefaults.defaultFontFamily);
						var pointLabeFont = helpers.fontString(pointLabelFontSize, pointLabeFontStyle, pointLabeFontFamily);

						for (var i = me.getValueCount() - 1; i >= 0; i--) {
							if (angleLineOpts.display) {
								var outerPosition = me.getPointPosition(i, outerDistance);
								ctx.beginPath();
								ctx.moveTo(me.xCenter, me.yCenter);
								ctx.lineTo(outerPosition.x, outerPosition.y);
								ctx.stroke();
								ctx.closePath();
							}
							// Extra 3px out for some label spacing
							var pointLabelPosition = me.getPointPosition(i, outerDistance + 5);

							// Keep this in loop since we may support array properties here
							var pointLabelFontColor = getValueOrDefault(pointLabelOpts.fontColor, globalDefaults.defaultFontColor);
							ctx.font = pointLabeFont;
							ctx.fillStyle = pointLabelFontColor;

							var pointLabels = me.pointLabels;

							// Add quarter circle to make degree 0 mean top of circle
							var angleRadians = this.getIndexAngle(i) + (Math.PI / 2);
							var angle = (angleRadians * 360 / (2 * Math.PI)) % 360;

							if (angle === 0 || angle === 180) {
								ctx.textAlign = 'center';
							} else if (angle < 180) {
								ctx.textAlign = 'left';
							} else {
								ctx.textAlign = 'right';
							}

							// Set the correct text baseline based on outer positioning
							if (angle === 90 || angle === 270) {
								ctx.textBaseline = 'middle';
							} else if (angle > 270 || angle < 90) {
								ctx.textBaseline = 'bottom';
							} else {
								ctx.textBaseline = 'top';
							}

							ctx.fillText(pointLabels[i] ? pointLabels[i] : '', pointLabelPosition.x, pointLabelPosition.y);
						}
					}
				}
			}
		});
		Chart.scaleService.registerScaleType('radialLinear', LinearRadialScale, defaultConfig);

	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* global window: false */
	'use strict';

	var moment = __webpack_require__(31);
	moment = typeof(moment) === 'function' ? moment : window.moment;

	module.exports = function(Chart) {

		var helpers = Chart.helpers;
		var time = {
			units: [{
				name: 'millisecond',
				steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
			}, {
				name: 'second',
				steps: [1, 2, 5, 10, 30]
			}, {
				name: 'minute',
				steps: [1, 2, 5, 10, 30]
			}, {
				name: 'hour',
				steps: [1, 2, 3, 6, 12]
			}, {
				name: 'day',
				steps: [1, 2, 5]
			}, {
				name: 'week',
				maxStep: 4
			}, {
				name: 'month',
				maxStep: 3
			}, {
				name: 'quarter',
				maxStep: 4
			}, {
				name: 'year',
				maxStep: false
			}]
		};

		var defaultConfig = {
			position: 'bottom',

			time: {
				parser: false, // false == a pattern string from http://momentjs.com/docs/#/parsing/string-format/ or a custom callback that converts its argument to a moment
				format: false, // DEPRECATED false == date objects, moment object, callback or a pattern string from http://momentjs.com/docs/#/parsing/string-format/
				unit: false, // false == automatic or override with week, month, year, etc.
				round: false, // none, or override with week, month, year, etc.
				displayFormat: false, // DEPRECATED
				isoWeekday: false, // override week start day - see http://momentjs.com/docs/#/get-set/iso-weekday/
				minUnit: 'millisecond',

				// defaults to unit's corresponding unitFormat below or override using pattern string from http://momentjs.com/docs/#/displaying/format/
				displayFormats: {
					millisecond: 'h:mm:ss.SSS a', // 11:20:01.123 AM,
					second: 'h:mm:ss a', // 11:20:01 AM
					minute: 'h:mm:ss a', // 11:20:01 AM
					hour: 'MMM D, hA', // Sept 4, 5PM
					day: 'll', // Sep 4 2015
					week: 'll', // Week 46, or maybe "[W]WW - YYYY" ?
					month: 'MMM YYYY', // Sept 2015
					quarter: '[Q]Q - YYYY', // Q3
					year: 'YYYY' // 2015
				}
			},
			ticks: {
				autoSkip: false
			}
		};

		var TimeScale = Chart.Scale.extend({
			initialize: function() {
				if (!moment) {
					throw new Error('Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com');
				}

				Chart.Scale.prototype.initialize.call(this);
			},
			getLabelMoment: function(datasetIndex, index) {
				if (datasetIndex === null || index === null) {
					return null;
				}

				if (typeof this.labelMoments[datasetIndex] !== 'undefined') {
					return this.labelMoments[datasetIndex][index];
				}

				return null;
			},
			getLabelDiff: function(datasetIndex, index) {
				var me = this;
				if (datasetIndex === null || index === null) {
					return null;
				}

				if (me.labelDiffs === undefined) {
					me.buildLabelDiffs();
				}

				if (typeof me.labelDiffs[datasetIndex] !== 'undefined') {
					return me.labelDiffs[datasetIndex][index];
				}

				return null;
			},
			getMomentStartOf: function(tick) {
				var me = this;
				if (me.options.time.unit === 'week' && me.options.time.isoWeekday !== false) {
					return tick.clone().startOf('isoWeek').isoWeekday(me.options.time.isoWeekday);
				}
				return tick.clone().startOf(me.tickUnit);
			},
			determineDataLimits: function() {
				var me = this;
				me.labelMoments = [];

				// Only parse these once. If the dataset does not have data as x,y pairs, we will use
				// these
				var scaleLabelMoments = [];
				if (me.chart.data.labels && me.chart.data.labels.length > 0) {
					helpers.each(me.chart.data.labels, function(label) {
						var labelMoment = me.parseTime(label);

						if (labelMoment.isValid()) {
							if (me.options.time.round) {
								labelMoment.startOf(me.options.time.round);
							}
							scaleLabelMoments.push(labelMoment);
						}
					}, me);

					me.firstTick = moment.min.call(me, scaleLabelMoments);
					me.lastTick = moment.max.call(me, scaleLabelMoments);
				} else {
					me.firstTick = null;
					me.lastTick = null;
				}

				helpers.each(me.chart.data.datasets, function(dataset, datasetIndex) {
					var momentsForDataset = [];
					var datasetVisible = me.chart.isDatasetVisible(datasetIndex);

					if (typeof dataset.data[0] === 'object' && dataset.data[0] !== null) {
						helpers.each(dataset.data, function(value) {
							var labelMoment = me.parseTime(me.getRightValue(value));

							if (labelMoment.isValid()) {
								if (me.options.time.round) {
									labelMoment.startOf(me.options.time.round);
								}
								momentsForDataset.push(labelMoment);

								if (datasetVisible) {
									// May have gone outside the scale ranges, make sure we keep the first and last ticks updated
									me.firstTick = me.firstTick !== null ? moment.min(me.firstTick, labelMoment) : labelMoment;
									me.lastTick = me.lastTick !== null ? moment.max(me.lastTick, labelMoment) : labelMoment;
								}
							}
						}, me);
					} else {
						// We have no labels. Use the ones from the scale
						momentsForDataset = scaleLabelMoments;
					}

					me.labelMoments.push(momentsForDataset);
				}, me);

				// Set these after we've done all the data
				if (me.options.time.min) {
					me.firstTick = me.parseTime(me.options.time.min);
				}

				if (me.options.time.max) {
					me.lastTick = me.parseTime(me.options.time.max);
				}

				// We will modify these, so clone for later
				me.firstTick = (me.firstTick || moment()).clone();
				me.lastTick = (me.lastTick || moment()).clone();
			},
			buildLabelDiffs: function() {
				var me = this;
				me.labelDiffs = [];
				var scaleLabelDiffs = [];
				// Parse common labels once
				if (me.chart.data.labels && me.chart.data.labels.length > 0) {
					helpers.each(me.chart.data.labels, function(label) {
						var labelMoment = me.parseTime(label);

						if (labelMoment.isValid()) {
							if (me.options.time.round) {
								labelMoment.startOf(me.options.time.round);
							}
							scaleLabelDiffs.push(labelMoment.diff(me.firstTick, me.tickUnit, true));
						}
					}, me);
				}

				helpers.each(me.chart.data.datasets, function(dataset) {
					var diffsForDataset = [];

					if (typeof dataset.data[0] === 'object' && dataset.data[0] !== null) {
						helpers.each(dataset.data, function(value) {
							var labelMoment = me.parseTime(me.getRightValue(value));

							if (labelMoment.isValid()) {
								if (me.options.time.round) {
									labelMoment.startOf(me.options.time.round);
								}
								diffsForDataset.push(labelMoment.diff(me.firstTick, me.tickUnit, true));
							}
						}, me);
					} else {
						// We have no labels. Use common ones
						diffsForDataset = scaleLabelDiffs;
					}

					me.labelDiffs.push(diffsForDataset);
				}, me);
			},
			buildTicks: function() {
				var me = this;

				me.ctx.save();
				var tickFontSize = helpers.getValueOrDefault(me.options.ticks.fontSize, Chart.defaults.global.defaultFontSize);
				var tickFontStyle = helpers.getValueOrDefault(me.options.ticks.fontStyle, Chart.defaults.global.defaultFontStyle);
				var tickFontFamily = helpers.getValueOrDefault(me.options.ticks.fontFamily, Chart.defaults.global.defaultFontFamily);
				var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
				me.ctx.font = tickLabelFont;

				me.ticks = [];
				me.unitScale = 1; // How much we scale the unit by, ie 2 means 2x unit per step
				me.scaleSizeInUnits = 0; // How large the scale is in the base unit (seconds, minutes, etc)

				// Set unit override if applicable
				if (me.options.time.unit) {
					me.tickUnit = me.options.time.unit || 'day';
					me.displayFormat = me.options.time.displayFormats[me.tickUnit];
					me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true);
					me.unitScale = helpers.getValueOrDefault(me.options.time.unitStepSize, 1);
				} else {
					// Determine the smallest needed unit of the time
					var innerWidth = me.isHorizontal() ? me.width - (me.paddingLeft + me.paddingRight) : me.height - (me.paddingTop + me.paddingBottom);

					// Crude approximation of what the label length might be
					var tempFirstLabel = me.tickFormatFunction(me.firstTick, 0, []);
					var tickLabelWidth = me.ctx.measureText(tempFirstLabel).width;
					var cosRotation = Math.cos(helpers.toRadians(me.options.ticks.maxRotation));
					var sinRotation = Math.sin(helpers.toRadians(me.options.ticks.maxRotation));
					tickLabelWidth = (tickLabelWidth * cosRotation) + (tickFontSize * sinRotation);
					var labelCapacity = innerWidth / (tickLabelWidth);

					// Start as small as possible
					me.tickUnit = me.options.time.minUnit;
					me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true);
					me.displayFormat = me.options.time.displayFormats[me.tickUnit];

					var unitDefinitionIndex = 0;
					var unitDefinition = time.units[unitDefinitionIndex];

					// While we aren't ideal and we don't have units left
					while (unitDefinitionIndex < time.units.length) {
						// Can we scale this unit. If `false` we can scale infinitely
						me.unitScale = 1;

						if (helpers.isArray(unitDefinition.steps) && Math.ceil(me.scaleSizeInUnits / labelCapacity) < helpers.max(unitDefinition.steps)) {
							// Use one of the prefedined steps
							for (var idx = 0; idx < unitDefinition.steps.length; ++idx) {
								if (unitDefinition.steps[idx] >= Math.ceil(me.scaleSizeInUnits / labelCapacity)) {
									me.unitScale = helpers.getValueOrDefault(me.options.time.unitStepSize, unitDefinition.steps[idx]);
									break;
								}
							}

							break;
						} else if ((unitDefinition.maxStep === false) || (Math.ceil(me.scaleSizeInUnits / labelCapacity) < unitDefinition.maxStep)) {
							// We have a max step. Scale this unit
							me.unitScale = helpers.getValueOrDefault(me.options.time.unitStepSize, Math.ceil(me.scaleSizeInUnits / labelCapacity));
							break;
						} else {
							// Move to the next unit up
							++unitDefinitionIndex;
							unitDefinition = time.units[unitDefinitionIndex];

							me.tickUnit = unitDefinition.name;
							var leadingUnitBuffer = me.firstTick.diff(me.getMomentStartOf(me.firstTick), me.tickUnit, true);
							var trailingUnitBuffer = me.getMomentStartOf(me.lastTick.clone().add(1, me.tickUnit)).diff(me.lastTick, me.tickUnit, true);
							me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true) + leadingUnitBuffer + trailingUnitBuffer;
							me.displayFormat = me.options.time.displayFormats[unitDefinition.name];
						}
					}
				}

				var roundedStart;

				// Only round the first tick if we have no hard minimum
				if (!me.options.time.min) {
					me.firstTick = me.getMomentStartOf(me.firstTick);
					roundedStart = me.firstTick;
				} else {
					roundedStart = me.getMomentStartOf(me.firstTick);
				}

				// Only round the last tick if we have no hard maximum
				if (!me.options.time.max) {
					var roundedEnd = me.getMomentStartOf(me.lastTick);
					var delta = roundedEnd.diff(me.lastTick, me.tickUnit, true);
					if (delta < 0) {
						// Do not use end of because we need me to be in the next time unit
						me.lastTick = me.getMomentStartOf(me.lastTick.add(1, me.tickUnit));
					} else if (delta >= 0) {
						me.lastTick = roundedEnd;
					}

					me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true);
				}

				// Tick displayFormat override
				if (me.options.time.displayFormat) {
					me.displayFormat = me.options.time.displayFormat;
				}

				// first tick. will have been rounded correctly if options.time.min is not specified
				me.ticks.push(me.firstTick.clone());

				// For every unit in between the first and last moment, create a moment and add it to the ticks tick
				for (var i = 1; i <= me.scaleSizeInUnits; ++i) {
					var newTick = roundedStart.clone().add(i, me.tickUnit);

					// Are we greater than the max time
					if (me.options.time.max && newTick.diff(me.lastTick, me.tickUnit, true) >= 0) {
						break;
					}

					if (i % me.unitScale === 0) {
						me.ticks.push(newTick);
					}
				}

				// Always show the right tick
				var diff = me.ticks[me.ticks.length - 1].diff(me.lastTick, me.tickUnit);
				if (diff !== 0 || me.scaleSizeInUnits === 0) {
					// this is a weird case. If the <max> option is the same as the end option, we can't just diff the times because the tick was created from the roundedStart
					// but the last tick was not rounded.
					if (me.options.time.max) {
						me.ticks.push(me.lastTick.clone());
						me.scaleSizeInUnits = me.lastTick.diff(me.ticks[0], me.tickUnit, true);
					} else {
						me.ticks.push(me.lastTick.clone());
						me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true);
					}
				}

				me.ctx.restore();

				// Invalidate label diffs cache
				me.labelDiffs = undefined;
			},
			// Get tooltip label
			getLabelForIndex: function(index, datasetIndex) {
				var me = this;
				var label = me.chart.data.labels && index < me.chart.data.labels.length ? me.chart.data.labels[index] : '';

				if (typeof me.chart.data.datasets[datasetIndex].data[0] === 'object') {
					label = me.getRightValue(me.chart.data.datasets[datasetIndex].data[index]);
				}

				// Format nicely
				if (me.options.time.tooltipFormat) {
					label = me.parseTime(label).format(me.options.time.tooltipFormat);
				}

				return label;
			},
			// Function to format an individual tick mark
			tickFormatFunction: function(tick, index, ticks) {
				var formattedTick = tick.format(this.displayFormat);
				var tickOpts = this.options.ticks;
				var callback = helpers.getValueOrDefault(tickOpts.callback, tickOpts.userCallback);

				if (callback) {
					return callback(formattedTick, index, ticks);
				}
				return formattedTick;
			},
			convertTicksToLabels: function() {
				var me = this;
				me.tickMoments = me.ticks;
				me.ticks = me.ticks.map(me.tickFormatFunction, me);
			},
			getPixelForValue: function(value, index, datasetIndex) {
				var me = this;
				var offset = null;
				if (index !== undefined && datasetIndex !== undefined) {
					offset = me.getLabelDiff(datasetIndex, index);
				}

				if (offset === null) {
					if (!value || !value.isValid) {
						// not already a moment object
						value = me.parseTime(me.getRightValue(value));
					}
					if (value && value.isValid && value.isValid()) {
						offset = value.diff(me.firstTick, me.tickUnit, true);
					}
				}

				if (offset !== null) {
					var decimal = offset !== 0 ? offset / me.scaleSizeInUnits : offset;

					if (me.isHorizontal()) {
						var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
						var valueOffset = (innerWidth * decimal) + me.paddingLeft;

						return me.left + Math.round(valueOffset);
					}
					var innerHeight = me.height - (me.paddingTop + me.paddingBottom);
					var heightOffset = (innerHeight * decimal) + me.paddingTop;

					return me.top + Math.round(heightOffset);
				}
			},
			getPixelForTick: function(index) {
				return this.getPixelForValue(this.tickMoments[index], null, null);
			},
			getValueForPixel: function(pixel) {
				var me = this;
				var innerDimension = me.isHorizontal() ? me.width - (me.paddingLeft + me.paddingRight) : me.height - (me.paddingTop + me.paddingBottom);
				var offset = (pixel - (me.isHorizontal() ? me.left + me.paddingLeft : me.top + me.paddingTop)) / innerDimension;
				offset *= me.scaleSizeInUnits;
				return me.firstTick.clone().add(moment.duration(offset, me.tickUnit).asSeconds(), 'seconds');
			},
			parseTime: function(label) {
				var me = this;
				if (typeof me.options.time.parser === 'string') {
					return moment(label, me.options.time.parser);
				}
				if (typeof me.options.time.parser === 'function') {
					return me.options.time.parser(label);
				}
				// Date objects
				if (typeof label.getMonth === 'function' || typeof label === 'number') {
					return moment(label);
				}
				// Moment support
				if (label.isValid && label.isValid()) {
					return label;
				}
				// Custom parsing (return an instance of moment)
				if (typeof me.options.time.format !== 'string' && me.options.time.format.call) {
					console.warn('options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale');
					return me.options.time.format(label);
				}
				// Moment format parsing
				return moment(label, me.options.time.format);
			}
		});
		Chart.scaleService.registerScaleType('time', TimeScale, defaultConfig);

	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {//! moment.js
	//! version : 2.15.2
	//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
	//! license : MIT
	//! momentjs.com

	;(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    global.moment = factory()
	}(this, function () { 'use strict';

	    var hookCallback;

	    function utils_hooks__hooks () {
	        return hookCallback.apply(null, arguments);
	    }

	    // This is done to register the method called with moment()
	    // without creating circular dependencies.
	    function setHookCallback (callback) {
	        hookCallback = callback;
	    }

	    function isArray(input) {
	        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
	    }

	    function isObject(input) {
	        // IE8 will treat undefined and null as object if it wasn't for
	        // input != null
	        return input != null && Object.prototype.toString.call(input) === '[object Object]';
	    }

	    function isObjectEmpty(obj) {
	        var k;
	        for (k in obj) {
	            // even if its not own property I'd still call it non-empty
	            return false;
	        }
	        return true;
	    }

	    function isDate(input) {
	        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
	    }

	    function map(arr, fn) {
	        var res = [], i;
	        for (i = 0; i < arr.length; ++i) {
	            res.push(fn(arr[i], i));
	        }
	        return res;
	    }

	    function hasOwnProp(a, b) {
	        return Object.prototype.hasOwnProperty.call(a, b);
	    }

	    function extend(a, b) {
	        for (var i in b) {
	            if (hasOwnProp(b, i)) {
	                a[i] = b[i];
	            }
	        }

	        if (hasOwnProp(b, 'toString')) {
	            a.toString = b.toString;
	        }

	        if (hasOwnProp(b, 'valueOf')) {
	            a.valueOf = b.valueOf;
	        }

	        return a;
	    }

	    function create_utc__createUTC (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, true).utc();
	    }

	    function defaultParsingFlags() {
	        // We need to deep clone this object.
	        return {
	            empty           : false,
	            unusedTokens    : [],
	            unusedInput     : [],
	            overflow        : -2,
	            charsLeftOver   : 0,
	            nullInput       : false,
	            invalidMonth    : null,
	            invalidFormat   : false,
	            userInvalidated : false,
	            iso             : false,
	            parsedDateParts : [],
	            meridiem        : null
	        };
	    }

	    function getParsingFlags(m) {
	        if (m._pf == null) {
	            m._pf = defaultParsingFlags();
	        }
	        return m._pf;
	    }

	    var some;
	    if (Array.prototype.some) {
	        some = Array.prototype.some;
	    } else {
	        some = function (fun) {
	            var t = Object(this);
	            var len = t.length >>> 0;

	            for (var i = 0; i < len; i++) {
	                if (i in t && fun.call(this, t[i], i, t)) {
	                    return true;
	                }
	            }

	            return false;
	        };
	    }

	    function valid__isValid(m) {
	        if (m._isValid == null) {
	            var flags = getParsingFlags(m);
	            var parsedParts = some.call(flags.parsedDateParts, function (i) {
	                return i != null;
	            });
	            var isNowValid = !isNaN(m._d.getTime()) &&
	                flags.overflow < 0 &&
	                !flags.empty &&
	                !flags.invalidMonth &&
	                !flags.invalidWeekday &&
	                !flags.nullInput &&
	                !flags.invalidFormat &&
	                !flags.userInvalidated &&
	                (!flags.meridiem || (flags.meridiem && parsedParts));

	            if (m._strict) {
	                isNowValid = isNowValid &&
	                    flags.charsLeftOver === 0 &&
	                    flags.unusedTokens.length === 0 &&
	                    flags.bigHour === undefined;
	            }

	            if (Object.isFrozen == null || !Object.isFrozen(m)) {
	                m._isValid = isNowValid;
	            }
	            else {
	                return isNowValid;
	            }
	        }
	        return m._isValid;
	    }

	    function valid__createInvalid (flags) {
	        var m = create_utc__createUTC(NaN);
	        if (flags != null) {
	            extend(getParsingFlags(m), flags);
	        }
	        else {
	            getParsingFlags(m).userInvalidated = true;
	        }

	        return m;
	    }

	    function isUndefined(input) {
	        return input === void 0;
	    }

	    // Plugins that add properties should also add the key here (null value),
	    // so we can properly clone ourselves.
	    var momentProperties = utils_hooks__hooks.momentProperties = [];

	    function copyConfig(to, from) {
	        var i, prop, val;

	        if (!isUndefined(from._isAMomentObject)) {
	            to._isAMomentObject = from._isAMomentObject;
	        }
	        if (!isUndefined(from._i)) {
	            to._i = from._i;
	        }
	        if (!isUndefined(from._f)) {
	            to._f = from._f;
	        }
	        if (!isUndefined(from._l)) {
	            to._l = from._l;
	        }
	        if (!isUndefined(from._strict)) {
	            to._strict = from._strict;
	        }
	        if (!isUndefined(from._tzm)) {
	            to._tzm = from._tzm;
	        }
	        if (!isUndefined(from._isUTC)) {
	            to._isUTC = from._isUTC;
	        }
	        if (!isUndefined(from._offset)) {
	            to._offset = from._offset;
	        }
	        if (!isUndefined(from._pf)) {
	            to._pf = getParsingFlags(from);
	        }
	        if (!isUndefined(from._locale)) {
	            to._locale = from._locale;
	        }

	        if (momentProperties.length > 0) {
	            for (i in momentProperties) {
	                prop = momentProperties[i];
	                val = from[prop];
	                if (!isUndefined(val)) {
	                    to[prop] = val;
	                }
	            }
	        }

	        return to;
	    }

	    var updateInProgress = false;

	    // Moment prototype object
	    function Moment(config) {
	        copyConfig(this, config);
	        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
	        // Prevent infinite loop in case updateOffset creates new moment
	        // objects.
	        if (updateInProgress === false) {
	            updateInProgress = true;
	            utils_hooks__hooks.updateOffset(this);
	            updateInProgress = false;
	        }
	    }

	    function isMoment (obj) {
	        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
	    }

	    function absFloor (number) {
	        if (number < 0) {
	            // -0 -> 0
	            return Math.ceil(number) || 0;
	        } else {
	            return Math.floor(number);
	        }
	    }

	    function toInt(argumentForCoercion) {
	        var coercedNumber = +argumentForCoercion,
	            value = 0;

	        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
	            value = absFloor(coercedNumber);
	        }

	        return value;
	    }

	    // compare two arrays, return the number of differences
	    function compareArrays(array1, array2, dontConvert) {
	        var len = Math.min(array1.length, array2.length),
	            lengthDiff = Math.abs(array1.length - array2.length),
	            diffs = 0,
	            i;
	        for (i = 0; i < len; i++) {
	            if ((dontConvert && array1[i] !== array2[i]) ||
	                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
	                diffs++;
	            }
	        }
	        return diffs + lengthDiff;
	    }

	    function warn(msg) {
	        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
	                (typeof console !==  'undefined') && console.warn) {
	            console.warn('Deprecation warning: ' + msg);
	        }
	    }

	    function deprecate(msg, fn) {
	        var firstTime = true;

	        return extend(function () {
	            if (utils_hooks__hooks.deprecationHandler != null) {
	                utils_hooks__hooks.deprecationHandler(null, msg);
	            }
	            if (firstTime) {
	                var args = [];
	                var arg;
	                for (var i = 0; i < arguments.length; i++) {
	                    arg = '';
	                    if (typeof arguments[i] === 'object') {
	                        arg += '\n[' + i + '] ';
	                        for (var key in arguments[0]) {
	                            arg += key + ': ' + arguments[0][key] + ', ';
	                        }
	                        arg = arg.slice(0, -2); // Remove trailing comma and space
	                    } else {
	                        arg = arguments[i];
	                    }
	                    args.push(arg);
	                }
	                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
	                firstTime = false;
	            }
	            return fn.apply(this, arguments);
	        }, fn);
	    }

	    var deprecations = {};

	    function deprecateSimple(name, msg) {
	        if (utils_hooks__hooks.deprecationHandler != null) {
	            utils_hooks__hooks.deprecationHandler(name, msg);
	        }
	        if (!deprecations[name]) {
	            warn(msg);
	            deprecations[name] = true;
	        }
	    }

	    utils_hooks__hooks.suppressDeprecationWarnings = false;
	    utils_hooks__hooks.deprecationHandler = null;

	    function isFunction(input) {
	        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	    }

	    function locale_set__set (config) {
	        var prop, i;
	        for (i in config) {
	            prop = config[i];
	            if (isFunction(prop)) {
	                this[i] = prop;
	            } else {
	                this['_' + i] = prop;
	            }
	        }
	        this._config = config;
	        // Lenient ordinal parsing accepts just a number in addition to
	        // number + (possibly) stuff coming from _ordinalParseLenient.
	        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
	    }

	    function mergeConfigs(parentConfig, childConfig) {
	        var res = extend({}, parentConfig), prop;
	        for (prop in childConfig) {
	            if (hasOwnProp(childConfig, prop)) {
	                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
	                    res[prop] = {};
	                    extend(res[prop], parentConfig[prop]);
	                    extend(res[prop], childConfig[prop]);
	                } else if (childConfig[prop] != null) {
	                    res[prop] = childConfig[prop];
	                } else {
	                    delete res[prop];
	                }
	            }
	        }
	        for (prop in parentConfig) {
	            if (hasOwnProp(parentConfig, prop) &&
	                    !hasOwnProp(childConfig, prop) &&
	                    isObject(parentConfig[prop])) {
	                // make sure changes to properties don't modify parent config
	                res[prop] = extend({}, res[prop]);
	            }
	        }
	        return res;
	    }

	    function Locale(config) {
	        if (config != null) {
	            this.set(config);
	        }
	    }

	    var keys;

	    if (Object.keys) {
	        keys = Object.keys;
	    } else {
	        keys = function (obj) {
	            var i, res = [];
	            for (i in obj) {
	                if (hasOwnProp(obj, i)) {
	                    res.push(i);
	                }
	            }
	            return res;
	        };
	    }

	    var defaultCalendar = {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    };

	    function locale_calendar__calendar (key, mom, now) {
	        var output = this._calendar[key] || this._calendar['sameElse'];
	        return isFunction(output) ? output.call(mom, now) : output;
	    }

	    var defaultLongDateFormat = {
	        LTS  : 'h:mm:ss A',
	        LT   : 'h:mm A',
	        L    : 'MM/DD/YYYY',
	        LL   : 'MMMM D, YYYY',
	        LLL  : 'MMMM D, YYYY h:mm A',
	        LLLL : 'dddd, MMMM D, YYYY h:mm A'
	    };

	    function longDateFormat (key) {
	        var format = this._longDateFormat[key],
	            formatUpper = this._longDateFormat[key.toUpperCase()];

	        if (format || !formatUpper) {
	            return format;
	        }

	        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
	            return val.slice(1);
	        });

	        return this._longDateFormat[key];
	    }

	    var defaultInvalidDate = 'Invalid date';

	    function invalidDate () {
	        return this._invalidDate;
	    }

	    var defaultOrdinal = '%d';
	    var defaultOrdinalParse = /\d{1,2}/;

	    function ordinal (number) {
	        return this._ordinal.replace('%d', number);
	    }

	    var defaultRelativeTime = {
	        future : 'in %s',
	        past   : '%s ago',
	        s  : 'a few seconds',
	        m  : 'a minute',
	        mm : '%d minutes',
	        h  : 'an hour',
	        hh : '%d hours',
	        d  : 'a day',
	        dd : '%d days',
	        M  : 'a month',
	        MM : '%d months',
	        y  : 'a year',
	        yy : '%d years'
	    };

	    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
	        var output = this._relativeTime[string];
	        return (isFunction(output)) ?
	            output(number, withoutSuffix, string, isFuture) :
	            output.replace(/%d/i, number);
	    }

	    function pastFuture (diff, output) {
	        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
	        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
	    }

	    var aliases = {};

	    function addUnitAlias (unit, shorthand) {
	        var lowerCase = unit.toLowerCase();
	        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
	    }

	    function normalizeUnits(units) {
	        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
	    }

	    function normalizeObjectUnits(inputObject) {
	        var normalizedInput = {},
	            normalizedProp,
	            prop;

	        for (prop in inputObject) {
	            if (hasOwnProp(inputObject, prop)) {
	                normalizedProp = normalizeUnits(prop);
	                if (normalizedProp) {
	                    normalizedInput[normalizedProp] = inputObject[prop];
	                }
	            }
	        }

	        return normalizedInput;
	    }

	    var priorities = {};

	    function addUnitPriority(unit, priority) {
	        priorities[unit] = priority;
	    }

	    function getPrioritizedUnits(unitsObj) {
	        var units = [];
	        for (var u in unitsObj) {
	            units.push({unit: u, priority: priorities[u]});
	        }
	        units.sort(function (a, b) {
	            return a.priority - b.priority;
	        });
	        return units;
	    }

	    function makeGetSet (unit, keepTime) {
	        return function (value) {
	            if (value != null) {
	                get_set__set(this, unit, value);
	                utils_hooks__hooks.updateOffset(this, keepTime);
	                return this;
	            } else {
	                return get_set__get(this, unit);
	            }
	        };
	    }

	    function get_set__get (mom, unit) {
	        return mom.isValid() ?
	            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
	    }

	    function get_set__set (mom, unit, value) {
	        if (mom.isValid()) {
	            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
	        }
	    }

	    // MOMENTS

	    function stringGet (units) {
	        units = normalizeUnits(units);
	        if (isFunction(this[units])) {
	            return this[units]();
	        }
	        return this;
	    }


	    function stringSet (units, value) {
	        if (typeof units === 'object') {
	            units = normalizeObjectUnits(units);
	            var prioritized = getPrioritizedUnits(units);
	            for (var i = 0; i < prioritized.length; i++) {
	                this[prioritized[i].unit](units[prioritized[i].unit]);
	            }
	        } else {
	            units = normalizeUnits(units);
	            if (isFunction(this[units])) {
	                return this[units](value);
	            }
	        }
	        return this;
	    }

	    function zeroFill(number, targetLength, forceSign) {
	        var absNumber = '' + Math.abs(number),
	            zerosToFill = targetLength - absNumber.length,
	            sign = number >= 0;
	        return (sign ? (forceSign ? '+' : '') : '-') +
	            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
	    }

	    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

	    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

	    var formatFunctions = {};

	    var formatTokenFunctions = {};

	    // token:    'M'
	    // padded:   ['MM', 2]
	    // ordinal:  'Mo'
	    // callback: function () { this.month() + 1 }
	    function addFormatToken (token, padded, ordinal, callback) {
	        var func = callback;
	        if (typeof callback === 'string') {
	            func = function () {
	                return this[callback]();
	            };
	        }
	        if (token) {
	            formatTokenFunctions[token] = func;
	        }
	        if (padded) {
	            formatTokenFunctions[padded[0]] = function () {
	                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
	            };
	        }
	        if (ordinal) {
	            formatTokenFunctions[ordinal] = function () {
	                return this.localeData().ordinal(func.apply(this, arguments), token);
	            };
	        }
	    }

	    function removeFormattingTokens(input) {
	        if (input.match(/\[[\s\S]/)) {
	            return input.replace(/^\[|\]$/g, '');
	        }
	        return input.replace(/\\/g, '');
	    }

	    function makeFormatFunction(format) {
	        var array = format.match(formattingTokens), i, length;

	        for (i = 0, length = array.length; i < length; i++) {
	            if (formatTokenFunctions[array[i]]) {
	                array[i] = formatTokenFunctions[array[i]];
	            } else {
	                array[i] = removeFormattingTokens(array[i]);
	            }
	        }

	        return function (mom) {
	            var output = '', i;
	            for (i = 0; i < length; i++) {
	                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
	            }
	            return output;
	        };
	    }

	    // format date using native date object
	    function formatMoment(m, format) {
	        if (!m.isValid()) {
	            return m.localeData().invalidDate();
	        }

	        format = expandFormat(format, m.localeData());
	        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

	        return formatFunctions[format](m);
	    }

	    function expandFormat(format, locale) {
	        var i = 5;

	        function replaceLongDateFormatTokens(input) {
	            return locale.longDateFormat(input) || input;
	        }

	        localFormattingTokens.lastIndex = 0;
	        while (i >= 0 && localFormattingTokens.test(format)) {
	            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
	            localFormattingTokens.lastIndex = 0;
	            i -= 1;
	        }

	        return format;
	    }

	    var match1         = /\d/;            //       0 - 9
	    var match2         = /\d\d/;          //      00 - 99
	    var match3         = /\d{3}/;         //     000 - 999
	    var match4         = /\d{4}/;         //    0000 - 9999
	    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
	    var match1to2      = /\d\d?/;         //       0 - 99
	    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
	    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
	    var match1to3      = /\d{1,3}/;       //       0 - 999
	    var match1to4      = /\d{1,4}/;       //       0 - 9999
	    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

	    var matchUnsigned  = /\d+/;           //       0 - inf
	    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

	    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
	    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

	    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

	    // any word (or two) characters or numbers including two/three word month in arabic.
	    // includes scottish gaelic two word and hyphenated months
	    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


	    var regexes = {};

	    function addRegexToken (token, regex, strictRegex) {
	        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
	            return (isStrict && strictRegex) ? strictRegex : regex;
	        };
	    }

	    function getParseRegexForToken (token, config) {
	        if (!hasOwnProp(regexes, token)) {
	            return new RegExp(unescapeFormat(token));
	        }

	        return regexes[token](config._strict, config._locale);
	    }

	    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
	    function unescapeFormat(s) {
	        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
	            return p1 || p2 || p3 || p4;
	        }));
	    }

	    function regexEscape(s) {
	        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	    }

	    var tokens = {};

	    function addParseToken (token, callback) {
	        var i, func = callback;
	        if (typeof token === 'string') {
	            token = [token];
	        }
	        if (typeof callback === 'number') {
	            func = function (input, array) {
	                array[callback] = toInt(input);
	            };
	        }
	        for (i = 0; i < token.length; i++) {
	            tokens[token[i]] = func;
	        }
	    }

	    function addWeekParseToken (token, callback) {
	        addParseToken(token, function (input, array, config, token) {
	            config._w = config._w || {};
	            callback(input, config._w, config, token);
	        });
	    }

	    function addTimeToArrayFromToken(token, input, config) {
	        if (input != null && hasOwnProp(tokens, token)) {
	            tokens[token](input, config._a, config, token);
	        }
	    }

	    var YEAR = 0;
	    var MONTH = 1;
	    var DATE = 2;
	    var HOUR = 3;
	    var MINUTE = 4;
	    var SECOND = 5;
	    var MILLISECOND = 6;
	    var WEEK = 7;
	    var WEEKDAY = 8;

	    var indexOf;

	    if (Array.prototype.indexOf) {
	        indexOf = Array.prototype.indexOf;
	    } else {
	        indexOf = function (o) {
	            // I know
	            var i;
	            for (i = 0; i < this.length; ++i) {
	                if (this[i] === o) {
	                    return i;
	                }
	            }
	            return -1;
	        };
	    }

	    function daysInMonth(year, month) {
	        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
	    }

	    // FORMATTING

	    addFormatToken('M', ['MM', 2], 'Mo', function () {
	        return this.month() + 1;
	    });

	    addFormatToken('MMM', 0, 0, function (format) {
	        return this.localeData().monthsShort(this, format);
	    });

	    addFormatToken('MMMM', 0, 0, function (format) {
	        return this.localeData().months(this, format);
	    });

	    // ALIASES

	    addUnitAlias('month', 'M');

	    // PRIORITY

	    addUnitPriority('month', 8);

	    // PARSING

	    addRegexToken('M',    match1to2);
	    addRegexToken('MM',   match1to2, match2);
	    addRegexToken('MMM',  function (isStrict, locale) {
	        return locale.monthsShortRegex(isStrict);
	    });
	    addRegexToken('MMMM', function (isStrict, locale) {
	        return locale.monthsRegex(isStrict);
	    });

	    addParseToken(['M', 'MM'], function (input, array) {
	        array[MONTH] = toInt(input) - 1;
	    });

	    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
	        var month = config._locale.monthsParse(input, token, config._strict);
	        // if we didn't find a month name, mark the date as invalid.
	        if (month != null) {
	            array[MONTH] = month;
	        } else {
	            getParsingFlags(config).invalidMonth = input;
	        }
	    });

	    // LOCALES

	    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
	    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
	    function localeMonths (m, format) {
	        if (!m) {
	            return this._months;
	        }
	        return isArray(this._months) ? this._months[m.month()] :
	            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
	    }

	    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
	    function localeMonthsShort (m, format) {
	        if (!m) {
	            return this._monthsShort;
	        }
	        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
	            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
	    }

	    function units_month__handleStrictParse(monthName, format, strict) {
	        var i, ii, mom, llc = monthName.toLocaleLowerCase();
	        if (!this._monthsParse) {
	            // this is not used
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	            for (i = 0; i < 12; ++i) {
	                mom = create_utc__createUTC([2000, i]);
	                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
	                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
	            }
	        }

	        if (strict) {
	            if (format === 'MMM') {
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._longMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        } else {
	            if (format === 'MMM') {
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._longMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._longMonthsParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        }
	    }

	    function localeMonthsParse (monthName, format, strict) {
	        var i, mom, regex;

	        if (this._monthsParseExact) {
	            return units_month__handleStrictParse.call(this, monthName, format, strict);
	        }

	        if (!this._monthsParse) {
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	        }

	        // TODO: add sorting
	        // Sorting makes sure if one month (or abbr) is a prefix of another
	        // see sorting in computeMonthsParse
	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            if (strict && !this._longMonthsParse[i]) {
	                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
	                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
	            }
	            if (!strict && !this._monthsParse[i]) {
	                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
	                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (!strict && this._monthsParse[i].test(monthName)) {
	                return i;
	            }
	        }
	    }

	    // MOMENTS

	    function setMonth (mom, value) {
	        var dayOfMonth;

	        if (!mom.isValid()) {
	            // No op
	            return mom;
	        }

	        if (typeof value === 'string') {
	            if (/^\d+$/.test(value)) {
	                value = toInt(value);
	            } else {
	                value = mom.localeData().monthsParse(value);
	                // TODO: Another silent failure?
	                if (typeof value !== 'number') {
	                    return mom;
	                }
	            }
	        }

	        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
	        return mom;
	    }

	    function getSetMonth (value) {
	        if (value != null) {
	            setMonth(this, value);
	            utils_hooks__hooks.updateOffset(this, true);
	            return this;
	        } else {
	            return get_set__get(this, 'Month');
	        }
	    }

	    function getDaysInMonth () {
	        return daysInMonth(this.year(), this.month());
	    }

	    var defaultMonthsShortRegex = matchWord;
	    function monthsShortRegex (isStrict) {
	        if (this._monthsParseExact) {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                computeMonthsParse.call(this);
	            }
	            if (isStrict) {
	                return this._monthsShortStrictRegex;
	            } else {
	                return this._monthsShortRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_monthsShortRegex')) {
	                this._monthsShortRegex = defaultMonthsShortRegex;
	            }
	            return this._monthsShortStrictRegex && isStrict ?
	                this._monthsShortStrictRegex : this._monthsShortRegex;
	        }
	    }

	    var defaultMonthsRegex = matchWord;
	    function monthsRegex (isStrict) {
	        if (this._monthsParseExact) {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                computeMonthsParse.call(this);
	            }
	            if (isStrict) {
	                return this._monthsStrictRegex;
	            } else {
	                return this._monthsRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                this._monthsRegex = defaultMonthsRegex;
	            }
	            return this._monthsStrictRegex && isStrict ?
	                this._monthsStrictRegex : this._monthsRegex;
	        }
	    }

	    function computeMonthsParse () {
	        function cmpLenRev(a, b) {
	            return b.length - a.length;
	        }

	        var shortPieces = [], longPieces = [], mixedPieces = [],
	            i, mom;
	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            shortPieces.push(this.monthsShort(mom, ''));
	            longPieces.push(this.months(mom, ''));
	            mixedPieces.push(this.months(mom, ''));
	            mixedPieces.push(this.monthsShort(mom, ''));
	        }
	        // Sorting makes sure if one month (or abbr) is a prefix of another it
	        // will match the longer piece.
	        shortPieces.sort(cmpLenRev);
	        longPieces.sort(cmpLenRev);
	        mixedPieces.sort(cmpLenRev);
	        for (i = 0; i < 12; i++) {
	            shortPieces[i] = regexEscape(shortPieces[i]);
	            longPieces[i] = regexEscape(longPieces[i]);
	        }
	        for (i = 0; i < 24; i++) {
	            mixedPieces[i] = regexEscape(mixedPieces[i]);
	        }

	        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	        this._monthsShortRegex = this._monthsRegex;
	        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	    }

	    // FORMATTING

	    addFormatToken('Y', 0, 0, function () {
	        var y = this.year();
	        return y <= 9999 ? '' + y : '+' + y;
	    });

	    addFormatToken(0, ['YY', 2], 0, function () {
	        return this.year() % 100;
	    });

	    addFormatToken(0, ['YYYY',   4],       0, 'year');
	    addFormatToken(0, ['YYYYY',  5],       0, 'year');
	    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

	    // ALIASES

	    addUnitAlias('year', 'y');

	    // PRIORITIES

	    addUnitPriority('year', 1);

	    // PARSING

	    addRegexToken('Y',      matchSigned);
	    addRegexToken('YY',     match1to2, match2);
	    addRegexToken('YYYY',   match1to4, match4);
	    addRegexToken('YYYYY',  match1to6, match6);
	    addRegexToken('YYYYYY', match1to6, match6);

	    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
	    addParseToken('YYYY', function (input, array) {
	        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
	    });
	    addParseToken('YY', function (input, array) {
	        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });
	    addParseToken('Y', function (input, array) {
	        array[YEAR] = parseInt(input, 10);
	    });

	    // HELPERS

	    function daysInYear(year) {
	        return isLeapYear(year) ? 366 : 365;
	    }

	    function isLeapYear(year) {
	        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	    }

	    // HOOKS

	    utils_hooks__hooks.parseTwoDigitYear = function (input) {
	        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
	    };

	    // MOMENTS

	    var getSetYear = makeGetSet('FullYear', true);

	    function getIsLeapYear () {
	        return isLeapYear(this.year());
	    }

	    function createDate (y, m, d, h, M, s, ms) {
	        //can't just apply() to create a date:
	        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
	        var date = new Date(y, m, d, h, M, s, ms);

	        //the date constructor remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
	            date.setFullYear(y);
	        }
	        return date;
	    }

	    function createUTCDate (y) {
	        var date = new Date(Date.UTC.apply(null, arguments));

	        //the Date.UTC function remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
	            date.setUTCFullYear(y);
	        }
	        return date;
	    }

	    // start-of-first-week - start-of-year
	    function firstWeekOffset(year, dow, doy) {
	        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
	            fwd = 7 + dow - doy,
	            // first-week day local weekday -- which local weekday is fwd
	            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

	        return -fwdlw + fwd - 1;
	    }

	    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
	    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
	        var localWeekday = (7 + weekday - dow) % 7,
	            weekOffset = firstWeekOffset(year, dow, doy),
	            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
	            resYear, resDayOfYear;

	        if (dayOfYear <= 0) {
	            resYear = year - 1;
	            resDayOfYear = daysInYear(resYear) + dayOfYear;
	        } else if (dayOfYear > daysInYear(year)) {
	            resYear = year + 1;
	            resDayOfYear = dayOfYear - daysInYear(year);
	        } else {
	            resYear = year;
	            resDayOfYear = dayOfYear;
	        }

	        return {
	            year: resYear,
	            dayOfYear: resDayOfYear
	        };
	    }

	    function weekOfYear(mom, dow, doy) {
	        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
	            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
	            resWeek, resYear;

	        if (week < 1) {
	            resYear = mom.year() - 1;
	            resWeek = week + weeksInYear(resYear, dow, doy);
	        } else if (week > weeksInYear(mom.year(), dow, doy)) {
	            resWeek = week - weeksInYear(mom.year(), dow, doy);
	            resYear = mom.year() + 1;
	        } else {
	            resYear = mom.year();
	            resWeek = week;
	        }

	        return {
	            week: resWeek,
	            year: resYear
	        };
	    }

	    function weeksInYear(year, dow, doy) {
	        var weekOffset = firstWeekOffset(year, dow, doy),
	            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
	        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
	    }

	    // FORMATTING

	    addFormatToken('w', ['ww', 2], 'wo', 'week');
	    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

	    // ALIASES

	    addUnitAlias('week', 'w');
	    addUnitAlias('isoWeek', 'W');

	    // PRIORITIES

	    addUnitPriority('week', 5);
	    addUnitPriority('isoWeek', 5);

	    // PARSING

	    addRegexToken('w',  match1to2);
	    addRegexToken('ww', match1to2, match2);
	    addRegexToken('W',  match1to2);
	    addRegexToken('WW', match1to2, match2);

	    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
	        week[token.substr(0, 1)] = toInt(input);
	    });

	    // HELPERS

	    // LOCALES

	    function localeWeek (mom) {
	        return weekOfYear(mom, this._week.dow, this._week.doy).week;
	    }

	    var defaultLocaleWeek = {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    };

	    function localeFirstDayOfWeek () {
	        return this._week.dow;
	    }

	    function localeFirstDayOfYear () {
	        return this._week.doy;
	    }

	    // MOMENTS

	    function getSetWeek (input) {
	        var week = this.localeData().week(this);
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }

	    function getSetISOWeek (input) {
	        var week = weekOfYear(this, 1, 4).week;
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }

	    // FORMATTING

	    addFormatToken('d', 0, 'do', 'day');

	    addFormatToken('dd', 0, 0, function (format) {
	        return this.localeData().weekdaysMin(this, format);
	    });

	    addFormatToken('ddd', 0, 0, function (format) {
	        return this.localeData().weekdaysShort(this, format);
	    });

	    addFormatToken('dddd', 0, 0, function (format) {
	        return this.localeData().weekdays(this, format);
	    });

	    addFormatToken('e', 0, 0, 'weekday');
	    addFormatToken('E', 0, 0, 'isoWeekday');

	    // ALIASES

	    addUnitAlias('day', 'd');
	    addUnitAlias('weekday', 'e');
	    addUnitAlias('isoWeekday', 'E');

	    // PRIORITY
	    addUnitPriority('day', 11);
	    addUnitPriority('weekday', 11);
	    addUnitPriority('isoWeekday', 11);

	    // PARSING

	    addRegexToken('d',    match1to2);
	    addRegexToken('e',    match1to2);
	    addRegexToken('E',    match1to2);
	    addRegexToken('dd',   function (isStrict, locale) {
	        return locale.weekdaysMinRegex(isStrict);
	    });
	    addRegexToken('ddd',   function (isStrict, locale) {
	        return locale.weekdaysShortRegex(isStrict);
	    });
	    addRegexToken('dddd',   function (isStrict, locale) {
	        return locale.weekdaysRegex(isStrict);
	    });

	    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
	        var weekday = config._locale.weekdaysParse(input, token, config._strict);
	        // if we didn't get a weekday name, mark the date as invalid
	        if (weekday != null) {
	            week.d = weekday;
	        } else {
	            getParsingFlags(config).invalidWeekday = input;
	        }
	    });

	    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
	        week[token] = toInt(input);
	    });

	    // HELPERS

	    function parseWeekday(input, locale) {
	        if (typeof input !== 'string') {
	            return input;
	        }

	        if (!isNaN(input)) {
	            return parseInt(input, 10);
	        }

	        input = locale.weekdaysParse(input);
	        if (typeof input === 'number') {
	            return input;
	        }

	        return null;
	    }

	    function parseIsoWeekday(input, locale) {
	        if (typeof input === 'string') {
	            return locale.weekdaysParse(input) % 7 || 7;
	        }
	        return isNaN(input) ? null : input;
	    }

	    // LOCALES

	    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
	    function localeWeekdays (m, format) {
	        if (!m) {
	            return this._weekdays;
	        }
	        return isArray(this._weekdays) ? this._weekdays[m.day()] :
	            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
	    }

	    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
	    function localeWeekdaysShort (m) {
	        return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
	    }

	    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
	    function localeWeekdaysMin (m) {
	        return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
	    }

	    function day_of_week__handleStrictParse(weekdayName, format, strict) {
	        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
	        if (!this._weekdaysParse) {
	            this._weekdaysParse = [];
	            this._shortWeekdaysParse = [];
	            this._minWeekdaysParse = [];

	            for (i = 0; i < 7; ++i) {
	                mom = create_utc__createUTC([2000, 1]).day(i);
	                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
	                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
	                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
	            }
	        }

	        if (strict) {
	            if (format === 'dddd') {
	                ii = indexOf.call(this._weekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else if (format === 'ddd') {
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        } else {
	            if (format === 'dddd') {
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else if (format === 'ddd') {
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        }
	    }

	    function localeWeekdaysParse (weekdayName, format, strict) {
	        var i, mom, regex;

	        if (this._weekdaysParseExact) {
	            return day_of_week__handleStrictParse.call(this, weekdayName, format, strict);
	        }

	        if (!this._weekdaysParse) {
	            this._weekdaysParse = [];
	            this._minWeekdaysParse = [];
	            this._shortWeekdaysParse = [];
	            this._fullWeekdaysParse = [];
	        }

	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already

	            mom = create_utc__createUTC([2000, 1]).day(i);
	            if (strict && !this._fullWeekdaysParse[i]) {
	                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
	                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
	                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
	            }
	            if (!this._weekdaysParse[i]) {
	                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
	                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
	                return i;
	            }
	        }
	    }

	    // MOMENTS

	    function getSetDayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
	        if (input != null) {
	            input = parseWeekday(input, this.localeData());
	            return this.add(input - day, 'd');
	        } else {
	            return day;
	        }
	    }

	    function getSetLocaleDayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	        return input == null ? weekday : this.add(input - weekday, 'd');
	    }

	    function getSetISODayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }

	        // behaves the same as moment#day except
	        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	        // as a setter, sunday should belong to the previous week.

	        if (input != null) {
	            var weekday = parseIsoWeekday(input, this.localeData());
	            return this.day(this.day() % 7 ? weekday : weekday - 7);
	        } else {
	            return this.day() || 7;
	        }
	    }

	    var defaultWeekdaysRegex = matchWord;
	    function weekdaysRegex (isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysStrictRegex;
	            } else {
	                return this._weekdaysRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                this._weekdaysRegex = defaultWeekdaysRegex;
	            }
	            return this._weekdaysStrictRegex && isStrict ?
	                this._weekdaysStrictRegex : this._weekdaysRegex;
	        }
	    }

	    var defaultWeekdaysShortRegex = matchWord;
	    function weekdaysShortRegex (isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysShortStrictRegex;
	            } else {
	                return this._weekdaysShortRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
	                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
	            }
	            return this._weekdaysShortStrictRegex && isStrict ?
	                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
	        }
	    }

	    var defaultWeekdaysMinRegex = matchWord;
	    function weekdaysMinRegex (isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysMinStrictRegex;
	            } else {
	                return this._weekdaysMinRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
	                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
	            }
	            return this._weekdaysMinStrictRegex && isStrict ?
	                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
	        }
	    }


	    function computeWeekdaysParse () {
	        function cmpLenRev(a, b) {
	            return b.length - a.length;
	        }

	        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
	            i, mom, minp, shortp, longp;
	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, 1]).day(i);
	            minp = this.weekdaysMin(mom, '');
	            shortp = this.weekdaysShort(mom, '');
	            longp = this.weekdays(mom, '');
	            minPieces.push(minp);
	            shortPieces.push(shortp);
	            longPieces.push(longp);
	            mixedPieces.push(minp);
	            mixedPieces.push(shortp);
	            mixedPieces.push(longp);
	        }
	        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
	        // will match the longer piece.
	        minPieces.sort(cmpLenRev);
	        shortPieces.sort(cmpLenRev);
	        longPieces.sort(cmpLenRev);
	        mixedPieces.sort(cmpLenRev);
	        for (i = 0; i < 7; i++) {
	            shortPieces[i] = regexEscape(shortPieces[i]);
	            longPieces[i] = regexEscape(longPieces[i]);
	            mixedPieces[i] = regexEscape(mixedPieces[i]);
	        }

	        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	        this._weekdaysShortRegex = this._weekdaysRegex;
	        this._weekdaysMinRegex = this._weekdaysRegex;

	        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
	    }

	    // FORMATTING

	    function hFormat() {
	        return this.hours() % 12 || 12;
	    }

	    function kFormat() {
	        return this.hours() || 24;
	    }

	    addFormatToken('H', ['HH', 2], 0, 'hour');
	    addFormatToken('h', ['hh', 2], 0, hFormat);
	    addFormatToken('k', ['kk', 2], 0, kFormat);

	    addFormatToken('hmm', 0, 0, function () {
	        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
	    });

	    addFormatToken('hmmss', 0, 0, function () {
	        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2);
	    });

	    addFormatToken('Hmm', 0, 0, function () {
	        return '' + this.hours() + zeroFill(this.minutes(), 2);
	    });

	    addFormatToken('Hmmss', 0, 0, function () {
	        return '' + this.hours() + zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2);
	    });

	    function meridiem (token, lowercase) {
	        addFormatToken(token, 0, 0, function () {
	            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
	        });
	    }

	    meridiem('a', true);
	    meridiem('A', false);

	    // ALIASES

	    addUnitAlias('hour', 'h');

	    // PRIORITY
	    addUnitPriority('hour', 13);

	    // PARSING

	    function matchMeridiem (isStrict, locale) {
	        return locale._meridiemParse;
	    }

	    addRegexToken('a',  matchMeridiem);
	    addRegexToken('A',  matchMeridiem);
	    addRegexToken('H',  match1to2);
	    addRegexToken('h',  match1to2);
	    addRegexToken('HH', match1to2, match2);
	    addRegexToken('hh', match1to2, match2);

	    addRegexToken('hmm', match3to4);
	    addRegexToken('hmmss', match5to6);
	    addRegexToken('Hmm', match3to4);
	    addRegexToken('Hmmss', match5to6);

	    addParseToken(['H', 'HH'], HOUR);
	    addParseToken(['a', 'A'], function (input, array, config) {
	        config._isPm = config._locale.isPM(input);
	        config._meridiem = input;
	    });
	    addParseToken(['h', 'hh'], function (input, array, config) {
	        array[HOUR] = toInt(input);
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmm', function (input, array, config) {
	        var pos = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos));
	        array[MINUTE] = toInt(input.substr(pos));
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmmss', function (input, array, config) {
	        var pos1 = input.length - 4;
	        var pos2 = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos1));
	        array[MINUTE] = toInt(input.substr(pos1, 2));
	        array[SECOND] = toInt(input.substr(pos2));
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('Hmm', function (input, array, config) {
	        var pos = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos));
	        array[MINUTE] = toInt(input.substr(pos));
	    });
	    addParseToken('Hmmss', function (input, array, config) {
	        var pos1 = input.length - 4;
	        var pos2 = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos1));
	        array[MINUTE] = toInt(input.substr(pos1, 2));
	        array[SECOND] = toInt(input.substr(pos2));
	    });

	    // LOCALES

	    function localeIsPM (input) {
	        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
	        // Using charAt should be more compatible.
	        return ((input + '').toLowerCase().charAt(0) === 'p');
	    }

	    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
	    function localeMeridiem (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'pm' : 'PM';
	        } else {
	            return isLower ? 'am' : 'AM';
	        }
	    }


	    // MOMENTS

	    // Setting the hour should keep the time, because the user explicitly
	    // specified which hour he wants. So trying to maintain the same hour (in
	    // a new timezone) makes sense. Adding/subtracting hours does not follow
	    // this rule.
	    var getSetHour = makeGetSet('Hours', true);

	    var baseConfig = {
	        calendar: defaultCalendar,
	        longDateFormat: defaultLongDateFormat,
	        invalidDate: defaultInvalidDate,
	        ordinal: defaultOrdinal,
	        ordinalParse: defaultOrdinalParse,
	        relativeTime: defaultRelativeTime,

	        months: defaultLocaleMonths,
	        monthsShort: defaultLocaleMonthsShort,

	        week: defaultLocaleWeek,

	        weekdays: defaultLocaleWeekdays,
	        weekdaysMin: defaultLocaleWeekdaysMin,
	        weekdaysShort: defaultLocaleWeekdaysShort,

	        meridiemParse: defaultLocaleMeridiemParse
	    };

	    // internal storage for locale config files
	    var locales = {};
	    var globalLocale;

	    function normalizeLocale(key) {
	        return key ? key.toLowerCase().replace('_', '-') : key;
	    }

	    // pick the locale from the array
	    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
	    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
	    function chooseLocale(names) {
	        var i = 0, j, next, locale, split;

	        while (i < names.length) {
	            split = normalizeLocale(names[i]).split('-');
	            j = split.length;
	            next = normalizeLocale(names[i + 1]);
	            next = next ? next.split('-') : null;
	            while (j > 0) {
	                locale = loadLocale(split.slice(0, j).join('-'));
	                if (locale) {
	                    return locale;
	                }
	                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
	                    //the next array item is better than a shallower substring of this one
	                    break;
	                }
	                j--;
	            }
	            i++;
	        }
	        return null;
	    }

	    function loadLocale(name) {
	        var oldLocale = null;
	        // TODO: Find a better way to register and load all the locales in Node
	        if (!locales[name] && (typeof module !== 'undefined') &&
	                module && module.exports) {
	            try {
	                oldLocale = globalLocale._abbr;
	                __webpack_require__(33)("./" + name);
	                // because defineLocale currently also sets the global locale, we
	                // want to undo that for lazy loaded locales
	                locale_locales__getSetGlobalLocale(oldLocale);
	            } catch (e) { }
	        }
	        return locales[name];
	    }

	    // This function will load locale and then set the global locale.  If
	    // no arguments are passed in, it will simply return the current global
	    // locale key.
	    function locale_locales__getSetGlobalLocale (key, values) {
	        var data;
	        if (key) {
	            if (isUndefined(values)) {
	                data = locale_locales__getLocale(key);
	            }
	            else {
	                data = defineLocale(key, values);
	            }

	            if (data) {
	                // moment.duration._locale = moment._locale = data;
	                globalLocale = data;
	            }
	        }

	        return globalLocale._abbr;
	    }

	    function defineLocale (name, config) {
	        if (config !== null) {
	            var parentConfig = baseConfig;
	            config.abbr = name;
	            if (locales[name] != null) {
	                deprecateSimple('defineLocaleOverride',
	                        'use moment.updateLocale(localeName, config) to change ' +
	                        'an existing locale. moment.defineLocale(localeName, ' +
	                        'config) should only be used for creating a new locale ' +
	                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
	                parentConfig = locales[name]._config;
	            } else if (config.parentLocale != null) {
	                if (locales[config.parentLocale] != null) {
	                    parentConfig = locales[config.parentLocale]._config;
	                } else {
	                    // treat as if there is no base config
	                    deprecateSimple('parentLocaleUndefined',
	                            'specified parentLocale is not defined yet. See http://momentjs.com/guides/#/warnings/parent-locale/');
	                }
	            }
	            locales[name] = new Locale(mergeConfigs(parentConfig, config));

	            // backwards compat for now: also set the locale
	            locale_locales__getSetGlobalLocale(name);

	            return locales[name];
	        } else {
	            // useful for testing
	            delete locales[name];
	            return null;
	        }
	    }

	    function updateLocale(name, config) {
	        if (config != null) {
	            var locale, parentConfig = baseConfig;
	            // MERGE
	            if (locales[name] != null) {
	                parentConfig = locales[name]._config;
	            }
	            config = mergeConfigs(parentConfig, config);
	            locale = new Locale(config);
	            locale.parentLocale = locales[name];
	            locales[name] = locale;

	            // backwards compat for now: also set the locale
	            locale_locales__getSetGlobalLocale(name);
	        } else {
	            // pass null for config to unupdate, useful for tests
	            if (locales[name] != null) {
	                if (locales[name].parentLocale != null) {
	                    locales[name] = locales[name].parentLocale;
	                } else if (locales[name] != null) {
	                    delete locales[name];
	                }
	            }
	        }
	        return locales[name];
	    }

	    // returns locale data
	    function locale_locales__getLocale (key) {
	        var locale;

	        if (key && key._locale && key._locale._abbr) {
	            key = key._locale._abbr;
	        }

	        if (!key) {
	            return globalLocale;
	        }

	        if (!isArray(key)) {
	            //short-circuit everything else
	            locale = loadLocale(key);
	            if (locale) {
	                return locale;
	            }
	            key = [key];
	        }

	        return chooseLocale(key);
	    }

	    function locale_locales__listLocales() {
	        return keys(locales);
	    }

	    function checkOverflow (m) {
	        var overflow;
	        var a = m._a;

	        if (a && getParsingFlags(m).overflow === -2) {
	            overflow =
	                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
	                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
	                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
	                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
	                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
	                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
	                -1;

	            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
	                overflow = DATE;
	            }
	            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
	                overflow = WEEK;
	            }
	            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
	                overflow = WEEKDAY;
	            }

	            getParsingFlags(m).overflow = overflow;
	        }

	        return m;
	    }

	    // iso 8601 regex
	    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
	    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
	    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

	    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

	    var isoDates = [
	        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
	        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
	        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
	        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
	        ['YYYY-DDD', /\d{4}-\d{3}/],
	        ['YYYY-MM', /\d{4}-\d\d/, false],
	        ['YYYYYYMMDD', /[+-]\d{10}/],
	        ['YYYYMMDD', /\d{8}/],
	        // YYYYMM is NOT allowed by the standard
	        ['GGGG[W]WWE', /\d{4}W\d{3}/],
	        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
	        ['YYYYDDD', /\d{7}/]
	    ];

	    // iso time formats and regexes
	    var isoTimes = [
	        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
	        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
	        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
	        ['HH:mm', /\d\d:\d\d/],
	        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
	        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
	        ['HHmmss', /\d\d\d\d\d\d/],
	        ['HHmm', /\d\d\d\d/],
	        ['HH', /\d\d/]
	    ];

	    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

	    // date from iso format
	    function configFromISO(config) {
	        var i, l,
	            string = config._i,
	            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
	            allowTime, dateFormat, timeFormat, tzFormat;

	        if (match) {
	            getParsingFlags(config).iso = true;

	            for (i = 0, l = isoDates.length; i < l; i++) {
	                if (isoDates[i][1].exec(match[1])) {
	                    dateFormat = isoDates[i][0];
	                    allowTime = isoDates[i][2] !== false;
	                    break;
	                }
	            }
	            if (dateFormat == null) {
	                config._isValid = false;
	                return;
	            }
	            if (match[3]) {
	                for (i = 0, l = isoTimes.length; i < l; i++) {
	                    if (isoTimes[i][1].exec(match[3])) {
	                        // match[2] should be 'T' or space
	                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
	                        break;
	                    }
	                }
	                if (timeFormat == null) {
	                    config._isValid = false;
	                    return;
	                }
	            }
	            if (!allowTime && timeFormat != null) {
	                config._isValid = false;
	                return;
	            }
	            if (match[4]) {
	                if (tzRegex.exec(match[4])) {
	                    tzFormat = 'Z';
	                } else {
	                    config._isValid = false;
	                    return;
	                }
	            }
	            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
	            configFromStringAndFormat(config);
	        } else {
	            config._isValid = false;
	        }
	    }

	    // date from iso format or fallback
	    function configFromString(config) {
	        var matched = aspNetJsonRegex.exec(config._i);

	        if (matched !== null) {
	            config._d = new Date(+matched[1]);
	            return;
	        }

	        configFromISO(config);
	        if (config._isValid === false) {
	            delete config._isValid;
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }

	    utils_hooks__hooks.createFromInputFallback = deprecate(
	        'value provided is not in a recognized ISO format. moment construction falls back to js Date(), ' +
	        'which is not reliable across all browsers and versions. Non ISO date formats are ' +
	        'discouraged and will be removed in an upcoming major release. Please refer to ' +
	        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
	        function (config) {
	            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
	        }
	    );

	    // Pick the first defined of two or three arguments.
	    function defaults(a, b, c) {
	        if (a != null) {
	            return a;
	        }
	        if (b != null) {
	            return b;
	        }
	        return c;
	    }

	    function currentDateArray(config) {
	        // hooks is actually the exported moment object
	        var nowValue = new Date(utils_hooks__hooks.now());
	        if (config._useUTC) {
	            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
	        }
	        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
	    }

	    // convert an array to a date.
	    // the array should mirror the parameters below
	    // note: all values past the year are optional and will default to the lowest possible value.
	    // [year, month, day , hour, minute, second, millisecond]
	    function configFromArray (config) {
	        var i, date, input = [], currentDate, yearToUse;

	        if (config._d) {
	            return;
	        }

	        currentDate = currentDateArray(config);

	        //compute day of the year from weeks and weekdays
	        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
	            dayOfYearFromWeekInfo(config);
	        }

	        //if the day of the year is set, figure out what it is
	        if (config._dayOfYear) {
	            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

	            if (config._dayOfYear > daysInYear(yearToUse)) {
	                getParsingFlags(config)._overflowDayOfYear = true;
	            }

	            date = createUTCDate(yearToUse, 0, config._dayOfYear);
	            config._a[MONTH] = date.getUTCMonth();
	            config._a[DATE] = date.getUTCDate();
	        }

	        // Default to current date.
	        // * if no year, month, day of month are given, default to today
	        // * if day of month is given, default month and year
	        // * if month is given, default only year
	        // * if year is given, don't default anything
	        for (i = 0; i < 3 && config._a[i] == null; ++i) {
	            config._a[i] = input[i] = currentDate[i];
	        }

	        // Zero out whatever was not defaulted, including time
	        for (; i < 7; i++) {
	            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
	        }

	        // Check for 24:00:00.000
	        if (config._a[HOUR] === 24 &&
	                config._a[MINUTE] === 0 &&
	                config._a[SECOND] === 0 &&
	                config._a[MILLISECOND] === 0) {
	            config._nextDay = true;
	            config._a[HOUR] = 0;
	        }

	        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
	        // Apply timezone offset from input. The actual utcOffset can be changed
	        // with parseZone.
	        if (config._tzm != null) {
	            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
	        }

	        if (config._nextDay) {
	            config._a[HOUR] = 24;
	        }
	    }

	    function dayOfYearFromWeekInfo(config) {
	        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

	        w = config._w;
	        if (w.GG != null || w.W != null || w.E != null) {
	            dow = 1;
	            doy = 4;

	            // TODO: We need to take the current isoWeekYear, but that depends on
	            // how we interpret now (local, utc, fixed offset). So create
	            // a now version of current config (take local/utc/offset flags, and
	            // create now).
	            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
	            week = defaults(w.W, 1);
	            weekday = defaults(w.E, 1);
	            if (weekday < 1 || weekday > 7) {
	                weekdayOverflow = true;
	            }
	        } else {
	            dow = config._locale._week.dow;
	            doy = config._locale._week.doy;

	            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
	            week = defaults(w.w, 1);

	            if (w.d != null) {
	                // weekday -- low day numbers are considered next week
	                weekday = w.d;
	                if (weekday < 0 || weekday > 6) {
	                    weekdayOverflow = true;
	                }
	            } else if (w.e != null) {
	                // local weekday -- counting starts from begining of week
	                weekday = w.e + dow;
	                if (w.e < 0 || w.e > 6) {
	                    weekdayOverflow = true;
	                }
	            } else {
	                // default to begining of week
	                weekday = dow;
	            }
	        }
	        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
	            getParsingFlags(config)._overflowWeeks = true;
	        } else if (weekdayOverflow != null) {
	            getParsingFlags(config)._overflowWeekday = true;
	        } else {
	            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
	            config._a[YEAR] = temp.year;
	            config._dayOfYear = temp.dayOfYear;
	        }
	    }

	    // constant that refers to the ISO standard
	    utils_hooks__hooks.ISO_8601 = function () {};

	    // date from string and format string
	    function configFromStringAndFormat(config) {
	        // TODO: Move this to another part of the creation flow to prevent circular deps
	        if (config._f === utils_hooks__hooks.ISO_8601) {
	            configFromISO(config);
	            return;
	        }

	        config._a = [];
	        getParsingFlags(config).empty = true;

	        // This array is used to make a Date, either with `new Date` or `Date.UTC`
	        var string = '' + config._i,
	            i, parsedInput, tokens, token, skipped,
	            stringLength = string.length,
	            totalParsedInputLength = 0;

	        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

	        for (i = 0; i < tokens.length; i++) {
	            token = tokens[i];
	            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
	            // console.log('token', token, 'parsedInput', parsedInput,
	            //         'regex', getParseRegexForToken(token, config));
	            if (parsedInput) {
	                skipped = string.substr(0, string.indexOf(parsedInput));
	                if (skipped.length > 0) {
	                    getParsingFlags(config).unusedInput.push(skipped);
	                }
	                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
	                totalParsedInputLength += parsedInput.length;
	            }
	            // don't parse if it's not a known token
	            if (formatTokenFunctions[token]) {
	                if (parsedInput) {
	                    getParsingFlags(config).empty = false;
	                }
	                else {
	                    getParsingFlags(config).unusedTokens.push(token);
	                }
	                addTimeToArrayFromToken(token, parsedInput, config);
	            }
	            else if (config._strict && !parsedInput) {
	                getParsingFlags(config).unusedTokens.push(token);
	            }
	        }

	        // add remaining unparsed input length to the string
	        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
	        if (string.length > 0) {
	            getParsingFlags(config).unusedInput.push(string);
	        }

	        // clear _12h flag if hour is <= 12
	        if (config._a[HOUR] <= 12 &&
	            getParsingFlags(config).bigHour === true &&
	            config._a[HOUR] > 0) {
	            getParsingFlags(config).bigHour = undefined;
	        }

	        getParsingFlags(config).parsedDateParts = config._a.slice(0);
	        getParsingFlags(config).meridiem = config._meridiem;
	        // handle meridiem
	        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

	        configFromArray(config);
	        checkOverflow(config);
	    }


	    function meridiemFixWrap (locale, hour, meridiem) {
	        var isPm;

	        if (meridiem == null) {
	            // nothing to do
	            return hour;
	        }
	        if (locale.meridiemHour != null) {
	            return locale.meridiemHour(hour, meridiem);
	        } else if (locale.isPM != null) {
	            // Fallback
	            isPm = locale.isPM(meridiem);
	            if (isPm && hour < 12) {
	                hour += 12;
	            }
	            if (!isPm && hour === 12) {
	                hour = 0;
	            }
	            return hour;
	        } else {
	            // this is not supposed to happen
	            return hour;
	        }
	    }

	    // date from string and array of format strings
	    function configFromStringAndArray(config) {
	        var tempConfig,
	            bestMoment,

	            scoreToBeat,
	            i,
	            currentScore;

	        if (config._f.length === 0) {
	            getParsingFlags(config).invalidFormat = true;
	            config._d = new Date(NaN);
	            return;
	        }

	        for (i = 0; i < config._f.length; i++) {
	            currentScore = 0;
	            tempConfig = copyConfig({}, config);
	            if (config._useUTC != null) {
	                tempConfig._useUTC = config._useUTC;
	            }
	            tempConfig._f = config._f[i];
	            configFromStringAndFormat(tempConfig);

	            if (!valid__isValid(tempConfig)) {
	                continue;
	            }

	            // if there is any input that was not parsed add a penalty for that format
	            currentScore += getParsingFlags(tempConfig).charsLeftOver;

	            //or tokens
	            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

	            getParsingFlags(tempConfig).score = currentScore;

	            if (scoreToBeat == null || currentScore < scoreToBeat) {
	                scoreToBeat = currentScore;
	                bestMoment = tempConfig;
	            }
	        }

	        extend(config, bestMoment || tempConfig);
	    }

	    function configFromObject(config) {
	        if (config._d) {
	            return;
	        }

	        var i = normalizeObjectUnits(config._i);
	        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
	            return obj && parseInt(obj, 10);
	        });

	        configFromArray(config);
	    }

	    function createFromConfig (config) {
	        var res = new Moment(checkOverflow(prepareConfig(config)));
	        if (res._nextDay) {
	            // Adding is smart enough around DST
	            res.add(1, 'd');
	            res._nextDay = undefined;
	        }

	        return res;
	    }

	    function prepareConfig (config) {
	        var input = config._i,
	            format = config._f;

	        config._locale = config._locale || locale_locales__getLocale(config._l);

	        if (input === null || (format === undefined && input === '')) {
	            return valid__createInvalid({nullInput: true});
	        }

	        if (typeof input === 'string') {
	            config._i = input = config._locale.preparse(input);
	        }

	        if (isMoment(input)) {
	            return new Moment(checkOverflow(input));
	        } else if (isArray(format)) {
	            configFromStringAndArray(config);
	        } else if (isDate(input)) {
	            config._d = input;
	        } else if (format) {
	            configFromStringAndFormat(config);
	        }  else {
	            configFromInput(config);
	        }

	        if (!valid__isValid(config)) {
	            config._d = null;
	        }

	        return config;
	    }

	    function configFromInput(config) {
	        var input = config._i;
	        if (input === undefined) {
	            config._d = new Date(utils_hooks__hooks.now());
	        } else if (isDate(input)) {
	            config._d = new Date(input.valueOf());
	        } else if (typeof input === 'string') {
	            configFromString(config);
	        } else if (isArray(input)) {
	            config._a = map(input.slice(0), function (obj) {
	                return parseInt(obj, 10);
	            });
	            configFromArray(config);
	        } else if (typeof(input) === 'object') {
	            configFromObject(config);
	        } else if (typeof(input) === 'number') {
	            // from milliseconds
	            config._d = new Date(input);
	        } else {
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }

	    function createLocalOrUTC (input, format, locale, strict, isUTC) {
	        var c = {};

	        if (typeof(locale) === 'boolean') {
	            strict = locale;
	            locale = undefined;
	        }

	        if ((isObject(input) && isObjectEmpty(input)) ||
	                (isArray(input) && input.length === 0)) {
	            input = undefined;
	        }
	        // object construction must be done this way.
	        // https://github.com/moment/moment/issues/1423
	        c._isAMomentObject = true;
	        c._useUTC = c._isUTC = isUTC;
	        c._l = locale;
	        c._i = input;
	        c._f = format;
	        c._strict = strict;

	        return createFromConfig(c);
	    }

	    function local__createLocal (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, false);
	    }

	    var prototypeMin = deprecate(
	        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
	        function () {
	            var other = local__createLocal.apply(null, arguments);
	            if (this.isValid() && other.isValid()) {
	                return other < this ? this : other;
	            } else {
	                return valid__createInvalid();
	            }
	        }
	    );

	    var prototypeMax = deprecate(
	        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
	        function () {
	            var other = local__createLocal.apply(null, arguments);
	            if (this.isValid() && other.isValid()) {
	                return other > this ? this : other;
	            } else {
	                return valid__createInvalid();
	            }
	        }
	    );

	    // Pick a moment m from moments so that m[fn](other) is true for all
	    // other. This relies on the function fn to be transitive.
	    //
	    // moments should either be an array of moment objects or an array, whose
	    // first element is an array of moment objects.
	    function pickBy(fn, moments) {
	        var res, i;
	        if (moments.length === 1 && isArray(moments[0])) {
	            moments = moments[0];
	        }
	        if (!moments.length) {
	            return local__createLocal();
	        }
	        res = moments[0];
	        for (i = 1; i < moments.length; ++i) {
	            if (!moments[i].isValid() || moments[i][fn](res)) {
	                res = moments[i];
	            }
	        }
	        return res;
	    }

	    // TODO: Use [].sort instead?
	    function min () {
	        var args = [].slice.call(arguments, 0);

	        return pickBy('isBefore', args);
	    }

	    function max () {
	        var args = [].slice.call(arguments, 0);

	        return pickBy('isAfter', args);
	    }

	    var now = function () {
	        return Date.now ? Date.now() : +(new Date());
	    };

	    function Duration (duration) {
	        var normalizedInput = normalizeObjectUnits(duration),
	            years = normalizedInput.year || 0,
	            quarters = normalizedInput.quarter || 0,
	            months = normalizedInput.month || 0,
	            weeks = normalizedInput.week || 0,
	            days = normalizedInput.day || 0,
	            hours = normalizedInput.hour || 0,
	            minutes = normalizedInput.minute || 0,
	            seconds = normalizedInput.second || 0,
	            milliseconds = normalizedInput.millisecond || 0;

	        // representation for dateAddRemove
	        this._milliseconds = +milliseconds +
	            seconds * 1e3 + // 1000
	            minutes * 6e4 + // 1000 * 60
	            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
	        // Because of dateAddRemove treats 24 hours as different from a
	        // day when working around DST, we need to store them separately
	        this._days = +days +
	            weeks * 7;
	        // It is impossible translate months into days without knowing
	        // which months you are are talking about, so we have to store
	        // it separately.
	        this._months = +months +
	            quarters * 3 +
	            years * 12;

	        this._data = {};

	        this._locale = locale_locales__getLocale();

	        this._bubble();
	    }

	    function isDuration (obj) {
	        return obj instanceof Duration;
	    }

	    function absRound (number) {
	        if (number < 0) {
	            return Math.round(-1 * number) * -1;
	        } else {
	            return Math.round(number);
	        }
	    }

	    // FORMATTING

	    function offset (token, separator) {
	        addFormatToken(token, 0, 0, function () {
	            var offset = this.utcOffset();
	            var sign = '+';
	            if (offset < 0) {
	                offset = -offset;
	                sign = '-';
	            }
	            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
	        });
	    }

	    offset('Z', ':');
	    offset('ZZ', '');

	    // PARSING

	    addRegexToken('Z',  matchShortOffset);
	    addRegexToken('ZZ', matchShortOffset);
	    addParseToken(['Z', 'ZZ'], function (input, array, config) {
	        config._useUTC = true;
	        config._tzm = offsetFromString(matchShortOffset, input);
	    });

	    // HELPERS

	    // timezone chunker
	    // '+10:00' > ['10',  '00']
	    // '-1530'  > ['-15', '30']
	    var chunkOffset = /([\+\-]|\d\d)/gi;

	    function offsetFromString(matcher, string) {
	        var matches = ((string || '').match(matcher) || []);
	        var chunk   = matches[matches.length - 1] || [];
	        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
	        var minutes = +(parts[1] * 60) + toInt(parts[2]);

	        return parts[0] === '+' ? minutes : -minutes;
	    }

	    // Return a moment from input, that is local/utc/zone equivalent to model.
	    function cloneWithOffset(input, model) {
	        var res, diff;
	        if (model._isUTC) {
	            res = model.clone();
	            diff = (isMoment(input) || isDate(input) ? input.valueOf() : local__createLocal(input).valueOf()) - res.valueOf();
	            // Use low-level api, because this fn is low-level api.
	            res._d.setTime(res._d.valueOf() + diff);
	            utils_hooks__hooks.updateOffset(res, false);
	            return res;
	        } else {
	            return local__createLocal(input).local();
	        }
	    }

	    function getDateOffset (m) {
	        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
	        // https://github.com/moment/moment/pull/1871
	        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
	    }

	    // HOOKS

	    // This function will be called whenever a moment is mutated.
	    // It is intended to keep the offset in sync with the timezone.
	    utils_hooks__hooks.updateOffset = function () {};

	    // MOMENTS

	    // keepLocalTime = true means only change the timezone, without
	    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
	    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
	    // +0200, so we adjust the time as needed, to be valid.
	    //
	    // Keeping the time actually adds/subtracts (one hour)
	    // from the actual represented time. That is why we call updateOffset
	    // a second time. In case it wants us to change the offset again
	    // _changeInProgress == true case, then we have to adjust, because
	    // there is no such time in the given timezone.
	    function getSetOffset (input, keepLocalTime) {
	        var offset = this._offset || 0,
	            localAdjust;
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        if (input != null) {
	            if (typeof input === 'string') {
	                input = offsetFromString(matchShortOffset, input);
	            } else if (Math.abs(input) < 16) {
	                input = input * 60;
	            }
	            if (!this._isUTC && keepLocalTime) {
	                localAdjust = getDateOffset(this);
	            }
	            this._offset = input;
	            this._isUTC = true;
	            if (localAdjust != null) {
	                this.add(localAdjust, 'm');
	            }
	            if (offset !== input) {
	                if (!keepLocalTime || this._changeInProgress) {
	                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
	                } else if (!this._changeInProgress) {
	                    this._changeInProgress = true;
	                    utils_hooks__hooks.updateOffset(this, true);
	                    this._changeInProgress = null;
	                }
	            }
	            return this;
	        } else {
	            return this._isUTC ? offset : getDateOffset(this);
	        }
	    }

	    function getSetZone (input, keepLocalTime) {
	        if (input != null) {
	            if (typeof input !== 'string') {
	                input = -input;
	            }

	            this.utcOffset(input, keepLocalTime);

	            return this;
	        } else {
	            return -this.utcOffset();
	        }
	    }

	    function setOffsetToUTC (keepLocalTime) {
	        return this.utcOffset(0, keepLocalTime);
	    }

	    function setOffsetToLocal (keepLocalTime) {
	        if (this._isUTC) {
	            this.utcOffset(0, keepLocalTime);
	            this._isUTC = false;

	            if (keepLocalTime) {
	                this.subtract(getDateOffset(this), 'm');
	            }
	        }
	        return this;
	    }

	    function setOffsetToParsedOffset () {
	        if (this._tzm) {
	            this.utcOffset(this._tzm);
	        } else if (typeof this._i === 'string') {
	            var tZone = offsetFromString(matchOffset, this._i);

	            if (tZone === 0) {
	                this.utcOffset(0, true);
	            } else {
	                this.utcOffset(offsetFromString(matchOffset, this._i));
	            }
	        }
	        return this;
	    }

	    function hasAlignedHourOffset (input) {
	        if (!this.isValid()) {
	            return false;
	        }
	        input = input ? local__createLocal(input).utcOffset() : 0;

	        return (this.utcOffset() - input) % 60 === 0;
	    }

	    function isDaylightSavingTime () {
	        return (
	            this.utcOffset() > this.clone().month(0).utcOffset() ||
	            this.utcOffset() > this.clone().month(5).utcOffset()
	        );
	    }

	    function isDaylightSavingTimeShifted () {
	        if (!isUndefined(this._isDSTShifted)) {
	            return this._isDSTShifted;
	        }

	        var c = {};

	        copyConfig(c, this);
	        c = prepareConfig(c);

	        if (c._a) {
	            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
	            this._isDSTShifted = this.isValid() &&
	                compareArrays(c._a, other.toArray()) > 0;
	        } else {
	            this._isDSTShifted = false;
	        }

	        return this._isDSTShifted;
	    }

	    function isLocal () {
	        return this.isValid() ? !this._isUTC : false;
	    }

	    function isUtcOffset () {
	        return this.isValid() ? this._isUTC : false;
	    }

	    function isUtc () {
	        return this.isValid() ? this._isUTC && this._offset === 0 : false;
	    }

	    // ASP.NET json date format regex
	    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

	    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	    // and further modified to allow for strings containing both week and day
	    var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

	    function create__createDuration (input, key) {
	        var duration = input,
	            // matching against regexp is expensive, do it on demand
	            match = null,
	            sign,
	            ret,
	            diffRes;

	        if (isDuration(input)) {
	            duration = {
	                ms : input._milliseconds,
	                d  : input._days,
	                M  : input._months
	            };
	        } else if (typeof input === 'number') {
	            duration = {};
	            if (key) {
	                duration[key] = input;
	            } else {
	                duration.milliseconds = input;
	            }
	        } else if (!!(match = aspNetRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y  : 0,
	                d  : toInt(match[DATE])                         * sign,
	                h  : toInt(match[HOUR])                         * sign,
	                m  : toInt(match[MINUTE])                       * sign,
	                s  : toInt(match[SECOND])                       * sign,
	                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
	            };
	        } else if (!!(match = isoRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y : parseIso(match[2], sign),
	                M : parseIso(match[3], sign),
	                w : parseIso(match[4], sign),
	                d : parseIso(match[5], sign),
	                h : parseIso(match[6], sign),
	                m : parseIso(match[7], sign),
	                s : parseIso(match[8], sign)
	            };
	        } else if (duration == null) {// checks for null or undefined
	            duration = {};
	        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
	            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

	            duration = {};
	            duration.ms = diffRes.milliseconds;
	            duration.M = diffRes.months;
	        }

	        ret = new Duration(duration);

	        if (isDuration(input) && hasOwnProp(input, '_locale')) {
	            ret._locale = input._locale;
	        }

	        return ret;
	    }

	    create__createDuration.fn = Duration.prototype;

	    function parseIso (inp, sign) {
	        // We'd normally use ~~inp for this, but unfortunately it also
	        // converts floats to ints.
	        // inp may be undefined, so careful calling replace on it.
	        var res = inp && parseFloat(inp.replace(',', '.'));
	        // apply sign while we're at it
	        return (isNaN(res) ? 0 : res) * sign;
	    }

	    function positiveMomentsDifference(base, other) {
	        var res = {milliseconds: 0, months: 0};

	        res.months = other.month() - base.month() +
	            (other.year() - base.year()) * 12;
	        if (base.clone().add(res.months, 'M').isAfter(other)) {
	            --res.months;
	        }

	        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

	        return res;
	    }

	    function momentsDifference(base, other) {
	        var res;
	        if (!(base.isValid() && other.isValid())) {
	            return {milliseconds: 0, months: 0};
	        }

	        other = cloneWithOffset(other, base);
	        if (base.isBefore(other)) {
	            res = positiveMomentsDifference(base, other);
	        } else {
	            res = positiveMomentsDifference(other, base);
	            res.milliseconds = -res.milliseconds;
	            res.months = -res.months;
	        }

	        return res;
	    }

	    // TODO: remove 'name' arg after deprecation is removed
	    function createAdder(direction, name) {
	        return function (val, period) {
	            var dur, tmp;
	            //invert the arguments, but complain about it
	            if (period !== null && !isNaN(+period)) {
	                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
	                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
	                tmp = val; val = period; period = tmp;
	            }

	            val = typeof val === 'string' ? +val : val;
	            dur = create__createDuration(val, period);
	            add_subtract__addSubtract(this, dur, direction);
	            return this;
	        };
	    }

	    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
	        var milliseconds = duration._milliseconds,
	            days = absRound(duration._days),
	            months = absRound(duration._months);

	        if (!mom.isValid()) {
	            // No op
	            return;
	        }

	        updateOffset = updateOffset == null ? true : updateOffset;

	        if (milliseconds) {
	            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
	        }
	        if (days) {
	            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
	        }
	        if (months) {
	            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
	        }
	        if (updateOffset) {
	            utils_hooks__hooks.updateOffset(mom, days || months);
	        }
	    }

	    var add_subtract__add      = createAdder(1, 'add');
	    var add_subtract__subtract = createAdder(-1, 'subtract');

	    function getCalendarFormat(myMoment, now) {
	        var diff = myMoment.diff(now, 'days', true);
	        return diff < -6 ? 'sameElse' :
	                diff < -1 ? 'lastWeek' :
	                diff < 0 ? 'lastDay' :
	                diff < 1 ? 'sameDay' :
	                diff < 2 ? 'nextDay' :
	                diff < 7 ? 'nextWeek' : 'sameElse';
	    }

	    function moment_calendar__calendar (time, formats) {
	        // We want to compare the start of today, vs this.
	        // Getting start-of-today depends on whether we're local/utc/offset or not.
	        var now = time || local__createLocal(),
	            sod = cloneWithOffset(now, this).startOf('day'),
	            format = utils_hooks__hooks.calendarFormat(this, sod) || 'sameElse';

	        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

	        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
	    }

	    function clone () {
	        return new Moment(this);
	    }

	    function isAfter (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input);
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	        if (units === 'millisecond') {
	            return this.valueOf() > localInput.valueOf();
	        } else {
	            return localInput.valueOf() < this.clone().startOf(units).valueOf();
	        }
	    }

	    function isBefore (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input);
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	        if (units === 'millisecond') {
	            return this.valueOf() < localInput.valueOf();
	        } else {
	            return this.clone().endOf(units).valueOf() < localInput.valueOf();
	        }
	    }

	    function isBetween (from, to, units, inclusivity) {
	        inclusivity = inclusivity || '()';
	        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
	            (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
	    }

	    function isSame (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input),
	            inputMs;
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(units || 'millisecond');
	        if (units === 'millisecond') {
	            return this.valueOf() === localInput.valueOf();
	        } else {
	            inputMs = localInput.valueOf();
	            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
	        }
	    }

	    function isSameOrAfter (input, units) {
	        return this.isSame(input, units) || this.isAfter(input,units);
	    }

	    function isSameOrBefore (input, units) {
	        return this.isSame(input, units) || this.isBefore(input,units);
	    }

	    function diff (input, units, asFloat) {
	        var that,
	            zoneDelta,
	            delta, output;

	        if (!this.isValid()) {
	            return NaN;
	        }

	        that = cloneWithOffset(input, this);

	        if (!that.isValid()) {
	            return NaN;
	        }

	        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

	        units = normalizeUnits(units);

	        if (units === 'year' || units === 'month' || units === 'quarter') {
	            output = monthDiff(this, that);
	            if (units === 'quarter') {
	                output = output / 3;
	            } else if (units === 'year') {
	                output = output / 12;
	            }
	        } else {
	            delta = this - that;
	            output = units === 'second' ? delta / 1e3 : // 1000
	                units === 'minute' ? delta / 6e4 : // 1000 * 60
	                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
	                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
	                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
	                delta;
	        }
	        return asFloat ? output : absFloor(output);
	    }

	    function monthDiff (a, b) {
	        // difference in months
	        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
	            // b is in (anchor - 1 month, anchor + 1 month)
	            anchor = a.clone().add(wholeMonthDiff, 'months'),
	            anchor2, adjust;

	        if (b - anchor < 0) {
	            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor - anchor2);
	        } else {
	            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor2 - anchor);
	        }

	        //check for negative zero, return zero if negative zero
	        return -(wholeMonthDiff + adjust) || 0;
	    }

	    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
	    utils_hooks__hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

	    function toString () {
	        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	    }

	    function moment_format__toISOString () {
	        var m = this.clone().utc();
	        if (0 < m.year() && m.year() <= 9999) {
	            if (isFunction(Date.prototype.toISOString)) {
	                // native implementation is ~50x faster, use it when we can
	                return this.toDate().toISOString();
	            } else {
	                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	            }
	        } else {
	            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	        }
	    }

	    function format (inputString) {
	        if (!inputString) {
	            inputString = this.isUtc() ? utils_hooks__hooks.defaultFormatUtc : utils_hooks__hooks.defaultFormat;
	        }
	        var output = formatMoment(this, inputString);
	        return this.localeData().postformat(output);
	    }

	    function from (time, withoutSuffix) {
	        if (this.isValid() &&
	                ((isMoment(time) && time.isValid()) ||
	                 local__createLocal(time).isValid())) {
	            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
	        } else {
	            return this.localeData().invalidDate();
	        }
	    }

	    function fromNow (withoutSuffix) {
	        return this.from(local__createLocal(), withoutSuffix);
	    }

	    function to (time, withoutSuffix) {
	        if (this.isValid() &&
	                ((isMoment(time) && time.isValid()) ||
	                 local__createLocal(time).isValid())) {
	            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
	        } else {
	            return this.localeData().invalidDate();
	        }
	    }

	    function toNow (withoutSuffix) {
	        return this.to(local__createLocal(), withoutSuffix);
	    }

	    // If passed a locale key, it will set the locale for this
	    // instance.  Otherwise, it will return the locale configuration
	    // variables for this instance.
	    function locale (key) {
	        var newLocaleData;

	        if (key === undefined) {
	            return this._locale._abbr;
	        } else {
	            newLocaleData = locale_locales__getLocale(key);
	            if (newLocaleData != null) {
	                this._locale = newLocaleData;
	            }
	            return this;
	        }
	    }

	    var lang = deprecate(
	        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
	        function (key) {
	            if (key === undefined) {
	                return this.localeData();
	            } else {
	                return this.locale(key);
	            }
	        }
	    );

	    function localeData () {
	        return this._locale;
	    }

	    function startOf (units) {
	        units = normalizeUnits(units);
	        // the following switch intentionally omits break keywords
	        // to utilize falling through the cases.
	        switch (units) {
	            case 'year':
	                this.month(0);
	                /* falls through */
	            case 'quarter':
	            case 'month':
	                this.date(1);
	                /* falls through */
	            case 'week':
	            case 'isoWeek':
	            case 'day':
	            case 'date':
	                this.hours(0);
	                /* falls through */
	            case 'hour':
	                this.minutes(0);
	                /* falls through */
	            case 'minute':
	                this.seconds(0);
	                /* falls through */
	            case 'second':
	                this.milliseconds(0);
	        }

	        // weeks are a special case
	        if (units === 'week') {
	            this.weekday(0);
	        }
	        if (units === 'isoWeek') {
	            this.isoWeekday(1);
	        }

	        // quarters are also special
	        if (units === 'quarter') {
	            this.month(Math.floor(this.month() / 3) * 3);
	        }

	        return this;
	    }

	    function endOf (units) {
	        units = normalizeUnits(units);
	        if (units === undefined || units === 'millisecond') {
	            return this;
	        }

	        // 'date' is an alias for 'day', so it should be considered as such.
	        if (units === 'date') {
	            units = 'day';
	        }

	        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
	    }

	    function to_type__valueOf () {
	        return this._d.valueOf() - ((this._offset || 0) * 60000);
	    }

	    function unix () {
	        return Math.floor(this.valueOf() / 1000);
	    }

	    function toDate () {
	        return new Date(this.valueOf());
	    }

	    function toArray () {
	        var m = this;
	        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
	    }

	    function toObject () {
	        var m = this;
	        return {
	            years: m.year(),
	            months: m.month(),
	            date: m.date(),
	            hours: m.hours(),
	            minutes: m.minutes(),
	            seconds: m.seconds(),
	            milliseconds: m.milliseconds()
	        };
	    }

	    function toJSON () {
	        // new Date(NaN).toJSON() === null
	        return this.isValid() ? this.toISOString() : null;
	    }

	    function moment_valid__isValid () {
	        return valid__isValid(this);
	    }

	    function parsingFlags () {
	        return extend({}, getParsingFlags(this));
	    }

	    function invalidAt () {
	        return getParsingFlags(this).overflow;
	    }

	    function creationData() {
	        return {
	            input: this._i,
	            format: this._f,
	            locale: this._locale,
	            isUTC: this._isUTC,
	            strict: this._strict
	        };
	    }

	    // FORMATTING

	    addFormatToken(0, ['gg', 2], 0, function () {
	        return this.weekYear() % 100;
	    });

	    addFormatToken(0, ['GG', 2], 0, function () {
	        return this.isoWeekYear() % 100;
	    });

	    function addWeekYearFormatToken (token, getter) {
	        addFormatToken(0, [token, token.length], 0, getter);
	    }

	    addWeekYearFormatToken('gggg',     'weekYear');
	    addWeekYearFormatToken('ggggg',    'weekYear');
	    addWeekYearFormatToken('GGGG',  'isoWeekYear');
	    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

	    // ALIASES

	    addUnitAlias('weekYear', 'gg');
	    addUnitAlias('isoWeekYear', 'GG');

	    // PRIORITY

	    addUnitPriority('weekYear', 1);
	    addUnitPriority('isoWeekYear', 1);


	    // PARSING

	    addRegexToken('G',      matchSigned);
	    addRegexToken('g',      matchSigned);
	    addRegexToken('GG',     match1to2, match2);
	    addRegexToken('gg',     match1to2, match2);
	    addRegexToken('GGGG',   match1to4, match4);
	    addRegexToken('gggg',   match1to4, match4);
	    addRegexToken('GGGGG',  match1to6, match6);
	    addRegexToken('ggggg',  match1to6, match6);

	    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
	        week[token.substr(0, 2)] = toInt(input);
	    });

	    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
	        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });

	    // MOMENTS

	    function getSetWeekYear (input) {
	        return getSetWeekYearHelper.call(this,
	                input,
	                this.week(),
	                this.weekday(),
	                this.localeData()._week.dow,
	                this.localeData()._week.doy);
	    }

	    function getSetISOWeekYear (input) {
	        return getSetWeekYearHelper.call(this,
	                input, this.isoWeek(), this.isoWeekday(), 1, 4);
	    }

	    function getISOWeeksInYear () {
	        return weeksInYear(this.year(), 1, 4);
	    }

	    function getWeeksInYear () {
	        var weekInfo = this.localeData()._week;
	        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	    }

	    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
	        var weeksTarget;
	        if (input == null) {
	            return weekOfYear(this, dow, doy).year;
	        } else {
	            weeksTarget = weeksInYear(input, dow, doy);
	            if (week > weeksTarget) {
	                week = weeksTarget;
	            }
	            return setWeekAll.call(this, input, week, weekday, dow, doy);
	        }
	    }

	    function setWeekAll(weekYear, week, weekday, dow, doy) {
	        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
	            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

	        this.year(date.getUTCFullYear());
	        this.month(date.getUTCMonth());
	        this.date(date.getUTCDate());
	        return this;
	    }

	    // FORMATTING

	    addFormatToken('Q', 0, 'Qo', 'quarter');

	    // ALIASES

	    addUnitAlias('quarter', 'Q');

	    // PRIORITY

	    addUnitPriority('quarter', 7);

	    // PARSING

	    addRegexToken('Q', match1);
	    addParseToken('Q', function (input, array) {
	        array[MONTH] = (toInt(input) - 1) * 3;
	    });

	    // MOMENTS

	    function getSetQuarter (input) {
	        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
	    }

	    // FORMATTING

	    addFormatToken('D', ['DD', 2], 'Do', 'date');

	    // ALIASES

	    addUnitAlias('date', 'D');

	    // PRIOROITY
	    addUnitPriority('date', 9);

	    // PARSING

	    addRegexToken('D',  match1to2);
	    addRegexToken('DD', match1to2, match2);
	    addRegexToken('Do', function (isStrict, locale) {
	        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
	    });

	    addParseToken(['D', 'DD'], DATE);
	    addParseToken('Do', function (input, array) {
	        array[DATE] = toInt(input.match(match1to2)[0], 10);
	    });

	    // MOMENTS

	    var getSetDayOfMonth = makeGetSet('Date', true);

	    // FORMATTING

	    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

	    // ALIASES

	    addUnitAlias('dayOfYear', 'DDD');

	    // PRIORITY
	    addUnitPriority('dayOfYear', 4);

	    // PARSING

	    addRegexToken('DDD',  match1to3);
	    addRegexToken('DDDD', match3);
	    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
	        config._dayOfYear = toInt(input);
	    });

	    // HELPERS

	    // MOMENTS

	    function getSetDayOfYear (input) {
	        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
	        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
	    }

	    // FORMATTING

	    addFormatToken('m', ['mm', 2], 0, 'minute');

	    // ALIASES

	    addUnitAlias('minute', 'm');

	    // PRIORITY

	    addUnitPriority('minute', 14);

	    // PARSING

	    addRegexToken('m',  match1to2);
	    addRegexToken('mm', match1to2, match2);
	    addParseToken(['m', 'mm'], MINUTE);

	    // MOMENTS

	    var getSetMinute = makeGetSet('Minutes', false);

	    // FORMATTING

	    addFormatToken('s', ['ss', 2], 0, 'second');

	    // ALIASES

	    addUnitAlias('second', 's');

	    // PRIORITY

	    addUnitPriority('second', 15);

	    // PARSING

	    addRegexToken('s',  match1to2);
	    addRegexToken('ss', match1to2, match2);
	    addParseToken(['s', 'ss'], SECOND);

	    // MOMENTS

	    var getSetSecond = makeGetSet('Seconds', false);

	    // FORMATTING

	    addFormatToken('S', 0, 0, function () {
	        return ~~(this.millisecond() / 100);
	    });

	    addFormatToken(0, ['SS', 2], 0, function () {
	        return ~~(this.millisecond() / 10);
	    });

	    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
	    addFormatToken(0, ['SSSS', 4], 0, function () {
	        return this.millisecond() * 10;
	    });
	    addFormatToken(0, ['SSSSS', 5], 0, function () {
	        return this.millisecond() * 100;
	    });
	    addFormatToken(0, ['SSSSSS', 6], 0, function () {
	        return this.millisecond() * 1000;
	    });
	    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
	        return this.millisecond() * 10000;
	    });
	    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
	        return this.millisecond() * 100000;
	    });
	    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
	        return this.millisecond() * 1000000;
	    });


	    // ALIASES

	    addUnitAlias('millisecond', 'ms');

	    // PRIORITY

	    addUnitPriority('millisecond', 16);

	    // PARSING

	    addRegexToken('S',    match1to3, match1);
	    addRegexToken('SS',   match1to3, match2);
	    addRegexToken('SSS',  match1to3, match3);

	    var token;
	    for (token = 'SSSS'; token.length <= 9; token += 'S') {
	        addRegexToken(token, matchUnsigned);
	    }

	    function parseMs(input, array) {
	        array[MILLISECOND] = toInt(('0.' + input) * 1000);
	    }

	    for (token = 'S'; token.length <= 9; token += 'S') {
	        addParseToken(token, parseMs);
	    }
	    // MOMENTS

	    var getSetMillisecond = makeGetSet('Milliseconds', false);

	    // FORMATTING

	    addFormatToken('z',  0, 0, 'zoneAbbr');
	    addFormatToken('zz', 0, 0, 'zoneName');

	    // MOMENTS

	    function getZoneAbbr () {
	        return this._isUTC ? 'UTC' : '';
	    }

	    function getZoneName () {
	        return this._isUTC ? 'Coordinated Universal Time' : '';
	    }

	    var momentPrototype__proto = Moment.prototype;

	    momentPrototype__proto.add               = add_subtract__add;
	    momentPrototype__proto.calendar          = moment_calendar__calendar;
	    momentPrototype__proto.clone             = clone;
	    momentPrototype__proto.diff              = diff;
	    momentPrototype__proto.endOf             = endOf;
	    momentPrototype__proto.format            = format;
	    momentPrototype__proto.from              = from;
	    momentPrototype__proto.fromNow           = fromNow;
	    momentPrototype__proto.to                = to;
	    momentPrototype__proto.toNow             = toNow;
	    momentPrototype__proto.get               = stringGet;
	    momentPrototype__proto.invalidAt         = invalidAt;
	    momentPrototype__proto.isAfter           = isAfter;
	    momentPrototype__proto.isBefore          = isBefore;
	    momentPrototype__proto.isBetween         = isBetween;
	    momentPrototype__proto.isSame            = isSame;
	    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
	    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
	    momentPrototype__proto.isValid           = moment_valid__isValid;
	    momentPrototype__proto.lang              = lang;
	    momentPrototype__proto.locale            = locale;
	    momentPrototype__proto.localeData        = localeData;
	    momentPrototype__proto.max               = prototypeMax;
	    momentPrototype__proto.min               = prototypeMin;
	    momentPrototype__proto.parsingFlags      = parsingFlags;
	    momentPrototype__proto.set               = stringSet;
	    momentPrototype__proto.startOf           = startOf;
	    momentPrototype__proto.subtract          = add_subtract__subtract;
	    momentPrototype__proto.toArray           = toArray;
	    momentPrototype__proto.toObject          = toObject;
	    momentPrototype__proto.toDate            = toDate;
	    momentPrototype__proto.toISOString       = moment_format__toISOString;
	    momentPrototype__proto.toJSON            = toJSON;
	    momentPrototype__proto.toString          = toString;
	    momentPrototype__proto.unix              = unix;
	    momentPrototype__proto.valueOf           = to_type__valueOf;
	    momentPrototype__proto.creationData      = creationData;

	    // Year
	    momentPrototype__proto.year       = getSetYear;
	    momentPrototype__proto.isLeapYear = getIsLeapYear;

	    // Week Year
	    momentPrototype__proto.weekYear    = getSetWeekYear;
	    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

	    // Quarter
	    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

	    // Month
	    momentPrototype__proto.month       = getSetMonth;
	    momentPrototype__proto.daysInMonth = getDaysInMonth;

	    // Week
	    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
	    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
	    momentPrototype__proto.weeksInYear    = getWeeksInYear;
	    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

	    // Day
	    momentPrototype__proto.date       = getSetDayOfMonth;
	    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
	    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
	    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
	    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

	    // Hour
	    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

	    // Minute
	    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

	    // Second
	    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

	    // Millisecond
	    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

	    // Offset
	    momentPrototype__proto.utcOffset            = getSetOffset;
	    momentPrototype__proto.utc                  = setOffsetToUTC;
	    momentPrototype__proto.local                = setOffsetToLocal;
	    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
	    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
	    momentPrototype__proto.isDST                = isDaylightSavingTime;
	    momentPrototype__proto.isLocal              = isLocal;
	    momentPrototype__proto.isUtcOffset          = isUtcOffset;
	    momentPrototype__proto.isUtc                = isUtc;
	    momentPrototype__proto.isUTC                = isUtc;

	    // Timezone
	    momentPrototype__proto.zoneAbbr = getZoneAbbr;
	    momentPrototype__proto.zoneName = getZoneName;

	    // Deprecations
	    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
	    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
	    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
	    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
	    momentPrototype__proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

	    var momentPrototype = momentPrototype__proto;

	    function moment__createUnix (input) {
	        return local__createLocal(input * 1000);
	    }

	    function moment__createInZone () {
	        return local__createLocal.apply(null, arguments).parseZone();
	    }

	    function preParsePostFormat (string) {
	        return string;
	    }

	    var prototype__proto = Locale.prototype;

	    prototype__proto.calendar        = locale_calendar__calendar;
	    prototype__proto.longDateFormat  = longDateFormat;
	    prototype__proto.invalidDate     = invalidDate;
	    prototype__proto.ordinal         = ordinal;
	    prototype__proto.preparse        = preParsePostFormat;
	    prototype__proto.postformat      = preParsePostFormat;
	    prototype__proto.relativeTime    = relative__relativeTime;
	    prototype__proto.pastFuture      = pastFuture;
	    prototype__proto.set             = locale_set__set;

	    // Month
	    prototype__proto.months            =        localeMonths;
	    prototype__proto.monthsShort       =        localeMonthsShort;
	    prototype__proto.monthsParse       =        localeMonthsParse;
	    prototype__proto.monthsRegex       = monthsRegex;
	    prototype__proto.monthsShortRegex  = monthsShortRegex;

	    // Week
	    prototype__proto.week = localeWeek;
	    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
	    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

	    // Day of Week
	    prototype__proto.weekdays       =        localeWeekdays;
	    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
	    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
	    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

	    prototype__proto.weekdaysRegex       =        weekdaysRegex;
	    prototype__proto.weekdaysShortRegex  =        weekdaysShortRegex;
	    prototype__proto.weekdaysMinRegex    =        weekdaysMinRegex;

	    // Hours
	    prototype__proto.isPM = localeIsPM;
	    prototype__proto.meridiem = localeMeridiem;

	    function lists__get (format, index, field, setter) {
	        var locale = locale_locales__getLocale();
	        var utc = create_utc__createUTC().set(setter, index);
	        return locale[field](utc, format);
	    }

	    function listMonthsImpl (format, index, field) {
	        if (typeof format === 'number') {
	            index = format;
	            format = undefined;
	        }

	        format = format || '';

	        if (index != null) {
	            return lists__get(format, index, field, 'month');
	        }

	        var i;
	        var out = [];
	        for (i = 0; i < 12; i++) {
	            out[i] = lists__get(format, i, field, 'month');
	        }
	        return out;
	    }

	    // ()
	    // (5)
	    // (fmt, 5)
	    // (fmt)
	    // (true)
	    // (true, 5)
	    // (true, fmt, 5)
	    // (true, fmt)
	    function listWeekdaysImpl (localeSorted, format, index, field) {
	        if (typeof localeSorted === 'boolean') {
	            if (typeof format === 'number') {
	                index = format;
	                format = undefined;
	            }

	            format = format || '';
	        } else {
	            format = localeSorted;
	            index = format;
	            localeSorted = false;

	            if (typeof format === 'number') {
	                index = format;
	                format = undefined;
	            }

	            format = format || '';
	        }

	        var locale = locale_locales__getLocale(),
	            shift = localeSorted ? locale._week.dow : 0;

	        if (index != null) {
	            return lists__get(format, (index + shift) % 7, field, 'day');
	        }

	        var i;
	        var out = [];
	        for (i = 0; i < 7; i++) {
	            out[i] = lists__get(format, (i + shift) % 7, field, 'day');
	        }
	        return out;
	    }

	    function lists__listMonths (format, index) {
	        return listMonthsImpl(format, index, 'months');
	    }

	    function lists__listMonthsShort (format, index) {
	        return listMonthsImpl(format, index, 'monthsShort');
	    }

	    function lists__listWeekdays (localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
	    }

	    function lists__listWeekdaysShort (localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
	    }

	    function lists__listWeekdaysMin (localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
	    }

	    locale_locales__getSetGlobalLocale('en', {
	        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (toInt(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        }
	    });

	    // Side effect imports
	    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
	    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

	    var mathAbs = Math.abs;

	    function duration_abs__abs () {
	        var data           = this._data;

	        this._milliseconds = mathAbs(this._milliseconds);
	        this._days         = mathAbs(this._days);
	        this._months       = mathAbs(this._months);

	        data.milliseconds  = mathAbs(data.milliseconds);
	        data.seconds       = mathAbs(data.seconds);
	        data.minutes       = mathAbs(data.minutes);
	        data.hours         = mathAbs(data.hours);
	        data.months        = mathAbs(data.months);
	        data.years         = mathAbs(data.years);

	        return this;
	    }

	    function duration_add_subtract__addSubtract (duration, input, value, direction) {
	        var other = create__createDuration(input, value);

	        duration._milliseconds += direction * other._milliseconds;
	        duration._days         += direction * other._days;
	        duration._months       += direction * other._months;

	        return duration._bubble();
	    }

	    // supports only 2.0-style add(1, 's') or add(duration)
	    function duration_add_subtract__add (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, 1);
	    }

	    // supports only 2.0-style subtract(1, 's') or subtract(duration)
	    function duration_add_subtract__subtract (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, -1);
	    }

	    function absCeil (number) {
	        if (number < 0) {
	            return Math.floor(number);
	        } else {
	            return Math.ceil(number);
	        }
	    }

	    function bubble () {
	        var milliseconds = this._milliseconds;
	        var days         = this._days;
	        var months       = this._months;
	        var data         = this._data;
	        var seconds, minutes, hours, years, monthsFromDays;

	        // if we have a mix of positive and negative values, bubble down first
	        // check: https://github.com/moment/moment/issues/2166
	        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
	                (milliseconds <= 0 && days <= 0 && months <= 0))) {
	            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
	            days = 0;
	            months = 0;
	        }

	        // The following code bubbles up values, see the tests for
	        // examples of what that means.
	        data.milliseconds = milliseconds % 1000;

	        seconds           = absFloor(milliseconds / 1000);
	        data.seconds      = seconds % 60;

	        minutes           = absFloor(seconds / 60);
	        data.minutes      = minutes % 60;

	        hours             = absFloor(minutes / 60);
	        data.hours        = hours % 24;

	        days += absFloor(hours / 24);

	        // convert days to months
	        monthsFromDays = absFloor(daysToMonths(days));
	        months += monthsFromDays;
	        days -= absCeil(monthsToDays(monthsFromDays));

	        // 12 months -> 1 year
	        years = absFloor(months / 12);
	        months %= 12;

	        data.days   = days;
	        data.months = months;
	        data.years  = years;

	        return this;
	    }

	    function daysToMonths (days) {
	        // 400 years have 146097 days (taking into account leap year rules)
	        // 400 years have 12 months === 4800
	        return days * 4800 / 146097;
	    }

	    function monthsToDays (months) {
	        // the reverse of daysToMonths
	        return months * 146097 / 4800;
	    }

	    function as (units) {
	        var days;
	        var months;
	        var milliseconds = this._milliseconds;

	        units = normalizeUnits(units);

	        if (units === 'month' || units === 'year') {
	            days   = this._days   + milliseconds / 864e5;
	            months = this._months + daysToMonths(days);
	            return units === 'month' ? months : months / 12;
	        } else {
	            // handle milliseconds separately because of floating point math errors (issue #1867)
	            days = this._days + Math.round(monthsToDays(this._months));
	            switch (units) {
	                case 'week'   : return days / 7     + milliseconds / 6048e5;
	                case 'day'    : return days         + milliseconds / 864e5;
	                case 'hour'   : return days * 24    + milliseconds / 36e5;
	                case 'minute' : return days * 1440  + milliseconds / 6e4;
	                case 'second' : return days * 86400 + milliseconds / 1000;
	                // Math.floor prevents floating point math errors here
	                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
	                default: throw new Error('Unknown unit ' + units);
	            }
	        }
	    }

	    // TODO: Use this.as('ms')?
	    function duration_as__valueOf () {
	        return (
	            this._milliseconds +
	            this._days * 864e5 +
	            (this._months % 12) * 2592e6 +
	            toInt(this._months / 12) * 31536e6
	        );
	    }

	    function makeAs (alias) {
	        return function () {
	            return this.as(alias);
	        };
	    }

	    var asMilliseconds = makeAs('ms');
	    var asSeconds      = makeAs('s');
	    var asMinutes      = makeAs('m');
	    var asHours        = makeAs('h');
	    var asDays         = makeAs('d');
	    var asWeeks        = makeAs('w');
	    var asMonths       = makeAs('M');
	    var asYears        = makeAs('y');

	    function duration_get__get (units) {
	        units = normalizeUnits(units);
	        return this[units + 's']();
	    }

	    function makeGetter(name) {
	        return function () {
	            return this._data[name];
	        };
	    }

	    var milliseconds = makeGetter('milliseconds');
	    var seconds      = makeGetter('seconds');
	    var minutes      = makeGetter('minutes');
	    var hours        = makeGetter('hours');
	    var days         = makeGetter('days');
	    var months       = makeGetter('months');
	    var years        = makeGetter('years');

	    function weeks () {
	        return absFloor(this.days() / 7);
	    }

	    var round = Math.round;
	    var thresholds = {
	        s: 45,  // seconds to minute
	        m: 45,  // minutes to hour
	        h: 22,  // hours to day
	        d: 26,  // days to month
	        M: 11   // months to year
	    };

	    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
	    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
	        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	    }

	    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
	        var duration = create__createDuration(posNegDuration).abs();
	        var seconds  = round(duration.as('s'));
	        var minutes  = round(duration.as('m'));
	        var hours    = round(duration.as('h'));
	        var days     = round(duration.as('d'));
	        var months   = round(duration.as('M'));
	        var years    = round(duration.as('y'));

	        var a = seconds < thresholds.s && ['s', seconds]  ||
	                minutes <= 1           && ['m']           ||
	                minutes < thresholds.m && ['mm', minutes] ||
	                hours   <= 1           && ['h']           ||
	                hours   < thresholds.h && ['hh', hours]   ||
	                days    <= 1           && ['d']           ||
	                days    < thresholds.d && ['dd', days]    ||
	                months  <= 1           && ['M']           ||
	                months  < thresholds.M && ['MM', months]  ||
	                years   <= 1           && ['y']           || ['yy', years];

	        a[2] = withoutSuffix;
	        a[3] = +posNegDuration > 0;
	        a[4] = locale;
	        return substituteTimeAgo.apply(null, a);
	    }

	    // This function allows you to set the rounding function for relative time strings
	    function duration_humanize__getSetRelativeTimeRounding (roundingFunction) {
	        if (roundingFunction === undefined) {
	            return round;
	        }
	        if (typeof(roundingFunction) === 'function') {
	            round = roundingFunction;
	            return true;
	        }
	        return false;
	    }

	    // This function allows you to set a threshold for relative time strings
	    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
	        if (thresholds[threshold] === undefined) {
	            return false;
	        }
	        if (limit === undefined) {
	            return thresholds[threshold];
	        }
	        thresholds[threshold] = limit;
	        return true;
	    }

	    function humanize (withSuffix) {
	        var locale = this.localeData();
	        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

	        if (withSuffix) {
	            output = locale.pastFuture(+this, output);
	        }

	        return locale.postformat(output);
	    }

	    var iso_string__abs = Math.abs;

	    function iso_string__toISOString() {
	        // for ISO strings we do not use the normal bubbling rules:
	        //  * milliseconds bubble up until they become hours
	        //  * days do not bubble at all
	        //  * months bubble up until they become years
	        // This is because there is no context-free conversion between hours and days
	        // (think of clock changes)
	        // and also not between days and months (28-31 days per month)
	        var seconds = iso_string__abs(this._milliseconds) / 1000;
	        var days         = iso_string__abs(this._days);
	        var months       = iso_string__abs(this._months);
	        var minutes, hours, years;

	        // 3600 seconds -> 60 minutes -> 1 hour
	        minutes           = absFloor(seconds / 60);
	        hours             = absFloor(minutes / 60);
	        seconds %= 60;
	        minutes %= 60;

	        // 12 months -> 1 year
	        years  = absFloor(months / 12);
	        months %= 12;


	        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
	        var Y = years;
	        var M = months;
	        var D = days;
	        var h = hours;
	        var m = minutes;
	        var s = seconds;
	        var total = this.asSeconds();

	        if (!total) {
	            // this is the same as C#'s (Noda) and python (isodate)...
	            // but not other JS (goog.date)
	            return 'P0D';
	        }

	        return (total < 0 ? '-' : '') +
	            'P' +
	            (Y ? Y + 'Y' : '') +
	            (M ? M + 'M' : '') +
	            (D ? D + 'D' : '') +
	            ((h || m || s) ? 'T' : '') +
	            (h ? h + 'H' : '') +
	            (m ? m + 'M' : '') +
	            (s ? s + 'S' : '');
	    }

	    var duration_prototype__proto = Duration.prototype;

	    duration_prototype__proto.abs            = duration_abs__abs;
	    duration_prototype__proto.add            = duration_add_subtract__add;
	    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
	    duration_prototype__proto.as             = as;
	    duration_prototype__proto.asMilliseconds = asMilliseconds;
	    duration_prototype__proto.asSeconds      = asSeconds;
	    duration_prototype__proto.asMinutes      = asMinutes;
	    duration_prototype__proto.asHours        = asHours;
	    duration_prototype__proto.asDays         = asDays;
	    duration_prototype__proto.asWeeks        = asWeeks;
	    duration_prototype__proto.asMonths       = asMonths;
	    duration_prototype__proto.asYears        = asYears;
	    duration_prototype__proto.valueOf        = duration_as__valueOf;
	    duration_prototype__proto._bubble        = bubble;
	    duration_prototype__proto.get            = duration_get__get;
	    duration_prototype__proto.milliseconds   = milliseconds;
	    duration_prototype__proto.seconds        = seconds;
	    duration_prototype__proto.minutes        = minutes;
	    duration_prototype__proto.hours          = hours;
	    duration_prototype__proto.days           = days;
	    duration_prototype__proto.weeks          = weeks;
	    duration_prototype__proto.months         = months;
	    duration_prototype__proto.years          = years;
	    duration_prototype__proto.humanize       = humanize;
	    duration_prototype__proto.toISOString    = iso_string__toISOString;
	    duration_prototype__proto.toString       = iso_string__toISOString;
	    duration_prototype__proto.toJSON         = iso_string__toISOString;
	    duration_prototype__proto.locale         = locale;
	    duration_prototype__proto.localeData     = localeData;

	    // Deprecations
	    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
	    duration_prototype__proto.lang = lang;

	    // Side effect imports

	    // FORMATTING

	    addFormatToken('X', 0, 0, 'unix');
	    addFormatToken('x', 0, 0, 'valueOf');

	    // PARSING

	    addRegexToken('x', matchSigned);
	    addRegexToken('X', matchTimestamp);
	    addParseToken('X', function (input, array, config) {
	        config._d = new Date(parseFloat(input, 10) * 1000);
	    });
	    addParseToken('x', function (input, array, config) {
	        config._d = new Date(toInt(input));
	    });

	    // Side effect imports


	    utils_hooks__hooks.version = '2.15.2';

	    setHookCallback(local__createLocal);

	    utils_hooks__hooks.fn                    = momentPrototype;
	    utils_hooks__hooks.min                   = min;
	    utils_hooks__hooks.max                   = max;
	    utils_hooks__hooks.now                   = now;
	    utils_hooks__hooks.utc                   = create_utc__createUTC;
	    utils_hooks__hooks.unix                  = moment__createUnix;
	    utils_hooks__hooks.months                = lists__listMonths;
	    utils_hooks__hooks.isDate                = isDate;
	    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
	    utils_hooks__hooks.invalid               = valid__createInvalid;
	    utils_hooks__hooks.duration              = create__createDuration;
	    utils_hooks__hooks.isMoment              = isMoment;
	    utils_hooks__hooks.weekdays              = lists__listWeekdays;
	    utils_hooks__hooks.parseZone             = moment__createInZone;
	    utils_hooks__hooks.localeData            = locale_locales__getLocale;
	    utils_hooks__hooks.isDuration            = isDuration;
	    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
	    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
	    utils_hooks__hooks.defineLocale          = defineLocale;
	    utils_hooks__hooks.updateLocale          = updateLocale;
	    utils_hooks__hooks.locales               = locale_locales__listLocales;
	    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
	    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
	    utils_hooks__hooks.relativeTimeRounding = duration_humanize__getSetRelativeTimeRounding;
	    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
	    utils_hooks__hooks.calendarFormat        = getCalendarFormat;
	    utils_hooks__hooks.prototype             = momentPrototype;

	    var _moment = utils_hooks__hooks;

	    return _moment;

	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)(module)))

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./af": 34,
		"./af.js": 34,
		"./ar": 35,
		"./ar-ly": 36,
		"./ar-ly.js": 36,
		"./ar-ma": 37,
		"./ar-ma.js": 37,
		"./ar-sa": 38,
		"./ar-sa.js": 38,
		"./ar-tn": 39,
		"./ar-tn.js": 39,
		"./ar.js": 35,
		"./az": 40,
		"./az.js": 40,
		"./be": 41,
		"./be.js": 41,
		"./bg": 42,
		"./bg.js": 42,
		"./bn": 43,
		"./bn.js": 43,
		"./bo": 44,
		"./bo.js": 44,
		"./br": 45,
		"./br.js": 45,
		"./bs": 46,
		"./bs.js": 46,
		"./ca": 47,
		"./ca.js": 47,
		"./cs": 48,
		"./cs.js": 48,
		"./cv": 49,
		"./cv.js": 49,
		"./cy": 50,
		"./cy.js": 50,
		"./da": 51,
		"./da.js": 51,
		"./de": 52,
		"./de-at": 53,
		"./de-at.js": 53,
		"./de.js": 52,
		"./dv": 54,
		"./dv.js": 54,
		"./el": 55,
		"./el.js": 55,
		"./en-au": 56,
		"./en-au.js": 56,
		"./en-ca": 57,
		"./en-ca.js": 57,
		"./en-gb": 58,
		"./en-gb.js": 58,
		"./en-ie": 59,
		"./en-ie.js": 59,
		"./en-nz": 60,
		"./en-nz.js": 60,
		"./eo": 61,
		"./eo.js": 61,
		"./es": 62,
		"./es-do": 63,
		"./es-do.js": 63,
		"./es.js": 62,
		"./et": 64,
		"./et.js": 64,
		"./eu": 65,
		"./eu.js": 65,
		"./fa": 66,
		"./fa.js": 66,
		"./fi": 67,
		"./fi.js": 67,
		"./fo": 68,
		"./fo.js": 68,
		"./fr": 69,
		"./fr-ca": 70,
		"./fr-ca.js": 70,
		"./fr-ch": 71,
		"./fr-ch.js": 71,
		"./fr.js": 69,
		"./fy": 72,
		"./fy.js": 72,
		"./gd": 73,
		"./gd.js": 73,
		"./gl": 74,
		"./gl.js": 74,
		"./he": 75,
		"./he.js": 75,
		"./hi": 76,
		"./hi.js": 76,
		"./hr": 77,
		"./hr.js": 77,
		"./hu": 78,
		"./hu.js": 78,
		"./hy-am": 79,
		"./hy-am.js": 79,
		"./id": 80,
		"./id.js": 80,
		"./is": 81,
		"./is.js": 81,
		"./it": 82,
		"./it.js": 82,
		"./ja": 83,
		"./ja.js": 83,
		"./jv": 84,
		"./jv.js": 84,
		"./ka": 85,
		"./ka.js": 85,
		"./kk": 86,
		"./kk.js": 86,
		"./km": 87,
		"./km.js": 87,
		"./ko": 88,
		"./ko.js": 88,
		"./ky": 89,
		"./ky.js": 89,
		"./lb": 90,
		"./lb.js": 90,
		"./lo": 91,
		"./lo.js": 91,
		"./lt": 92,
		"./lt.js": 92,
		"./lv": 93,
		"./lv.js": 93,
		"./me": 94,
		"./me.js": 94,
		"./mi": 95,
		"./mi.js": 95,
		"./mk": 96,
		"./mk.js": 96,
		"./ml": 97,
		"./ml.js": 97,
		"./mr": 98,
		"./mr.js": 98,
		"./ms": 99,
		"./ms-my": 100,
		"./ms-my.js": 100,
		"./ms.js": 99,
		"./my": 101,
		"./my.js": 101,
		"./nb": 102,
		"./nb.js": 102,
		"./ne": 103,
		"./ne.js": 103,
		"./nl": 104,
		"./nl.js": 104,
		"./nn": 105,
		"./nn.js": 105,
		"./pa-in": 106,
		"./pa-in.js": 106,
		"./pl": 107,
		"./pl.js": 107,
		"./pt": 108,
		"./pt-br": 109,
		"./pt-br.js": 109,
		"./pt.js": 108,
		"./ro": 110,
		"./ro.js": 110,
		"./ru": 111,
		"./ru.js": 111,
		"./se": 112,
		"./se.js": 112,
		"./si": 113,
		"./si.js": 113,
		"./sk": 114,
		"./sk.js": 114,
		"./sl": 115,
		"./sl.js": 115,
		"./sq": 116,
		"./sq.js": 116,
		"./sr": 117,
		"./sr-cyrl": 118,
		"./sr-cyrl.js": 118,
		"./sr.js": 117,
		"./ss": 119,
		"./ss.js": 119,
		"./sv": 120,
		"./sv.js": 120,
		"./sw": 121,
		"./sw.js": 121,
		"./ta": 122,
		"./ta.js": 122,
		"./te": 123,
		"./te.js": 123,
		"./th": 124,
		"./th.js": 124,
		"./tl-ph": 125,
		"./tl-ph.js": 125,
		"./tlh": 126,
		"./tlh.js": 126,
		"./tr": 127,
		"./tr.js": 127,
		"./tzl": 128,
		"./tzl.js": 128,
		"./tzm": 129,
		"./tzm-latn": 130,
		"./tzm-latn.js": 130,
		"./tzm.js": 129,
		"./uk": 131,
		"./uk.js": 131,
		"./uz": 132,
		"./uz.js": 132,
		"./vi": 133,
		"./vi.js": 133,
		"./x-pseudo": 134,
		"./x-pseudo.js": 134,
		"./zh-cn": 135,
		"./zh-cn.js": 135,
		"./zh-hk": 136,
		"./zh-hk.js": 136,
		"./zh-tw": 137,
		"./zh-tw.js": 137
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 33;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Afrikaans [af]
	//! author : Werner Mollentze : https://github.com/wernerm

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var af = moment.defineLocale('af', {
	        months : 'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split('_'),
	        monthsShort : 'Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
	        weekdays : 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
	        weekdaysShort : 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
	        weekdaysMin : 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
	        meridiemParse: /vm|nm/i,
	        isPM : function (input) {
	            return /^nm$/i.test(input);
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 12) {
	                return isLower ? 'vm' : 'VM';
	            } else {
	                return isLower ? 'nm' : 'NM';
	            }
	        },
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Vandag om] LT',
	            nextDay : '[Môre om] LT',
	            nextWeek : 'dddd [om] LT',
	            lastDay : '[Gister om] LT',
	            lastWeek : '[Laas] dddd [om] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'oor %s',
	            past : '%s gelede',
	            s : '\'n paar sekondes',
	            m : '\'n minuut',
	            mm : '%d minute',
	            h : '\'n uur',
	            hh : '%d ure',
	            d : '\'n dag',
	            dd : '%d dae',
	            M : '\'n maand',
	            MM : '%d maande',
	            y : '\'n jaar',
	            yy : '%d jaar'
	        },
	        ordinalParse: /\d{1,2}(ste|de)/,
	        ordinal : function (number) {
	            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de'); // Thanks to Joris Röling : https://github.com/jjupiter
	        },
	        week : {
	            dow : 1, // Maandag is die eerste dag van die week.
	            doy : 4  // Die week wat die 4de Januarie bevat is die eerste week van die jaar.
	        }
	    });

	    return af;

	}));

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Arabic [ar]
	//! author : Abdel Said: https://github.com/abdelsaid
	//! author : Ahmed Elkhatib
	//! author : forabi https://github.com/forabi

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '١',
	        '2': '٢',
	        '3': '٣',
	        '4': '٤',
	        '5': '٥',
	        '6': '٦',
	        '7': '٧',
	        '8': '٨',
	        '9': '٩',
	        '0': '٠'
	    }, numberMap = {
	        '١': '1',
	        '٢': '2',
	        '٣': '3',
	        '٤': '4',
	        '٥': '5',
	        '٦': '6',
	        '٧': '7',
	        '٨': '8',
	        '٩': '9',
	        '٠': '0'
	    }, pluralForm = function (n) {
	        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
	    }, plurals = {
	        s : ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
	        m : ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
	        h : ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
	        d : ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
	        M : ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
	        y : ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
	    }, pluralize = function (u) {
	        return function (number, withoutSuffix, string, isFuture) {
	            var f = pluralForm(number),
	                str = plurals[u][pluralForm(number)];
	            if (f === 2) {
	                str = str[withoutSuffix ? 0 : 1];
	            }
	            return str.replace(/%d/i, number);
	        };
	    }, months = [
	        'كانون الثاني يناير',
	        'شباط فبراير',
	        'آذار مارس',
	        'نيسان أبريل',
	        'أيار مايو',
	        'حزيران يونيو',
	        'تموز يوليو',
	        'آب أغسطس',
	        'أيلول سبتمبر',
	        'تشرين الأول أكتوبر',
	        'تشرين الثاني نوفمبر',
	        'كانون الأول ديسمبر'
	    ];

	    var ar = moment.defineLocale('ar', {
	        months : months,
	        monthsShort : months,
	        weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'D/\u200FM/\u200FYYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /ص|م/,
	        isPM : function (input) {
	            return 'م' === input;
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ص';
	            } else {
	                return 'م';
	            }
	        },
	        calendar : {
	            sameDay: '[اليوم عند الساعة] LT',
	            nextDay: '[غدًا عند الساعة] LT',
	            nextWeek: 'dddd [عند الساعة] LT',
	            lastDay: '[أمس عند الساعة] LT',
	            lastWeek: 'dddd [عند الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'بعد %s',
	            past : 'منذ %s',
	            s : pluralize('s'),
	            m : pluralize('m'),
	            mm : pluralize('m'),
	            h : pluralize('h'),
	            hh : pluralize('h'),
	            d : pluralize('d'),
	            dd : pluralize('d'),
	            M : pluralize('M'),
	            MM : pluralize('M'),
	            y : pluralize('y'),
	            yy : pluralize('y')
	        },
	        preparse: function (string) {
	            return string.replace(/\u200f/g, '').replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
	                return numberMap[match];
	            }).replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            }).replace(/,/g, '،');
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ar;

	}));

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Arabic (Lybia) [ar-ly]
	//! author : Ali Hmer: https://github.com/kikoanis

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '1',
	        '2': '2',
	        '3': '3',
	        '4': '4',
	        '5': '5',
	        '6': '6',
	        '7': '7',
	        '8': '8',
	        '9': '9',
	        '0': '0'
	    }, pluralForm = function (n) {
	        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
	    }, plurals = {
	        s : ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
	        m : ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
	        h : ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
	        d : ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
	        M : ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
	        y : ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
	    }, pluralize = function (u) {
	        return function (number, withoutSuffix, string, isFuture) {
	            var f = pluralForm(number),
	                str = plurals[u][pluralForm(number)];
	            if (f === 2) {
	                str = str[withoutSuffix ? 0 : 1];
	            }
	            return str.replace(/%d/i, number);
	        };
	    }, months = [
	        'يناير',
	        'فبراير',
	        'مارس',
	        'أبريل',
	        'مايو',
	        'يونيو',
	        'يوليو',
	        'أغسطس',
	        'سبتمبر',
	        'أكتوبر',
	        'نوفمبر',
	        'ديسمبر'
	    ];

	    var ar_ly = moment.defineLocale('ar-ly', {
	        months : months,
	        monthsShort : months,
	        weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'D/\u200FM/\u200FYYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /ص|م/,
	        isPM : function (input) {
	            return 'م' === input;
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ص';
	            } else {
	                return 'م';
	            }
	        },
	        calendar : {
	            sameDay: '[اليوم عند الساعة] LT',
	            nextDay: '[غدًا عند الساعة] LT',
	            nextWeek: 'dddd [عند الساعة] LT',
	            lastDay: '[أمس عند الساعة] LT',
	            lastWeek: 'dddd [عند الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'بعد %s',
	            past : 'منذ %s',
	            s : pluralize('s'),
	            m : pluralize('m'),
	            mm : pluralize('m'),
	            h : pluralize('h'),
	            hh : pluralize('h'),
	            d : pluralize('d'),
	            dd : pluralize('d'),
	            M : pluralize('M'),
	            MM : pluralize('M'),
	            y : pluralize('y'),
	            yy : pluralize('y')
	        },
	        preparse: function (string) {
	            return string.replace(/\u200f/g, '').replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            }).replace(/,/g, '،');
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ar_ly;

	}));

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Arabic (Morocco) [ar-ma]
	//! author : ElFadili Yassine : https://github.com/ElFadiliY
	//! author : Abdel Said : https://github.com/abdelsaid

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ar_ma = moment.defineLocale('ar-ma', {
	        months : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
	        monthsShort : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
	        weekdays : 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort : 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[اليوم على الساعة] LT',
	            nextDay: '[غدا على الساعة] LT',
	            nextWeek: 'dddd [على الساعة] LT',
	            lastDay: '[أمس على الساعة] LT',
	            lastWeek: 'dddd [على الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'في %s',
	            past : 'منذ %s',
	            s : 'ثوان',
	            m : 'دقيقة',
	            mm : '%d دقائق',
	            h : 'ساعة',
	            hh : '%d ساعات',
	            d : 'يوم',
	            dd : '%d أيام',
	            M : 'شهر',
	            MM : '%d أشهر',
	            y : 'سنة',
	            yy : '%d سنوات'
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ar_ma;

	}));

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Arabic (Saudi Arabia) [ar-sa]
	//! author : Suhail Alkowaileet : https://github.com/xsoh

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '١',
	        '2': '٢',
	        '3': '٣',
	        '4': '٤',
	        '5': '٥',
	        '6': '٦',
	        '7': '٧',
	        '8': '٨',
	        '9': '٩',
	        '0': '٠'
	    }, numberMap = {
	        '١': '1',
	        '٢': '2',
	        '٣': '3',
	        '٤': '4',
	        '٥': '5',
	        '٦': '6',
	        '٧': '7',
	        '٨': '8',
	        '٩': '9',
	        '٠': '0'
	    };

	    var ar_sa = moment.defineLocale('ar-sa', {
	        months : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        monthsShort : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /ص|م/,
	        isPM : function (input) {
	            return 'م' === input;
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ص';
	            } else {
	                return 'م';
	            }
	        },
	        calendar : {
	            sameDay: '[اليوم على الساعة] LT',
	            nextDay: '[غدا على الساعة] LT',
	            nextWeek: 'dddd [على الساعة] LT',
	            lastDay: '[أمس على الساعة] LT',
	            lastWeek: 'dddd [على الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'في %s',
	            past : 'منذ %s',
	            s : 'ثوان',
	            m : 'دقيقة',
	            mm : '%d دقائق',
	            h : 'ساعة',
	            hh : '%d ساعات',
	            d : 'يوم',
	            dd : '%d أيام',
	            M : 'شهر',
	            MM : '%d أشهر',
	            y : 'سنة',
	            yy : '%d سنوات'
	        },
	        preparse: function (string) {
	            return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
	                return numberMap[match];
	            }).replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            }).replace(/,/g, '،');
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ar_sa;

	}));

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale  :  Arabic (Tunisia) [ar-tn]
	//! author : Nader Toukabri : https://github.com/naderio

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ar_tn = moment.defineLocale('ar-tn', {
	        months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[اليوم على الساعة] LT',
	            nextDay: '[غدا على الساعة] LT',
	            nextWeek: 'dddd [على الساعة] LT',
	            lastDay: '[أمس على الساعة] LT',
	            lastWeek: 'dddd [على الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'في %s',
	            past: 'منذ %s',
	            s: 'ثوان',
	            m: 'دقيقة',
	            mm: '%d دقائق',
	            h: 'ساعة',
	            hh: '%d ساعات',
	            d: 'يوم',
	            dd: '%d أيام',
	            M: 'شهر',
	            MM: '%d أشهر',
	            y: 'سنة',
	            yy: '%d سنوات'
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return ar_tn;

	}));

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Azerbaijani [az]
	//! author : topchiyev : https://github.com/topchiyev

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var suffixes = {
	        1: '-inci',
	        5: '-inci',
	        8: '-inci',
	        70: '-inci',
	        80: '-inci',
	        2: '-nci',
	        7: '-nci',
	        20: '-nci',
	        50: '-nci',
	        3: '-üncü',
	        4: '-üncü',
	        100: '-üncü',
	        6: '-ncı',
	        9: '-uncu',
	        10: '-uncu',
	        30: '-uncu',
	        60: '-ıncı',
	        90: '-ıncı'
	    };

	    var az = moment.defineLocale('az', {
	        months : 'yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr'.split('_'),
	        monthsShort : 'yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek'.split('_'),
	        weekdays : 'Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə'.split('_'),
	        weekdaysShort : 'Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən'.split('_'),
	        weekdaysMin : 'Bz_BE_ÇA_Çə_CA_Cü_Şə'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[bugün saat] LT',
	            nextDay : '[sabah saat] LT',
	            nextWeek : '[gələn həftə] dddd [saat] LT',
	            lastDay : '[dünən] LT',
	            lastWeek : '[keçən həftə] dddd [saat] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s sonra',
	            past : '%s əvvəl',
	            s : 'birneçə saniyyə',
	            m : 'bir dəqiqə',
	            mm : '%d dəqiqə',
	            h : 'bir saat',
	            hh : '%d saat',
	            d : 'bir gün',
	            dd : '%d gün',
	            M : 'bir ay',
	            MM : '%d ay',
	            y : 'bir il',
	            yy : '%d il'
	        },
	        meridiemParse: /gecə|səhər|gündüz|axşam/,
	        isPM : function (input) {
	            return /^(gündüz|axşam)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'gecə';
	            } else if (hour < 12) {
	                return 'səhər';
	            } else if (hour < 17) {
	                return 'gündüz';
	            } else {
	                return 'axşam';
	            }
	        },
	        ordinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
	        ordinal : function (number) {
	            if (number === 0) {  // special case for zero
	                return number + '-ıncı';
	            }
	            var a = number % 10,
	                b = number % 100 - a,
	                c = number >= 100 ? 100 : null;
	            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return az;

	}));

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Belarusian [be]
	//! author : Dmitry Demidov : https://github.com/demidov91
	//! author: Praleska: http://praleska.pro/
	//! Author : Menelion Elensúle : https://github.com/Oire

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function plural(word, num) {
	        var forms = word.split('_');
	        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	            'mm': withoutSuffix ? 'хвіліна_хвіліны_хвілін' : 'хвіліну_хвіліны_хвілін',
	            'hh': withoutSuffix ? 'гадзіна_гадзіны_гадзін' : 'гадзіну_гадзіны_гадзін',
	            'dd': 'дзень_дні_дзён',
	            'MM': 'месяц_месяцы_месяцаў',
	            'yy': 'год_гады_гадоў'
	        };
	        if (key === 'm') {
	            return withoutSuffix ? 'хвіліна' : 'хвіліну';
	        }
	        else if (key === 'h') {
	            return withoutSuffix ? 'гадзіна' : 'гадзіну';
	        }
	        else {
	            return number + ' ' + plural(format[key], +number);
	        }
	    }

	    var be = moment.defineLocale('be', {
	        months : {
	            format: 'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split('_'),
	            standalone: 'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split('_')
	        },
	        monthsShort : 'студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж'.split('_'),
	        weekdays : {
	            format: 'нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу'.split('_'),
	            standalone: 'нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота'.split('_'),
	            isFormat: /\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/
	        },
	        weekdaysShort : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
	        weekdaysMin : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY г.',
	            LLL : 'D MMMM YYYY г., HH:mm',
	            LLLL : 'dddd, D MMMM YYYY г., HH:mm'
	        },
	        calendar : {
	            sameDay: '[Сёння ў] LT',
	            nextDay: '[Заўтра ў] LT',
	            lastDay: '[Учора ў] LT',
	            nextWeek: function () {
	                return '[У] dddd [ў] LT';
	            },
	            lastWeek: function () {
	                switch (this.day()) {
	                    case 0:
	                    case 3:
	                    case 5:
	                    case 6:
	                        return '[У мінулую] dddd [ў] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                        return '[У мінулы] dddd [ў] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'праз %s',
	            past : '%s таму',
	            s : 'некалькі секунд',
	            m : relativeTimeWithPlural,
	            mm : relativeTimeWithPlural,
	            h : relativeTimeWithPlural,
	            hh : relativeTimeWithPlural,
	            d : 'дзень',
	            dd : relativeTimeWithPlural,
	            M : 'месяц',
	            MM : relativeTimeWithPlural,
	            y : 'год',
	            yy : relativeTimeWithPlural
	        },
	        meridiemParse: /ночы|раніцы|дня|вечара/,
	        isPM : function (input) {
	            return /^(дня|вечара)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ночы';
	            } else if (hour < 12) {
	                return 'раніцы';
	            } else if (hour < 17) {
	                return 'дня';
	            } else {
	                return 'вечара';
	            }
	        },
	        ordinalParse: /\d{1,2}-(і|ы|га)/,
	        ordinal: function (number, period) {
	            switch (period) {
	                case 'M':
	                case 'd':
	                case 'DDD':
	                case 'w':
	                case 'W':
	                    return (number % 10 === 2 || number % 10 === 3) && (number % 100 !== 12 && number % 100 !== 13) ? number + '-і' : number + '-ы';
	                case 'D':
	                    return number + '-га';
	                default:
	                    return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return be;

	}));

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bulgarian [bg]
	//! author : Krasen Borisov : https://github.com/kraz

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var bg = moment.defineLocale('bg', {
	        months : 'януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември'.split('_'),
	        monthsShort : 'янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек'.split('_'),
	        weekdays : 'неделя_понеделник_вторник_сряда_четвъртък_петък_събота'.split('_'),
	        weekdaysShort : 'нед_пон_вто_сря_чет_пет_съб'.split('_'),
	        weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'D.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd, D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay : '[Днес в] LT',
	            nextDay : '[Утре в] LT',
	            nextWeek : 'dddd [в] LT',
	            lastDay : '[Вчера в] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                    case 0:
	                    case 3:
	                    case 6:
	                        return '[В изминалата] dddd [в] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[В изминалия] dddd [в] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'след %s',
	            past : 'преди %s',
	            s : 'няколко секунди',
	            m : 'минута',
	            mm : '%d минути',
	            h : 'час',
	            hh : '%d часа',
	            d : 'ден',
	            dd : '%d дни',
	            M : 'месец',
	            MM : '%d месеца',
	            y : 'година',
	            yy : '%d години'
	        },
	        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
	        ordinal : function (number) {
	            var lastDigit = number % 10,
	                last2Digits = number % 100;
	            if (number === 0) {
	                return number + '-ев';
	            } else if (last2Digits === 0) {
	                return number + '-ен';
	            } else if (last2Digits > 10 && last2Digits < 20) {
	                return number + '-ти';
	            } else if (lastDigit === 1) {
	                return number + '-ви';
	            } else if (lastDigit === 2) {
	                return number + '-ри';
	            } else if (lastDigit === 7 || lastDigit === 8) {
	                return number + '-ми';
	            } else {
	                return number + '-ти';
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return bg;

	}));

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bengali [bn]
	//! author : Kaushik Gandhi : https://github.com/kaushikgandhi

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '১',
	        '2': '২',
	        '3': '৩',
	        '4': '৪',
	        '5': '৫',
	        '6': '৬',
	        '7': '৭',
	        '8': '৮',
	        '9': '৯',
	        '0': '০'
	    },
	    numberMap = {
	        '১': '1',
	        '২': '2',
	        '৩': '3',
	        '৪': '4',
	        '৫': '5',
	        '৬': '6',
	        '৭': '7',
	        '৮': '8',
	        '৯': '9',
	        '০': '0'
	    };

	    var bn = moment.defineLocale('bn', {
	        months : 'জানুয়ারী_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split('_'),
	        monthsShort : 'জানু_ফেব_মার্চ_এপ্র_মে_জুন_জুল_আগ_সেপ্ট_অক্টো_নভে_ডিসে'.split('_'),
	        weekdays : 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার'.split('_'),
	        weekdaysShort : 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি'.split('_'),
	        weekdaysMin : 'রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm সময়',
	            LTS : 'A h:mm:ss সময়',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm সময়',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm সময়'
	        },
	        calendar : {
	            sameDay : '[আজ] LT',
	            nextDay : '[আগামীকাল] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[গতকাল] LT',
	            lastWeek : '[গত] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s পরে',
	            past : '%s আগে',
	            s : 'কয়েক সেকেন্ড',
	            m : 'এক মিনিট',
	            mm : '%d মিনিট',
	            h : 'এক ঘন্টা',
	            hh : '%d ঘন্টা',
	            d : 'এক দিন',
	            dd : '%d দিন',
	            M : 'এক মাস',
	            MM : '%d মাস',
	            y : 'এক বছর',
	            yy : '%d বছর'
	        },
	        preparse: function (string) {
	            return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if ((meridiem === 'রাত' && hour >= 4) ||
	                    (meridiem === 'দুপুর' && hour < 5) ||
	                    meridiem === 'বিকাল') {
	                return hour + 12;
	            } else {
	                return hour;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'রাত';
	            } else if (hour < 10) {
	                return 'সকাল';
	            } else if (hour < 17) {
	                return 'দুপুর';
	            } else if (hour < 20) {
	                return 'বিকাল';
	            } else {
	                return 'রাত';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return bn;

	}));

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Tibetan [bo]
	//! author : Thupten N. Chakrishar : https://github.com/vajradog

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '༡',
	        '2': '༢',
	        '3': '༣',
	        '4': '༤',
	        '5': '༥',
	        '6': '༦',
	        '7': '༧',
	        '8': '༨',
	        '9': '༩',
	        '0': '༠'
	    },
	    numberMap = {
	        '༡': '1',
	        '༢': '2',
	        '༣': '3',
	        '༤': '4',
	        '༥': '5',
	        '༦': '6',
	        '༧': '7',
	        '༨': '8',
	        '༩': '9',
	        '༠': '0'
	    };

	    var bo = moment.defineLocale('bo', {
	        months : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
	        monthsShort : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
	        weekdays : 'གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་'.split('_'),
	        weekdaysShort : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
	        weekdaysMin : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm',
	            LTS : 'A h:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm'
	        },
	        calendar : {
	            sameDay : '[དི་རིང] LT',
	            nextDay : '[སང་ཉིན] LT',
	            nextWeek : '[བདུན་ཕྲག་རྗེས་མ], LT',
	            lastDay : '[ཁ་སང] LT',
	            lastWeek : '[བདུན་ཕྲག་མཐའ་མ] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s ལ་',
	            past : '%s སྔན་ལ',
	            s : 'ལམ་སང',
	            m : 'སྐར་མ་གཅིག',
	            mm : '%d སྐར་མ',
	            h : 'ཆུ་ཚོད་གཅིག',
	            hh : '%d ཆུ་ཚོད',
	            d : 'ཉིན་གཅིག',
	            dd : '%d ཉིན་',
	            M : 'ཟླ་བ་གཅིག',
	            MM : '%d ཟླ་བ',
	            y : 'ལོ་གཅིག',
	            yy : '%d ལོ'
	        },
	        preparse: function (string) {
	            return string.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if ((meridiem === 'མཚན་མོ' && hour >= 4) ||
	                    (meridiem === 'ཉིན་གུང' && hour < 5) ||
	                    meridiem === 'དགོང་དག') {
	                return hour + 12;
	            } else {
	                return hour;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'མཚན་མོ';
	            } else if (hour < 10) {
	                return 'ཞོགས་ཀས';
	            } else if (hour < 17) {
	                return 'ཉིན་གུང';
	            } else if (hour < 20) {
	                return 'དགོང་དག';
	            } else {
	                return 'མཚན་མོ';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return bo;

	}));

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Breton [br]
	//! author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function relativeTimeWithMutation(number, withoutSuffix, key) {
	        var format = {
	            'mm': 'munutenn',
	            'MM': 'miz',
	            'dd': 'devezh'
	        };
	        return number + ' ' + mutation(format[key], number);
	    }
	    function specialMutationForYears(number) {
	        switch (lastNumber(number)) {
	            case 1:
	            case 3:
	            case 4:
	            case 5:
	            case 9:
	                return number + ' bloaz';
	            default:
	                return number + ' vloaz';
	        }
	    }
	    function lastNumber(number) {
	        if (number > 9) {
	            return lastNumber(number % 10);
	        }
	        return number;
	    }
	    function mutation(text, number) {
	        if (number === 2) {
	            return softMutation(text);
	        }
	        return text;
	    }
	    function softMutation(text) {
	        var mutationTable = {
	            'm': 'v',
	            'b': 'v',
	            'd': 'z'
	        };
	        if (mutationTable[text.charAt(0)] === undefined) {
	            return text;
	        }
	        return mutationTable[text.charAt(0)] + text.substring(1);
	    }

	    var br = moment.defineLocale('br', {
	        months : 'Genver_C\'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split('_'),
	        monthsShort : 'Gen_C\'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split('_'),
	        weekdays : 'Sul_Lun_Meurzh_Merc\'her_Yaou_Gwener_Sadorn'.split('_'),
	        weekdaysShort : 'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split('_'),
	        weekdaysMin : 'Su_Lu_Me_Mer_Ya_Gw_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'h[e]mm A',
	            LTS : 'h[e]mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D [a viz] MMMM YYYY',
	            LLL : 'D [a viz] MMMM YYYY h[e]mm A',
	            LLLL : 'dddd, D [a viz] MMMM YYYY h[e]mm A'
	        },
	        calendar : {
	            sameDay : '[Hiziv da] LT',
	            nextDay : '[Warc\'hoazh da] LT',
	            nextWeek : 'dddd [da] LT',
	            lastDay : '[Dec\'h da] LT',
	            lastWeek : 'dddd [paset da] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'a-benn %s',
	            past : '%s \'zo',
	            s : 'un nebeud segondennoù',
	            m : 'ur vunutenn',
	            mm : relativeTimeWithMutation,
	            h : 'un eur',
	            hh : '%d eur',
	            d : 'un devezh',
	            dd : relativeTimeWithMutation,
	            M : 'ur miz',
	            MM : relativeTimeWithMutation,
	            y : 'ur bloaz',
	            yy : specialMutationForYears
	        },
	        ordinalParse: /\d{1,2}(añ|vet)/,
	        ordinal : function (number) {
	            var output = (number === 1) ? 'añ' : 'vet';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return br;

	}));

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bosnian [bs]
	//! author : Nedim Cholich : https://github.com/frontyard
	//! based on (hr) translation by Bojan Marković

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function translate(number, withoutSuffix, key) {
	        var result = number + ' ';
	        switch (key) {
	            case 'm':
	                return withoutSuffix ? 'jedna minuta' : 'jedne minute';
	            case 'mm':
	                if (number === 1) {
	                    result += 'minuta';
	                } else if (number === 2 || number === 3 || number === 4) {
	                    result += 'minute';
	                } else {
	                    result += 'minuta';
	                }
	                return result;
	            case 'h':
	                return withoutSuffix ? 'jedan sat' : 'jednog sata';
	            case 'hh':
	                if (number === 1) {
	                    result += 'sat';
	                } else if (number === 2 || number === 3 || number === 4) {
	                    result += 'sata';
	                } else {
	                    result += 'sati';
	                }
	                return result;
	            case 'dd':
	                if (number === 1) {
	                    result += 'dan';
	                } else {
	                    result += 'dana';
	                }
	                return result;
	            case 'MM':
	                if (number === 1) {
	                    result += 'mjesec';
	                } else if (number === 2 || number === 3 || number === 4) {
	                    result += 'mjeseca';
	                } else {
	                    result += 'mjeseci';
	                }
	                return result;
	            case 'yy':
	                if (number === 1) {
	                    result += 'godina';
	                } else if (number === 2 || number === 3 || number === 4) {
	                    result += 'godine';
	                } else {
	                    result += 'godina';
	                }
	                return result;
	        }
	    }

	    var bs = moment.defineLocale('bs', {
	        months : 'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split('_'),
	        monthsShort : 'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	        weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay  : '[danas u] LT',
	            nextDay  : '[sutra u] LT',
	            nextWeek : function () {
	                switch (this.day()) {
	                    case 0:
	                        return '[u] [nedjelju] [u] LT';
	                    case 3:
	                        return '[u] [srijedu] [u] LT';
	                    case 6:
	                        return '[u] [subotu] [u] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[u] dddd [u] LT';
	                }
	            },
	            lastDay  : '[jučer u] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                    case 0:
	                    case 3:
	                        return '[prošlu] dddd [u] LT';
	                    case 6:
	                        return '[prošle] [subote] [u] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[prošli] dddd [u] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past   : 'prije %s',
	            s      : 'par sekundi',
	            m      : translate,
	            mm     : translate,
	            h      : translate,
	            hh     : translate,
	            d      : 'dan',
	            dd     : translate,
	            M      : 'mjesec',
	            MM     : translate,
	            y      : 'godinu',
	            yy     : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return bs;

	}));

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Catalan [ca]
	//! author : Juan G. Hurtado : https://github.com/juanghurtado

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ca = moment.defineLocale('ca', {
	        months : 'gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
	        monthsShort : 'gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
	        weekdaysShort : 'dg._dl._dt._dc._dj._dv._ds.'.split('_'),
	        weekdaysMin : 'Dg_Dl_Dt_Dc_Dj_Dv_Ds'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay : function () {
	                return '[avui a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            nextDay : function () {
	                return '[demà a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            nextWeek : function () {
	                return 'dddd [a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            lastDay : function () {
	                return '[ahir a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            lastWeek : function () {
	                return '[el] dddd [passat a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'en %s',
	            past : 'fa %s',
	            s : 'uns segons',
	            m : 'un minut',
	            mm : '%d minuts',
	            h : 'una hora',
	            hh : '%d hores',
	            d : 'un dia',
	            dd : '%d dies',
	            M : 'un mes',
	            MM : '%d mesos',
	            y : 'un any',
	            yy : '%d anys'
	        },
	        ordinalParse: /\d{1,2}(r|n|t|è|a)/,
	        ordinal : function (number, period) {
	            var output = (number === 1) ? 'r' :
	                (number === 2) ? 'n' :
	                (number === 3) ? 'r' :
	                (number === 4) ? 't' : 'è';
	            if (period === 'w' || period === 'W') {
	                output = 'a';
	            }
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return ca;

	}));

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Czech [cs]
	//! author : petrbela : https://github.com/petrbela

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var months = 'leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec'.split('_'),
	        monthsShort = 'led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro'.split('_');
	    function plural(n) {
	        return (n > 1) && (n < 5) && (~~(n / 10) !== 1);
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	            case 's':  // a few seconds / in a few seconds / a few seconds ago
	                return (withoutSuffix || isFuture) ? 'pár sekund' : 'pár sekundami';
	            case 'm':  // a minute / in a minute / a minute ago
	                return withoutSuffix ? 'minuta' : (isFuture ? 'minutu' : 'minutou');
	            case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'minuty' : 'minut');
	                } else {
	                    return result + 'minutami';
	                }
	                break;
	            case 'h':  // an hour / in an hour / an hour ago
	                return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
	            case 'hh': // 9 hours / in 9 hours / 9 hours ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'hodiny' : 'hodin');
	                } else {
	                    return result + 'hodinami';
	                }
	                break;
	            case 'd':  // a day / in a day / a day ago
	                return (withoutSuffix || isFuture) ? 'den' : 'dnem';
	            case 'dd': // 9 days / in 9 days / 9 days ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'dny' : 'dní');
	                } else {
	                    return result + 'dny';
	                }
	                break;
	            case 'M':  // a month / in a month / a month ago
	                return (withoutSuffix || isFuture) ? 'měsíc' : 'měsícem';
	            case 'MM': // 9 months / in 9 months / 9 months ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'měsíce' : 'měsíců');
	                } else {
	                    return result + 'měsíci';
	                }
	                break;
	            case 'y':  // a year / in a year / a year ago
	                return (withoutSuffix || isFuture) ? 'rok' : 'rokem';
	            case 'yy': // 9 years / in 9 years / 9 years ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'roky' : 'let');
	                } else {
	                    return result + 'lety';
	                }
	                break;
	        }
	    }

	    var cs = moment.defineLocale('cs', {
	        months : months,
	        monthsShort : monthsShort,
	        monthsParse : (function (months, monthsShort) {
	            var i, _monthsParse = [];
	            for (i = 0; i < 12; i++) {
	                // use custom parser to solve problem with July (červenec)
	                _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
	            }
	            return _monthsParse;
	        }(months, monthsShort)),
	        shortMonthsParse : (function (monthsShort) {
	            var i, _shortMonthsParse = [];
	            for (i = 0; i < 12; i++) {
	                _shortMonthsParse[i] = new RegExp('^' + monthsShort[i] + '$', 'i');
	            }
	            return _shortMonthsParse;
	        }(monthsShort)),
	        longMonthsParse : (function (months) {
	            var i, _longMonthsParse = [];
	            for (i = 0; i < 12; i++) {
	                _longMonthsParse[i] = new RegExp('^' + months[i] + '$', 'i');
	            }
	            return _longMonthsParse;
	        }(months)),
	        weekdays : 'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'.split('_'),
	        weekdaysShort : 'ne_po_út_st_čt_pá_so'.split('_'),
	        weekdaysMin : 'ne_po_út_st_čt_pá_so'.split('_'),
	        longDateFormat : {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd D. MMMM YYYY H:mm',
	            l : 'D. M. YYYY'
	        },
	        calendar : {
	            sameDay: '[dnes v] LT',
	            nextDay: '[zítra v] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                    case 0:
	                        return '[v neděli v] LT';
	                    case 1:
	                    case 2:
	                        return '[v] dddd [v] LT';
	                    case 3:
	                        return '[ve středu v] LT';
	                    case 4:
	                        return '[ve čtvrtek v] LT';
	                    case 5:
	                        return '[v pátek v] LT';
	                    case 6:
	                        return '[v sobotu v] LT';
	                }
	            },
	            lastDay: '[včera v] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                    case 0:
	                        return '[minulou neděli v] LT';
	                    case 1:
	                    case 2:
	                        return '[minulé] dddd [v] LT';
	                    case 3:
	                        return '[minulou středu v] LT';
	                    case 4:
	                    case 5:
	                        return '[minulý] dddd [v] LT';
	                    case 6:
	                        return '[minulou sobotu v] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past : 'před %s',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse : /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return cs;

	}));

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Chuvash [cv]
	//! author : Anatoly Mironov : https://github.com/mirontoli

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var cv = moment.defineLocale('cv', {
	        months : 'кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав'.split('_'),
	        monthsShort : 'кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш'.split('_'),
	        weekdays : 'вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун'.split('_'),
	        weekdaysShort : 'выр_тун_ытл_юн_кӗҫ_эрн_шӑм'.split('_'),
	        weekdaysMin : 'вр_тн_ыт_юн_кҫ_эр_шм'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD-MM-YYYY',
	            LL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]',
	            LLL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
	            LLLL : 'dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm'
	        },
	        calendar : {
	            sameDay: '[Паян] LT [сехетре]',
	            nextDay: '[Ыран] LT [сехетре]',
	            lastDay: '[Ӗнер] LT [сехетре]',
	            nextWeek: '[Ҫитес] dddd LT [сехетре]',
	            lastWeek: '[Иртнӗ] dddd LT [сехетре]',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : function (output) {
	                var affix = /сехет$/i.exec(output) ? 'рен' : /ҫул$/i.exec(output) ? 'тан' : 'ран';
	                return output + affix;
	            },
	            past : '%s каялла',
	            s : 'пӗр-ик ҫеккунт',
	            m : 'пӗр минут',
	            mm : '%d минут',
	            h : 'пӗр сехет',
	            hh : '%d сехет',
	            d : 'пӗр кун',
	            dd : '%d кун',
	            M : 'пӗр уйӑх',
	            MM : '%d уйӑх',
	            y : 'пӗр ҫул',
	            yy : '%d ҫул'
	        },
	        ordinalParse: /\d{1,2}-мӗш/,
	        ordinal : '%d-мӗш',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return cv;

	}));

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Welsh [cy]
	//! author : Robert Allen : https://github.com/robgallen
	//! author : https://github.com/ryangreaves

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var cy = moment.defineLocale('cy', {
	        months: 'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split('_'),
	        monthsShort: 'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
	        weekdays: 'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split('_'),
	        weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
	        weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
	        weekdaysParseExact : true,
	        // time formats are the same as en-gb
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Heddiw am] LT',
	            nextDay: '[Yfory am] LT',
	            nextWeek: 'dddd [am] LT',
	            lastDay: '[Ddoe am] LT',
	            lastWeek: 'dddd [diwethaf am] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'mewn %s',
	            past: '%s yn ôl',
	            s: 'ychydig eiliadau',
	            m: 'munud',
	            mm: '%d munud',
	            h: 'awr',
	            hh: '%d awr',
	            d: 'diwrnod',
	            dd: '%d diwrnod',
	            M: 'mis',
	            MM: '%d mis',
	            y: 'blwyddyn',
	            yy: '%d flynedd'
	        },
	        ordinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
	        // traditional ordinal numbers above 31 are not commonly used in colloquial Welsh
	        ordinal: function (number) {
	            var b = number,
	                output = '',
	                lookup = [
	                    '', 'af', 'il', 'ydd', 'ydd', 'ed', 'ed', 'ed', 'fed', 'fed', 'fed', // 1af to 10fed
	                    'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'fed' // 11eg to 20fed
	                ];
	            if (b > 20) {
	                if (b === 40 || b === 50 || b === 60 || b === 80 || b === 100) {
	                    output = 'fed'; // not 30ain, 70ain or 90ain
	                } else {
	                    output = 'ain';
	                }
	            } else if (b > 0) {
	                output = lookup[b];
	            }
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return cy;

	}));

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Danish [da]
	//! author : Ulrik Nielsen : https://github.com/mrbase

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var da = moment.defineLocale('da', {
	        months : 'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
	        weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
	        weekdaysShort : 'søn_man_tir_ons_tor_fre_lør'.split('_'),
	        weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY HH:mm',
	            LLLL : 'dddd [d.] D. MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[I dag kl.] LT',
	            nextDay : '[I morgen kl.] LT',
	            nextWeek : 'dddd [kl.] LT',
	            lastDay : '[I går kl.] LT',
	            lastWeek : '[sidste] dddd [kl] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : '%s siden',
	            s : 'få sekunder',
	            m : 'et minut',
	            mm : '%d minutter',
	            h : 'en time',
	            hh : '%d timer',
	            d : 'en dag',
	            dd : '%d dage',
	            M : 'en måned',
	            MM : '%d måneder',
	            y : 'et år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return da;

	}));

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : German [de]
	//! author : lluchs : https://github.com/lluchs
	//! author: Menelion Elensúle: https://github.com/Oire
	//! author : Mikolaj Dadela : https://github.com/mik01aj

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            'm': ['eine Minute', 'einer Minute'],
	            'h': ['eine Stunde', 'einer Stunde'],
	            'd': ['ein Tag', 'einem Tag'],
	            'dd': [number + ' Tage', number + ' Tagen'],
	            'M': ['ein Monat', 'einem Monat'],
	            'MM': [number + ' Monate', number + ' Monaten'],
	            'y': ['ein Jahr', 'einem Jahr'],
	            'yy': [number + ' Jahre', number + ' Jahren']
	        };
	        return withoutSuffix ? format[key][0] : format[key][1];
	    }

	    var de = moment.defineLocale('de', {
	        months : 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	        monthsShort : 'Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
	        weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
	        weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY HH:mm',
	            LLLL : 'dddd, D. MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[heute um] LT [Uhr]',
	            sameElse: 'L',
	            nextDay: '[morgen um] LT [Uhr]',
	            nextWeek: 'dddd [um] LT [Uhr]',
	            lastDay: '[gestern um] LT [Uhr]',
	            lastWeek: '[letzten] dddd [um] LT [Uhr]'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : 'vor %s',
	            s : 'ein paar Sekunden',
	            m : processRelativeTime,
	            mm : '%d Minuten',
	            h : processRelativeTime,
	            hh : '%d Stunden',
	            d : processRelativeTime,
	            dd : processRelativeTime,
	            M : processRelativeTime,
	            MM : processRelativeTime,
	            y : processRelativeTime,
	            yy : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return de;

	}));

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : German (Austria) [de-at]
	//! author : lluchs : https://github.com/lluchs
	//! author: Menelion Elensúle: https://github.com/Oire
	//! author : Martin Groller : https://github.com/MadMG
	//! author : Mikolaj Dadela : https://github.com/mik01aj

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            'm': ['eine Minute', 'einer Minute'],
	            'h': ['eine Stunde', 'einer Stunde'],
	            'd': ['ein Tag', 'einem Tag'],
	            'dd': [number + ' Tage', number + ' Tagen'],
	            'M': ['ein Monat', 'einem Monat'],
	            'MM': [number + ' Monate', number + ' Monaten'],
	            'y': ['ein Jahr', 'einem Jahr'],
	            'yy': [number + ' Jahre', number + ' Jahren']
	        };
	        return withoutSuffix ? format[key][0] : format[key][1];
	    }

	    var de_at = moment.defineLocale('de-at', {
	        months : 'Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	        monthsShort : 'Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
	        weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
	        weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY HH:mm',
	            LLLL : 'dddd, D. MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[heute um] LT [Uhr]',
	            sameElse: 'L',
	            nextDay: '[morgen um] LT [Uhr]',
	            nextWeek: 'dddd [um] LT [Uhr]',
	            lastDay: '[gestern um] LT [Uhr]',
	            lastWeek: '[letzten] dddd [um] LT [Uhr]'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : 'vor %s',
	            s : 'ein paar Sekunden',
	            m : processRelativeTime,
	            mm : '%d Minuten',
	            h : processRelativeTime,
	            hh : '%d Stunden',
	            d : processRelativeTime,
	            dd : processRelativeTime,
	            M : processRelativeTime,
	            MM : processRelativeTime,
	            y : processRelativeTime,
	            yy : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return de_at;

	}));

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Maldivian [dv]
	//! author : Jawish Hameed : https://github.com/jawish

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var months = [
	        'ޖެނުއަރީ',
	        'ފެބްރުއަރީ',
	        'މާރިޗު',
	        'އޭޕްރީލު',
	        'މޭ',
	        'ޖޫން',
	        'ޖުލައި',
	        'އޯގަސްޓު',
	        'ސެޕްޓެމްބަރު',
	        'އޮކްޓޯބަރު',
	        'ނޮވެމްބަރު',
	        'ޑިސެމްބަރު'
	    ], weekdays = [
	        'އާދިއްތަ',
	        'ހޯމަ',
	        'އަންގާރަ',
	        'ބުދަ',
	        'ބުރާސްފަތި',
	        'ހުކުރު',
	        'ހޮނިހިރު'
	    ];

	    var dv = moment.defineLocale('dv', {
	        months : months,
	        monthsShort : months,
	        weekdays : weekdays,
	        weekdaysShort : weekdays,
	        weekdaysMin : 'އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި'.split('_'),
	        longDateFormat : {

	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'D/M/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /މކ|މފ/,
	        isPM : function (input) {
	            return 'މފ' === input;
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'މކ';
	            } else {
	                return 'މފ';
	            }
	        },
	        calendar : {
	            sameDay : '[މިއަދު] LT',
	            nextDay : '[މާދަމާ] LT',
	            nextWeek : 'dddd LT',
	            lastDay : '[އިއްޔެ] LT',
	            lastWeek : '[ފާއިތުވި] dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'ތެރޭގައި %s',
	            past : 'ކުރިން %s',
	            s : 'ސިކުންތުކޮޅެއް',
	            m : 'މިނިޓެއް',
	            mm : 'މިނިޓު %d',
	            h : 'ގަޑިއިރެއް',
	            hh : 'ގަޑިއިރު %d',
	            d : 'ދުވަހެއް',
	            dd : 'ދުވަސް %d',
	            M : 'މަހެއް',
	            MM : 'މަސް %d',
	            y : 'އަހަރެއް',
	            yy : 'އަހަރު %d'
	        },
	        preparse: function (string) {
	            return string.replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/,/g, '،');
	        },
	        week : {
	            dow : 7,  // Sunday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return dv;

	}));

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Greek [el]
	//! author : Aggelos Karalias : https://github.com/mehiel

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';

	    function isFunction(input) {
	        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	    }


	    var el = moment.defineLocale('el', {
	        monthsNominativeEl : 'Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος'.split('_'),
	        monthsGenitiveEl : 'Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου'.split('_'),
	        months : function (momentToFormat, format) {
	            if (/D/.test(format.substring(0, format.indexOf('MMMM')))) { // if there is a day number before 'MMMM'
	                return this._monthsGenitiveEl[momentToFormat.month()];
	            } else {
	                return this._monthsNominativeEl[momentToFormat.month()];
	            }
	        },
	        monthsShort : 'Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ'.split('_'),
	        weekdays : 'Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο'.split('_'),
	        weekdaysShort : 'Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ'.split('_'),
	        weekdaysMin : 'Κυ_Δε_Τρ_Τε_Πε_Πα_Σα'.split('_'),
	        meridiem : function (hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'μμ' : 'ΜΜ';
	            } else {
	                return isLower ? 'πμ' : 'ΠΜ';
	            }
	        },
	        isPM : function (input) {
	            return ((input + '').toLowerCase()[0] === 'μ');
	        },
	        meridiemParse : /[ΠΜ]\.?Μ?\.?/i,
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY h:mm A',
	            LLLL : 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendarEl : {
	            sameDay : '[Σήμερα {}] LT',
	            nextDay : '[Αύριο {}] LT',
	            nextWeek : 'dddd [{}] LT',
	            lastDay : '[Χθες {}] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                    case 6:
	                        return '[το προηγούμενο] dddd [{}] LT';
	                    default:
	                        return '[την προηγούμενη] dddd [{}] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        calendar : function (key, mom) {
	            var output = this._calendarEl[key],
	                hours = mom && mom.hours();
	            if (isFunction(output)) {
	                output = output.apply(mom);
	            }
	            return output.replace('{}', (hours % 12 === 1 ? 'στη' : 'στις'));
	        },
	        relativeTime : {
	            future : 'σε %s',
	            past : '%s πριν',
	            s : 'λίγα δευτερόλεπτα',
	            m : 'ένα λεπτό',
	            mm : '%d λεπτά',
	            h : 'μία ώρα',
	            hh : '%d ώρες',
	            d : 'μία μέρα',
	            dd : '%d μέρες',
	            M : 'ένας μήνας',
	            MM : '%d μήνες',
	            y : 'ένας χρόνος',
	            yy : '%d χρόνια'
	        },
	        ordinalParse: /\d{1,2}η/,
	        ordinal: '%dη',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4st is the first week of the year.
	        }
	    });

	    return el;

	}));

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : English (Australia) [en-au]
	//! author : Jared Morse : https://github.com/jarcoal

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var en_au = moment.defineLocale('en-au', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY h:mm A',
	            LLLL : 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return en_au;

	}));

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : English (Canada) [en-ca]
	//! author : Jonathan Abourbih : https://github.com/jonbca

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var en_ca = moment.defineLocale('en-ca', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'YYYY-MM-DD',
	            LL : 'MMMM D, YYYY',
	            LLL : 'MMMM D, YYYY h:mm A',
	            LLLL : 'dddd, MMMM D, YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        }
	    });

	    return en_ca;

	}));

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : English (United Kingdom) [en-gb]
	//! author : Chris Gedrim : https://github.com/chrisgedrim

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var en_gb = moment.defineLocale('en-gb', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return en_gb;

	}));

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : English (Ireland) [en-ie]
	//! author : Chris Cartlidge : https://github.com/chriscartlidge

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var en_ie = moment.defineLocale('en-ie', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD-MM-YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return en_ie;

	}));

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : English (New Zealand) [en-nz]
	//! author : Luke McGregor : https://github.com/lukemcgregor

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var en_nz = moment.defineLocale('en-nz', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY h:mm A',
	            LLLL : 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return en_nz;

	}));

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Esperanto [eo]
	//! author : Colin Dean : https://github.com/colindean
	//! komento: Mi estas malcerta se mi korekte traktis akuzativojn en tiu traduko.
	//!          Se ne, bonvolu korekti kaj avizi min por ke mi povas lerni!

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var eo = moment.defineLocale('eo', {
	        months : 'januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec'.split('_'),
	        weekdays : 'Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato'.split('_'),
	        weekdaysShort : 'Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab'.split('_'),
	        weekdaysMin : 'Di_Lu_Ma_Me_Ĵa_Ve_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'D[-an de] MMMM, YYYY',
	            LLL : 'D[-an de] MMMM, YYYY HH:mm',
	            LLLL : 'dddd, [la] D[-an de] MMMM, YYYY HH:mm'
	        },
	        meridiemParse: /[ap]\.t\.m/i,
	        isPM: function (input) {
	            return input.charAt(0).toLowerCase() === 'p';
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'p.t.m.' : 'P.T.M.';
	            } else {
	                return isLower ? 'a.t.m.' : 'A.T.M.';
	            }
	        },
	        calendar : {
	            sameDay : '[Hodiaŭ je] LT',
	            nextDay : '[Morgaŭ je] LT',
	            nextWeek : 'dddd [je] LT',
	            lastDay : '[Hieraŭ je] LT',
	            lastWeek : '[pasinta] dddd [je] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'je %s',
	            past : 'antaŭ %s',
	            s : 'sekundoj',
	            m : 'minuto',
	            mm : '%d minutoj',
	            h : 'horo',
	            hh : '%d horoj',
	            d : 'tago',//ne 'diurno', ĉar estas uzita por proksimumo
	            dd : '%d tagoj',
	            M : 'monato',
	            MM : '%d monatoj',
	            y : 'jaro',
	            yy : '%d jaroj'
	        },
	        ordinalParse: /\d{1,2}a/,
	        ordinal : '%da',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return eo;

	}));

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Spanish [es]
	//! author : Julio Napurí : https://github.com/julionc

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
	        monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

	    var es = moment.defineLocale('es', {
	        months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
	        monthsShort : function (m, format) {
	            if (/-MMM-/.test(format)) {
	                return monthsShort[m.month()];
	            } else {
	                return monthsShortDot[m.month()];
	            }
	        },
	        monthsParseExact : true,
	        weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
	        weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
	        weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [de] MMMM [de] YYYY',
	            LLL : 'D [de] MMMM [de] YYYY H:mm',
	            LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
	        },
	        calendar : {
	            sameDay : function () {
	                return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            nextDay : function () {
	                return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            nextWeek : function () {
	                return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            lastDay : function () {
	                return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            lastWeek : function () {
	                return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'en %s',
	            past : 'hace %s',
	            s : 'unos segundos',
	            m : 'un minuto',
	            mm : '%d minutos',
	            h : 'una hora',
	            hh : '%d horas',
	            d : 'un día',
	            dd : '%d días',
	            M : 'un mes',
	            MM : '%d meses',
	            y : 'un año',
	            yy : '%d años'
	        },
	        ordinalParse : /\d{1,2}º/,
	        ordinal : '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return es;

	}));

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Spanish (Dominican Republic) [es-do]

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
	        monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

	    var es_do = moment.defineLocale('es-do', {
	        months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
	        monthsShort : function (m, format) {
	            if (/-MMM-/.test(format)) {
	                return monthsShort[m.month()];
	            } else {
	                return monthsShortDot[m.month()];
	            }
	        },
	        monthsParseExact : true,
	        weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
	        weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
	        weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D [de] MMMM [de] YYYY',
	            LLL : 'D [de] MMMM [de] YYYY h:mm A',
	            LLLL : 'dddd, D [de] MMMM [de] YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : function () {
	                return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            nextDay : function () {
	                return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            nextWeek : function () {
	                return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            lastDay : function () {
	                return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            lastWeek : function () {
	                return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'en %s',
	            past : 'hace %s',
	            s : 'unos segundos',
	            m : 'un minuto',
	            mm : '%d minutos',
	            h : 'una hora',
	            hh : '%d horas',
	            d : 'un día',
	            dd : '%d días',
	            M : 'un mes',
	            MM : '%d meses',
	            y : 'un año',
	            yy : '%d años'
	        },
	        ordinalParse : /\d{1,2}º/,
	        ordinal : '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return es_do;

	}));

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Estonian [et]
	//! author : Henry Kehlmann : https://github.com/madhenry
	//! improvements : Illimar Tambek : https://github.com/ragulka

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            's' : ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
	            'm' : ['ühe minuti', 'üks minut'],
	            'mm': [number + ' minuti', number + ' minutit'],
	            'h' : ['ühe tunni', 'tund aega', 'üks tund'],
	            'hh': [number + ' tunni', number + ' tundi'],
	            'd' : ['ühe päeva', 'üks päev'],
	            'M' : ['kuu aja', 'kuu aega', 'üks kuu'],
	            'MM': [number + ' kuu', number + ' kuud'],
	            'y' : ['ühe aasta', 'aasta', 'üks aasta'],
	            'yy': [number + ' aasta', number + ' aastat']
	        };
	        if (withoutSuffix) {
	            return format[key][2] ? format[key][2] : format[key][1];
	        }
	        return isFuture ? format[key][0] : format[key][1];
	    }

	    var et = moment.defineLocale('et', {
	        months        : 'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
	        monthsShort   : 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
	        weekdays      : 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
	        weekdaysShort : 'P_E_T_K_N_R_L'.split('_'),
	        weekdaysMin   : 'P_E_T_K_N_R_L'.split('_'),
	        longDateFormat : {
	            LT   : 'H:mm',
	            LTS : 'H:mm:ss',
	            L    : 'DD.MM.YYYY',
	            LL   : 'D. MMMM YYYY',
	            LLL  : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay  : '[Täna,] LT',
	            nextDay  : '[Homme,] LT',
	            nextWeek : '[Järgmine] dddd LT',
	            lastDay  : '[Eile,] LT',
	            lastWeek : '[Eelmine] dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s pärast',
	            past   : '%s tagasi',
	            s      : processRelativeTime,
	            m      : processRelativeTime,
	            mm     : processRelativeTime,
	            h      : processRelativeTime,
	            hh     : processRelativeTime,
	            d      : processRelativeTime,
	            dd     : '%d päeva',
	            M      : processRelativeTime,
	            MM     : processRelativeTime,
	            y      : processRelativeTime,
	            yy     : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return et;

	}));

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Basque [eu]
	//! author : Eneko Illarramendi : https://github.com/eillarra

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var eu = moment.defineLocale('eu', {
	        months : 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
	        monthsShort : 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
	        weekdaysShort : 'ig._al._ar._az._og._ol._lr.'.split('_'),
	        weekdaysMin : 'ig_al_ar_az_og_ol_lr'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'YYYY[ko] MMMM[ren] D[a]',
	            LLL : 'YYYY[ko] MMMM[ren] D[a] HH:mm',
	            LLLL : 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm',
	            l : 'YYYY-M-D',
	            ll : 'YYYY[ko] MMM D[a]',
	            lll : 'YYYY[ko] MMM D[a] HH:mm',
	            llll : 'ddd, YYYY[ko] MMM D[a] HH:mm'
	        },
	        calendar : {
	            sameDay : '[gaur] LT[etan]',
	            nextDay : '[bihar] LT[etan]',
	            nextWeek : 'dddd LT[etan]',
	            lastDay : '[atzo] LT[etan]',
	            lastWeek : '[aurreko] dddd LT[etan]',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s barru',
	            past : 'duela %s',
	            s : 'segundo batzuk',
	            m : 'minutu bat',
	            mm : '%d minutu',
	            h : 'ordu bat',
	            hh : '%d ordu',
	            d : 'egun bat',
	            dd : '%d egun',
	            M : 'hilabete bat',
	            MM : '%d hilabete',
	            y : 'urte bat',
	            yy : '%d urte'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return eu;

	}));

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Persian [fa]
	//! author : Ebrahim Byagowi : https://github.com/ebraminio

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '۱',
	        '2': '۲',
	        '3': '۳',
	        '4': '۴',
	        '5': '۵',
	        '6': '۶',
	        '7': '۷',
	        '8': '۸',
	        '9': '۹',
	        '0': '۰'
	    }, numberMap = {
	        '۱': '1',
	        '۲': '2',
	        '۳': '3',
	        '۴': '4',
	        '۵': '5',
	        '۶': '6',
	        '۷': '7',
	        '۸': '8',
	        '۹': '9',
	        '۰': '0'
	    };

	    var fa = moment.defineLocale('fa', {
	        months : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
	        monthsShort : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
	        weekdays : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
	        weekdaysShort : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
	        weekdaysMin : 'ی_د_س_چ_پ_ج_ش'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /قبل از ظهر|بعد از ظهر/,
	        isPM: function (input) {
	            return /بعد از ظهر/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'قبل از ظهر';
	            } else {
	                return 'بعد از ظهر';
	            }
	        },
	        calendar : {
	            sameDay : '[امروز ساعت] LT',
	            nextDay : '[فردا ساعت] LT',
	            nextWeek : 'dddd [ساعت] LT',
	            lastDay : '[دیروز ساعت] LT',
	            lastWeek : 'dddd [پیش] [ساعت] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'در %s',
	            past : '%s پیش',
	            s : 'چندین ثانیه',
	            m : 'یک دقیقه',
	            mm : '%d دقیقه',
	            h : 'یک ساعت',
	            hh : '%d ساعت',
	            d : 'یک روز',
	            dd : '%d روز',
	            M : 'یک ماه',
	            MM : '%d ماه',
	            y : 'یک سال',
	            yy : '%d سال'
	        },
	        preparse: function (string) {
	            return string.replace(/[۰-۹]/g, function (match) {
	                return numberMap[match];
	            }).replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            }).replace(/,/g, '،');
	        },
	        ordinalParse: /\d{1,2}م/,
	        ordinal : '%dم',
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return fa;

	}));

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Finnish [fi]
	//! author : Tarmo Aidantausta : https://github.com/bleadof

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var numbersPast = 'nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän'.split(' '),
	        numbersFuture = [
	            'nolla', 'yhden', 'kahden', 'kolmen', 'neljän', 'viiden', 'kuuden',
	            numbersPast[7], numbersPast[8], numbersPast[9]
	        ];
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = '';
	        switch (key) {
	            case 's':
	                return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
	            case 'm':
	                return isFuture ? 'minuutin' : 'minuutti';
	            case 'mm':
	                result = isFuture ? 'minuutin' : 'minuuttia';
	                break;
	            case 'h':
	                return isFuture ? 'tunnin' : 'tunti';
	            case 'hh':
	                result = isFuture ? 'tunnin' : 'tuntia';
	                break;
	            case 'd':
	                return isFuture ? 'päivän' : 'päivä';
	            case 'dd':
	                result = isFuture ? 'päivän' : 'päivää';
	                break;
	            case 'M':
	                return isFuture ? 'kuukauden' : 'kuukausi';
	            case 'MM':
	                result = isFuture ? 'kuukauden' : 'kuukautta';
	                break;
	            case 'y':
	                return isFuture ? 'vuoden' : 'vuosi';
	            case 'yy':
	                result = isFuture ? 'vuoden' : 'vuotta';
	                break;
	        }
	        result = verbalNumber(number, isFuture) + ' ' + result;
	        return result;
	    }
	    function verbalNumber(number, isFuture) {
	        return number < 10 ? (isFuture ? numbersFuture[number] : numbersPast[number]) : number;
	    }

	    var fi = moment.defineLocale('fi', {
	        months : 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
	        monthsShort : 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
	        weekdays : 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
	        weekdaysShort : 'su_ma_ti_ke_to_pe_la'.split('_'),
	        weekdaysMin : 'su_ma_ti_ke_to_pe_la'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD.MM.YYYY',
	            LL : 'Do MMMM[ta] YYYY',
	            LLL : 'Do MMMM[ta] YYYY, [klo] HH.mm',
	            LLLL : 'dddd, Do MMMM[ta] YYYY, [klo] HH.mm',
	            l : 'D.M.YYYY',
	            ll : 'Do MMM YYYY',
	            lll : 'Do MMM YYYY, [klo] HH.mm',
	            llll : 'ddd, Do MMM YYYY, [klo] HH.mm'
	        },
	        calendar : {
	            sameDay : '[tänään] [klo] LT',
	            nextDay : '[huomenna] [klo] LT',
	            nextWeek : 'dddd [klo] LT',
	            lastDay : '[eilen] [klo] LT',
	            lastWeek : '[viime] dddd[na] [klo] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s päästä',
	            past : '%s sitten',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fi;

	}));

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Faroese [fo]
	//! author : Ragnar Johannesen : https://github.com/ragnar123

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var fo = moment.defineLocale('fo', {
	        months : 'januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
	        weekdays : 'sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur'.split('_'),
	        weekdaysShort : 'sun_mán_týs_mik_hós_frí_ley'.split('_'),
	        weekdaysMin : 'su_má_tý_mi_hó_fr_le'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D. MMMM, YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Í dag kl.] LT',
	            nextDay : '[Í morgin kl.] LT',
	            nextWeek : 'dddd [kl.] LT',
	            lastDay : '[Í gjár kl.] LT',
	            lastWeek : '[síðstu] dddd [kl] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'um %s',
	            past : '%s síðani',
	            s : 'fá sekund',
	            m : 'ein minutt',
	            mm : '%d minuttir',
	            h : 'ein tími',
	            hh : '%d tímar',
	            d : 'ein dagur',
	            dd : '%d dagar',
	            M : 'ein mánaði',
	            MM : '%d mánaðir',
	            y : 'eitt ár',
	            yy : '%d ár'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fo;

	}));

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : French [fr]
	//! author : John Fischer : https://github.com/jfroffice

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var fr = moment.defineLocale('fr', {
	        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Aujourd\'hui à] LT',
	            nextDay: '[Demain à] LT',
	            nextWeek: 'dddd [à] LT',
	            lastDay: '[Hier à] LT',
	            lastWeek: 'dddd [dernier à] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'dans %s',
	            past : 'il y a %s',
	            s : 'quelques secondes',
	            m : 'une minute',
	            mm : '%d minutes',
	            h : 'une heure',
	            hh : '%d heures',
	            d : 'un jour',
	            dd : '%d jours',
	            M : 'un mois',
	            MM : '%d mois',
	            y : 'un an',
	            yy : '%d ans'
	        },
	        ordinalParse: /\d{1,2}(er|)/,
	        ordinal : function (number) {
	            return number + (number === 1 ? 'er' : '');
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fr;

	}));

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : French (Canada) [fr-ca]
	//! author : Jonathan Abourbih : https://github.com/jonbca

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var fr_ca = moment.defineLocale('fr-ca', {
	        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Aujourd\'hui à] LT',
	            nextDay: '[Demain à] LT',
	            nextWeek: 'dddd [à] LT',
	            lastDay: '[Hier à] LT',
	            lastWeek: 'dddd [dernier à] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'dans %s',
	            past : 'il y a %s',
	            s : 'quelques secondes',
	            m : 'une minute',
	            mm : '%d minutes',
	            h : 'une heure',
	            hh : '%d heures',
	            d : 'un jour',
	            dd : '%d jours',
	            M : 'un mois',
	            MM : '%d mois',
	            y : 'un an',
	            yy : '%d ans'
	        },
	        ordinalParse: /\d{1,2}(er|e)/,
	        ordinal : function (number) {
	            return number + (number === 1 ? 'er' : 'e');
	        }
	    });

	    return fr_ca;

	}));

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : French (Switzerland) [fr-ch]
	//! author : Gaspard Bucher : https://github.com/gaspard

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var fr_ch = moment.defineLocale('fr-ch', {
	        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Aujourd\'hui à] LT',
	            nextDay: '[Demain à] LT',
	            nextWeek: 'dddd [à] LT',
	            lastDay: '[Hier à] LT',
	            lastWeek: 'dddd [dernier à] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'dans %s',
	            past : 'il y a %s',
	            s : 'quelques secondes',
	            m : 'une minute',
	            mm : '%d minutes',
	            h : 'une heure',
	            hh : '%d heures',
	            d : 'un jour',
	            dd : '%d jours',
	            M : 'un mois',
	            MM : '%d mois',
	            y : 'un an',
	            yy : '%d ans'
	        },
	        ordinalParse: /\d{1,2}(er|e)/,
	        ordinal : function (number) {
	            return number + (number === 1 ? 'er' : 'e');
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fr_ch;

	}));

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Frisian [fy]
	//! author : Robin van der Vliet : https://github.com/robin0van0der0v

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var monthsShortWithDots = 'jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.'.split('_'),
	        monthsShortWithoutDots = 'jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_');

	    var fy = moment.defineLocale('fy', {
	        months : 'jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber'.split('_'),
	        monthsShort : function (m, format) {
	            if (/-MMM-/.test(format)) {
	                return monthsShortWithoutDots[m.month()];
	            } else {
	                return monthsShortWithDots[m.month()];
	            }
	        },
	        monthsParseExact : true,
	        weekdays : 'snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon'.split('_'),
	        weekdaysShort : 'si._mo._ti._wo._to._fr._so.'.split('_'),
	        weekdaysMin : 'Si_Mo_Ti_Wo_To_Fr_So'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD-MM-YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[hjoed om] LT',
	            nextDay: '[moarn om] LT',
	            nextWeek: 'dddd [om] LT',
	            lastDay: '[juster om] LT',
	            lastWeek: '[ôfrûne] dddd [om] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'oer %s',
	            past : '%s lyn',
	            s : 'in pear sekonden',
	            m : 'ien minút',
	            mm : '%d minuten',
	            h : 'ien oere',
	            hh : '%d oeren',
	            d : 'ien dei',
	            dd : '%d dagen',
	            M : 'ien moanne',
	            MM : '%d moannen',
	            y : 'ien jier',
	            yy : '%d jierren'
	        },
	        ordinalParse: /\d{1,2}(ste|de)/,
	        ordinal : function (number) {
	            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fy;

	}));

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Scottish Gaelic [gd]
	//! author : Jon Ashdown : https://github.com/jonashdown

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var months = [
	        'Am Faoilleach', 'An Gearran', 'Am Màrt', 'An Giblean', 'An Cèitean', 'An t-Ògmhios', 'An t-Iuchar', 'An Lùnastal', 'An t-Sultain', 'An Dàmhair', 'An t-Samhain', 'An Dùbhlachd'
	    ];

	    var monthsShort = ['Faoi', 'Gear', 'Màrt', 'Gibl', 'Cèit', 'Ògmh', 'Iuch', 'Lùn', 'Sult', 'Dàmh', 'Samh', 'Dùbh'];

	    var weekdays = ['Didòmhnaich', 'Diluain', 'Dimàirt', 'Diciadain', 'Diardaoin', 'Dihaoine', 'Disathairne'];

	    var weekdaysShort = ['Did', 'Dil', 'Dim', 'Dic', 'Dia', 'Dih', 'Dis'];

	    var weekdaysMin = ['Dò', 'Lu', 'Mà', 'Ci', 'Ar', 'Ha', 'Sa'];

	    var gd = moment.defineLocale('gd', {
	        months : months,
	        monthsShort : monthsShort,
	        monthsParseExact : true,
	        weekdays : weekdays,
	        weekdaysShort : weekdaysShort,
	        weekdaysMin : weekdaysMin,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[An-diugh aig] LT',
	            nextDay : '[A-màireach aig] LT',
	            nextWeek : 'dddd [aig] LT',
	            lastDay : '[An-dè aig] LT',
	            lastWeek : 'dddd [seo chaidh] [aig] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'ann an %s',
	            past : 'bho chionn %s',
	            s : 'beagan diogan',
	            m : 'mionaid',
	            mm : '%d mionaidean',
	            h : 'uair',
	            hh : '%d uairean',
	            d : 'latha',
	            dd : '%d latha',
	            M : 'mìos',
	            MM : '%d mìosan',
	            y : 'bliadhna',
	            yy : '%d bliadhna'
	        },
	        ordinalParse : /\d{1,2}(d|na|mh)/,
	        ordinal : function (number) {
	            var output = number === 1 ? 'd' : number % 10 === 2 ? 'na' : 'mh';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return gd;

	}));

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Galician [gl]
	//! author : Juan G. Hurtado : https://github.com/juanghurtado

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var gl = moment.defineLocale('gl', {
	        months : 'xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro'.split('_'),
	        monthsShort : 'xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'domingo_luns_martes_mércores_xoves_venres_sábado'.split('_'),
	        weekdaysShort : 'dom._lun._mar._mér._xov._ven._sáb.'.split('_'),
	        weekdaysMin : 'do_lu_ma_mé_xo_ve_sá'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [de] MMMM [de] YYYY',
	            LLL : 'D [de] MMMM [de] YYYY H:mm',
	            LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
	        },
	        calendar : {
	            sameDay : function () {
	                return '[hoxe ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
	            },
	            nextDay : function () {
	                return '[mañá ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
	            },
	            nextWeek : function () {
	                return 'dddd [' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
	            },
	            lastDay : function () {
	                return '[onte ' + ((this.hours() !== 1) ? 'á' : 'a') + '] LT';
	            },
	            lastWeek : function () {
	                return '[o] dddd [pasado ' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : function (str) {
	                if (str.indexOf('un') === 0) {
	                    return 'n' + str;
	                }
	                return 'en ' + str;
	            },
	            past : 'hai %s',
	            s : 'uns segundos',
	            m : 'un minuto',
	            mm : '%d minutos',
	            h : 'unha hora',
	            hh : '%d horas',
	            d : 'un día',
	            dd : '%d días',
	            M : 'un mes',
	            MM : '%d meses',
	            y : 'un ano',
	            yy : '%d anos'
	        },
	        ordinalParse : /\d{1,2}º/,
	        ordinal : '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return gl;

	}));

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Hebrew [he]
	//! author : Tomer Cohen : https://github.com/tomer
	//! author : Moshe Simantov : https://github.com/DevelopmentIL
	//! author : Tal Ater : https://github.com/TalAter

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var he = moment.defineLocale('he', {
	        months : 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
	        monthsShort : 'ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳'.split('_'),
	        weekdays : 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
	        weekdaysShort : 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
	        weekdaysMin : 'א_ב_ג_ד_ה_ו_ש'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [ב]MMMM YYYY',
	            LLL : 'D [ב]MMMM YYYY HH:mm',
	            LLLL : 'dddd, D [ב]MMMM YYYY HH:mm',
	            l : 'D/M/YYYY',
	            ll : 'D MMM YYYY',
	            lll : 'D MMM YYYY HH:mm',
	            llll : 'ddd, D MMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[היום ב־]LT',
	            nextDay : '[מחר ב־]LT',
	            nextWeek : 'dddd [בשעה] LT',
	            lastDay : '[אתמול ב־]LT',
	            lastWeek : '[ביום] dddd [האחרון בשעה] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'בעוד %s',
	            past : 'לפני %s',
	            s : 'מספר שניות',
	            m : 'דקה',
	            mm : '%d דקות',
	            h : 'שעה',
	            hh : function (number) {
	                if (number === 2) {
	                    return 'שעתיים';
	                }
	                return number + ' שעות';
	            },
	            d : 'יום',
	            dd : function (number) {
	                if (number === 2) {
	                    return 'יומיים';
	                }
	                return number + ' ימים';
	            },
	            M : 'חודש',
	            MM : function (number) {
	                if (number === 2) {
	                    return 'חודשיים';
	                }
	                return number + ' חודשים';
	            },
	            y : 'שנה',
	            yy : function (number) {
	                if (number === 2) {
	                    return 'שנתיים';
	                } else if (number % 10 === 0 && number !== 10) {
	                    return number + ' שנה';
	                }
	                return number + ' שנים';
	            }
	        },
	        meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
	        isPM : function (input) {
	            return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 5) {
	                return 'לפנות בוקר';
	            } else if (hour < 10) {
	                return 'בבוקר';
	            } else if (hour < 12) {
	                return isLower ? 'לפנה"צ' : 'לפני הצהריים';
	            } else if (hour < 18) {
	                return isLower ? 'אחה"צ' : 'אחרי הצהריים';
	            } else {
	                return 'בערב';
	            }
	        }
	    });

	    return he;

	}));

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Hindi [hi]
	//! author : Mayank Singhal : https://github.com/mayanksinghal

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '१',
	        '2': '२',
	        '3': '३',
	        '4': '४',
	        '5': '५',
	        '6': '६',
	        '7': '७',
	        '8': '८',
	        '9': '९',
	        '0': '०'
	    },
	    numberMap = {
	        '१': '1',
	        '२': '2',
	        '३': '3',
	        '४': '4',
	        '५': '5',
	        '६': '6',
	        '७': '7',
	        '८': '8',
	        '९': '9',
	        '०': '0'
	    };

	    var hi = moment.defineLocale('hi', {
	        months : 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
	        monthsShort : 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
	        weekdaysShort : 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
	        weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm बजे',
	            LTS : 'A h:mm:ss बजे',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm बजे',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm बजे'
	        },
	        calendar : {
	            sameDay : '[आज] LT',
	            nextDay : '[कल] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[कल] LT',
	            lastWeek : '[पिछले] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s में',
	            past : '%s पहले',
	            s : 'कुछ ही क्षण',
	            m : 'एक मिनट',
	            mm : '%d मिनट',
	            h : 'एक घंटा',
	            hh : '%d घंटे',
	            d : 'एक दिन',
	            dd : '%d दिन',
	            M : 'एक महीने',
	            MM : '%d महीने',
	            y : 'एक वर्ष',
	            yy : '%d वर्ष'
	        },
	        preparse: function (string) {
	            return string.replace(/[१२३४५६७८९०]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        // Hindi notation for meridiems are quite fuzzy in practice. While there exists
	        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
	        meridiemParse: /रात|सुबह|दोपहर|शाम/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'रात') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'सुबह') {
	                return hour;
	            } else if (meridiem === 'दोपहर') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'शाम') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'रात';
	            } else if (hour < 10) {
	                return 'सुबह';
	            } else if (hour < 17) {
	                return 'दोपहर';
	            } else if (hour < 20) {
	                return 'शाम';
	            } else {
	                return 'रात';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return hi;

	}));

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Croatian [hr]
	//! author : Bojan Marković : https://github.com/bmarkovic

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function translate(number, withoutSuffix, key) {
	        var result = number + ' ';
	        switch (key) {
	            case 'm':
	                return withoutSuffix ? 'jedna minuta' : 'jedne minute';
	            case 'mm':
	                if (number === 1) {
	                    result += 'minuta';
	                } else if (number === 2 || number === 3 || number === 4) {
	                    result += 'minute';
	                } else {
	                    result += 'minuta';
	                }
	                return result;
	            case 'h':
	                return withoutSuffix ? 'jedan sat' : 'jednog sata';
	            case 'hh':
	                if (number === 1) {
	                    result += 'sat';
	                } else if (number === 2 || number === 3 || number === 4) {
	                    result += 'sata';
	                } else {
	                    result += 'sati';
	                }
	                return result;
	            case 'dd':
	                if (number === 1) {
	                    result += 'dan';
	                } else {
	                    result += 'dana';
	                }
	                return result;
	            case 'MM':
	                if (number === 1) {
	                    result += 'mjesec';
	                } else if (number === 2 || number === 3 || number === 4) {
	                    result += 'mjeseca';
	                } else {
	                    result += 'mjeseci';
	                }
	                return result;
	            case 'yy':
	                if (number === 1) {
	                    result += 'godina';
	                } else if (number === 2 || number === 3 || number === 4) {
	                    result += 'godine';
	                } else {
	                    result += 'godina';
	                }
	                return result;
	        }
	    }

	    var hr = moment.defineLocale('hr', {
	        months : {
	            format: 'siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca'.split('_'),
	            standalone: 'siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_')
	        },
	        monthsShort : 'sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	        weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay  : '[danas u] LT',
	            nextDay  : '[sutra u] LT',
	            nextWeek : function () {
	                switch (this.day()) {
	                    case 0:
	                        return '[u] [nedjelju] [u] LT';
	                    case 3:
	                        return '[u] [srijedu] [u] LT';
	                    case 6:
	                        return '[u] [subotu] [u] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[u] dddd [u] LT';
	                }
	            },
	            lastDay  : '[jučer u] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                    case 0:
	                    case 3:
	                        return '[prošlu] dddd [u] LT';
	                    case 6:
	                        return '[prošle] [subote] [u] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[prošli] dddd [u] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past   : 'prije %s',
	            s      : 'par sekundi',
	            m      : translate,
	            mm     : translate,
	            h      : translate,
	            hh     : translate,
	            d      : 'dan',
	            dd     : translate,
	            M      : 'mjesec',
	            MM     : translate,
	            y      : 'godinu',
	            yy     : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return hr;

	}));

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Hungarian [hu]
	//! author : Adam Brunner : https://github.com/adambrunner

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var weekEndings = 'vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton'.split(' ');
	    function translate(number, withoutSuffix, key, isFuture) {
	        var num = number,
	            suffix;
	        switch (key) {
	            case 's':
	                return (isFuture || withoutSuffix) ? 'néhány másodperc' : 'néhány másodperce';
	            case 'm':
	                return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');
	            case 'mm':
	                return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
	            case 'h':
	                return 'egy' + (isFuture || withoutSuffix ? ' óra' : ' órája');
	            case 'hh':
	                return num + (isFuture || withoutSuffix ? ' óra' : ' órája');
	            case 'd':
	                return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');
	            case 'dd':
	                return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
	            case 'M':
	                return 'egy' + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
	            case 'MM':
	                return num + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
	            case 'y':
	                return 'egy' + (isFuture || withoutSuffix ? ' év' : ' éve');
	            case 'yy':
	                return num + (isFuture || withoutSuffix ? ' év' : ' éve');
	        }
	        return '';
	    }
	    function week(isFuture) {
	        return (isFuture ? '' : '[múlt] ') + '[' + weekEndings[this.day()] + '] LT[-kor]';
	    }

	    var hu = moment.defineLocale('hu', {
	        months : 'január_február_március_április_május_június_július_augusztus_szeptember_október_november_december'.split('_'),
	        monthsShort : 'jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec'.split('_'),
	        weekdays : 'vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat'.split('_'),
	        weekdaysShort : 'vas_hét_kedd_sze_csüt_pén_szo'.split('_'),
	        weekdaysMin : 'v_h_k_sze_cs_p_szo'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'YYYY.MM.DD.',
	            LL : 'YYYY. MMMM D.',
	            LLL : 'YYYY. MMMM D. H:mm',
	            LLLL : 'YYYY. MMMM D., dddd H:mm'
	        },
	        meridiemParse: /de|du/i,
	        isPM: function (input) {
	            return input.charAt(1).toLowerCase() === 'u';
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 12) {
	                return isLower === true ? 'de' : 'DE';
	            } else {
	                return isLower === true ? 'du' : 'DU';
	            }
	        },
	        calendar : {
	            sameDay : '[ma] LT[-kor]',
	            nextDay : '[holnap] LT[-kor]',
	            nextWeek : function () {
	                return week.call(this, true);
	            },
	            lastDay : '[tegnap] LT[-kor]',
	            lastWeek : function () {
	                return week.call(this, false);
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s múlva',
	            past : '%s',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return hu;

	}));

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Armenian [hy-am]
	//! author : Armendarabyan : https://github.com/armendarabyan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var hy_am = moment.defineLocale('hy-am', {
	        months : {
	            format: 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_'),
	            standalone: 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_')
	        },
	        monthsShort : 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
	        weekdays : 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_'),
	        weekdaysShort : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
	        weekdaysMin : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY թ.',
	            LLL : 'D MMMM YYYY թ., HH:mm',
	            LLLL : 'dddd, D MMMM YYYY թ., HH:mm'
	        },
	        calendar : {
	            sameDay: '[այսօր] LT',
	            nextDay: '[վաղը] LT',
	            lastDay: '[երեկ] LT',
	            nextWeek: function () {
	                return 'dddd [օրը ժամը] LT';
	            },
	            lastWeek: function () {
	                return '[անցած] dddd [օրը ժամը] LT';
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : '%s հետո',
	            past : '%s առաջ',
	            s : 'մի քանի վայրկյան',
	            m : 'րոպե',
	            mm : '%d րոպե',
	            h : 'ժամ',
	            hh : '%d ժամ',
	            d : 'օր',
	            dd : '%d օր',
	            M : 'ամիս',
	            MM : '%d ամիս',
	            y : 'տարի',
	            yy : '%d տարի'
	        },
	        meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
	        isPM: function (input) {
	            return /^(ցերեկվա|երեկոյան)$/.test(input);
	        },
	        meridiem : function (hour) {
	            if (hour < 4) {
	                return 'գիշերվա';
	            } else if (hour < 12) {
	                return 'առավոտվա';
	            } else if (hour < 17) {
	                return 'ցերեկվա';
	            } else {
	                return 'երեկոյան';
	            }
	        },
	        ordinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
	        ordinal: function (number, period) {
	            switch (period) {
	                case 'DDD':
	                case 'w':
	                case 'W':
	                case 'DDDo':
	                    if (number === 1) {
	                        return number + '-ին';
	                    }
	                    return number + '-րդ';
	                default:
	                    return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return hy_am;

	}));

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Indonesian [id]
	//! author : Mohammad Satrio Utomo : https://github.com/tyok
	//! reference: http://id.wikisource.org/wiki/Pedoman_Umum_Ejaan_Bahasa_Indonesia_yang_Disempurnakan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var id = moment.defineLocale('id', {
	        months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des'.split('_'),
	        weekdays : 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
	        weekdaysShort : 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
	        weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [pukul] HH.mm',
	            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /pagi|siang|sore|malam/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'pagi') {
	                return hour;
	            } else if (meridiem === 'siang') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'sore' || meridiem === 'malam') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'pagi';
	            } else if (hours < 15) {
	                return 'siang';
	            } else if (hours < 19) {
	                return 'sore';
	            } else {
	                return 'malam';
	            }
	        },
	        calendar : {
	            sameDay : '[Hari ini pukul] LT',
	            nextDay : '[Besok pukul] LT',
	            nextWeek : 'dddd [pukul] LT',
	            lastDay : '[Kemarin pukul] LT',
	            lastWeek : 'dddd [lalu pukul] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'dalam %s',
	            past : '%s yang lalu',
	            s : 'beberapa detik',
	            m : 'semenit',
	            mm : '%d menit',
	            h : 'sejam',
	            hh : '%d jam',
	            d : 'sehari',
	            dd : '%d hari',
	            M : 'sebulan',
	            MM : '%d bulan',
	            y : 'setahun',
	            yy : '%d tahun'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return id;

	}));

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Icelandic [is]
	//! author : Hinrik Örn Sigurðsson : https://github.com/hinrik

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function plural(n) {
	        if (n % 100 === 11) {
	            return true;
	        } else if (n % 10 === 1) {
	            return false;
	        }
	        return true;
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	            case 's':
	                return withoutSuffix || isFuture ? 'nokkrar sekúndur' : 'nokkrum sekúndum';
	            case 'm':
	                return withoutSuffix ? 'mínúta' : 'mínútu';
	            case 'mm':
	                if (plural(number)) {
	                    return result + (withoutSuffix || isFuture ? 'mínútur' : 'mínútum');
	                } else if (withoutSuffix) {
	                    return result + 'mínúta';
	                }
	                return result + 'mínútu';
	            case 'hh':
	                if (plural(number)) {
	                    return result + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum');
	                }
	                return result + 'klukkustund';
	            case 'd':
	                if (withoutSuffix) {
	                    return 'dagur';
	                }
	                return isFuture ? 'dag' : 'degi';
	            case 'dd':
	                if (plural(number)) {
	                    if (withoutSuffix) {
	                        return result + 'dagar';
	                    }
	                    return result + (isFuture ? 'daga' : 'dögum');
	                } else if (withoutSuffix) {
	                    return result + 'dagur';
	                }
	                return result + (isFuture ? 'dag' : 'degi');
	            case 'M':
	                if (withoutSuffix) {
	                    return 'mánuður';
	                }
	                return isFuture ? 'mánuð' : 'mánuði';
	            case 'MM':
	                if (plural(number)) {
	                    if (withoutSuffix) {
	                        return result + 'mánuðir';
	                    }
	                    return result + (isFuture ? 'mánuði' : 'mánuðum');
	                } else if (withoutSuffix) {
	                    return result + 'mánuður';
	                }
	                return result + (isFuture ? 'mánuð' : 'mánuði');
	            case 'y':
	                return withoutSuffix || isFuture ? 'ár' : 'ári';
	            case 'yy':
	                if (plural(number)) {
	                    return result + (withoutSuffix || isFuture ? 'ár' : 'árum');
	                }
	                return result + (withoutSuffix || isFuture ? 'ár' : 'ári');
	        }
	    }

	    var is = moment.defineLocale('is', {
	        months : 'janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des'.split('_'),
	        weekdays : 'sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur'.split('_'),
	        weekdaysShort : 'sun_mán_þri_mið_fim_fös_lau'.split('_'),
	        weekdaysMin : 'Su_Má_Þr_Mi_Fi_Fö_La'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY [kl.] H:mm',
	            LLLL : 'dddd, D. MMMM YYYY [kl.] H:mm'
	        },
	        calendar : {
	            sameDay : '[í dag kl.] LT',
	            nextDay : '[á morgun kl.] LT',
	            nextWeek : 'dddd [kl.] LT',
	            lastDay : '[í gær kl.] LT',
	            lastWeek : '[síðasta] dddd [kl.] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'eftir %s',
	            past : 'fyrir %s síðan',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : 'klukkustund',
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return is;

	}));

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Italian [it]
	//! author : Lorenzo : https://github.com/aliem
	//! author: Mattia Larentis: https://github.com/nostalgiaz

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var it = moment.defineLocale('it', {
	        months : 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
	        monthsShort : 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
	        weekdays : 'Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato'.split('_'),
	        weekdaysShort : 'Dom_Lun_Mar_Mer_Gio_Ven_Sab'.split('_'),
	        weekdaysMin : 'Do_Lu_Ma_Me_Gi_Ve_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Oggi alle] LT',
	            nextDay: '[Domani alle] LT',
	            nextWeek: 'dddd [alle] LT',
	            lastDay: '[Ieri alle] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                    case 0:
	                        return '[la scorsa] dddd [alle] LT';
	                    default:
	                        return '[lo scorso] dddd [alle] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : function (s) {
	                return ((/^[0-9].+$/).test(s) ? 'tra' : 'in') + ' ' + s;
	            },
	            past : '%s fa',
	            s : 'alcuni secondi',
	            m : 'un minuto',
	            mm : '%d minuti',
	            h : 'un\'ora',
	            hh : '%d ore',
	            d : 'un giorno',
	            dd : '%d giorni',
	            M : 'un mese',
	            MM : '%d mesi',
	            y : 'un anno',
	            yy : '%d anni'
	        },
	        ordinalParse : /\d{1,2}º/,
	        ordinal: '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return it;

	}));

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Japanese [ja]
	//! author : LI Long : https://github.com/baryon

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ja = moment.defineLocale('ja', {
	        months : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays : '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
	        weekdaysShort : '日_月_火_水_木_金_土'.split('_'),
	        weekdaysMin : '日_月_火_水_木_金_土'.split('_'),
	        longDateFormat : {
	            LT : 'Ah時m分',
	            LTS : 'Ah時m分s秒',
	            L : 'YYYY/MM/DD',
	            LL : 'YYYY年M月D日',
	            LLL : 'YYYY年M月D日Ah時m分',
	            LLLL : 'YYYY年M月D日Ah時m分 dddd'
	        },
	        meridiemParse: /午前|午後/i,
	        isPM : function (input) {
	            return input === '午後';
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return '午前';
	            } else {
	                return '午後';
	            }
	        },
	        calendar : {
	            sameDay : '[今日] LT',
	            nextDay : '[明日] LT',
	            nextWeek : '[来週]dddd LT',
	            lastDay : '[昨日] LT',
	            lastWeek : '[前週]dddd LT',
	            sameElse : 'L'
	        },
	        ordinalParse : /\d{1,2}日/,
	        ordinal : function (number, period) {
	            switch (period) {
	                case 'd':
	                case 'D':
	                case 'DDD':
	                    return number + '日';
	                default:
	                    return number;
	            }
	        },
	        relativeTime : {
	            future : '%s後',
	            past : '%s前',
	            s : '数秒',
	            m : '1分',
	            mm : '%d分',
	            h : '1時間',
	            hh : '%d時間',
	            d : '1日',
	            dd : '%d日',
	            M : '1ヶ月',
	            MM : '%dヶ月',
	            y : '1年',
	            yy : '%d年'
	        }
	    });

	    return ja;

	}));

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Javanese [jv]
	//! author : Rony Lantip : https://github.com/lantip
	//! reference: http://jv.wikipedia.org/wiki/Basa_Jawa

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var jv = moment.defineLocale('jv', {
	        months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des'.split('_'),
	        weekdays : 'Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu'.split('_'),
	        weekdaysShort : 'Min_Sen_Sel_Reb_Kem_Jem_Sep'.split('_'),
	        weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sp'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [pukul] HH.mm',
	            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /enjing|siyang|sonten|ndalu/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'enjing') {
	                return hour;
	            } else if (meridiem === 'siyang') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'sonten' || meridiem === 'ndalu') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'enjing';
	            } else if (hours < 15) {
	                return 'siyang';
	            } else if (hours < 19) {
	                return 'sonten';
	            } else {
	                return 'ndalu';
	            }
	        },
	        calendar : {
	            sameDay : '[Dinten puniko pukul] LT',
	            nextDay : '[Mbenjang pukul] LT',
	            nextWeek : 'dddd [pukul] LT',
	            lastDay : '[Kala wingi pukul] LT',
	            lastWeek : 'dddd [kepengker pukul] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'wonten ing %s',
	            past : '%s ingkang kepengker',
	            s : 'sawetawis detik',
	            m : 'setunggal menit',
	            mm : '%d menit',
	            h : 'setunggal jam',
	            hh : '%d jam',
	            d : 'sedinten',
	            dd : '%d dinten',
	            M : 'sewulan',
	            MM : '%d wulan',
	            y : 'setaun',
	            yy : '%d taun'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return jv;

	}));

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Georgian [ka]
	//! author : Irakli Janiashvili : https://github.com/irakli-janiashvili

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ka = moment.defineLocale('ka', {
	        months : {
	            standalone: 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
	            format: 'იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს'.split('_')
	        },
	        monthsShort : 'იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ'.split('_'),
	        weekdays : {
	            standalone: 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
	            format: 'კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს'.split('_'),
	            isFormat: /(წინა|შემდეგ)/
	        },
	        weekdaysShort : 'კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ'.split('_'),
	        weekdaysMin : 'კვ_ორ_სა_ოთ_ხუ_პა_შა'.split('_'),
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY h:mm A',
	            LLLL : 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : '[დღეს] LT[-ზე]',
	            nextDay : '[ხვალ] LT[-ზე]',
	            lastDay : '[გუშინ] LT[-ზე]',
	            nextWeek : '[შემდეგ] dddd LT[-ზე]',
	            lastWeek : '[წინა] dddd LT-ზე',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : function (s) {
	                return (/(წამი|წუთი|საათი|წელი)/).test(s) ?
	                    s.replace(/ი$/, 'ში') :
	                    s + 'ში';
	            },
	            past : function (s) {
	                if ((/(წამი|წუთი|საათი|დღე|თვე)/).test(s)) {
	                    return s.replace(/(ი|ე)$/, 'ის წინ');
	                }
	                if ((/წელი/).test(s)) {
	                    return s.replace(/წელი$/, 'წლის წინ');
	                }
	            },
	            s : 'რამდენიმე წამი',
	            m : 'წუთი',
	            mm : '%d წუთი',
	            h : 'საათი',
	            hh : '%d საათი',
	            d : 'დღე',
	            dd : '%d დღე',
	            M : 'თვე',
	            MM : '%d თვე',
	            y : 'წელი',
	            yy : '%d წელი'
	        },
	        ordinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
	        ordinal : function (number) {
	            if (number === 0) {
	                return number;
	            }
	            if (number === 1) {
	                return number + '-ლი';
	            }
	            if ((number < 20) || (number <= 100 && (number % 20 === 0)) || (number % 100 === 0)) {
	                return 'მე-' + number;
	            }
	            return number + '-ე';
	        },
	        week : {
	            dow : 1,
	            doy : 7
	        }
	    });

	    return ka;

	}));

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Kazakh [kk]
	//! authors : Nurlan Rakhimzhanov : https://github.com/nurlan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var suffixes = {
	        0: '-ші',
	        1: '-ші',
	        2: '-ші',
	        3: '-ші',
	        4: '-ші',
	        5: '-ші',
	        6: '-шы',
	        7: '-ші',
	        8: '-ші',
	        9: '-шы',
	        10: '-шы',
	        20: '-шы',
	        30: '-шы',
	        40: '-шы',
	        50: '-ші',
	        60: '-шы',
	        70: '-ші',
	        80: '-ші',
	        90: '-шы',
	        100: '-ші'
	    };

	    var kk = moment.defineLocale('kk', {
	        months : 'қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан'.split('_'),
	        monthsShort : 'қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел'.split('_'),
	        weekdays : 'жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі'.split('_'),
	        weekdaysShort : 'жек_дүй_сей_сәр_бей_жұм_сен'.split('_'),
	        weekdaysMin : 'жк_дй_сй_ср_бй_жм_сн'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Бүгін сағат] LT',
	            nextDay : '[Ертең сағат] LT',
	            nextWeek : 'dddd [сағат] LT',
	            lastDay : '[Кеше сағат] LT',
	            lastWeek : '[Өткен аптаның] dddd [сағат] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s ішінде',
	            past : '%s бұрын',
	            s : 'бірнеше секунд',
	            m : 'бір минут',
	            mm : '%d минут',
	            h : 'бір сағат',
	            hh : '%d сағат',
	            d : 'бір күн',
	            dd : '%d күн',
	            M : 'бір ай',
	            MM : '%d ай',
	            y : 'бір жыл',
	            yy : '%d жыл'
	        },
	        ordinalParse: /\d{1,2}-(ші|шы)/,
	        ordinal : function (number) {
	            var a = number % 10,
	                b = number >= 100 ? 100 : null;
	            return number + (suffixes[number] || suffixes[a] || suffixes[b]);
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return kk;

	}));

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Cambodian [km]
	//! author : Kruy Vanna : https://github.com/kruyvanna

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var km = moment.defineLocale('km', {
	        months: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
	        monthsShort: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
	        weekdays: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	        weekdaysShort: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	        weekdaysMin: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[ថ្ងៃនេះ ម៉ោង] LT',
	            nextDay: '[ស្អែក ម៉ោង] LT',
	            nextWeek: 'dddd [ម៉ោង] LT',
	            lastDay: '[ម្សិលមិញ ម៉ោង] LT',
	            lastWeek: 'dddd [សប្តាហ៍មុន] [ម៉ោង] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%sទៀត',
	            past: '%sមុន',
	            s: 'ប៉ុន្មានវិនាទី',
	            m: 'មួយនាទី',
	            mm: '%d នាទី',
	            h: 'មួយម៉ោង',
	            hh: '%d ម៉ោង',
	            d: 'មួយថ្ងៃ',
	            dd: '%d ថ្ងៃ',
	            M: 'មួយខែ',
	            MM: '%d ខែ',
	            y: 'មួយឆ្នាំ',
	            yy: '%d ឆ្នាំ'
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return km;

	}));

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Korean [ko]
	//! author : Kyungwook, Park : https://github.com/kyungw00k
	//! author : Jeeeyul Lee <jeeeyul@gmail.com>

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ko = moment.defineLocale('ko', {
	        months : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
	        monthsShort : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
	        weekdays : '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
	        weekdaysShort : '일_월_화_수_목_금_토'.split('_'),
	        weekdaysMin : '일_월_화_수_목_금_토'.split('_'),
	        longDateFormat : {
	            LT : 'A h시 m분',
	            LTS : 'A h시 m분 s초',
	            L : 'YYYY.MM.DD',
	            LL : 'YYYY년 MMMM D일',
	            LLL : 'YYYY년 MMMM D일 A h시 m분',
	            LLLL : 'YYYY년 MMMM D일 dddd A h시 m분'
	        },
	        calendar : {
	            sameDay : '오늘 LT',
	            nextDay : '내일 LT',
	            nextWeek : 'dddd LT',
	            lastDay : '어제 LT',
	            lastWeek : '지난주 dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s 후',
	            past : '%s 전',
	            s : '몇 초',
	            ss : '%d초',
	            m : '일분',
	            mm : '%d분',
	            h : '한 시간',
	            hh : '%d시간',
	            d : '하루',
	            dd : '%d일',
	            M : '한 달',
	            MM : '%d달',
	            y : '일 년',
	            yy : '%d년'
	        },
	        ordinalParse : /\d{1,2}일/,
	        ordinal : '%d일',
	        meridiemParse : /오전|오후/,
	        isPM : function (token) {
	            return token === '오후';
	        },
	        meridiem : function (hour, minute, isUpper) {
	            return hour < 12 ? '오전' : '오후';
	        }
	    });

	    return ko;

	}));

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Kyrgyz [ky]
	//! author : Chyngyz Arystan uulu : https://github.com/chyngyz

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';



	    var suffixes = {
	        0: '-чү',
	        1: '-чи',
	        2: '-чи',
	        3: '-чү',
	        4: '-чү',
	        5: '-чи',
	        6: '-чы',
	        7: '-чи',
	        8: '-чи',
	        9: '-чу',
	        10: '-чу',
	        20: '-чы',
	        30: '-чу',
	        40: '-чы',
	        50: '-чү',
	        60: '-чы',
	        70: '-чи',
	        80: '-чи',
	        90: '-чу',
	        100: '-чү'
	    };

	    var ky = moment.defineLocale('ky', {
	        months : 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
	        monthsShort : 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
	        weekdays : 'Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби'.split('_'),
	        weekdaysShort : 'Жек_Дүй_Шей_Шар_Бей_Жум_Ише'.split('_'),
	        weekdaysMin : 'Жк_Дй_Шй_Шр_Бй_Жм_Иш'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Бүгүн саат] LT',
	            nextDay : '[Эртең саат] LT',
	            nextWeek : 'dddd [саат] LT',
	            lastDay : '[Кече саат] LT',
	            lastWeek : '[Өткен аптанын] dddd [күнү] [саат] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s ичинде',
	            past : '%s мурун',
	            s : 'бирнече секунд',
	            m : 'бир мүнөт',
	            mm : '%d мүнөт',
	            h : 'бир саат',
	            hh : '%d саат',
	            d : 'бир күн',
	            dd : '%d күн',
	            M : 'бир ай',
	            MM : '%d ай',
	            y : 'бир жыл',
	            yy : '%d жыл'
	        },
	        ordinalParse: /\d{1,2}-(чи|чы|чү|чу)/,
	        ordinal : function (number) {
	            var a = number % 10,
	                b = number >= 100 ? 100 : null;
	            return number + (suffixes[number] || suffixes[a] || suffixes[b]);
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ky;

	}));

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Luxembourgish [lb]
	//! author : mweimerskirch : https://github.com/mweimerskirch
	//! author : David Raison : https://github.com/kwisatz

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            'm': ['eng Minutt', 'enger Minutt'],
	            'h': ['eng Stonn', 'enger Stonn'],
	            'd': ['een Dag', 'engem Dag'],
	            'M': ['ee Mount', 'engem Mount'],
	            'y': ['ee Joer', 'engem Joer']
	        };
	        return withoutSuffix ? format[key][0] : format[key][1];
	    }
	    function processFutureTime(string) {
	        var number = string.substr(0, string.indexOf(' '));
	        if (eifelerRegelAppliesToNumber(number)) {
	            return 'a ' + string;
	        }
	        return 'an ' + string;
	    }
	    function processPastTime(string) {
	        var number = string.substr(0, string.indexOf(' '));
	        if (eifelerRegelAppliesToNumber(number)) {
	            return 'viru ' + string;
	        }
	        return 'virun ' + string;
	    }
	    /**
	     * Returns true if the word before the given number loses the '-n' ending.
	     * e.g. 'an 10 Deeg' but 'a 5 Deeg'
	     *
	     * @param number {integer}
	     * @returns {boolean}
	     */
	    function eifelerRegelAppliesToNumber(number) {
	        number = parseInt(number, 10);
	        if (isNaN(number)) {
	            return false;
	        }
	        if (number < 0) {
	            // Negative Number --> always true
	            return true;
	        } else if (number < 10) {
	            // Only 1 digit
	            if (4 <= number && number <= 7) {
	                return true;
	            }
	            return false;
	        } else if (number < 100) {
	            // 2 digits
	            var lastDigit = number % 10, firstDigit = number / 10;
	            if (lastDigit === 0) {
	                return eifelerRegelAppliesToNumber(firstDigit);
	            }
	            return eifelerRegelAppliesToNumber(lastDigit);
	        } else if (number < 10000) {
	            // 3 or 4 digits --> recursively check first digit
	            while (number >= 10) {
	                number = number / 10;
	            }
	            return eifelerRegelAppliesToNumber(number);
	        } else {
	            // Anything larger than 4 digits: recursively check first n-3 digits
	            number = number / 1000;
	            return eifelerRegelAppliesToNumber(number);
	        }
	    }

	    var lb = moment.defineLocale('lb', {
	        months: 'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	        monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	        monthsParseExact : true,
	        weekdays: 'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
	        weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
	        weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat: {
	            LT: 'H:mm [Auer]',
	            LTS: 'H:mm:ss [Auer]',
	            L: 'DD.MM.YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm [Auer]',
	            LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
	        },
	        calendar: {
	            sameDay: '[Haut um] LT',
	            sameElse: 'L',
	            nextDay: '[Muer um] LT',
	            nextWeek: 'dddd [um] LT',
	            lastDay: '[Gëschter um] LT',
	            lastWeek: function () {
	                // Different date string for 'Dënschdeg' (Tuesday) and 'Donneschdeg' (Thursday) due to phonological rule
	                switch (this.day()) {
	                    case 2:
	                    case 4:
	                        return '[Leschten] dddd [um] LT';
	                    default:
	                        return '[Leschte] dddd [um] LT';
	                }
	            }
	        },
	        relativeTime : {
	            future : processFutureTime,
	            past : processPastTime,
	            s : 'e puer Sekonnen',
	            m : processRelativeTime,
	            mm : '%d Minutten',
	            h : processRelativeTime,
	            hh : '%d Stonnen',
	            d : processRelativeTime,
	            dd : '%d Deeg',
	            M : processRelativeTime,
	            MM : '%d Méint',
	            y : processRelativeTime,
	            yy : '%d Joer'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return lb;

	}));

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Lao [lo]
	//! author : Ryan Hart : https://github.com/ryanhart2

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var lo = moment.defineLocale('lo', {
	        months : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
	        monthsShort : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
	        weekdays : 'ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
	        weekdaysShort : 'ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
	        weekdaysMin : 'ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'ວັນdddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
	        isPM: function (input) {
	            return input === 'ຕອນແລງ';
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ຕອນເຊົ້າ';
	            } else {
	                return 'ຕອນແລງ';
	            }
	        },
	        calendar : {
	            sameDay : '[ມື້ນີ້ເວລາ] LT',
	            nextDay : '[ມື້ອື່ນເວລາ] LT',
	            nextWeek : '[ວັນ]dddd[ໜ້າເວລາ] LT',
	            lastDay : '[ມື້ວານນີ້ເວລາ] LT',
	            lastWeek : '[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'ອີກ %s',
	            past : '%sຜ່ານມາ',
	            s : 'ບໍ່ເທົ່າໃດວິນາທີ',
	            m : '1 ນາທີ',
	            mm : '%d ນາທີ',
	            h : '1 ຊົ່ວໂມງ',
	            hh : '%d ຊົ່ວໂມງ',
	            d : '1 ມື້',
	            dd : '%d ມື້',
	            M : '1 ເດືອນ',
	            MM : '%d ເດືອນ',
	            y : '1 ປີ',
	            yy : '%d ປີ'
	        },
	        ordinalParse: /(ທີ່)\d{1,2}/,
	        ordinal : function (number) {
	            return 'ທີ່' + number;
	        }
	    });

	    return lo;

	}));

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Lithuanian [lt]
	//! author : Mindaugas Mozūras : https://github.com/mmozuras

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var units = {
	        'm' : 'minutė_minutės_minutę',
	        'mm': 'minutės_minučių_minutes',
	        'h' : 'valanda_valandos_valandą',
	        'hh': 'valandos_valandų_valandas',
	        'd' : 'diena_dienos_dieną',
	        'dd': 'dienos_dienų_dienas',
	        'M' : 'mėnuo_mėnesio_mėnesį',
	        'MM': 'mėnesiai_mėnesių_mėnesius',
	        'y' : 'metai_metų_metus',
	        'yy': 'metai_metų_metus'
	    };
	    function translateSeconds(number, withoutSuffix, key, isFuture) {
	        if (withoutSuffix) {
	            return 'kelios sekundės';
	        } else {
	            return isFuture ? 'kelių sekundžių' : 'kelias sekundes';
	        }
	    }
	    function translateSingular(number, withoutSuffix, key, isFuture) {
	        return withoutSuffix ? forms(key)[0] : (isFuture ? forms(key)[1] : forms(key)[2]);
	    }
	    function special(number) {
	        return number % 10 === 0 || (number > 10 && number < 20);
	    }
	    function forms(key) {
	        return units[key].split('_');
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        if (number === 1) {
	            return result + translateSingular(number, withoutSuffix, key[0], isFuture);
	        } else if (withoutSuffix) {
	            return result + (special(number) ? forms(key)[1] : forms(key)[0]);
	        } else {
	            if (isFuture) {
	                return result + forms(key)[1];
	            } else {
	                return result + (special(number) ? forms(key)[1] : forms(key)[2]);
	            }
	        }
	    }
	    var lt = moment.defineLocale('lt', {
	        months : {
	            format: 'sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio'.split('_'),
	            standalone: 'sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis'.split('_'),
	            isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
	        },
	        monthsShort : 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
	        weekdays : {
	            format: 'sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį'.split('_'),
	            standalone: 'sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis'.split('_'),
	            isFormat: /dddd HH:mm/
	        },
	        weekdaysShort : 'Sek_Pir_Ant_Tre_Ket_Pen_Šeš'.split('_'),
	        weekdaysMin : 'S_P_A_T_K_Pn_Š'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'YYYY [m.] MMMM D [d.]',
	            LLL : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
	            LLLL : 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
	            l : 'YYYY-MM-DD',
	            ll : 'YYYY [m.] MMMM D [d.]',
	            lll : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
	            llll : 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
	        },
	        calendar : {
	            sameDay : '[Šiandien] LT',
	            nextDay : '[Rytoj] LT',
	            nextWeek : 'dddd LT',
	            lastDay : '[Vakar] LT',
	            lastWeek : '[Praėjusį] dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'po %s',
	            past : 'prieš %s',
	            s : translateSeconds,
	            m : translateSingular,
	            mm : translate,
	            h : translateSingular,
	            hh : translate,
	            d : translateSingular,
	            dd : translate,
	            M : translateSingular,
	            MM : translate,
	            y : translateSingular,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}-oji/,
	        ordinal : function (number) {
	            return number + '-oji';
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return lt;

	}));

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Latvian [lv]
	//! author : Kristaps Karlsons : https://github.com/skakri
	//! author : Jānis Elmeris : https://github.com/JanisE

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var units = {
	        'm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
	        'mm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
	        'h': 'stundas_stundām_stunda_stundas'.split('_'),
	        'hh': 'stundas_stundām_stunda_stundas'.split('_'),
	        'd': 'dienas_dienām_diena_dienas'.split('_'),
	        'dd': 'dienas_dienām_diena_dienas'.split('_'),
	        'M': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
	        'MM': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
	        'y': 'gada_gadiem_gads_gadi'.split('_'),
	        'yy': 'gada_gadiem_gads_gadi'.split('_')
	    };
	    /**
	     * @param withoutSuffix boolean true = a length of time; false = before/after a period of time.
	     */
	    function format(forms, number, withoutSuffix) {
	        if (withoutSuffix) {
	            // E.g. "21 minūte", "3 minūtes".
	            return number % 10 === 1 && number % 100 !== 11 ? forms[2] : forms[3];
	        } else {
	            // E.g. "21 minūtes" as in "pēc 21 minūtes".
	            // E.g. "3 minūtēm" as in "pēc 3 minūtēm".
	            return number % 10 === 1 && number % 100 !== 11 ? forms[0] : forms[1];
	        }
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        return number + ' ' + format(units[key], number, withoutSuffix);
	    }
	    function relativeTimeWithSingular(number, withoutSuffix, key) {
	        return format(units[key], number, withoutSuffix);
	    }
	    function relativeSeconds(number, withoutSuffix) {
	        return withoutSuffix ? 'dažas sekundes' : 'dažām sekundēm';
	    }

	    var lv = moment.defineLocale('lv', {
	        months : 'janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec'.split('_'),
	        weekdays : 'svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena'.split('_'),
	        weekdaysShort : 'Sv_P_O_T_C_Pk_S'.split('_'),
	        weekdaysMin : 'Sv_P_O_T_C_Pk_S'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY.',
	            LL : 'YYYY. [gada] D. MMMM',
	            LLL : 'YYYY. [gada] D. MMMM, HH:mm',
	            LLLL : 'YYYY. [gada] D. MMMM, dddd, HH:mm'
	        },
	        calendar : {
	            sameDay : '[Šodien pulksten] LT',
	            nextDay : '[Rīt pulksten] LT',
	            nextWeek : 'dddd [pulksten] LT',
	            lastDay : '[Vakar pulksten] LT',
	            lastWeek : '[Pagājušā] dddd [pulksten] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'pēc %s',
	            past : 'pirms %s',
	            s : relativeSeconds,
	            m : relativeTimeWithSingular,
	            mm : relativeTimeWithPlural,
	            h : relativeTimeWithSingular,
	            hh : relativeTimeWithPlural,
	            d : relativeTimeWithSingular,
	            dd : relativeTimeWithPlural,
	            M : relativeTimeWithSingular,
	            MM : relativeTimeWithPlural,
	            y : relativeTimeWithSingular,
	            yy : relativeTimeWithPlural
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return lv;

	}));

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Montenegrin [me]
	//! author : Miodrag Nikač <miodrag@restartit.me> : https://github.com/miodragnikac

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var translator = {
	        words: { //Different grammatical cases
	            m: ['jedan minut', 'jednog minuta'],
	            mm: ['minut', 'minuta', 'minuta'],
	            h: ['jedan sat', 'jednog sata'],
	            hh: ['sat', 'sata', 'sati'],
	            dd: ['dan', 'dana', 'dana'],
	            MM: ['mjesec', 'mjeseca', 'mjeseci'],
	            yy: ['godina', 'godine', 'godina']
	        },
	        correctGrammaticalCase: function (number, wordKey) {
	            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	        },
	        translate: function (number, withoutSuffix, key) {
	            var wordKey = translator.words[key];
	            if (key.length === 1) {
	                return withoutSuffix ? wordKey[0] : wordKey[1];
	            } else {
	                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	            }
	        }
	    };

	    var me = moment.defineLocale('me', {
	        months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
	        monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
	        monthsParseExact : true,
	        weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[danas u] LT',
	            nextDay: '[sjutra u] LT',

	            nextWeek: function () {
	                switch (this.day()) {
	                    case 0:
	                        return '[u] [nedjelju] [u] LT';
	                    case 3:
	                        return '[u] [srijedu] [u] LT';
	                    case 6:
	                        return '[u] [subotu] [u] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[u] dddd [u] LT';
	                }
	            },
	            lastDay  : '[juče u] LT',
	            lastWeek : function () {
	                var lastWeekDays = [
	                    '[prošle] [nedjelje] [u] LT',
	                    '[prošlog] [ponedjeljka] [u] LT',
	                    '[prošlog] [utorka] [u] LT',
	                    '[prošle] [srijede] [u] LT',
	                    '[prošlog] [četvrtka] [u] LT',
	                    '[prošlog] [petka] [u] LT',
	                    '[prošle] [subote] [u] LT'
	                ];
	                return lastWeekDays[this.day()];
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past   : 'prije %s',
	            s      : 'nekoliko sekundi',
	            m      : translator.translate,
	            mm     : translator.translate,
	            h      : translator.translate,
	            hh     : translator.translate,
	            d      : 'dan',
	            dd     : translator.translate,
	            M      : 'mjesec',
	            MM     : translator.translate,
	            y      : 'godinu',
	            yy     : translator.translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return me;

	}));

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Maori [mi]
	//! author : John Corrigan <robbiecloset@gmail.com> : https://github.com/johnideal

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var mi = moment.defineLocale('mi', {
	        months: 'Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea'.split('_'),
	        monthsShort: 'Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki'.split('_'),
	        monthsRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
	        monthsStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
	        monthsShortRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
	        monthsShortStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,
	        weekdays: 'Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei'.split('_'),
	        weekdaysShort: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
	        weekdaysMin: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY [i] HH:mm',
	            LLLL: 'dddd, D MMMM YYYY [i] HH:mm'
	        },
	        calendar: {
	            sameDay: '[i teie mahana, i] LT',
	            nextDay: '[apopo i] LT',
	            nextWeek: 'dddd [i] LT',
	            lastDay: '[inanahi i] LT',
	            lastWeek: 'dddd [whakamutunga i] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'i roto i %s',
	            past: '%s i mua',
	            s: 'te hēkona ruarua',
	            m: 'he meneti',
	            mm: '%d meneti',
	            h: 'te haora',
	            hh: '%d haora',
	            d: 'he ra',
	            dd: '%d ra',
	            M: 'he marama',
	            MM: '%d marama',
	            y: 'he tau',
	            yy: '%d tau'
	        },
	        ordinalParse: /\d{1,2}º/,
	        ordinal: '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return mi;

	}));

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Macedonian [mk]
	//! author : Borislav Mickov : https://github.com/B0k0

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var mk = moment.defineLocale('mk', {
	        months : 'јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември'.split('_'),
	        monthsShort : 'јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек'.split('_'),
	        weekdays : 'недела_понеделник_вторник_среда_четврток_петок_сабота'.split('_'),
	        weekdaysShort : 'нед_пон_вто_сре_чет_пет_саб'.split('_'),
	        weekdaysMin : 'нe_пo_вт_ср_че_пе_сa'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'D.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd, D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay : '[Денес во] LT',
	            nextDay : '[Утре во] LT',
	            nextWeek : '[Во] dddd [во] LT',
	            lastDay : '[Вчера во] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                    case 0:
	                    case 3:
	                    case 6:
	                        return '[Изминатата] dddd [во] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[Изминатиот] dddd [во] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'после %s',
	            past : 'пред %s',
	            s : 'неколку секунди',
	            m : 'минута',
	            mm : '%d минути',
	            h : 'час',
	            hh : '%d часа',
	            d : 'ден',
	            dd : '%d дена',
	            M : 'месец',
	            MM : '%d месеци',
	            y : 'година',
	            yy : '%d години'
	        },
	        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
	        ordinal : function (number) {
	            var lastDigit = number % 10,
	                last2Digits = number % 100;
	            if (number === 0) {
	                return number + '-ев';
	            } else if (last2Digits === 0) {
	                return number + '-ен';
	            } else if (last2Digits > 10 && last2Digits < 20) {
	                return number + '-ти';
	            } else if (lastDigit === 1) {
	                return number + '-ви';
	            } else if (lastDigit === 2) {
	                return number + '-ри';
	            } else if (lastDigit === 7 || lastDigit === 8) {
	                return number + '-ми';
	            } else {
	                return number + '-ти';
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return mk;

	}));

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Malayalam [ml]
	//! author : Floyd Pink : https://github.com/floydpink

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ml = moment.defineLocale('ml', {
	        months : 'ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ'.split('_'),
	        monthsShort : 'ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച'.split('_'),
	        weekdaysShort : 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split('_'),
	        weekdaysMin : 'ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm -നു',
	            LTS : 'A h:mm:ss -നു',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm -നു',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm -നു'
	        },
	        calendar : {
	            sameDay : '[ഇന്ന്] LT',
	            nextDay : '[നാളെ] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[ഇന്നലെ] LT',
	            lastWeek : '[കഴിഞ്ഞ] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s കഴിഞ്ഞ്',
	            past : '%s മുൻപ്',
	            s : 'അൽപ നിമിഷങ്ങൾ',
	            m : 'ഒരു മിനിറ്റ്',
	            mm : '%d മിനിറ്റ്',
	            h : 'ഒരു മണിക്കൂർ',
	            hh : '%d മണിക്കൂർ',
	            d : 'ഒരു ദിവസം',
	            dd : '%d ദിവസം',
	            M : 'ഒരു മാസം',
	            MM : '%d മാസം',
	            y : 'ഒരു വർഷം',
	            yy : '%d വർഷം'
	        },
	        meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if ((meridiem === 'രാത്രി' && hour >= 4) ||
	                    meridiem === 'ഉച്ച കഴിഞ്ഞ്' ||
	                    meridiem === 'വൈകുന്നേരം') {
	                return hour + 12;
	            } else {
	                return hour;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'രാത്രി';
	            } else if (hour < 12) {
	                return 'രാവിലെ';
	            } else if (hour < 17) {
	                return 'ഉച്ച കഴിഞ്ഞ്';
	            } else if (hour < 20) {
	                return 'വൈകുന്നേരം';
	            } else {
	                return 'രാത്രി';
	            }
	        }
	    });

	    return ml;

	}));

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Marathi [mr]
	//! author : Harshad Kale : https://github.com/kalehv
	//! author : Vivek Athalye : https://github.com/vnathalye

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '१',
	        '2': '२',
	        '3': '३',
	        '4': '४',
	        '5': '५',
	        '6': '६',
	        '7': '७',
	        '8': '८',
	        '9': '९',
	        '0': '०'
	    },
	    numberMap = {
	        '१': '1',
	        '२': '2',
	        '३': '3',
	        '४': '4',
	        '५': '5',
	        '६': '6',
	        '७': '7',
	        '८': '8',
	        '९': '9',
	        '०': '0'
	    };

	    function relativeTimeMr(number, withoutSuffix, string, isFuture)
	    {
	        var output = '';
	        if (withoutSuffix) {
	            switch (string) {
	                case 's': output = 'काही सेकंद'; break;
	                case 'm': output = 'एक मिनिट'; break;
	                case 'mm': output = '%d मिनिटे'; break;
	                case 'h': output = 'एक तास'; break;
	                case 'hh': output = '%d तास'; break;
	                case 'd': output = 'एक दिवस'; break;
	                case 'dd': output = '%d दिवस'; break;
	                case 'M': output = 'एक महिना'; break;
	                case 'MM': output = '%d महिने'; break;
	                case 'y': output = 'एक वर्ष'; break;
	                case 'yy': output = '%d वर्षे'; break;
	            }
	        }
	        else {
	            switch (string) {
	                case 's': output = 'काही सेकंदां'; break;
	                case 'm': output = 'एका मिनिटा'; break;
	                case 'mm': output = '%d मिनिटां'; break;
	                case 'h': output = 'एका तासा'; break;
	                case 'hh': output = '%d तासां'; break;
	                case 'd': output = 'एका दिवसा'; break;
	                case 'dd': output = '%d दिवसां'; break;
	                case 'M': output = 'एका महिन्या'; break;
	                case 'MM': output = '%d महिन्यां'; break;
	                case 'y': output = 'एका वर्षा'; break;
	                case 'yy': output = '%d वर्षां'; break;
	            }
	        }
	        return output.replace(/%d/i, number);
	    }

	    var mr = moment.defineLocale('mr', {
	        months : 'जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर'.split('_'),
	        monthsShort: 'जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
	        weekdaysShort : 'रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि'.split('_'),
	        weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm वाजता',
	            LTS : 'A h:mm:ss वाजता',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm वाजता',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm वाजता'
	        },
	        calendar : {
	            sameDay : '[आज] LT',
	            nextDay : '[उद्या] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[काल] LT',
	            lastWeek: '[मागील] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future: '%sमध्ये',
	            past: '%sपूर्वी',
	            s: relativeTimeMr,
	            m: relativeTimeMr,
	            mm: relativeTimeMr,
	            h: relativeTimeMr,
	            hh: relativeTimeMr,
	            d: relativeTimeMr,
	            dd: relativeTimeMr,
	            M: relativeTimeMr,
	            MM: relativeTimeMr,
	            y: relativeTimeMr,
	            yy: relativeTimeMr
	        },
	        preparse: function (string) {
	            return string.replace(/[१२३४५६७८९०]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'रात्री') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'सकाळी') {
	                return hour;
	            } else if (meridiem === 'दुपारी') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'सायंकाळी') {
	                return hour + 12;
	            }
	        },
	        meridiem: function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'रात्री';
	            } else if (hour < 10) {
	                return 'सकाळी';
	            } else if (hour < 17) {
	                return 'दुपारी';
	            } else if (hour < 20) {
	                return 'सायंकाळी';
	            } else {
	                return 'रात्री';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return mr;

	}));

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Malay [ms]
	//! author : Weldan Jamili : https://github.com/weldan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ms = moment.defineLocale('ms', {
	        months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
	        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
	        weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
	        weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
	        weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [pukul] HH.mm',
	            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /pagi|tengahari|petang|malam/,
	        meridiemHour: function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'pagi') {
	                return hour;
	            } else if (meridiem === 'tengahari') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'petang' || meridiem === 'malam') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'pagi';
	            } else if (hours < 15) {
	                return 'tengahari';
	            } else if (hours < 19) {
	                return 'petang';
	            } else {
	                return 'malam';
	            }
	        },
	        calendar : {
	            sameDay : '[Hari ini pukul] LT',
	            nextDay : '[Esok pukul] LT',
	            nextWeek : 'dddd [pukul] LT',
	            lastDay : '[Kelmarin pukul] LT',
	            lastWeek : 'dddd [lepas pukul] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'dalam %s',
	            past : '%s yang lepas',
	            s : 'beberapa saat',
	            m : 'seminit',
	            mm : '%d minit',
	            h : 'sejam',
	            hh : '%d jam',
	            d : 'sehari',
	            dd : '%d hari',
	            M : 'sebulan',
	            MM : '%d bulan',
	            y : 'setahun',
	            yy : '%d tahun'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ms;

	}));

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Malay [ms-my]
	//! note : DEPRECATED, the correct one is [ms]
	//! author : Weldan Jamili : https://github.com/weldan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ms_my = moment.defineLocale('ms-my', {
	        months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
	        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
	        weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
	        weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
	        weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [pukul] HH.mm',
	            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /pagi|tengahari|petang|malam/,
	        meridiemHour: function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'pagi') {
	                return hour;
	            } else if (meridiem === 'tengahari') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'petang' || meridiem === 'malam') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'pagi';
	            } else if (hours < 15) {
	                return 'tengahari';
	            } else if (hours < 19) {
	                return 'petang';
	            } else {
	                return 'malam';
	            }
	        },
	        calendar : {
	            sameDay : '[Hari ini pukul] LT',
	            nextDay : '[Esok pukul] LT',
	            nextWeek : 'dddd [pukul] LT',
	            lastDay : '[Kelmarin pukul] LT',
	            lastWeek : 'dddd [lepas pukul] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'dalam %s',
	            past : '%s yang lepas',
	            s : 'beberapa saat',
	            m : 'seminit',
	            mm : '%d minit',
	            h : 'sejam',
	            hh : '%d jam',
	            d : 'sehari',
	            dd : '%d hari',
	            M : 'sebulan',
	            MM : '%d bulan',
	            y : 'setahun',
	            yy : '%d tahun'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ms_my;

	}));

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Burmese [my]
	//! author : Squar team, mysquar.com
	//! author : David Rossellat : https://github.com/gholadr
	//! author : Tin Aung Lin : https://github.com/thanyawzinmin

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '၁',
	        '2': '၂',
	        '3': '၃',
	        '4': '၄',
	        '5': '၅',
	        '6': '၆',
	        '7': '၇',
	        '8': '၈',
	        '9': '၉',
	        '0': '၀'
	    }, numberMap = {
	        '၁': '1',
	        '၂': '2',
	        '၃': '3',
	        '၄': '4',
	        '၅': '5',
	        '၆': '6',
	        '၇': '7',
	        '၈': '8',
	        '၉': '9',
	        '၀': '0'
	    };

	    var my = moment.defineLocale('my', {
	        months: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split('_'),
	        monthsShort: 'ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ'.split('_'),
	        weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split('_'),
	        weekdaysShort: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
	        weekdaysMin: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),

	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[ယနေ.] LT [မှာ]',
	            nextDay: '[မနက်ဖြန်] LT [မှာ]',
	            nextWeek: 'dddd LT [မှာ]',
	            lastDay: '[မနေ.က] LT [မှာ]',
	            lastWeek: '[ပြီးခဲ့သော] dddd LT [မှာ]',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'လာမည့် %s မှာ',
	            past: 'လွန်ခဲ့သော %s က',
	            s: 'စက္ကန်.အနည်းငယ်',
	            m: 'တစ်မိနစ်',
	            mm: '%d မိနစ်',
	            h: 'တစ်နာရီ',
	            hh: '%d နာရီ',
	            d: 'တစ်ရက်',
	            dd: '%d ရက်',
	            M: 'တစ်လ',
	            MM: '%d လ',
	            y: 'တစ်နှစ်',
	            yy: '%d နှစ်'
	        },
	        preparse: function (string) {
	            return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return my;

	}));

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Norwegian Bokmål [nb]
	//! authors : Espen Hovlandsdal : https://github.com/rexxars
	//!           Sigurd Gartmann : https://github.com/sigurdga

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var nb = moment.defineLocale('nb', {
	        months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	        monthsShort : 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
	        weekdaysShort : 'sø._ma._ti._on._to._fr._lø.'.split('_'),
	        weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY [kl.] HH:mm',
	            LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
	        },
	        calendar : {
	            sameDay: '[i dag kl.] LT',
	            nextDay: '[i morgen kl.] LT',
	            nextWeek: 'dddd [kl.] LT',
	            lastDay: '[i går kl.] LT',
	            lastWeek: '[forrige] dddd [kl.] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : '%s siden',
	            s : 'noen sekunder',
	            m : 'ett minutt',
	            mm : '%d minutter',
	            h : 'en time',
	            hh : '%d timer',
	            d : 'en dag',
	            dd : '%d dager',
	            M : 'en måned',
	            MM : '%d måneder',
	            y : 'ett år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return nb;

	}));

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Nepalese [ne]
	//! author : suvash : https://github.com/suvash

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '१',
	        '2': '२',
	        '3': '३',
	        '4': '४',
	        '5': '५',
	        '6': '६',
	        '7': '७',
	        '8': '८',
	        '9': '९',
	        '0': '०'
	    },
	    numberMap = {
	        '१': '1',
	        '२': '2',
	        '३': '3',
	        '४': '4',
	        '५': '5',
	        '६': '6',
	        '७': '7',
	        '८': '8',
	        '९': '9',
	        '०': '0'
	    };

	    var ne = moment.defineLocale('ne', {
	        months : 'जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split('_'),
	        monthsShort : 'जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार'.split('_'),
	        weekdaysShort : 'आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.'.split('_'),
	        weekdaysMin : 'आ._सो._मं._बु._बि._शु._श.'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'Aको h:mm बजे',
	            LTS : 'Aको h:mm:ss बजे',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, Aको h:mm बजे',
	            LLLL : 'dddd, D MMMM YYYY, Aको h:mm बजे'
	        },
	        preparse: function (string) {
	            return string.replace(/[१२३४५६७८९०]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'राति') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'बिहान') {
	                return hour;
	            } else if (meridiem === 'दिउँसो') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'साँझ') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 3) {
	                return 'राति';
	            } else if (hour < 12) {
	                return 'बिहान';
	            } else if (hour < 16) {
	                return 'दिउँसो';
	            } else if (hour < 20) {
	                return 'साँझ';
	            } else {
	                return 'राति';
	            }
	        },
	        calendar : {
	            sameDay : '[आज] LT',
	            nextDay : '[भोलि] LT',
	            nextWeek : '[आउँदो] dddd[,] LT',
	            lastDay : '[हिजो] LT',
	            lastWeek : '[गएको] dddd[,] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%sमा',
	            past : '%s अगाडि',
	            s : 'केही क्षण',
	            m : 'एक मिनेट',
	            mm : '%d मिनेट',
	            h : 'एक घण्टा',
	            hh : '%d घण्टा',
	            d : 'एक दिन',
	            dd : '%d दिन',
	            M : 'एक महिना',
	            MM : '%d महिना',
	            y : 'एक बर्ष',
	            yy : '%d बर्ष'
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ne;

	}));

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Dutch [nl]
	//! author : Joris Röling : https://github.com/jorisroling
	//! author : Jacob Middag : https://github.com/middagj

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_'),
	        monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

	    var monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
	    var monthsRegex = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

	    var nl = moment.defineLocale('nl', {
	        months : 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
	        monthsShort : function (m, format) {
	            if (/-MMM-/.test(format)) {
	                return monthsShortWithoutDots[m.month()];
	            } else {
	                return monthsShortWithDots[m.month()];
	            }
	        },

	        monthsRegex: monthsRegex,
	        monthsShortRegex: monthsRegex,
	        monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
	        monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,

	        monthsParse : monthsParse,
	        longMonthsParse : monthsParse,
	        shortMonthsParse : monthsParse,

	        weekdays : 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
	        weekdaysShort : 'zo._ma._di._wo._do._vr._za.'.split('_'),
	        weekdaysMin : 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD-MM-YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[vandaag om] LT',
	            nextDay: '[morgen om] LT',
	            nextWeek: 'dddd [om] LT',
	            lastDay: '[gisteren om] LT',
	            lastWeek: '[afgelopen] dddd [om] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'over %s',
	            past : '%s geleden',
	            s : 'een paar seconden',
	            m : 'één minuut',
	            mm : '%d minuten',
	            h : 'één uur',
	            hh : '%d uur',
	            d : 'één dag',
	            dd : '%d dagen',
	            M : 'één maand',
	            MM : '%d maanden',
	            y : 'één jaar',
	            yy : '%d jaar'
	        },
	        ordinalParse: /\d{1,2}(ste|de)/,
	        ordinal : function (number) {
	            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return nl;

	}));

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Nynorsk [nn]
	//! author : https://github.com/mechuwind

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var nn = moment.defineLocale('nn', {
	        months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
	        weekdays : 'sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag'.split('_'),
	        weekdaysShort : 'sun_mån_tys_ons_tor_fre_lau'.split('_'),
	        weekdaysMin : 'su_må_ty_on_to_fr_lø'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY [kl.] H:mm',
	            LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
	        },
	        calendar : {
	            sameDay: '[I dag klokka] LT',
	            nextDay: '[I morgon klokka] LT',
	            nextWeek: 'dddd [klokka] LT',
	            lastDay: '[I går klokka] LT',
	            lastWeek: '[Føregåande] dddd [klokka] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : '%s sidan',
	            s : 'nokre sekund',
	            m : 'eit minutt',
	            mm : '%d minutt',
	            h : 'ein time',
	            hh : '%d timar',
	            d : 'ein dag',
	            dd : '%d dagar',
	            M : 'ein månad',
	            MM : '%d månader',
	            y : 'eit år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return nn;

	}));

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Punjabi (India) [pa-in]
	//! author : Harpreet Singh : https://github.com/harpreetkhalsagtbit

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '੧',
	        '2': '੨',
	        '3': '੩',
	        '4': '੪',
	        '5': '੫',
	        '6': '੬',
	        '7': '੭',
	        '8': '੮',
	        '9': '੯',
	        '0': '੦'
	    },
	    numberMap = {
	        '੧': '1',
	        '੨': '2',
	        '੩': '3',
	        '੪': '4',
	        '੫': '5',
	        '੬': '6',
	        '੭': '7',
	        '੮': '8',
	        '੯': '9',
	        '੦': '0'
	    };

	    var pa_in = moment.defineLocale('pa-in', {
	        // There are months name as per Nanakshahi Calender but they are not used as rigidly in modern Punjabi.
	        months : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
	        monthsShort : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
	        weekdays : 'ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ'.split('_'),
	        weekdaysShort : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
	        weekdaysMin : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm ਵਜੇ',
	            LTS : 'A h:mm:ss ਵਜੇ',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm ਵਜੇ',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm ਵਜੇ'
	        },
	        calendar : {
	            sameDay : '[ਅਜ] LT',
	            nextDay : '[ਕਲ] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[ਕਲ] LT',
	            lastWeek : '[ਪਿਛਲੇ] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s ਵਿੱਚ',
	            past : '%s ਪਿਛਲੇ',
	            s : 'ਕੁਝ ਸਕਿੰਟ',
	            m : 'ਇਕ ਮਿੰਟ',
	            mm : '%d ਮਿੰਟ',
	            h : 'ਇੱਕ ਘੰਟਾ',
	            hh : '%d ਘੰਟੇ',
	            d : 'ਇੱਕ ਦਿਨ',
	            dd : '%d ਦਿਨ',
	            M : 'ਇੱਕ ਮਹੀਨਾ',
	            MM : '%d ਮਹੀਨੇ',
	            y : 'ਇੱਕ ਸਾਲ',
	            yy : '%d ਸਾਲ'
	        },
	        preparse: function (string) {
	            return string.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        // Punjabi notation for meridiems are quite fuzzy in practice. While there exists
	        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Punjabi.
	        meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'ਰਾਤ') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'ਸਵੇਰ') {
	                return hour;
	            } else if (meridiem === 'ਦੁਪਹਿਰ') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'ਸ਼ਾਮ') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ਰਾਤ';
	            } else if (hour < 10) {
	                return 'ਸਵੇਰ';
	            } else if (hour < 17) {
	                return 'ਦੁਪਹਿਰ';
	            } else if (hour < 20) {
	                return 'ਸ਼ਾਮ';
	            } else {
	                return 'ਰਾਤ';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return pa_in;

	}));

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Polish [pl]
	//! author : Rafal Hirsz : https://github.com/evoL

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var monthsNominative = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_'),
	        monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');
	    function plural(n) {
	        return (n % 10 < 5) && (n % 10 > 1) && ((~~(n / 10) % 10) !== 1);
	    }
	    function translate(number, withoutSuffix, key) {
	        var result = number + ' ';
	        switch (key) {
	            case 'm':
	                return withoutSuffix ? 'minuta' : 'minutę';
	            case 'mm':
	                return result + (plural(number) ? 'minuty' : 'minut');
	            case 'h':
	                return withoutSuffix  ? 'godzina'  : 'godzinę';
	            case 'hh':
	                return result + (plural(number) ? 'godziny' : 'godzin');
	            case 'MM':
	                return result + (plural(number) ? 'miesiące' : 'miesięcy');
	            case 'yy':
	                return result + (plural(number) ? 'lata' : 'lat');
	        }
	    }

	    var pl = moment.defineLocale('pl', {
	        months : function (momentToFormat, format) {
	            if (format === '') {
	                // Hack: if format empty we know this is used to generate
	                // RegExp by moment. Give then back both valid forms of months
	                // in RegExp ready format.
	                return '(' + monthsSubjective[momentToFormat.month()] + '|' + monthsNominative[momentToFormat.month()] + ')';
	            } else if (/D MMMM/.test(format)) {
	                return monthsSubjective[momentToFormat.month()];
	            } else {
	                return monthsNominative[momentToFormat.month()];
	            }
	        },
	        monthsShort : 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
	        weekdays : 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
	        weekdaysShort : 'nie_pon_wt_śr_czw_pt_sb'.split('_'),
	        weekdaysMin : 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Dziś o] LT',
	            nextDay: '[Jutro o] LT',
	            nextWeek: '[W] dddd [o] LT',
	            lastDay: '[Wczoraj o] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                    case 0:
	                        return '[W zeszłą niedzielę o] LT';
	                    case 3:
	                        return '[W zeszłą środę o] LT';
	                    case 6:
	                        return '[W zeszłą sobotę o] LT';
	                    default:
	                        return '[W zeszły] dddd [o] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past : '%s temu',
	            s : 'kilka sekund',
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : '1 dzień',
	            dd : '%d dni',
	            M : 'miesiąc',
	            MM : translate,
	            y : 'rok',
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return pl;

	}));

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Portuguese [pt]
	//! author : Jefferson : https://github.com/jalex79

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var pt = moment.defineLocale('pt', {
	        months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
	        monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
	        weekdays : 'Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado'.split('_'),
	        weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
	        weekdaysMin : 'Dom_2ª_3ª_4ª_5ª_6ª_Sáb'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [de] MMMM [de] YYYY',
	            LLL : 'D [de] MMMM [de] YYYY HH:mm',
	            LLLL : 'dddd, D [de] MMMM [de] YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Hoje às] LT',
	            nextDay: '[Amanhã às] LT',
	            nextWeek: 'dddd [às] LT',
	            lastDay: '[Ontem às] LT',
	            lastWeek: function () {
	                return (this.day() === 0 || this.day() === 6) ?
	                    '[Último] dddd [às] LT' : // Saturday + Sunday
	                    '[Última] dddd [às] LT'; // Monday - Friday
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'em %s',
	            past : 'há %s',
	            s : 'segundos',
	            m : 'um minuto',
	            mm : '%d minutos',
	            h : 'uma hora',
	            hh : '%d horas',
	            d : 'um dia',
	            dd : '%d dias',
	            M : 'um mês',
	            MM : '%d meses',
	            y : 'um ano',
	            yy : '%d anos'
	        },
	        ordinalParse: /\d{1,2}º/,
	        ordinal : '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return pt;

	}));

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Portuguese (Brazil) [pt-br]
	//! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var pt_br = moment.defineLocale('pt-br', {
	        months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
	        monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
	        weekdays : 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
	        weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
	        weekdaysMin : 'Dom_2ª_3ª_4ª_5ª_6ª_Sáb'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [de] MMMM [de] YYYY',
	            LLL : 'D [de] MMMM [de] YYYY [às] HH:mm',
	            LLLL : 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
	        },
	        calendar : {
	            sameDay: '[Hoje às] LT',
	            nextDay: '[Amanhã às] LT',
	            nextWeek: 'dddd [às] LT',
	            lastDay: '[Ontem às] LT',
	            lastWeek: function () {
	                return (this.day() === 0 || this.day() === 6) ?
	                    '[Último] dddd [às] LT' : // Saturday + Sunday
	                    '[Última] dddd [às] LT'; // Monday - Friday
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'em %s',
	            past : '%s atrás',
	            s : 'poucos segundos',
	            m : 'um minuto',
	            mm : '%d minutos',
	            h : 'uma hora',
	            hh : '%d horas',
	            d : 'um dia',
	            dd : '%d dias',
	            M : 'um mês',
	            MM : '%d meses',
	            y : 'um ano',
	            yy : '%d anos'
	        },
	        ordinalParse: /\d{1,2}º/,
	        ordinal : '%dº'
	    });

	    return pt_br;

	}));

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Romanian [ro]
	//! author : Vlad Gurdiga : https://github.com/gurdiga
	//! author : Valentin Agachi : https://github.com/avaly

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	                'mm': 'minute',
	                'hh': 'ore',
	                'dd': 'zile',
	                'MM': 'luni',
	                'yy': 'ani'
	            },
	            separator = ' ';
	        if (number % 100 >= 20 || (number >= 100 && number % 100 === 0)) {
	            separator = ' de ';
	        }
	        return number + separator + format[key];
	    }

	    var ro = moment.defineLocale('ro', {
	        months : 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
	        monthsShort : 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'duminică_luni_marți_miercuri_joi_vineri_sâmbătă'.split('_'),
	        weekdaysShort : 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
	        weekdaysMin : 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd, D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay: '[azi la] LT',
	            nextDay: '[mâine la] LT',
	            nextWeek: 'dddd [la] LT',
	            lastDay: '[ieri la] LT',
	            lastWeek: '[fosta] dddd [la] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'peste %s',
	            past : '%s în urmă',
	            s : 'câteva secunde',
	            m : 'un minut',
	            mm : relativeTimeWithPlural,
	            h : 'o oră',
	            hh : relativeTimeWithPlural,
	            d : 'o zi',
	            dd : relativeTimeWithPlural,
	            M : 'o lună',
	            MM : relativeTimeWithPlural,
	            y : 'un an',
	            yy : relativeTimeWithPlural
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ro;

	}));

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Russian [ru]
	//! author : Viktorminator : https://github.com/Viktorminator
	//! Author : Menelion Elensúle : https://github.com/Oire
	//! author : Коренберг Марк : https://github.com/socketpair

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function plural(word, num) {
	        var forms = word.split('_');
	        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	            'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
	            'hh': 'час_часа_часов',
	            'dd': 'день_дня_дней',
	            'MM': 'месяц_месяца_месяцев',
	            'yy': 'год_года_лет'
	        };
	        if (key === 'm') {
	            return withoutSuffix ? 'минута' : 'минуту';
	        }
	        else {
	            return number + ' ' + plural(format[key], +number);
	        }
	    }
	    var monthsParse = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];

	    // http://new.gramota.ru/spravka/rules/139-prop : § 103
	    // Сокращения месяцев: http://new.gramota.ru/spravka/buro/search-answer?s=242637
	    // CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
	    var ru = moment.defineLocale('ru', {
	        months : {
	            format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
	            standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
	        },
	        monthsShort : {
	            // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку ?
	            format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'),
	            standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_')
	        },
	        weekdays : {
	            standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
	            format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_'),
	            isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
	        },
	        weekdaysShort : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
	        weekdaysMin : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
	        monthsParse : monthsParse,
	        longMonthsParse : monthsParse,
	        shortMonthsParse : monthsParse,

	        // полные названия с падежами, по три буквы, для некоторых, по 4 буквы, сокращения с точкой и без точки
	        monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

	        // копия предыдущего
	        monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

	        // полные названия с падежами
	        monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,

	        // Выражение, которое соотвествует только сокращённым формам
	        monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY г.',
	            LLL : 'D MMMM YYYY г., HH:mm',
	            LLLL : 'dddd, D MMMM YYYY г., HH:mm'
	        },
	        calendar : {
	            sameDay: '[Сегодня в] LT',
	            nextDay: '[Завтра в] LT',
	            lastDay: '[Вчера в] LT',
	            nextWeek: function (now) {
	                if (now.week() !== this.week()) {
	                    switch (this.day()) {
	                        case 0:
	                            return '[В следующее] dddd [в] LT';
	                        case 1:
	                        case 2:
	                        case 4:
	                            return '[В следующий] dddd [в] LT';
	                        case 3:
	                        case 5:
	                        case 6:
	                            return '[В следующую] dddd [в] LT';
	                    }
	                } else {
	                    if (this.day() === 2) {
	                        return '[Во] dddd [в] LT';
	                    } else {
	                        return '[В] dddd [в] LT';
	                    }
	                }
	            },
	            lastWeek: function (now) {
	                if (now.week() !== this.week()) {
	                    switch (this.day()) {
	                        case 0:
	                            return '[В прошлое] dddd [в] LT';
	                        case 1:
	                        case 2:
	                        case 4:
	                            return '[В прошлый] dddd [в] LT';
	                        case 3:
	                        case 5:
	                        case 6:
	                            return '[В прошлую] dddd [в] LT';
	                    }
	                } else {
	                    if (this.day() === 2) {
	                        return '[Во] dddd [в] LT';
	                    } else {
	                        return '[В] dddd [в] LT';
	                    }
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'через %s',
	            past : '%s назад',
	            s : 'несколько секунд',
	            m : relativeTimeWithPlural,
	            mm : relativeTimeWithPlural,
	            h : 'час',
	            hh : relativeTimeWithPlural,
	            d : 'день',
	            dd : relativeTimeWithPlural,
	            M : 'месяц',
	            MM : relativeTimeWithPlural,
	            y : 'год',
	            yy : relativeTimeWithPlural
	        },
	        meridiemParse: /ночи|утра|дня|вечера/i,
	        isPM : function (input) {
	            return /^(дня|вечера)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ночи';
	            } else if (hour < 12) {
	                return 'утра';
	            } else if (hour < 17) {
	                return 'дня';
	            } else {
	                return 'вечера';
	            }
	        },
	        ordinalParse: /\d{1,2}-(й|го|я)/,
	        ordinal: function (number, period) {
	            switch (period) {
	                case 'M':
	                case 'd':
	                case 'DDD':
	                    return number + '-й';
	                case 'D':
	                    return number + '-го';
	                case 'w':
	                case 'W':
	                    return number + '-я';
	                default:
	                    return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ru;

	}));

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Northern Sami [se]
	//! authors : Bård Rolstad Henriksen : https://github.com/karamell

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';



	    var se = moment.defineLocale('se', {
	        months : 'ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu'.split('_'),
	        monthsShort : 'ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov'.split('_'),
	        weekdays : 'sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat'.split('_'),
	        weekdaysShort : 'sotn_vuos_maŋ_gask_duor_bear_láv'.split('_'),
	        weekdaysMin : 's_v_m_g_d_b_L'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'MMMM D. [b.] YYYY',
	            LLL : 'MMMM D. [b.] YYYY [ti.] HH:mm',
	            LLLL : 'dddd, MMMM D. [b.] YYYY [ti.] HH:mm'
	        },
	        calendar : {
	            sameDay: '[otne ti] LT',
	            nextDay: '[ihttin ti] LT',
	            nextWeek: 'dddd [ti] LT',
	            lastDay: '[ikte ti] LT',
	            lastWeek: '[ovddit] dddd [ti] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : '%s geažes',
	            past : 'maŋit %s',
	            s : 'moadde sekunddat',
	            m : 'okta minuhta',
	            mm : '%d minuhtat',
	            h : 'okta diimmu',
	            hh : '%d diimmut',
	            d : 'okta beaivi',
	            dd : '%d beaivvit',
	            M : 'okta mánnu',
	            MM : '%d mánut',
	            y : 'okta jahki',
	            yy : '%d jagit'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return se;

	}));

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Sinhalese [si]
	//! author : Sampath Sitinamaluwa : https://github.com/sampathsris

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    /*jshint -W100*/
	    var si = moment.defineLocale('si', {
	        months : 'ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්'.split('_'),
	        monthsShort : 'ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ'.split('_'),
	        weekdays : 'ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා'.split('_'),
	        weekdaysShort : 'ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන'.split('_'),
	        weekdaysMin : 'ඉ_ස_අ_බ_බ්‍ර_සි_සෙ'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'a h:mm',
	            LTS : 'a h:mm:ss',
	            L : 'YYYY/MM/DD',
	            LL : 'YYYY MMMM D',
	            LLL : 'YYYY MMMM D, a h:mm',
	            LLLL : 'YYYY MMMM D [වැනි] dddd, a h:mm:ss'
	        },
	        calendar : {
	            sameDay : '[අද] LT[ට]',
	            nextDay : '[හෙට] LT[ට]',
	            nextWeek : 'dddd LT[ට]',
	            lastDay : '[ඊයේ] LT[ට]',
	            lastWeek : '[පසුගිය] dddd LT[ට]',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%sකින්',
	            past : '%sකට පෙර',
	            s : 'තත්පර කිහිපය',
	            m : 'මිනිත්තුව',
	            mm : 'මිනිත්තු %d',
	            h : 'පැය',
	            hh : 'පැය %d',
	            d : 'දිනය',
	            dd : 'දින %d',
	            M : 'මාසය',
	            MM : 'මාස %d',
	            y : 'වසර',
	            yy : 'වසර %d'
	        },
	        ordinalParse: /\d{1,2} වැනි/,
	        ordinal : function (number) {
	            return number + ' වැනි';
	        },
	        meridiemParse : /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
	        isPM : function (input) {
	            return input === 'ප.ව.' || input === 'පස් වරු';
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'ප.ව.' : 'පස් වරු';
	            } else {
	                return isLower ? 'පෙ.ව.' : 'පෙර වරු';
	            }
	        }
	    });

	    return si;

	}));

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Slovak [sk]
	//! author : Martin Minka : https://github.com/k2s
	//! based on work of petrbela : https://github.com/petrbela

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var months = 'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split('_'),
	        monthsShort = 'jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec'.split('_');
	    function plural(n) {
	        return (n > 1) && (n < 5);
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	            case 's':  // a few seconds / in a few seconds / a few seconds ago
	                return (withoutSuffix || isFuture) ? 'pár sekúnd' : 'pár sekundami';
	            case 'm':  // a minute / in a minute / a minute ago
	                return withoutSuffix ? 'minúta' : (isFuture ? 'minútu' : 'minútou');
	            case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'minúty' : 'minút');
	                } else {
	                    return result + 'minútami';
	                }
	                break;
	            case 'h':  // an hour / in an hour / an hour ago
	                return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
	            case 'hh': // 9 hours / in 9 hours / 9 hours ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'hodiny' : 'hodín');
	                } else {
	                    return result + 'hodinami';
	                }
	                break;
	            case 'd':  // a day / in a day / a day ago
	                return (withoutSuffix || isFuture) ? 'deň' : 'dňom';
	            case 'dd': // 9 days / in 9 days / 9 days ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'dni' : 'dní');
	                } else {
	                    return result + 'dňami';
	                }
	                break;
	            case 'M':  // a month / in a month / a month ago
	                return (withoutSuffix || isFuture) ? 'mesiac' : 'mesiacom';
	            case 'MM': // 9 months / in 9 months / 9 months ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'mesiace' : 'mesiacov');
	                } else {
	                    return result + 'mesiacmi';
	                }
	                break;
	            case 'y':  // a year / in a year / a year ago
	                return (withoutSuffix || isFuture) ? 'rok' : 'rokom';
	            case 'yy': // 9 years / in 9 years / 9 years ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'roky' : 'rokov');
	                } else {
	                    return result + 'rokmi';
	                }
	                break;
	        }
	    }

	    var sk = moment.defineLocale('sk', {
	        months : months,
	        monthsShort : monthsShort,
	        weekdays : 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
	        weekdaysShort : 'ne_po_ut_st_št_pi_so'.split('_'),
	        weekdaysMin : 'ne_po_ut_st_št_pi_so'.split('_'),
	        longDateFormat : {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay: '[dnes o] LT',
	            nextDay: '[zajtra o] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                    case 0:
	                        return '[v nedeľu o] LT';
	                    case 1:
	                    case 2:
	                        return '[v] dddd [o] LT';
	                    case 3:
	                        return '[v stredu o] LT';
	                    case 4:
	                        return '[vo štvrtok o] LT';
	                    case 5:
	                        return '[v piatok o] LT';
	                    case 6:
	                        return '[v sobotu o] LT';
	                }
	            },
	            lastDay: '[včera o] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                    case 0:
	                        return '[minulú nedeľu o] LT';
	                    case 1:
	                    case 2:
	                        return '[minulý] dddd [o] LT';
	                    case 3:
	                        return '[minulú stredu o] LT';
	                    case 4:
	                    case 5:
	                        return '[minulý] dddd [o] LT';
	                    case 6:
	                        return '[minulú sobotu o] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past : 'pred %s',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return sk;

	}));

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Slovenian [sl]
	//! author : Robert Sedovšek : https://github.com/sedovsek

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	            case 's':
	                return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami';
	            case 'm':
	                return withoutSuffix ? 'ena minuta' : 'eno minuto';
	            case 'mm':
	                if (number === 1) {
	                    result += withoutSuffix ? 'minuta' : 'minuto';
	                } else if (number === 2) {
	                    result += withoutSuffix || isFuture ? 'minuti' : 'minutama';
	                } else if (number < 5) {
	                    result += withoutSuffix || isFuture ? 'minute' : 'minutami';
	                } else {
	                    result += withoutSuffix || isFuture ? 'minut' : 'minutami';
	                }
	                return result;
	            case 'h':
	                return withoutSuffix ? 'ena ura' : 'eno uro';
	            case 'hh':
	                if (number === 1) {
	                    result += withoutSuffix ? 'ura' : 'uro';
	                } else if (number === 2) {
	                    result += withoutSuffix || isFuture ? 'uri' : 'urama';
	                } else if (number < 5) {
	                    result += withoutSuffix || isFuture ? 'ure' : 'urami';
	                } else {
	                    result += withoutSuffix || isFuture ? 'ur' : 'urami';
	                }
	                return result;
	            case 'd':
	                return withoutSuffix || isFuture ? 'en dan' : 'enim dnem';
	            case 'dd':
	                if (number === 1) {
	                    result += withoutSuffix || isFuture ? 'dan' : 'dnem';
	                } else if (number === 2) {
	                    result += withoutSuffix || isFuture ? 'dni' : 'dnevoma';
	                } else {
	                    result += withoutSuffix || isFuture ? 'dni' : 'dnevi';
	                }
	                return result;
	            case 'M':
	                return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem';
	            case 'MM':
	                if (number === 1) {
	                    result += withoutSuffix || isFuture ? 'mesec' : 'mesecem';
	                } else if (number === 2) {
	                    result += withoutSuffix || isFuture ? 'meseca' : 'mesecema';
	                } else if (number < 5) {
	                    result += withoutSuffix || isFuture ? 'mesece' : 'meseci';
	                } else {
	                    result += withoutSuffix || isFuture ? 'mesecev' : 'meseci';
	                }
	                return result;
	            case 'y':
	                return withoutSuffix || isFuture ? 'eno leto' : 'enim letom';
	            case 'yy':
	                if (number === 1) {
	                    result += withoutSuffix || isFuture ? 'leto' : 'letom';
	                } else if (number === 2) {
	                    result += withoutSuffix || isFuture ? 'leti' : 'letoma';
	                } else if (number < 5) {
	                    result += withoutSuffix || isFuture ? 'leta' : 'leti';
	                } else {
	                    result += withoutSuffix || isFuture ? 'let' : 'leti';
	                }
	                return result;
	        }
	    }

	    var sl = moment.defineLocale('sl', {
	        months : 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
	        monthsShort : 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
	        weekdaysShort : 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
	        weekdaysMin : 'ne_po_to_sr_če_pe_so'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay  : '[danes ob] LT',
	            nextDay  : '[jutri ob] LT',

	            nextWeek : function () {
	                switch (this.day()) {
	                    case 0:
	                        return '[v] [nedeljo] [ob] LT';
	                    case 3:
	                        return '[v] [sredo] [ob] LT';
	                    case 6:
	                        return '[v] [soboto] [ob] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[v] dddd [ob] LT';
	                }
	            },
	            lastDay  : '[včeraj ob] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                    case 0:
	                        return '[prejšnjo] [nedeljo] [ob] LT';
	                    case 3:
	                        return '[prejšnjo] [sredo] [ob] LT';
	                    case 6:
	                        return '[prejšnjo] [soboto] [ob] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[prejšnji] dddd [ob] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'čez %s',
	            past   : 'pred %s',
	            s      : processRelativeTime,
	            m      : processRelativeTime,
	            mm     : processRelativeTime,
	            h      : processRelativeTime,
	            hh     : processRelativeTime,
	            d      : processRelativeTime,
	            dd     : processRelativeTime,
	            M      : processRelativeTime,
	            MM     : processRelativeTime,
	            y      : processRelativeTime,
	            yy     : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return sl;

	}));

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Albanian [sq]
	//! author : Flakërim Ismani : https://github.com/flakerimi
	//! author : Menelion Elensúle : https://github.com/Oire
	//! author : Oerd Cukalla : https://github.com/oerd

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var sq = moment.defineLocale('sq', {
	        months : 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor'.split('_'),
	        monthsShort : 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj'.split('_'),
	        weekdays : 'E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë'.split('_'),
	        weekdaysShort : 'Die_Hën_Mar_Mër_Enj_Pre_Sht'.split('_'),
	        weekdaysMin : 'D_H_Ma_Më_E_P_Sh'.split('_'),
	        weekdaysParseExact : true,
	        meridiemParse: /PD|MD/,
	        isPM: function (input) {
	            return input.charAt(0) === 'M';
	        },
	        meridiem : function (hours, minutes, isLower) {
	            return hours < 12 ? 'PD' : 'MD';
	        },
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Sot në] LT',
	            nextDay : '[Nesër në] LT',
	            nextWeek : 'dddd [në] LT',
	            lastDay : '[Dje në] LT',
	            lastWeek : 'dddd [e kaluar në] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'në %s',
	            past : '%s më parë',
	            s : 'disa sekonda',
	            m : 'një minutë',
	            mm : '%d minuta',
	            h : 'një orë',
	            hh : '%d orë',
	            d : 'një ditë',
	            dd : '%d ditë',
	            M : 'një muaj',
	            MM : '%d muaj',
	            y : 'një vit',
	            yy : '%d vite'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return sq;

	}));

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Serbian [sr]
	//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var translator = {
	        words: { //Different grammatical cases
	            m: ['jedan minut', 'jedne minute'],
	            mm: ['minut', 'minute', 'minuta'],
	            h: ['jedan sat', 'jednog sata'],
	            hh: ['sat', 'sata', 'sati'],
	            dd: ['dan', 'dana', 'dana'],
	            MM: ['mesec', 'meseca', 'meseci'],
	            yy: ['godina', 'godine', 'godina']
	        },
	        correctGrammaticalCase: function (number, wordKey) {
	            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	        },
	        translate: function (number, withoutSuffix, key) {
	            var wordKey = translator.words[key];
	            if (key.length === 1) {
	                return withoutSuffix ? wordKey[0] : wordKey[1];
	            } else {
	                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	            }
	        }
	    };

	    var sr = moment.defineLocale('sr', {
	        months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
	        monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort: 'ned._pon._uto._sre._čet._pet._sub.'.split('_'),
	        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[danas u] LT',
	            nextDay: '[sutra u] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                    case 0:
	                        return '[u] [nedelju] [u] LT';
	                    case 3:
	                        return '[u] [sredu] [u] LT';
	                    case 6:
	                        return '[u] [subotu] [u] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[u] dddd [u] LT';
	                }
	            },
	            lastDay  : '[juče u] LT',
	            lastWeek : function () {
	                var lastWeekDays = [
	                    '[prošle] [nedelje] [u] LT',
	                    '[prošlog] [ponedeljka] [u] LT',
	                    '[prošlog] [utorka] [u] LT',
	                    '[prošle] [srede] [u] LT',
	                    '[prošlog] [četvrtka] [u] LT',
	                    '[prošlog] [petka] [u] LT',
	                    '[prošle] [subote] [u] LT'
	                ];
	                return lastWeekDays[this.day()];
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past   : 'pre %s',
	            s      : 'nekoliko sekundi',
	            m      : translator.translate,
	            mm     : translator.translate,
	            h      : translator.translate,
	            hh     : translator.translate,
	            d      : 'dan',
	            dd     : translator.translate,
	            M      : 'mesec',
	            MM     : translator.translate,
	            y      : 'godinu',
	            yy     : translator.translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return sr;

	}));

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Serbian Cyrillic [sr-cyrl]
	//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var translator = {
	        words: { //Different grammatical cases
	            m: ['један минут', 'једне минуте'],
	            mm: ['минут', 'минуте', 'минута'],
	            h: ['један сат', 'једног сата'],
	            hh: ['сат', 'сата', 'сати'],
	            dd: ['дан', 'дана', 'дана'],
	            MM: ['месец', 'месеца', 'месеци'],
	            yy: ['година', 'године', 'година']
	        },
	        correctGrammaticalCase: function (number, wordKey) {
	            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	        },
	        translate: function (number, withoutSuffix, key) {
	            var wordKey = translator.words[key];
	            if (key.length === 1) {
	                return withoutSuffix ? wordKey[0] : wordKey[1];
	            } else {
	                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	            }
	        }
	    };

	    var sr_cyrl = moment.defineLocale('sr-cyrl', {
	        months: 'јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар'.split('_'),
	        monthsShort: 'јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'недеља_понедељак_уторак_среда_четвртак_петак_субота'.split('_'),
	        weekdaysShort: 'нед._пон._уто._сре._чет._пет._суб.'.split('_'),
	        weekdaysMin: 'не_по_ут_ср_че_пе_су'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[данас у] LT',
	            nextDay: '[сутра у] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                    case 0:
	                        return '[у] [недељу] [у] LT';
	                    case 3:
	                        return '[у] [среду] [у] LT';
	                    case 6:
	                        return '[у] [суботу] [у] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[у] dddd [у] LT';
	                }
	            },
	            lastDay  : '[јуче у] LT',
	            lastWeek : function () {
	                var lastWeekDays = [
	                    '[прошле] [недеље] [у] LT',
	                    '[прошлог] [понедељка] [у] LT',
	                    '[прошлог] [уторка] [у] LT',
	                    '[прошле] [среде] [у] LT',
	                    '[прошлог] [четвртка] [у] LT',
	                    '[прошлог] [петка] [у] LT',
	                    '[прошле] [суботе] [у] LT'
	                ];
	                return lastWeekDays[this.day()];
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'за %s',
	            past   : 'пре %s',
	            s      : 'неколико секунди',
	            m      : translator.translate,
	            mm     : translator.translate,
	            h      : translator.translate,
	            hh     : translator.translate,
	            d      : 'дан',
	            dd     : translator.translate,
	            M      : 'месец',
	            MM     : translator.translate,
	            y      : 'годину',
	            yy     : translator.translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return sr_cyrl;

	}));

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : siSwati [ss]
	//! author : Nicolai Davies<mail@nicolai.io> : https://github.com/nicolaidavies

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';



	    var ss = moment.defineLocale('ss', {
	        months : "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split('_'),
	        monthsShort : 'Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo'.split('_'),
	        weekdays : 'Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo'.split('_'),
	        weekdaysShort : 'Lis_Umb_Lsb_Les_Lsi_Lsh_Umg'.split('_'),
	        weekdaysMin : 'Li_Us_Lb_Lt_Ls_Lh_Ug'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY h:mm A',
	            LLLL : 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : '[Namuhla nga] LT',
	            nextDay : '[Kusasa nga] LT',
	            nextWeek : 'dddd [nga] LT',
	            lastDay : '[Itolo nga] LT',
	            lastWeek : 'dddd [leliphelile] [nga] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'nga %s',
	            past : 'wenteka nga %s',
	            s : 'emizuzwana lomcane',
	            m : 'umzuzu',
	            mm : '%d emizuzu',
	            h : 'lihora',
	            hh : '%d emahora',
	            d : 'lilanga',
	            dd : '%d emalanga',
	            M : 'inyanga',
	            MM : '%d tinyanga',
	            y : 'umnyaka',
	            yy : '%d iminyaka'
	        },
	        meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'ekuseni';
	            } else if (hours < 15) {
	                return 'emini';
	            } else if (hours < 19) {
	                return 'entsambama';
	            } else {
	                return 'ebusuku';
	            }
	        },
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'ekuseni') {
	                return hour;
	            } else if (meridiem === 'emini') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'entsambama' || meridiem === 'ebusuku') {
	                if (hour === 0) {
	                    return 0;
	                }
	                return hour + 12;
	            }
	        },
	        ordinalParse: /\d{1,2}/,
	        ordinal : '%d',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return ss;

	}));

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Swedish [sv]
	//! author : Jens Alm : https://github.com/ulmus

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var sv = moment.defineLocale('sv', {
	        months : 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
	        weekdays : 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
	        weekdaysShort : 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
	        weekdaysMin : 'sö_må_ti_on_to_fr_lö'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [kl.] HH:mm',
	            LLLL : 'dddd D MMMM YYYY [kl.] HH:mm',
	            lll : 'D MMM YYYY HH:mm',
	            llll : 'ddd D MMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Idag] LT',
	            nextDay: '[Imorgon] LT',
	            lastDay: '[Igår] LT',
	            nextWeek: '[På] dddd LT',
	            lastWeek: '[I] dddd[s] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : 'för %s sedan',
	            s : 'några sekunder',
	            m : 'en minut',
	            mm : '%d minuter',
	            h : 'en timme',
	            hh : '%d timmar',
	            d : 'en dag',
	            dd : '%d dagar',
	            M : 'en månad',
	            MM : '%d månader',
	            y : 'ett år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}(e|a)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'e' :
	                (b === 1) ? 'a' :
	                (b === 2) ? 'a' :
	                (b === 3) ? 'e' : 'e';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return sv;

	}));

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Swahili [sw]
	//! author : Fahad Kassim : https://github.com/fadsel

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var sw = moment.defineLocale('sw', {
	        months : 'Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba'.split('_'),
	        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des'.split('_'),
	        weekdays : 'Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi'.split('_'),
	        weekdaysShort : 'Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos'.split('_'),
	        weekdaysMin : 'J2_J3_J4_J5_Al_Ij_J1'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[leo saa] LT',
	            nextDay : '[kesho saa] LT',
	            nextWeek : '[wiki ijayo] dddd [saat] LT',
	            lastDay : '[jana] LT',
	            lastWeek : '[wiki iliyopita] dddd [saat] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s baadaye',
	            past : 'tokea %s',
	            s : 'hivi punde',
	            m : 'dakika moja',
	            mm : 'dakika %d',
	            h : 'saa limoja',
	            hh : 'masaa %d',
	            d : 'siku moja',
	            dd : 'masiku %d',
	            M : 'mwezi mmoja',
	            MM : 'miezi %d',
	            y : 'mwaka mmoja',
	            yy : 'miaka %d'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return sw;

	}));

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Tamil [ta]
	//! author : Arjunkumar Krishnamoorthy : https://github.com/tk120404

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '௧',
	        '2': '௨',
	        '3': '௩',
	        '4': '௪',
	        '5': '௫',
	        '6': '௬',
	        '7': '௭',
	        '8': '௮',
	        '9': '௯',
	        '0': '௦'
	    }, numberMap = {
	        '௧': '1',
	        '௨': '2',
	        '௩': '3',
	        '௪': '4',
	        '௫': '5',
	        '௬': '6',
	        '௭': '7',
	        '௮': '8',
	        '௯': '9',
	        '௦': '0'
	    };

	    var ta = moment.defineLocale('ta', {
	        months : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
	        monthsShort : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
	        weekdays : 'ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை'.split('_'),
	        weekdaysShort : 'ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி'.split('_'),
	        weekdaysMin : 'ஞா_தி_செ_பு_வி_வெ_ச'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, HH:mm',
	            LLLL : 'dddd, D MMMM YYYY, HH:mm'
	        },
	        calendar : {
	            sameDay : '[இன்று] LT',
	            nextDay : '[நாளை] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[நேற்று] LT',
	            lastWeek : '[கடந்த வாரம்] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s இல்',
	            past : '%s முன்',
	            s : 'ஒரு சில விநாடிகள்',
	            m : 'ஒரு நிமிடம்',
	            mm : '%d நிமிடங்கள்',
	            h : 'ஒரு மணி நேரம்',
	            hh : '%d மணி நேரம்',
	            d : 'ஒரு நாள்',
	            dd : '%d நாட்கள்',
	            M : 'ஒரு மாதம்',
	            MM : '%d மாதங்கள்',
	            y : 'ஒரு வருடம்',
	            yy : '%d ஆண்டுகள்'
	        },
	        ordinalParse: /\d{1,2}வது/,
	        ordinal : function (number) {
	            return number + 'வது';
	        },
	        preparse: function (string) {
	            return string.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        // refer http://ta.wikipedia.org/s/1er1
	        meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 2) {
	                return ' யாமம்';
	            } else if (hour < 6) {
	                return ' வைகறை';  // வைகறை
	            } else if (hour < 10) {
	                return ' காலை'; // காலை
	            } else if (hour < 14) {
	                return ' நண்பகல்'; // நண்பகல்
	            } else if (hour < 18) {
	                return ' எற்பாடு'; // எற்பாடு
	            } else if (hour < 22) {
	                return ' மாலை'; // மாலை
	            } else {
	                return ' யாமம்';
	            }
	        },
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'யாமம்') {
	                return hour < 2 ? hour : hour + 12;
	            } else if (meridiem === 'வைகறை' || meridiem === 'காலை') {
	                return hour;
	            } else if (meridiem === 'நண்பகல்') {
	                return hour >= 10 ? hour : hour + 12;
	            } else {
	                return hour + 12;
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ta;

	}));

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Telugu [te]
	//! author : Krishna Chaitanya Thota : https://github.com/kcthota

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var te = moment.defineLocale('te', {
	        months : 'జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్'.split('_'),
	        monthsShort : 'జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం'.split('_'),
	        weekdaysShort : 'ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని'.split('_'),
	        weekdaysMin : 'ఆ_సో_మం_బు_గు_శు_శ'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm',
	            LTS : 'A h:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm'
	        },
	        calendar : {
	            sameDay : '[నేడు] LT',
	            nextDay : '[రేపు] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[నిన్న] LT',
	            lastWeek : '[గత] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s లో',
	            past : '%s క్రితం',
	            s : 'కొన్ని క్షణాలు',
	            m : 'ఒక నిమిషం',
	            mm : '%d నిమిషాలు',
	            h : 'ఒక గంట',
	            hh : '%d గంటలు',
	            d : 'ఒక రోజు',
	            dd : '%d రోజులు',
	            M : 'ఒక నెల',
	            MM : '%d నెలలు',
	            y : 'ఒక సంవత్సరం',
	            yy : '%d సంవత్సరాలు'
	        },
	        ordinalParse : /\d{1,2}వ/,
	        ordinal : '%dవ',
	        meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'రాత్రి') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'ఉదయం') {
	                return hour;
	            } else if (meridiem === 'మధ్యాహ్నం') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'సాయంత్రం') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'రాత్రి';
	            } else if (hour < 10) {
	                return 'ఉదయం';
	            } else if (hour < 17) {
	                return 'మధ్యాహ్నం';
	            } else if (hour < 20) {
	                return 'సాయంత్రం';
	            } else {
	                return 'రాత్రి';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return te;

	}));

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Thai [th]
	//! author : Kridsada Thanabulpong : https://github.com/sirn

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var th = moment.defineLocale('th', {
	        months : 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
	        monthsShort : 'ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
	        weekdaysShort : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์'.split('_'), // yes, three characters difference
	        weekdaysMin : 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'YYYY/MM/DD',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY เวลา H:mm',
	            LLLL : 'วันddddที่ D MMMM YYYY เวลา H:mm'
	        },
	        meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
	        isPM: function (input) {
	            return input === 'หลังเที่ยง';
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ก่อนเที่ยง';
	            } else {
	                return 'หลังเที่ยง';
	            }
	        },
	        calendar : {
	            sameDay : '[วันนี้ เวลา] LT',
	            nextDay : '[พรุ่งนี้ เวลา] LT',
	            nextWeek : 'dddd[หน้า เวลา] LT',
	            lastDay : '[เมื่อวานนี้ เวลา] LT',
	            lastWeek : '[วัน]dddd[ที่แล้ว เวลา] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'อีก %s',
	            past : '%sที่แล้ว',
	            s : 'ไม่กี่วินาที',
	            m : '1 นาที',
	            mm : '%d นาที',
	            h : '1 ชั่วโมง',
	            hh : '%d ชั่วโมง',
	            d : '1 วัน',
	            dd : '%d วัน',
	            M : '1 เดือน',
	            MM : '%d เดือน',
	            y : '1 ปี',
	            yy : '%d ปี'
	        }
	    });

	    return th;

	}));

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Tagalog (Philippines) [tl-ph]
	//! author : Dan Hagman : https://github.com/hagmandan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var tl_ph = moment.defineLocale('tl-ph', {
	        months : 'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre'.split('_'),
	        monthsShort : 'Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis'.split('_'),
	        weekdays : 'Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado'.split('_'),
	        weekdaysShort : 'Lin_Lun_Mar_Miy_Huw_Biy_Sab'.split('_'),
	        weekdaysMin : 'Li_Lu_Ma_Mi_Hu_Bi_Sab'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'MM/D/YYYY',
	            LL : 'MMMM D, YYYY',
	            LLL : 'MMMM D, YYYY HH:mm',
	            LLLL : 'dddd, MMMM DD, YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Ngayon sa] LT',
	            nextDay: '[Bukas sa] LT',
	            nextWeek: 'dddd [sa] LT',
	            lastDay: '[Kahapon sa] LT',
	            lastWeek: 'dddd [huling linggo] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'sa loob ng %s',
	            past : '%s ang nakalipas',
	            s : 'ilang segundo',
	            m : 'isang minuto',
	            mm : '%d minuto',
	            h : 'isang oras',
	            hh : '%d oras',
	            d : 'isang araw',
	            dd : '%d araw',
	            M : 'isang buwan',
	            MM : '%d buwan',
	            y : 'isang taon',
	            yy : '%d taon'
	        },
	        ordinalParse: /\d{1,2}/,
	        ordinal : function (number) {
	            return number;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return tl_ph;

	}));

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Klingon [tlh]
	//! author : Dominika Kruk : https://github.com/amaranthrose

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var numbersNouns = 'pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut'.split('_');

	    function translateFuture(output) {
	        var time = output;
	        time = (output.indexOf('jaj') !== -1) ?
	        time.slice(0, -3) + 'leS' :
	        (output.indexOf('jar') !== -1) ?
	        time.slice(0, -3) + 'waQ' :
	        (output.indexOf('DIS') !== -1) ?
	        time.slice(0, -3) + 'nem' :
	        time + ' pIq';
	        return time;
	    }

	    function translatePast(output) {
	        var time = output;
	        time = (output.indexOf('jaj') !== -1) ?
	        time.slice(0, -3) + 'Hu’' :
	        (output.indexOf('jar') !== -1) ?
	        time.slice(0, -3) + 'wen' :
	        (output.indexOf('DIS') !== -1) ?
	        time.slice(0, -3) + 'ben' :
	        time + ' ret';
	        return time;
	    }

	    function translate(number, withoutSuffix, string, isFuture) {
	        var numberNoun = numberAsNoun(number);
	        switch (string) {
	            case 'mm':
	                return numberNoun + ' tup';
	            case 'hh':
	                return numberNoun + ' rep';
	            case 'dd':
	                return numberNoun + ' jaj';
	            case 'MM':
	                return numberNoun + ' jar';
	            case 'yy':
	                return numberNoun + ' DIS';
	        }
	    }

	    function numberAsNoun(number) {
	        var hundred = Math.floor((number % 1000) / 100),
	        ten = Math.floor((number % 100) / 10),
	        one = number % 10,
	        word = '';
	        if (hundred > 0) {
	            word += numbersNouns[hundred] + 'vatlh';
	        }
	        if (ten > 0) {
	            word += ((word !== '') ? ' ' : '') + numbersNouns[ten] + 'maH';
	        }
	        if (one > 0) {
	            word += ((word !== '') ? ' ' : '') + numbersNouns[one];
	        }
	        return (word === '') ? 'pagh' : word;
	    }

	    var tlh = moment.defineLocale('tlh', {
	        months : 'tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’'.split('_'),
	        monthsShort : 'jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	        weekdaysShort : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	        weekdaysMin : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[DaHjaj] LT',
	            nextDay: '[wa’leS] LT',
	            nextWeek: 'LLL',
	            lastDay: '[wa’Hu’] LT',
	            lastWeek: 'LLL',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : translateFuture,
	            past : translatePast,
	            s : 'puS lup',
	            m : 'wa’ tup',
	            mm : translate,
	            h : 'wa’ rep',
	            hh : translate,
	            d : 'wa’ jaj',
	            dd : translate,
	            M : 'wa’ jar',
	            MM : translate,
	            y : 'wa’ DIS',
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return tlh;

	}));

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Turkish [tr]
	//! authors : Erhan Gundogan : https://github.com/erhangundogan,
	//!           Burak Yiğit Kaya: https://github.com/BYK

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var suffixes = {
	        1: '\'inci',
	        5: '\'inci',
	        8: '\'inci',
	        70: '\'inci',
	        80: '\'inci',
	        2: '\'nci',
	        7: '\'nci',
	        20: '\'nci',
	        50: '\'nci',
	        3: '\'üncü',
	        4: '\'üncü',
	        100: '\'üncü',
	        6: '\'ncı',
	        9: '\'uncu',
	        10: '\'uncu',
	        30: '\'uncu',
	        60: '\'ıncı',
	        90: '\'ıncı'
	    };

	    var tr = moment.defineLocale('tr', {
	        months : 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
	        monthsShort : 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
	        weekdays : 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
	        weekdaysShort : 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
	        weekdaysMin : 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[bugün saat] LT',
	            nextDay : '[yarın saat] LT',
	            nextWeek : '[haftaya] dddd [saat] LT',
	            lastDay : '[dün] LT',
	            lastWeek : '[geçen hafta] dddd [saat] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s sonra',
	            past : '%s önce',
	            s : 'birkaç saniye',
	            m : 'bir dakika',
	            mm : '%d dakika',
	            h : 'bir saat',
	            hh : '%d saat',
	            d : 'bir gün',
	            dd : '%d gün',
	            M : 'bir ay',
	            MM : '%d ay',
	            y : 'bir yıl',
	            yy : '%d yıl'
	        },
	        ordinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
	        ordinal : function (number) {
	            if (number === 0) {  // special case for zero
	                return number + '\'ıncı';
	            }
	            var a = number % 10,
	                b = number % 100 - a,
	                c = number >= 100 ? 100 : null;
	            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return tr;

	}));

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Talossan [tzl]
	//! author : Robin van der Vliet : https://github.com/robin0van0der0v
	//! author : Iustì Canun

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    // After the year there should be a slash and the amount of years since December 26, 1979 in Roman numerals.
	    // This is currently too difficult (maybe even impossible) to add.
	    var tzl = moment.defineLocale('tzl', {
	        months : 'Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar'.split('_'),
	        monthsShort : 'Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec'.split('_'),
	        weekdays : 'Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi'.split('_'),
	        weekdaysShort : 'Súl_Lún_Mai_Már_Xhú_Vié_Sát'.split('_'),
	        weekdaysMin : 'Sú_Lú_Ma_Má_Xh_Vi_Sá'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM [dallas] YYYY',
	            LLL : 'D. MMMM [dallas] YYYY HH.mm',
	            LLLL : 'dddd, [li] D. MMMM [dallas] YYYY HH.mm'
	        },
	        meridiemParse: /d\'o|d\'a/i,
	        isPM : function (input) {
	            return 'd\'o' === input.toLowerCase();
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'd\'o' : 'D\'O';
	            } else {
	                return isLower ? 'd\'a' : 'D\'A';
	            }
	        },
	        calendar : {
	            sameDay : '[oxhi à] LT',
	            nextDay : '[demà à] LT',
	            nextWeek : 'dddd [à] LT',
	            lastDay : '[ieiri à] LT',
	            lastWeek : '[sür el] dddd [lasteu à] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'osprei %s',
	            past : 'ja%s',
	            s : processRelativeTime,
	            m : processRelativeTime,
	            mm : processRelativeTime,
	            h : processRelativeTime,
	            hh : processRelativeTime,
	            d : processRelativeTime,
	            dd : processRelativeTime,
	            M : processRelativeTime,
	            MM : processRelativeTime,
	            y : processRelativeTime,
	            yy : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            's': ['viensas secunds', '\'iensas secunds'],
	            'm': ['\'n míut', '\'iens míut'],
	            'mm': [number + ' míuts', '' + number + ' míuts'],
	            'h': ['\'n þora', '\'iensa þora'],
	            'hh': [number + ' þoras', '' + number + ' þoras'],
	            'd': ['\'n ziua', '\'iensa ziua'],
	            'dd': [number + ' ziuas', '' + number + ' ziuas'],
	            'M': ['\'n mes', '\'iens mes'],
	            'MM': [number + ' mesen', '' + number + ' mesen'],
	            'y': ['\'n ar', '\'iens ar'],
	            'yy': [number + ' ars', '' + number + ' ars']
	        };
	        return isFuture ? format[key][0] : (withoutSuffix ? format[key][0] : format[key][1]);
	    }

	    return tzl;

	}));

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Central Atlas Tamazight [tzm]
	//! author : Abdel Said : https://github.com/abdelsaid

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var tzm = moment.defineLocale('tzm', {
	        months : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
	        monthsShort : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
	        weekdays : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	        weekdaysShort : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	        weekdaysMin : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[ⴰⵙⴷⵅ ⴴ] LT',
	            nextDay: '[ⴰⵙⴽⴰ ⴴ] LT',
	            nextWeek: 'dddd [ⴴ] LT',
	            lastDay: '[ⴰⵚⴰⵏⵜ ⴴ] LT',
	            lastWeek: 'dddd [ⴴ] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s',
	            past : 'ⵢⴰⵏ %s',
	            s : 'ⵉⵎⵉⴽ',
	            m : 'ⵎⵉⵏⵓⴺ',
	            mm : '%d ⵎⵉⵏⵓⴺ',
	            h : 'ⵙⴰⵄⴰ',
	            hh : '%d ⵜⴰⵙⵙⴰⵄⵉⵏ',
	            d : 'ⴰⵙⵙ',
	            dd : '%d oⵙⵙⴰⵏ',
	            M : 'ⴰⵢoⵓⵔ',
	            MM : '%d ⵉⵢⵢⵉⵔⵏ',
	            y : 'ⴰⵙⴳⴰⵙ',
	            yy : '%d ⵉⵙⴳⴰⵙⵏ'
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return tzm;

	}));

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Central Atlas Tamazight Latin [tzm-latn]
	//! author : Abdel Said : https://github.com/abdelsaid

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var tzm_latn = moment.defineLocale('tzm-latn', {
	        months : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
	        monthsShort : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
	        weekdays : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	        weekdaysShort : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	        weekdaysMin : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[asdkh g] LT',
	            nextDay: '[aska g] LT',
	            nextWeek: 'dddd [g] LT',
	            lastDay: '[assant g] LT',
	            lastWeek: 'dddd [g] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'dadkh s yan %s',
	            past : 'yan %s',
	            s : 'imik',
	            m : 'minuḍ',
	            mm : '%d minuḍ',
	            h : 'saɛa',
	            hh : '%d tassaɛin',
	            d : 'ass',
	            dd : '%d ossan',
	            M : 'ayowr',
	            MM : '%d iyyirn',
	            y : 'asgas',
	            yy : '%d isgasn'
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return tzm_latn;

	}));

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Ukrainian [uk]
	//! author : zemlanin : https://github.com/zemlanin
	//! Author : Menelion Elensúle : https://github.com/Oire

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function plural(word, num) {
	        var forms = word.split('_');
	        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	            'mm': withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
	            'hh': withoutSuffix ? 'година_години_годин' : 'годину_години_годин',
	            'dd': 'день_дні_днів',
	            'MM': 'місяць_місяці_місяців',
	            'yy': 'рік_роки_років'
	        };
	        if (key === 'm') {
	            return withoutSuffix ? 'хвилина' : 'хвилину';
	        }
	        else if (key === 'h') {
	            return withoutSuffix ? 'година' : 'годину';
	        }
	        else {
	            return number + ' ' + plural(format[key], +number);
	        }
	    }
	    function weekdaysCaseReplace(m, format) {
	        var weekdays = {
	            'nominative': 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
	            'accusative': 'неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу'.split('_'),
	            'genitive': 'неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи'.split('_')
	        },
	        nounCase = (/(\[[ВвУу]\]) ?dddd/).test(format) ?
	            'accusative' :
	            ((/\[?(?:минулої|наступної)? ?\] ?dddd/).test(format) ?
	                'genitive' :
	                'nominative');
	        return weekdays[nounCase][m.day()];
	    }
	    function processHoursFunction(str) {
	        return function () {
	            return str + 'о' + (this.hours() === 11 ? 'б' : '') + '] LT';
	        };
	    }

	    var uk = moment.defineLocale('uk', {
	        months : {
	            'format': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_'),
	            'standalone': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_')
	        },
	        monthsShort : 'січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
	        weekdays : weekdaysCaseReplace,
	        weekdaysShort : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	        weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY р.',
	            LLL : 'D MMMM YYYY р., HH:mm',
	            LLLL : 'dddd, D MMMM YYYY р., HH:mm'
	        },
	        calendar : {
	            sameDay: processHoursFunction('[Сьогодні '),
	            nextDay: processHoursFunction('[Завтра '),
	            lastDay: processHoursFunction('[Вчора '),
	            nextWeek: processHoursFunction('[У] dddd ['),
	            lastWeek: function () {
	                switch (this.day()) {
	                    case 0:
	                    case 3:
	                    case 5:
	                    case 6:
	                        return processHoursFunction('[Минулої] dddd [').call(this);
	                    case 1:
	                    case 2:
	                    case 4:
	                        return processHoursFunction('[Минулого] dddd [').call(this);
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'за %s',
	            past : '%s тому',
	            s : 'декілька секунд',
	            m : relativeTimeWithPlural,
	            mm : relativeTimeWithPlural,
	            h : 'годину',
	            hh : relativeTimeWithPlural,
	            d : 'день',
	            dd : relativeTimeWithPlural,
	            M : 'місяць',
	            MM : relativeTimeWithPlural,
	            y : 'рік',
	            yy : relativeTimeWithPlural
	        },
	        // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
	        meridiemParse: /ночі|ранку|дня|вечора/,
	        isPM: function (input) {
	            return /^(дня|вечора)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ночі';
	            } else if (hour < 12) {
	                return 'ранку';
	            } else if (hour < 17) {
	                return 'дня';
	            } else {
	                return 'вечора';
	            }
	        },
	        ordinalParse: /\d{1,2}-(й|го)/,
	        ordinal: function (number, period) {
	            switch (period) {
	                case 'M':
	                case 'd':
	                case 'DDD':
	                case 'w':
	                case 'W':
	                    return number + '-й';
	                case 'D':
	                    return number + '-го';
	                default:
	                    return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return uk;

	}));

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Uzbek [uz]
	//! author : Sardor Muminov : https://github.com/muminoff

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var uz = moment.defineLocale('uz', {
	        months : 'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
	        monthsShort : 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
	        weekdays : 'Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба'.split('_'),
	        weekdaysShort : 'Якш_Душ_Сеш_Чор_Пай_Жум_Шан'.split('_'),
	        weekdaysMin : 'Як_Ду_Се_Чо_Па_Жу_Ша'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'D MMMM YYYY, dddd HH:mm'
	        },
	        calendar : {
	            sameDay : '[Бугун соат] LT [да]',
	            nextDay : '[Эртага] LT [да]',
	            nextWeek : 'dddd [куни соат] LT [да]',
	            lastDay : '[Кеча соат] LT [да]',
	            lastWeek : '[Утган] dddd [куни соат] LT [да]',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'Якин %s ичида',
	            past : 'Бир неча %s олдин',
	            s : 'фурсат',
	            m : 'бир дакика',
	            mm : '%d дакика',
	            h : 'бир соат',
	            hh : '%d соат',
	            d : 'бир кун',
	            dd : '%d кун',
	            M : 'бир ой',
	            MM : '%d ой',
	            y : 'бир йил',
	            yy : '%d йил'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return uz;

	}));

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Vietnamese [vi]
	//! author : Bang Nguyen : https://github.com/bangnk

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var vi = moment.defineLocale('vi', {
	        months : 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'),
	        monthsShort : 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
	        weekdaysShort : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
	        weekdaysMin : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
	        weekdaysParseExact : true,
	        meridiemParse: /sa|ch/i,
	        isPM : function (input) {
	            return /^ch$/i.test(input);
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 12) {
	                return isLower ? 'sa' : 'SA';
	            } else {
	                return isLower ? 'ch' : 'CH';
	            }
	        },
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM [năm] YYYY',
	            LLL : 'D MMMM [năm] YYYY HH:mm',
	            LLLL : 'dddd, D MMMM [năm] YYYY HH:mm',
	            l : 'DD/M/YYYY',
	            ll : 'D MMM YYYY',
	            lll : 'D MMM YYYY HH:mm',
	            llll : 'ddd, D MMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Hôm nay lúc] LT',
	            nextDay: '[Ngày mai lúc] LT',
	            nextWeek: 'dddd [tuần tới lúc] LT',
	            lastDay: '[Hôm qua lúc] LT',
	            lastWeek: 'dddd [tuần rồi lúc] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : '%s tới',
	            past : '%s trước',
	            s : 'vài giây',
	            m : 'một phút',
	            mm : '%d phút',
	            h : 'một giờ',
	            hh : '%d giờ',
	            d : 'một ngày',
	            dd : '%d ngày',
	            M : 'một tháng',
	            MM : '%d tháng',
	            y : 'một năm',
	            yy : '%d năm'
	        },
	        ordinalParse: /\d{1,2}/,
	        ordinal : function (number) {
	            return number;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return vi;

	}));

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Pseudo [x-pseudo]
	//! author : Andrew Hood : https://github.com/andrewhood125

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var x_pseudo = moment.defineLocale('x-pseudo', {
	        months : 'J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér'.split('_'),
	        monthsShort : 'J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý'.split('_'),
	        weekdaysShort : 'S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát'.split('_'),
	        weekdaysMin : 'S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[T~ódá~ý át] LT',
	            nextDay : '[T~ómó~rró~w át] LT',
	            nextWeek : 'dddd [át] LT',
	            lastDay : '[Ý~ést~érdá~ý át] LT',
	            lastWeek : '[L~ást] dddd [át] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'í~ñ %s',
	            past : '%s á~gó',
	            s : 'á ~féw ~sécó~ñds',
	            m : 'á ~míñ~úté',
	            mm : '%d m~íñú~tés',
	            h : 'á~ñ hó~úr',
	            hh : '%d h~óúrs',
	            d : 'á ~dáý',
	            dd : '%d d~áýs',
	            M : 'á ~móñ~th',
	            MM : '%d m~óñt~hs',
	            y : 'á ~ýéár',
	            yy : '%d ý~éárs'
	        },
	        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return x_pseudo;

	}));

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Chinese (China) [zh-cn]
	//! author : suupic : https://github.com/suupic
	//! author : Zeno Zeng : https://github.com/zenozeng

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var zh_cn = moment.defineLocale('zh-cn', {
	        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	        weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
	        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	        longDateFormat : {
	            LT : 'Ah点mm分',
	            LTS : 'Ah点m分s秒',
	            L : 'YYYY-MM-DD',
	            LL : 'YYYY年MMMD日',
	            LLL : 'YYYY年MMMD日Ah点mm分',
	            LLLL : 'YYYY年MMMD日ddddAh点mm分',
	            l : 'YYYY-MM-DD',
	            ll : 'YYYY年MMMD日',
	            lll : 'YYYY年MMMD日Ah点mm分',
	            llll : 'YYYY年MMMD日ddddAh点mm分'
	        },
	        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	        meridiemHour: function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === '凌晨' || meridiem === '早上' ||
	                    meridiem === '上午') {
	                return hour;
	            } else if (meridiem === '下午' || meridiem === '晚上') {
	                return hour + 12;
	            } else {
	                // '中午'
	                return hour >= 11 ? hour : hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            var hm = hour * 100 + minute;
	            if (hm < 600) {
	                return '凌晨';
	            } else if (hm < 900) {
	                return '早上';
	            } else if (hm < 1130) {
	                return '上午';
	            } else if (hm < 1230) {
	                return '中午';
	            } else if (hm < 1800) {
	                return '下午';
	            } else {
	                return '晚上';
	            }
	        },
	        calendar : {
	            sameDay : function () {
	                return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
	            },
	            nextDay : function () {
	                return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
	            },
	            lastDay : function () {
	                return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
	            },
	            nextWeek : function () {
	                var startOfWeek, prefix;
	                startOfWeek = moment().startOf('week');
	                prefix = this.diff(startOfWeek, 'days') >= 7 ? '[下]' : '[本]';
	                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
	            },
	            lastWeek : function () {
	                var startOfWeek, prefix;
	                startOfWeek = moment().startOf('week');
	                prefix = this.unix() < startOfWeek.unix()  ? '[上]' : '[本]';
	                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
	            },
	            sameElse : 'LL'
	        },
	        ordinalParse: /\d{1,2}(日|月|周)/,
	        ordinal : function (number, period) {
	            switch (period) {
	                case 'd':
	                case 'D':
	                case 'DDD':
	                    return number + '日';
	                case 'M':
	                    return number + '月';
	                case 'w':
	                case 'W':
	                    return number + '周';
	                default:
	                    return number;
	            }
	        },
	        relativeTime : {
	            future : '%s内',
	            past : '%s前',
	            s : '几秒',
	            m : '1 分钟',
	            mm : '%d 分钟',
	            h : '1 小时',
	            hh : '%d 小时',
	            d : '1 天',
	            dd : '%d 天',
	            M : '1 个月',
	            MM : '%d 个月',
	            y : '1 年',
	            yy : '%d 年'
	        },
	        week : {
	            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return zh_cn;

	}));

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Chinese (Hong Kong) [zh-hk]
	//! author : Ben : https://github.com/ben-lin
	//! author : Chris Lam : https://github.com/hehachris
	//! author : Konstantin : https://github.com/skfd

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var zh_hk = moment.defineLocale('zh-hk', {
	        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	        weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
	        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	        longDateFormat : {
	            LT : 'Ah點mm分',
	            LTS : 'Ah點m分s秒',
	            L : 'YYYY年MMMD日',
	            LL : 'YYYY年MMMD日',
	            LLL : 'YYYY年MMMD日Ah點mm分',
	            LLLL : 'YYYY年MMMD日ddddAh點mm分',
	            l : 'YYYY年MMMD日',
	            ll : 'YYYY年MMMD日',
	            lll : 'YYYY年MMMD日Ah點mm分',
	            llll : 'YYYY年MMMD日ddddAh點mm分'
	        },
	        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
	                return hour;
	            } else if (meridiem === '中午') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === '下午' || meridiem === '晚上') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            var hm = hour * 100 + minute;
	            if (hm < 600) {
	                return '凌晨';
	            } else if (hm < 900) {
	                return '早上';
	            } else if (hm < 1130) {
	                return '上午';
	            } else if (hm < 1230) {
	                return '中午';
	            } else if (hm < 1800) {
	                return '下午';
	            } else {
	                return '晚上';
	            }
	        },
	        calendar : {
	            sameDay : '[今天]LT',
	            nextDay : '[明天]LT',
	            nextWeek : '[下]ddddLT',
	            lastDay : '[昨天]LT',
	            lastWeek : '[上]ddddLT',
	            sameElse : 'L'
	        },
	        ordinalParse: /\d{1,2}(日|月|週)/,
	        ordinal : function (number, period) {
	            switch (period) {
	                case 'd' :
	                case 'D' :
	                case 'DDD' :
	                    return number + '日';
	                case 'M' :
	                    return number + '月';
	                case 'w' :
	                case 'W' :
	                    return number + '週';
	                default :
	                    return number;
	            }
	        },
	        relativeTime : {
	            future : '%s內',
	            past : '%s前',
	            s : '幾秒',
	            m : '1 分鐘',
	            mm : '%d 分鐘',
	            h : '1 小時',
	            hh : '%d 小時',
	            d : '1 天',
	            dd : '%d 天',
	            M : '1 個月',
	            MM : '%d 個月',
	            y : '1 年',
	            yy : '%d 年'
	        }
	    });

	    return zh_hk;

	}));

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Chinese (Taiwan) [zh-tw]
	//! author : Ben : https://github.com/ben-lin
	//! author : Chris Lam : https://github.com/hehachris

	;(function (global, factory) {
	    true ? factory(__webpack_require__(31)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var zh_tw = moment.defineLocale('zh-tw', {
	        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	        weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
	        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	        longDateFormat : {
	            LT : 'Ah點mm分',
	            LTS : 'Ah點m分s秒',
	            L : 'YYYY年MMMD日',
	            LL : 'YYYY年MMMD日',
	            LLL : 'YYYY年MMMD日Ah點mm分',
	            LLLL : 'YYYY年MMMD日ddddAh點mm分',
	            l : 'YYYY年MMMD日',
	            ll : 'YYYY年MMMD日',
	            lll : 'YYYY年MMMD日Ah點mm分',
	            llll : 'YYYY年MMMD日ddddAh點mm分'
	        },
	        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
	                return hour;
	            } else if (meridiem === '中午') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === '下午' || meridiem === '晚上') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            var hm = hour * 100 + minute;
	            if (hm < 600) {
	                return '凌晨';
	            } else if (hm < 900) {
	                return '早上';
	            } else if (hm < 1130) {
	                return '上午';
	            } else if (hm < 1230) {
	                return '中午';
	            } else if (hm < 1800) {
	                return '下午';
	            } else {
	                return '晚上';
	            }
	        },
	        calendar : {
	            sameDay : '[今天]LT',
	            nextDay : '[明天]LT',
	            nextWeek : '[下]ddddLT',
	            lastDay : '[昨天]LT',
	            lastWeek : '[上]ddddLT',
	            sameElse : 'L'
	        },
	        ordinalParse: /\d{1,2}(日|月|週)/,
	        ordinal : function (number, period) {
	            switch (period) {
	                case 'd' :
	                case 'D' :
	                case 'DDD' :
	                    return number + '日';
	                case 'M' :
	                    return number + '月';
	                case 'w' :
	                case 'W' :
	                    return number + '週';
	                default :
	                    return number;
	            }
	        },
	        relativeTime : {
	            future : '%s內',
	            past : '%s前',
	            s : '幾秒',
	            m : '1 分鐘',
	            mm : '%d 分鐘',
	            h : '1 小時',
	            hh : '%d 小時',
	            d : '1 天',
	            dd : '%d 天',
	            M : '1 個月',
	            MM : '%d 個月',
	            y : '1 年',
	            yy : '%d 年'
	        }
	    });

	    return zh_tw;

	}));

/***/ },
/* 138 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;

		Chart.defaults.bar = {
			hover: {
				mode: 'label'
			},

			scales: {
				xAxes: [{
					type: 'category',

					// Specific to Bar Controller
					categoryPercentage: 0.8,
					barPercentage: 0.9,

					// grid line settings
					gridLines: {
						offsetGridLines: true
					}
				}],
				yAxes: [{
					type: 'linear'
				}]
			}
		};

		Chart.controllers.bar = Chart.DatasetController.extend({

			dataElementType: Chart.elements.Rectangle,

			initialize: function(chart, datasetIndex) {
				Chart.DatasetController.prototype.initialize.call(this, chart, datasetIndex);

				// Use this to indicate that this is a bar dataset.
				this.getMeta().bar = true;
			},

			// Get the number of datasets that display bars. We use this to correctly calculate the bar width
			getBarCount: function() {
				var me = this;
				var barCount = 0;
				helpers.each(me.chart.data.datasets, function(dataset, datasetIndex) {
					var meta = me.chart.getDatasetMeta(datasetIndex);
					if (meta.bar && me.chart.isDatasetVisible(datasetIndex)) {
						++barCount;
					}
				}, me);
				return barCount;
			},

			update: function(reset) {
				var me = this;
				helpers.each(me.getMeta().data, function(rectangle, index) {
					me.updateElement(rectangle, index, reset);
				}, me);
			},

			updateElement: function(rectangle, index, reset) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var yScale = me.getScaleForId(meta.yAxisID);
				var scaleBase = yScale.getBasePixel();
				var rectangleElementOptions = me.chart.options.elements.rectangle;
				var custom = rectangle.custom || {};
				var dataset = me.getDataset();

				helpers.extend(rectangle, {
					// Utility
					_xScale: xScale,
					_yScale: yScale,
					_datasetIndex: me.index,
					_index: index,

					// Desired view properties
					_model: {
						x: me.calculateBarX(index, me.index),
						y: reset ? scaleBase : me.calculateBarY(index, me.index),

						// Tooltip
						label: me.chart.data.labels[index],
						datasetLabel: dataset.label,

						// Appearance
						base: reset ? scaleBase : me.calculateBarBase(me.index, index),
						width: me.calculateBarWidth(index),
						backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor),
						borderSkipped: custom.borderSkipped ? custom.borderSkipped : rectangleElementOptions.borderSkipped,
						borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor),
						borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth)
					}
				});
				rectangle.pivot();
			},

			calculateBarBase: function(datasetIndex, index) {
				var me = this;
				var meta = me.getMeta();
				var yScale = me.getScaleForId(meta.yAxisID);
				var base = 0;

				if (yScale.options.stacked) {
					var chart = me.chart;
					var datasets = chart.data.datasets;
					var value = Number(datasets[datasetIndex].data[index]);

					for (var i = 0; i < datasetIndex; i++) {
						var currentDs = datasets[i];
						var currentDsMeta = chart.getDatasetMeta(i);
						if (currentDsMeta.bar && currentDsMeta.yAxisID === yScale.id && chart.isDatasetVisible(i)) {
							var currentVal = Number(currentDs.data[index]);
							base += value < 0 ? Math.min(currentVal, 0) : Math.max(currentVal, 0);
						}
					}

					return yScale.getPixelForValue(base);
				}

				return yScale.getBasePixel();
			},

			getRuler: function(index) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var datasetCount = me.getBarCount();

				var tickWidth;

				if (xScale.options.type === 'category') {
					tickWidth = xScale.getPixelForTick(index + 1) - xScale.getPixelForTick(index);
				} else {
					// Average width
					tickWidth = xScale.width / xScale.ticks.length;
				}
				var categoryWidth = tickWidth * xScale.options.categoryPercentage;
				var categorySpacing = (tickWidth - (tickWidth * xScale.options.categoryPercentage)) / 2;
				var fullBarWidth = categoryWidth / datasetCount;

				if (xScale.ticks.length !== me.chart.data.labels.length) {
					var perc = xScale.ticks.length / me.chart.data.labels.length;
					fullBarWidth = fullBarWidth * perc;
				}

				var barWidth = fullBarWidth * xScale.options.barPercentage;
				var barSpacing = fullBarWidth - (fullBarWidth * xScale.options.barPercentage);

				return {
					datasetCount: datasetCount,
					tickWidth: tickWidth,
					categoryWidth: categoryWidth,
					categorySpacing: categorySpacing,
					fullBarWidth: fullBarWidth,
					barWidth: barWidth,
					barSpacing: barSpacing
				};
			},

			calculateBarWidth: function(index) {
				var xScale = this.getScaleForId(this.getMeta().xAxisID);
				if (xScale.options.barThickness) {
					return xScale.options.barThickness;
				}
				var ruler = this.getRuler(index);
				return xScale.options.stacked ? ruler.categoryWidth : ruler.barWidth;
			},

			// Get bar index from the given dataset index accounting for the fact that not all bars are visible
			getBarIndex: function(datasetIndex) {
				var barIndex = 0;
				var meta, j;

				for (j = 0; j < datasetIndex; ++j) {
					meta = this.chart.getDatasetMeta(j);
					if (meta.bar && this.chart.isDatasetVisible(j)) {
						++barIndex;
					}
				}

				return barIndex;
			},

			calculateBarX: function(index, datasetIndex) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var barIndex = me.getBarIndex(datasetIndex);

				var ruler = me.getRuler(index);
				var leftTick = xScale.getPixelForValue(null, index, datasetIndex, me.chart.isCombo);
				leftTick -= me.chart.isCombo ? (ruler.tickWidth / 2) : 0;

				if (xScale.options.stacked) {
					return leftTick + (ruler.categoryWidth / 2) + ruler.categorySpacing;
				}

				return leftTick +
					(ruler.barWidth / 2) +
					ruler.categorySpacing +
					(ruler.barWidth * barIndex) +
					(ruler.barSpacing / 2) +
					(ruler.barSpacing * barIndex);
			},

			calculateBarY: function(index, datasetIndex) {
				var me = this;
				var meta = me.getMeta();
				var yScale = me.getScaleForId(meta.yAxisID);
				var value = Number(me.getDataset().data[index]);

				if (yScale.options.stacked) {

					var sumPos = 0,
						sumNeg = 0;

					for (var i = 0; i < datasetIndex; i++) {
						var ds = me.chart.data.datasets[i];
						var dsMeta = me.chart.getDatasetMeta(i);
						if (dsMeta.bar && dsMeta.yAxisID === yScale.id && me.chart.isDatasetVisible(i)) {
							var stackedVal = Number(ds.data[index]);
							if (stackedVal < 0) {
								sumNeg += stackedVal || 0;
							} else {
								sumPos += stackedVal || 0;
							}
						}
					}

					if (value < 0) {
						return yScale.getPixelForValue(sumNeg + value);
					}
					return yScale.getPixelForValue(sumPos + value);
				}

				return yScale.getPixelForValue(value);
			},

			draw: function(ease) {
				var me = this;
				var easingDecimal = ease || 1;
				helpers.each(me.getMeta().data, function(rectangle, index) {
					var d = me.getDataset().data[index];
					if (d !== null && d !== undefined && !isNaN(d)) {
						rectangle.transition(easingDecimal).draw();
					}
				}, me);
			},

			setHoverStyle: function(rectangle) {
				var dataset = this.chart.data.datasets[rectangle._datasetIndex];
				var index = rectangle._index;

				var custom = rectangle.custom || {};
				var model = rectangle._model;
				model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.hoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
				model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.hoverBorderColor, index, helpers.getHoverColor(model.borderColor));
				model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
			},

			removeHoverStyle: function(rectangle) {
				var dataset = this.chart.data.datasets[rectangle._datasetIndex];
				var index = rectangle._index;
				var custom = rectangle.custom || {};
				var model = rectangle._model;
				var rectangleElementOptions = this.chart.options.elements.rectangle;

				model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor);
				model.borderColor = custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor);
				model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth);
			}

		});


		// including horizontalBar in the bar file, instead of a file of its own
		// it extends bar (like pie extends doughnut)
		Chart.defaults.horizontalBar = {
			hover: {
				mode: 'label'
			},

			scales: {
				xAxes: [{
					type: 'linear',
					position: 'bottom'
				}],
				yAxes: [{
					position: 'left',
					type: 'category',

					// Specific to Horizontal Bar Controller
					categoryPercentage: 0.8,
					barPercentage: 0.9,

					// grid line settings
					gridLines: {
						offsetGridLines: true
					}
				}]
			},
			elements: {
				rectangle: {
					borderSkipped: 'left'
				}
			},
			tooltips: {
				callbacks: {
					title: function(tooltipItems, data) {
						// Pick first xLabel for now
						var title = '';

						if (tooltipItems.length > 0) {
							if (tooltipItems[0].yLabel) {
								title = tooltipItems[0].yLabel;
							} else if (data.labels.length > 0 && tooltipItems[0].index < data.labels.length) {
								title = data.labels[tooltipItems[0].index];
							}
						}

						return title;
					},
					label: function(tooltipItem, data) {
						var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
						return datasetLabel + ': ' + tooltipItem.xLabel;
					}
				}
			}
		};

		Chart.controllers.horizontalBar = Chart.controllers.bar.extend({
			updateElement: function(rectangle, index, reset) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var yScale = me.getScaleForId(meta.yAxisID);
				var scaleBase = xScale.getBasePixel();
				var custom = rectangle.custom || {};
				var dataset = me.getDataset();
				var rectangleElementOptions = me.chart.options.elements.rectangle;

				helpers.extend(rectangle, {
					// Utility
					_xScale: xScale,
					_yScale: yScale,
					_datasetIndex: me.index,
					_index: index,

					// Desired view properties
					_model: {
						x: reset ? scaleBase : me.calculateBarX(index, me.index),
						y: me.calculateBarY(index, me.index),

						// Tooltip
						label: me.chart.data.labels[index],
						datasetLabel: dataset.label,

						// Appearance
						base: reset ? scaleBase : me.calculateBarBase(me.index, index),
						height: me.calculateBarHeight(index),
						backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor),
						borderSkipped: custom.borderSkipped ? custom.borderSkipped : rectangleElementOptions.borderSkipped,
						borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor),
						borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth)
					},

					draw: function() {
						var ctx = this._chart.ctx;
						var vm = this._view;

						var halfHeight = vm.height / 2,
							topY = vm.y - halfHeight,
							bottomY = vm.y + halfHeight,
							right = vm.base - (vm.base - vm.x),
							halfStroke = vm.borderWidth / 2;

						// Canvas doesn't allow us to stroke inside the width so we can
						// adjust the sizes to fit if we're setting a stroke on the line
						if (vm.borderWidth) {
							topY += halfStroke;
							bottomY -= halfStroke;
							right += halfStroke;
						}

						ctx.beginPath();

						ctx.fillStyle = vm.backgroundColor;
						ctx.strokeStyle = vm.borderColor;
						ctx.lineWidth = vm.borderWidth;

						// Corner points, from bottom-left to bottom-right clockwise
						// | 1 2 |
						// | 0 3 |
						var corners = [
							[vm.base, bottomY],
							[vm.base, topY],
							[right, topY],
							[right, bottomY]
						];

						// Find first (starting) corner with fallback to 'bottom'
						var borders = ['bottom', 'left', 'top', 'right'];
						var startCorner = borders.indexOf(vm.borderSkipped, 0);
						if (startCorner === -1) {
							startCorner = 0;
						}

						function cornerAt(cornerIndex) {
							return corners[(startCorner + cornerIndex) % 4];
						}

						// Draw rectangle from 'startCorner'
						ctx.moveTo.apply(ctx, cornerAt(0));
						for (var i = 1; i < 4; i++) {
							ctx.lineTo.apply(ctx, cornerAt(i));
						}

						ctx.fill();
						if (vm.borderWidth) {
							ctx.stroke();
						}
					},

					inRange: function(mouseX, mouseY) {
						var vm = this._view;
						var inRange = false;

						if (vm) {
							if (vm.x < vm.base) {
								inRange = (mouseY >= vm.y - vm.height / 2 && mouseY <= vm.y + vm.height / 2) && (mouseX >= vm.x && mouseX <= vm.base);
							} else {
								inRange = (mouseY >= vm.y - vm.height / 2 && mouseY <= vm.y + vm.height / 2) && (mouseX >= vm.base && mouseX <= vm.x);
							}
						}

						return inRange;
					}
				});

				rectangle.pivot();
			},

			calculateBarBase: function(datasetIndex, index) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var base = 0;

				if (xScale.options.stacked) {
					var chart = me.chart;
					var datasets = chart.data.datasets;
					var value = Number(datasets[datasetIndex].data[index]);

					for (var i = 0; i < datasetIndex; i++) {
						var currentDs = datasets[i];
						var currentDsMeta = chart.getDatasetMeta(i);
						if (currentDsMeta.bar && currentDsMeta.xAxisID === xScale.id && chart.isDatasetVisible(i)) {
							var currentVal = Number(currentDs.data[index]);
							base += value < 0 ? Math.min(currentVal, 0) : Math.max(currentVal, 0);
						}
					}

					return xScale.getPixelForValue(base);
				}

				return xScale.getBasePixel();
			},

			getRuler: function(index) {
				var me = this;
				var meta = me.getMeta();
				var yScale = me.getScaleForId(meta.yAxisID);
				var datasetCount = me.getBarCount();

				var tickHeight;
				if (yScale.options.type === 'category') {
					tickHeight = yScale.getPixelForTick(index + 1) - yScale.getPixelForTick(index);
				} else {
					// Average width
					tickHeight = yScale.width / yScale.ticks.length;
				}
				var categoryHeight = tickHeight * yScale.options.categoryPercentage;
				var categorySpacing = (tickHeight - (tickHeight * yScale.options.categoryPercentage)) / 2;
				var fullBarHeight = categoryHeight / datasetCount;

				if (yScale.ticks.length !== me.chart.data.labels.length) {
					var perc = yScale.ticks.length / me.chart.data.labels.length;
					fullBarHeight = fullBarHeight * perc;
				}

				var barHeight = fullBarHeight * yScale.options.barPercentage;
				var barSpacing = fullBarHeight - (fullBarHeight * yScale.options.barPercentage);

				return {
					datasetCount: datasetCount,
					tickHeight: tickHeight,
					categoryHeight: categoryHeight,
					categorySpacing: categorySpacing,
					fullBarHeight: fullBarHeight,
					barHeight: barHeight,
					barSpacing: barSpacing
				};
			},

			calculateBarHeight: function(index) {
				var me = this;
				var yScale = me.getScaleForId(me.getMeta().yAxisID);
				if (yScale.options.barThickness) {
					return yScale.options.barThickness;
				}
				var ruler = me.getRuler(index);
				return yScale.options.stacked ? ruler.categoryHeight : ruler.barHeight;
			},

			calculateBarX: function(index, datasetIndex) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var value = Number(me.getDataset().data[index]);

				if (xScale.options.stacked) {

					var sumPos = 0,
						sumNeg = 0;

					for (var i = 0; i < datasetIndex; i++) {
						var ds = me.chart.data.datasets[i];
						var dsMeta = me.chart.getDatasetMeta(i);
						if (dsMeta.bar && dsMeta.xAxisID === xScale.id && me.chart.isDatasetVisible(i)) {
							var stackedVal = Number(ds.data[index]);
							if (stackedVal < 0) {
								sumNeg += stackedVal || 0;
							} else {
								sumPos += stackedVal || 0;
							}
						}
					}

					if (value < 0) {
						return xScale.getPixelForValue(sumNeg + value);
					}
					return xScale.getPixelForValue(sumPos + value);
				}

				return xScale.getPixelForValue(value);
			},

			calculateBarY: function(index, datasetIndex) {
				var me = this;
				var meta = me.getMeta();
				var yScale = me.getScaleForId(meta.yAxisID);
				var barIndex = me.getBarIndex(datasetIndex);

				var ruler = me.getRuler(index);
				var topTick = yScale.getPixelForValue(null, index, datasetIndex, me.chart.isCombo);
				topTick -= me.chart.isCombo ? (ruler.tickHeight / 2) : 0;

				if (yScale.options.stacked) {
					return topTick + (ruler.categoryHeight / 2) + ruler.categorySpacing;
				}

				return topTick +
					(ruler.barHeight / 2) +
					ruler.categorySpacing +
					(ruler.barHeight * barIndex) +
					(ruler.barSpacing / 2) +
					(ruler.barSpacing * barIndex);
			}
		});
	};


/***/ },
/* 139 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;

		Chart.defaults.bubble = {
			hover: {
				mode: 'single'
			},

			scales: {
				xAxes: [{
					type: 'linear', // bubble should probably use a linear scale by default
					position: 'bottom',
					id: 'x-axis-0' // need an ID so datasets can reference the scale
				}],
				yAxes: [{
					type: 'linear',
					position: 'left',
					id: 'y-axis-0'
				}]
			},

			tooltips: {
				callbacks: {
					title: function() {
						// Title doesn't make sense for scatter since we format the data as a point
						return '';
					},
					label: function(tooltipItem, data) {
						var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
						var dataPoint = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
						return datasetLabel + ': (' + dataPoint.x + ', ' + dataPoint.y + ', ' + dataPoint.r + ')';
					}
				}
			}
		};

		Chart.controllers.bubble = Chart.DatasetController.extend({

			dataElementType: Chart.elements.Point,

			update: function(reset) {
				var me = this;
				var meta = me.getMeta();
				var points = meta.data;

				// Update Points
				helpers.each(points, function(point, index) {
					me.updateElement(point, index, reset);
				});
			},

			updateElement: function(point, index, reset) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var yScale = me.getScaleForId(meta.yAxisID);

				var custom = point.custom || {};
				var dataset = me.getDataset();
				var data = dataset.data[index];
				var pointElementOptions = me.chart.options.elements.point;
				var dsIndex = me.index;

				helpers.extend(point, {
					// Utility
					_xScale: xScale,
					_yScale: yScale,
					_datasetIndex: dsIndex,
					_index: index,

					// Desired view properties
					_model: {
						x: reset ? xScale.getPixelForDecimal(0.5) : xScale.getPixelForValue(typeof data === 'object' ? data : NaN, index, dsIndex, me.chart.isCombo),
						y: reset ? yScale.getBasePixel() : yScale.getPixelForValue(data, index, dsIndex),
						// Appearance
						radius: reset ? 0 : custom.radius ? custom.radius : me.getRadius(data),

						// Tooltip
						hitRadius: custom.hitRadius ? custom.hitRadius : helpers.getValueAtIndexOrDefault(dataset.hitRadius, index, pointElementOptions.hitRadius)
					}
				});

				// Trick to reset the styles of the point
				Chart.DatasetController.prototype.removeHoverStyle.call(me, point, pointElementOptions);

				var model = point._model;
				model.skip = custom.skip ? custom.skip : (isNaN(model.x) || isNaN(model.y));

				point.pivot();
			},

			getRadius: function(value) {
				return value.r || this.chart.options.elements.point.radius;
			},

			setHoverStyle: function(point) {
				var me = this;
				Chart.DatasetController.prototype.setHoverStyle.call(me, point);

				// Radius
				var dataset = me.chart.data.datasets[point._datasetIndex];
				var index = point._index;
				var custom = point.custom || {};
				var model = point._model;
				model.radius = custom.hoverRadius ? custom.hoverRadius : (helpers.getValueAtIndexOrDefault(dataset.hoverRadius, index, me.chart.options.elements.point.hoverRadius)) + me.getRadius(dataset.data[index]);
			},

			removeHoverStyle: function(point) {
				var me = this;
				Chart.DatasetController.prototype.removeHoverStyle.call(me, point, me.chart.options.elements.point);

				var dataVal = me.chart.data.datasets[point._datasetIndex].data[point._index];
				var custom = point.custom || {};
				var model = point._model;

				model.radius = custom.radius ? custom.radius : me.getRadius(dataVal);
			}
		});
	};


/***/ },
/* 140 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers,
			defaults = Chart.defaults;

		defaults.doughnut = {
			animation: {
				// Boolean - Whether we animate the rotation of the Doughnut
				animateRotate: true,
				// Boolean - Whether we animate scaling the Doughnut from the centre
				animateScale: false
			},
			aspectRatio: 1,
			hover: {
				mode: 'single'
			},
			legendCallback: function(chart) {
				var text = [];
				text.push('<ul class="' + chart.id + '-legend">');

				var data = chart.data;
				var datasets = data.datasets;
				var labels = data.labels;

				if (datasets.length) {
					for (var i = 0; i < datasets[0].data.length; ++i) {
						text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '"></span>');
						if (labels[i]) {
							text.push(labels[i]);
						}
						text.push('</li>');
					}
				}

				text.push('</ul>');
				return text.join('');
			},
			legend: {
				labels: {
					generateLabels: function(chart) {
						var data = chart.data;
						if (data.labels.length && data.datasets.length) {
							return data.labels.map(function(label, i) {
								var meta = chart.getDatasetMeta(0);
								var ds = data.datasets[0];
								var arc = meta.data[i];
								var custom = arc && arc.custom || {};
								var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
								var arcOpts = chart.options.elements.arc;
								var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
								var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
								var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

								return {
									text: label,
									fillStyle: fill,
									strokeStyle: stroke,
									lineWidth: bw,
									hidden: isNaN(ds.data[i]) || meta.data[i].hidden,

									// Extra data used for toggling the correct item
									index: i
								};
							});
						}
						return [];
					}
				},

				onClick: function(e, legendItem) {
					var index = legendItem.index;
					var chart = this.chart;
					var i, ilen, meta;

					for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
						meta = chart.getDatasetMeta(i);
						// toggle visibility of index if exists
						if (meta.data[index]) {
							meta.data[index].hidden = !meta.data[index].hidden;
						}
					}

					chart.update();
				}
			},

			// The percentage of the chart that we cut out of the middle.
			cutoutPercentage: 50,

			// The rotation of the chart, where the first data arc begins.
			rotation: Math.PI * -0.5,

			// The total circumference of the chart.
			circumference: Math.PI * 2.0,

			// Need to override these to give a nice default
			tooltips: {
				callbacks: {
					title: function() {
						return '';
					},
					label: function(tooltipItem, data) {
						return data.labels[tooltipItem.index] + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
					}
				}
			}
		};

		defaults.pie = helpers.clone(defaults.doughnut);
		helpers.extend(defaults.pie, {
			cutoutPercentage: 0
		});


		Chart.controllers.doughnut = Chart.controllers.pie = Chart.DatasetController.extend({

			dataElementType: Chart.elements.Arc,

			linkScales: helpers.noop,

			// Get index of the dataset in relation to the visible datasets. This allows determining the inner and outer radius correctly
			getRingIndex: function(datasetIndex) {
				var ringIndex = 0;

				for (var j = 0; j < datasetIndex; ++j) {
					if (this.chart.isDatasetVisible(j)) {
						++ringIndex;
					}
				}

				return ringIndex;
			},

			update: function(reset) {
				var me = this;
				var chart = me.chart,
					chartArea = chart.chartArea,
					opts = chart.options,
					arcOpts = opts.elements.arc,
					availableWidth = chartArea.right - chartArea.left - arcOpts.borderWidth,
					availableHeight = chartArea.bottom - chartArea.top - arcOpts.borderWidth,
					minSize = Math.min(availableWidth, availableHeight),
					offset = {
						x: 0,
						y: 0
					},
					meta = me.getMeta(),
					cutoutPercentage = opts.cutoutPercentage,
					circumference = opts.circumference;

				// If the chart's circumference isn't a full circle, calculate minSize as a ratio of the width/height of the arc
				if (circumference < Math.PI * 2.0) {
					var startAngle = opts.rotation % (Math.PI * 2.0);
					startAngle += Math.PI * 2.0 * (startAngle >= Math.PI ? -1 : startAngle < -Math.PI ? 1 : 0);
					var endAngle = startAngle + circumference;
					var start = {x: Math.cos(startAngle), y: Math.sin(startAngle)};
					var end = {x: Math.cos(endAngle), y: Math.sin(endAngle)};
					var contains0 = (startAngle <= 0 && 0 <= endAngle) || (startAngle <= Math.PI * 2.0 && Math.PI * 2.0 <= endAngle);
					var contains90 = (startAngle <= Math.PI * 0.5 && Math.PI * 0.5 <= endAngle) || (startAngle <= Math.PI * 2.5 && Math.PI * 2.5 <= endAngle);
					var contains180 = (startAngle <= -Math.PI && -Math.PI <= endAngle) || (startAngle <= Math.PI && Math.PI <= endAngle);
					var contains270 = (startAngle <= -Math.PI * 0.5 && -Math.PI * 0.5 <= endAngle) || (startAngle <= Math.PI * 1.5 && Math.PI * 1.5 <= endAngle);
					var cutout = cutoutPercentage / 100.0;
					var min = {x: contains180 ? -1 : Math.min(start.x * (start.x < 0 ? 1 : cutout), end.x * (end.x < 0 ? 1 : cutout)), y: contains270 ? -1 : Math.min(start.y * (start.y < 0 ? 1 : cutout), end.y * (end.y < 0 ? 1 : cutout))};
					var max = {x: contains0 ? 1 : Math.max(start.x * (start.x > 0 ? 1 : cutout), end.x * (end.x > 0 ? 1 : cutout)), y: contains90 ? 1 : Math.max(start.y * (start.y > 0 ? 1 : cutout), end.y * (end.y > 0 ? 1 : cutout))};
					var size = {width: (max.x - min.x) * 0.5, height: (max.y - min.y) * 0.5};
					minSize = Math.min(availableWidth / size.width, availableHeight / size.height);
					offset = {x: (max.x + min.x) * -0.5, y: (max.y + min.y) * -0.5};
				}

				chart.borderWidth = me.getMaxBorderWidth(meta.data);
				chart.outerRadius = Math.max((minSize - chart.borderWidth) / 2, 0);
				chart.innerRadius = Math.max(cutoutPercentage ? (chart.outerRadius / 100) * (cutoutPercentage) : 1, 0);
				chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();
				chart.offsetX = offset.x * chart.outerRadius;
				chart.offsetY = offset.y * chart.outerRadius;

				meta.total = me.calculateTotal();

				me.outerRadius = chart.outerRadius - (chart.radiusLength * me.getRingIndex(me.index));
				me.innerRadius = me.outerRadius - chart.radiusLength;

				helpers.each(meta.data, function(arc, index) {
					me.updateElement(arc, index, reset);
				});
			},

			updateElement: function(arc, index, reset) {
				var me = this;
				var chart = me.chart,
					chartArea = chart.chartArea,
					opts = chart.options,
					animationOpts = opts.animation,
					centerX = (chartArea.left + chartArea.right) / 2,
					centerY = (chartArea.top + chartArea.bottom) / 2,
					startAngle = opts.rotation, // non reset case handled later
					endAngle = opts.rotation, // non reset case handled later
					dataset = me.getDataset(),
					circumference = reset && animationOpts.animateRotate ? 0 : arc.hidden ? 0 : me.calculateCircumference(dataset.data[index]) * (opts.circumference / (2.0 * Math.PI)),
					innerRadius = reset && animationOpts.animateScale ? 0 : me.innerRadius,
					outerRadius = reset && animationOpts.animateScale ? 0 : me.outerRadius,
					valueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;

				helpers.extend(arc, {
					// Utility
					_datasetIndex: me.index,
					_index: index,

					// Desired view properties
					_model: {
						x: centerX + chart.offsetX,
						y: centerY + chart.offsetY,
						startAngle: startAngle,
						endAngle: endAngle,
						circumference: circumference,
						outerRadius: outerRadius,
						innerRadius: innerRadius,
						label: valueAtIndexOrDefault(dataset.label, index, chart.data.labels[index])
					}
				});

				var model = arc._model;
				// Resets the visual styles
				this.removeHoverStyle(arc);

				// Set correct angles if not resetting
				if (!reset || !animationOpts.animateRotate) {
					if (index === 0) {
						model.startAngle = opts.rotation;
					} else {
						model.startAngle = me.getMeta().data[index - 1]._model.endAngle;
					}

					model.endAngle = model.startAngle + model.circumference;
				}

				arc.pivot();
			},

			removeHoverStyle: function(arc) {
				Chart.DatasetController.prototype.removeHoverStyle.call(this, arc, this.chart.options.elements.arc);
			},

			calculateTotal: function() {
				var dataset = this.getDataset();
				var meta = this.getMeta();
				var total = 0;
				var value;

				helpers.each(meta.data, function(element, index) {
					value = dataset.data[index];
					if (!isNaN(value) && !element.hidden) {
						total += Math.abs(value);
					}
				});

				/* if (total === 0) {
					total = NaN;
				}*/

				return total;
			},

			calculateCircumference: function(value) {
				var total = this.getMeta().total;
				if (total > 0 && !isNaN(value)) {
					return (Math.PI * 2.0) * (value / total);
				}
				return 0;
			},

			// gets the max border or hover width to properly scale pie charts
			getMaxBorderWidth: function(elements) {
				var max = 0,
					index = this.index,
					length = elements.length,
					borderWidth,
					hoverWidth;

				for (var i = 0; i < length; i++) {
					borderWidth = elements[i]._model ? elements[i]._model.borderWidth : 0;
					hoverWidth = elements[i]._chart ? elements[i]._chart.config.data.datasets[index].hoverBorderWidth : 0;

					max = borderWidth > max ? borderWidth : max;
					max = hoverWidth > max ? hoverWidth : max;
				}
				return max;
			}
		});
	};


/***/ },
/* 141 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;

		Chart.defaults.line = {
			showLines: true,
			spanGaps: false,

			hover: {
				mode: 'label'
			},

			scales: {
				xAxes: [{
					type: 'category',
					id: 'x-axis-0'
				}],
				yAxes: [{
					type: 'linear',
					id: 'y-axis-0'
				}]
			}
		};

		function lineEnabled(dataset, options) {
			return helpers.getValueOrDefault(dataset.showLine, options.showLines);
		}

		Chart.controllers.line = Chart.DatasetController.extend({

			datasetElementType: Chart.elements.Line,

			dataElementType: Chart.elements.Point,

			addElementAndReset: function(index) {
				var me = this;
				var options = me.chart.options;
				var meta = me.getMeta();

				Chart.DatasetController.prototype.addElementAndReset.call(me, index);

				// Make sure bezier control points are updated
				if (lineEnabled(me.getDataset(), options) && meta.dataset._model.tension !== 0) {
					me.updateBezierControlPoints();
				}
			},

			update: function(reset) {
				var me = this;
				var meta = me.getMeta();
				var line = meta.dataset;
				var points = meta.data || [];
				var options = me.chart.options;
				var lineElementOptions = options.elements.line;
				var scale = me.getScaleForId(meta.yAxisID);
				var i, ilen, custom;
				var dataset = me.getDataset();
				var showLine = lineEnabled(dataset, options);

				// Update Line
				if (showLine) {
					custom = line.custom || {};

					// Compatibility: If the properties are defined with only the old name, use those values
					if ((dataset.tension !== undefined) && (dataset.lineTension === undefined)) {
						dataset.lineTension = dataset.tension;
					}

					// Utility
					line._scale = scale;
					line._datasetIndex = me.index;
					// Data
					line._children = points;
					// Model
					line._model = {
						// Appearance
						// The default behavior of lines is to break at null values, according
						// to https://github.com/chartjs/Chart.js/issues/2435#issuecomment-216718158
						// This option gives linse the ability to span gaps
						spanGaps: dataset.spanGaps ? dataset.spanGaps : options.spanGaps,
						tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.lineTension, lineElementOptions.tension),
						backgroundColor: custom.backgroundColor ? custom.backgroundColor : (dataset.backgroundColor || lineElementOptions.backgroundColor),
						borderWidth: custom.borderWidth ? custom.borderWidth : (dataset.borderWidth || lineElementOptions.borderWidth),
						borderColor: custom.borderColor ? custom.borderColor : (dataset.borderColor || lineElementOptions.borderColor),
						borderCapStyle: custom.borderCapStyle ? custom.borderCapStyle : (dataset.borderCapStyle || lineElementOptions.borderCapStyle),
						borderDash: custom.borderDash ? custom.borderDash : (dataset.borderDash || lineElementOptions.borderDash),
						borderDashOffset: custom.borderDashOffset ? custom.borderDashOffset : (dataset.borderDashOffset || lineElementOptions.borderDashOffset),
						borderJoinStyle: custom.borderJoinStyle ? custom.borderJoinStyle : (dataset.borderJoinStyle || lineElementOptions.borderJoinStyle),
						fill: custom.fill ? custom.fill : (dataset.fill !== undefined ? dataset.fill : lineElementOptions.fill),
						steppedLine: custom.steppedLine ? custom.steppedLine : helpers.getValueOrDefault(dataset.steppedLine, lineElementOptions.stepped),
						cubicInterpolationMode: custom.cubicInterpolationMode ? custom.cubicInterpolationMode : helpers.getValueOrDefault(dataset.cubicInterpolationMode, lineElementOptions.cubicInterpolationMode),
						// Scale
						scaleTop: scale.top,
						scaleBottom: scale.bottom,
						scaleZero: scale.getBasePixel()
					};

					line.pivot();
				}

				// Update Points
				for (i=0, ilen=points.length; i<ilen; ++i) {
					me.updateElement(points[i], i, reset);
				}

				if (showLine && line._model.tension !== 0) {
					me.updateBezierControlPoints();
				}

				// Now pivot the point for animation
				for (i=0, ilen=points.length; i<ilen; ++i) {
					points[i].pivot();
				}
			},

			getPointBackgroundColor: function(point, index) {
				var backgroundColor = this.chart.options.elements.point.backgroundColor;
				var dataset = this.getDataset();
				var custom = point.custom || {};

				if (custom.backgroundColor) {
					backgroundColor = custom.backgroundColor;
				} else if (dataset.pointBackgroundColor) {
					backgroundColor = helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, backgroundColor);
				} else if (dataset.backgroundColor) {
					backgroundColor = dataset.backgroundColor;
				}

				return backgroundColor;
			},

			getPointBorderColor: function(point, index) {
				var borderColor = this.chart.options.elements.point.borderColor;
				var dataset = this.getDataset();
				var custom = point.custom || {};

				if (custom.borderColor) {
					borderColor = custom.borderColor;
				} else if (dataset.pointBorderColor) {
					borderColor = helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, borderColor);
				} else if (dataset.borderColor) {
					borderColor = dataset.borderColor;
				}

				return borderColor;
			},

			getPointBorderWidth: function(point, index) {
				var borderWidth = this.chart.options.elements.point.borderWidth;
				var dataset = this.getDataset();
				var custom = point.custom || {};

				if (custom.borderWidth) {
					borderWidth = custom.borderWidth;
				} else if (dataset.pointBorderWidth) {
					borderWidth = helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, borderWidth);
				} else if (dataset.borderWidth) {
					borderWidth = dataset.borderWidth;
				}

				return borderWidth;
			},

			updateElement: function(point, index, reset) {
				var me = this;
				var meta = me.getMeta();
				var custom = point.custom || {};
				var dataset = me.getDataset();
				var datasetIndex = me.index;
				var value = dataset.data[index];
				var yScale = me.getScaleForId(meta.yAxisID);
				var xScale = me.getScaleForId(meta.xAxisID);
				var pointOptions = me.chart.options.elements.point;
				var x, y;
				var labels = me.chart.data.labels || [];
				var includeOffset = (labels.length === 1 || dataset.data.length === 1) || me.chart.isCombo;

				// Compatibility: If the properties are defined with only the old name, use those values
				if ((dataset.radius !== undefined) && (dataset.pointRadius === undefined)) {
					dataset.pointRadius = dataset.radius;
				}
				if ((dataset.hitRadius !== undefined) && (dataset.pointHitRadius === undefined)) {
					dataset.pointHitRadius = dataset.hitRadius;
				}

				x = xScale.getPixelForValue(typeof value === 'object' ? value : NaN, index, datasetIndex, includeOffset);
				y = reset ? yScale.getBasePixel() : me.calculatePointY(value, index, datasetIndex);

				// Utility
				point._xScale = xScale;
				point._yScale = yScale;
				point._datasetIndex = datasetIndex;
				point._index = index;

				// Desired view properties
				point._model = {
					x: x,
					y: y,
					skip: custom.skip || isNaN(x) || isNaN(y),
					// Appearance
					radius: custom.radius || helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, pointOptions.radius),
					pointStyle: custom.pointStyle || helpers.getValueAtIndexOrDefault(dataset.pointStyle, index, pointOptions.pointStyle),
					backgroundColor: me.getPointBackgroundColor(point, index),
					borderColor: me.getPointBorderColor(point, index),
					borderWidth: me.getPointBorderWidth(point, index),
					tension: meta.dataset._model ? meta.dataset._model.tension : 0,
					steppedLine: meta.dataset._model ? meta.dataset._model.steppedLine : false,
					// Tooltip
					hitRadius: custom.hitRadius || helpers.getValueAtIndexOrDefault(dataset.pointHitRadius, index, pointOptions.hitRadius)
				};
			},

			calculatePointY: function(value, index, datasetIndex) {
				var me = this;
				var chart = me.chart;
				var meta = me.getMeta();
				var yScale = me.getScaleForId(meta.yAxisID);
				var sumPos = 0;
				var sumNeg = 0;
				var i, ds, dsMeta;

				if (yScale.options.stacked) {
					for (i = 0; i < datasetIndex; i++) {
						ds = chart.data.datasets[i];
						dsMeta = chart.getDatasetMeta(i);
						if (dsMeta.type === 'line' && dsMeta.yAxisID === yScale.id && chart.isDatasetVisible(i)) {
							var stackedRightValue = Number(yScale.getRightValue(ds.data[index]));
							if (stackedRightValue < 0) {
								sumNeg += stackedRightValue || 0;
							} else {
								sumPos += stackedRightValue || 0;
							}
						}
					}

					var rightValue = Number(yScale.getRightValue(value));
					if (rightValue < 0) {
						return yScale.getPixelForValue(sumNeg + rightValue);
					}
					return yScale.getPixelForValue(sumPos + rightValue);
				}

				return yScale.getPixelForValue(value);
			},

			updateBezierControlPoints: function() {
				var me = this;
				var meta = me.getMeta();
				var area = me.chart.chartArea;
				var points = (meta.data || []);
				var i, ilen, point, model, controlPoints;

				// Only consider points that are drawn in case the spanGaps option is used
				if (meta.dataset._model.spanGaps) {
					points = points.filter(function(pt) {
						return !pt._model.skip;
					});
				}

				function capControlPoint(pt, min, max) {
					return Math.max(Math.min(pt, max), min);
				}

				if (meta.dataset._model.cubicInterpolationMode === 'monotone') {
					helpers.splineCurveMonotone(points);
				} else {
					for (i = 0, ilen = points.length; i < ilen; ++i) {
						point = points[i];
						model = point._model;
						controlPoints = helpers.splineCurve(
							helpers.previousItem(points, i)._model,
							model,
							helpers.nextItem(points, i)._model,
							meta.dataset._model.tension
						);
						model.controlPointPreviousX = controlPoints.previous.x;
						model.controlPointPreviousY = controlPoints.previous.y;
						model.controlPointNextX = controlPoints.next.x;
						model.controlPointNextY = controlPoints.next.y;
					}
				}

				if (me.chart.options.elements.line.capBezierPoints) {
					for (i = 0, ilen = points.length; i < ilen; ++i) {
						model = points[i]._model;
						model.controlPointPreviousX = capControlPoint(model.controlPointPreviousX, area.left, area.right);
						model.controlPointPreviousY = capControlPoint(model.controlPointPreviousY, area.top, area.bottom);
						model.controlPointNextX = capControlPoint(model.controlPointNextX, area.left, area.right);
						model.controlPointNextY = capControlPoint(model.controlPointNextY, area.top, area.bottom);
					}
				}
			},

			draw: function(ease) {
				var me = this;
				var meta = me.getMeta();
				var points = meta.data || [];
				var easingDecimal = ease || 1;
				var i, ilen;

				// Transition Point Locations
				for (i=0, ilen=points.length; i<ilen; ++i) {
					points[i].transition(easingDecimal);
				}

				// Transition and Draw the line
				if (lineEnabled(me.getDataset(), me.chart.options)) {
					meta.dataset.transition(easingDecimal).draw();
				}

				// Draw the points
				for (i=0, ilen=points.length; i<ilen; ++i) {
					points[i].draw();
				}
			},

			setHoverStyle: function(point) {
				// Point
				var dataset = this.chart.data.datasets[point._datasetIndex];
				var index = point._index;
				var custom = point.custom || {};
				var model = point._model;

				model.radius = custom.hoverRadius || helpers.getValueAtIndexOrDefault(dataset.pointHoverRadius, index, this.chart.options.elements.point.hoverRadius);
				model.backgroundColor = custom.hoverBackgroundColor || helpers.getValueAtIndexOrDefault(dataset.pointHoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
				model.borderColor = custom.hoverBorderColor || helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderColor, index, helpers.getHoverColor(model.borderColor));
				model.borderWidth = custom.hoverBorderWidth || helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderWidth, index, model.borderWidth);
			},

			removeHoverStyle: function(point) {
				var me = this;
				var dataset = me.chart.data.datasets[point._datasetIndex];
				var index = point._index;
				var custom = point.custom || {};
				var model = point._model;

				// Compatibility: If the properties are defined with only the old name, use those values
				if ((dataset.radius !== undefined) && (dataset.pointRadius === undefined)) {
					dataset.pointRadius = dataset.radius;
				}

				model.radius = custom.radius || helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, me.chart.options.elements.point.radius);
				model.backgroundColor = me.getPointBackgroundColor(point, index);
				model.borderColor = me.getPointBorderColor(point, index);
				model.borderWidth = me.getPointBorderWidth(point, index);
			}
		});
	};


/***/ },
/* 142 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;

		Chart.defaults.polarArea = {

			scale: {
				type: 'radialLinear',
				lineArc: true, // so that lines are circular
				ticks: {
					beginAtZero: true
				}
			},

			// Boolean - Whether to animate the rotation of the chart
			animation: {
				animateRotate: true,
				animateScale: true
			},

			startAngle: -0.5 * Math.PI,
			aspectRatio: 1,
			legendCallback: function(chart) {
				var text = [];
				text.push('<ul class="' + chart.id + '-legend">');

				var data = chart.data;
				var datasets = data.datasets;
				var labels = data.labels;

				if (datasets.length) {
					for (var i = 0; i < datasets[0].data.length; ++i) {
						text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '">');
						if (labels[i]) {
							text.push(labels[i]);
						}
						text.push('</span></li>');
					}
				}

				text.push('</ul>');
				return text.join('');
			},
			legend: {
				labels: {
					generateLabels: function(chart) {
						var data = chart.data;
						if (data.labels.length && data.datasets.length) {
							return data.labels.map(function(label, i) {
								var meta = chart.getDatasetMeta(0);
								var ds = data.datasets[0];
								var arc = meta.data[i];
								var custom = arc.custom || {};
								var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
								var arcOpts = chart.options.elements.arc;
								var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
								var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
								var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

								return {
									text: label,
									fillStyle: fill,
									strokeStyle: stroke,
									lineWidth: bw,
									hidden: isNaN(ds.data[i]) || meta.data[i].hidden,

									// Extra data used for toggling the correct item
									index: i
								};
							});
						}
						return [];
					}
				},

				onClick: function(e, legendItem) {
					var index = legendItem.index;
					var chart = this.chart;
					var i, ilen, meta;

					for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
						meta = chart.getDatasetMeta(i);
						meta.data[index].hidden = !meta.data[index].hidden;
					}

					chart.update();
				}
			},

			// Need to override these to give a nice default
			tooltips: {
				callbacks: {
					title: function() {
						return '';
					},
					label: function(tooltipItem, data) {
						return data.labels[tooltipItem.index] + ': ' + tooltipItem.yLabel;
					}
				}
			}
		};

		Chart.controllers.polarArea = Chart.DatasetController.extend({

			dataElementType: Chart.elements.Arc,

			linkScales: helpers.noop,

			update: function(reset) {
				var me = this;
				var chart = me.chart;
				var chartArea = chart.chartArea;
				var meta = me.getMeta();
				var opts = chart.options;
				var arcOpts = opts.elements.arc;
				var minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
				chart.outerRadius = Math.max((minSize - arcOpts.borderWidth / 2) / 2, 0);
				chart.innerRadius = Math.max(opts.cutoutPercentage ? (chart.outerRadius / 100) * (opts.cutoutPercentage) : 1, 0);
				chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();

				me.outerRadius = chart.outerRadius - (chart.radiusLength * me.index);
				me.innerRadius = me.outerRadius - chart.radiusLength;

				meta.count = me.countVisibleElements();

				helpers.each(meta.data, function(arc, index) {
					me.updateElement(arc, index, reset);
				});
			},

			updateElement: function(arc, index, reset) {
				var me = this;
				var chart = me.chart;
				var dataset = me.getDataset();
				var opts = chart.options;
				var animationOpts = opts.animation;
				var scale = chart.scale;
				var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
				var labels = chart.data.labels;

				var circumference = me.calculateCircumference(dataset.data[index]);
				var centerX = scale.xCenter;
				var centerY = scale.yCenter;

				// If there is NaN data before us, we need to calculate the starting angle correctly.
				// We could be way more efficient here, but its unlikely that the polar area chart will have a lot of data
				var visibleCount = 0;
				var meta = me.getMeta();
				for (var i = 0; i < index; ++i) {
					if (!isNaN(dataset.data[i]) && !meta.data[i].hidden) {
						++visibleCount;
					}
				}

				// var negHalfPI = -0.5 * Math.PI;
				var datasetStartAngle = opts.startAngle;
				var distance = arc.hidden ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);
				var startAngle = datasetStartAngle + (circumference * visibleCount);
				var endAngle = startAngle + (arc.hidden ? 0 : circumference);

				var resetRadius = animationOpts.animateScale ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);

				helpers.extend(arc, {
					// Utility
					_datasetIndex: me.index,
					_index: index,
					_scale: scale,

					// Desired view properties
					_model: {
						x: centerX,
						y: centerY,
						innerRadius: 0,
						outerRadius: reset ? resetRadius : distance,
						startAngle: reset && animationOpts.animateRotate ? datasetStartAngle : startAngle,
						endAngle: reset && animationOpts.animateRotate ? datasetStartAngle : endAngle,
						label: getValueAtIndexOrDefault(labels, index, labels[index])
					}
				});

				// Apply border and fill style
				me.removeHoverStyle(arc);

				arc.pivot();
			},

			removeHoverStyle: function(arc) {
				Chart.DatasetController.prototype.removeHoverStyle.call(this, arc, this.chart.options.elements.arc);
			},

			countVisibleElements: function() {
				var dataset = this.getDataset();
				var meta = this.getMeta();
				var count = 0;

				helpers.each(meta.data, function(element, index) {
					if (!isNaN(dataset.data[index]) && !element.hidden) {
						count++;
					}
				});

				return count;
			},

			calculateCircumference: function(value) {
				var count = this.getMeta().count;
				if (count > 0 && !isNaN(value)) {
					return (2 * Math.PI) / count;
				}
				return 0;
			}
		});
	};


/***/ },
/* 143 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var helpers = Chart.helpers;

		Chart.defaults.radar = {
			scale: {
				type: 'radialLinear'
			},
			elements: {
				line: {
					tension: 0 // no bezier in radar
				}
			}
		};

		Chart.controllers.radar = Chart.DatasetController.extend({

			datasetElementType: Chart.elements.Line,

			dataElementType: Chart.elements.Point,

			linkScales: helpers.noop,

			addElementAndReset: function(index) {
				Chart.DatasetController.prototype.addElementAndReset.call(this, index);

				// Make sure bezier control points are updated
				this.updateBezierControlPoints();
			},

			update: function(reset) {
				var me = this;
				var meta = me.getMeta();
				var line = meta.dataset;
				var points = meta.data;
				var custom = line.custom || {};
				var dataset = me.getDataset();
				var lineElementOptions = me.chart.options.elements.line;
				var scale = me.chart.scale;

				// Compatibility: If the properties are defined with only the old name, use those values
				if ((dataset.tension !== undefined) && (dataset.lineTension === undefined)) {
					dataset.lineTension = dataset.tension;
				}

				helpers.extend(meta.dataset, {
					// Utility
					_datasetIndex: me.index,
					// Data
					_children: points,
					_loop: true,
					// Model
					_model: {
						// Appearance
						tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.lineTension, lineElementOptions.tension),
						backgroundColor: custom.backgroundColor ? custom.backgroundColor : (dataset.backgroundColor || lineElementOptions.backgroundColor),
						borderWidth: custom.borderWidth ? custom.borderWidth : (dataset.borderWidth || lineElementOptions.borderWidth),
						borderColor: custom.borderColor ? custom.borderColor : (dataset.borderColor || lineElementOptions.borderColor),
						fill: custom.fill ? custom.fill : (dataset.fill !== undefined ? dataset.fill : lineElementOptions.fill),
						borderCapStyle: custom.borderCapStyle ? custom.borderCapStyle : (dataset.borderCapStyle || lineElementOptions.borderCapStyle),
						borderDash: custom.borderDash ? custom.borderDash : (dataset.borderDash || lineElementOptions.borderDash),
						borderDashOffset: custom.borderDashOffset ? custom.borderDashOffset : (dataset.borderDashOffset || lineElementOptions.borderDashOffset),
						borderJoinStyle: custom.borderJoinStyle ? custom.borderJoinStyle : (dataset.borderJoinStyle || lineElementOptions.borderJoinStyle),

						// Scale
						scaleTop: scale.top,
						scaleBottom: scale.bottom,
						scaleZero: scale.getBasePosition()
					}
				});

				meta.dataset.pivot();

				// Update Points
				helpers.each(points, function(point, index) {
					me.updateElement(point, index, reset);
				}, me);


				// Update bezier control points
				me.updateBezierControlPoints();
			},
			updateElement: function(point, index, reset) {
				var me = this;
				var custom = point.custom || {};
				var dataset = me.getDataset();
				var scale = me.chart.scale;
				var pointElementOptions = me.chart.options.elements.point;
				var pointPosition = scale.getPointPositionForValue(index, dataset.data[index]);

				helpers.extend(point, {
					// Utility
					_datasetIndex: me.index,
					_index: index,
					_scale: scale,

					// Desired view properties
					_model: {
						x: reset ? scale.xCenter : pointPosition.x, // value not used in dataset scale, but we want a consistent API between scales
						y: reset ? scale.yCenter : pointPosition.y,

						// Appearance
						tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.tension, me.chart.options.elements.line.tension),
						radius: custom.radius ? custom.radius : helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, pointElementOptions.radius),
						backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, pointElementOptions.backgroundColor),
						borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, pointElementOptions.borderColor),
						borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, pointElementOptions.borderWidth),
						pointStyle: custom.pointStyle ? custom.pointStyle : helpers.getValueAtIndexOrDefault(dataset.pointStyle, index, pointElementOptions.pointStyle),

						// Tooltip
						hitRadius: custom.hitRadius ? custom.hitRadius : helpers.getValueAtIndexOrDefault(dataset.hitRadius, index, pointElementOptions.hitRadius)
					}
				});

				point._model.skip = custom.skip ? custom.skip : (isNaN(point._model.x) || isNaN(point._model.y));
			},
			updateBezierControlPoints: function() {
				var chartArea = this.chart.chartArea;
				var meta = this.getMeta();

				helpers.each(meta.data, function(point, index) {
					var model = point._model;
					var controlPoints = helpers.splineCurve(
						helpers.previousItem(meta.data, index, true)._model,
						model,
						helpers.nextItem(meta.data, index, true)._model,
						model.tension
					);

					// Prevent the bezier going outside of the bounds of the graph
					model.controlPointPreviousX = Math.max(Math.min(controlPoints.previous.x, chartArea.right), chartArea.left);
					model.controlPointPreviousY = Math.max(Math.min(controlPoints.previous.y, chartArea.bottom), chartArea.top);

					model.controlPointNextX = Math.max(Math.min(controlPoints.next.x, chartArea.right), chartArea.left);
					model.controlPointNextY = Math.max(Math.min(controlPoints.next.y, chartArea.bottom), chartArea.top);

					// Now pivot the point for animation
					point.pivot();
				});
			},

			draw: function(ease) {
				var meta = this.getMeta();
				var easingDecimal = ease || 1;

				// Transition Point Locations
				helpers.each(meta.data, function(point) {
					point.transition(easingDecimal);
				});

				// Transition and Draw the line
				meta.dataset.transition(easingDecimal).draw();

				// Draw the points
				helpers.each(meta.data, function(point) {
					point.draw();
				});
			},

			setHoverStyle: function(point) {
				// Point
				var dataset = this.chart.data.datasets[point._datasetIndex];
				var custom = point.custom || {};
				var index = point._index;
				var model = point._model;

				model.radius = custom.hoverRadius ? custom.hoverRadius : helpers.getValueAtIndexOrDefault(dataset.pointHoverRadius, index, this.chart.options.elements.point.hoverRadius);
				model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointHoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
				model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderColor, index, helpers.getHoverColor(model.borderColor));
				model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderWidth, index, model.borderWidth);
			},

			removeHoverStyle: function(point) {
				var dataset = this.chart.data.datasets[point._datasetIndex];
				var custom = point.custom || {};
				var index = point._index;
				var model = point._model;
				var pointElementOptions = this.chart.options.elements.point;

				model.radius = custom.radius ? custom.radius : helpers.getValueAtIndexOrDefault(dataset.radius, index, pointElementOptions.radius);
				model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, pointElementOptions.backgroundColor);
				model.borderColor = custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, pointElementOptions.borderColor);
				model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, pointElementOptions.borderWidth);
			}
		});
	};


/***/ },
/* 144 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		Chart.Bar = function(context, config) {
			config.type = 'bar';

			return new Chart(context, config);
		};

	};


/***/ },
/* 145 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		Chart.Bubble = function(context, config) {
			config.type = 'bubble';
			return new Chart(context, config);
		};

	};


/***/ },
/* 146 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		Chart.Doughnut = function(context, config) {
			config.type = 'doughnut';

			return new Chart(context, config);
		};

	};


/***/ },
/* 147 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		Chart.Line = function(context, config) {
			config.type = 'line';

			return new Chart(context, config);
		};

	};


/***/ },
/* 148 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		Chart.PolarArea = function(context, config) {
			config.type = 'polarArea';

			return new Chart(context, config);
		};

	};


/***/ },
/* 149 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		Chart.Radar = function(context, config) {
			config.options = Chart.helpers.configMerge({aspectRatio: 1}, config.options);
			config.type = 'radar';

			return new Chart(context, config);
		};

	};


/***/ },
/* 150 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(Chart) {

		var defaultConfig = {
			hover: {
				mode: 'single'
			},

			scales: {
				xAxes: [{
					type: 'linear', // scatter should not use a category axis
					position: 'bottom',
					id: 'x-axis-1' // need an ID so datasets can reference the scale
				}],
				yAxes: [{
					type: 'linear',
					position: 'left',
					id: 'y-axis-1'
				}]
			},

			tooltips: {
				callbacks: {
					title: function() {
						// Title doesn't make sense for scatter since we format the data as a point
						return '';
					},
					label: function(tooltipItem) {
						return '(' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
					}
				}
			}
		};

		// Register the default config for this type
		Chart.defaults.scatter = defaultConfig;

		// Scatter charts use line controllers
		Chart.controllers.scatter = Chart.controllers.line;

		Chart.Scatter = function(context, config) {
			config.type = 'scatter';
			return new Chart(context, config);
		};

	};


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(152);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(154)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(153)();
	// imports


	// module
	exports.push([module.id, "body {\n    background: yellow;\n}\n\n#myChart {\n    width: 400px;\n    height: 400px;    \n}", ""]);

	// exports


/***/ },
/* 153 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);