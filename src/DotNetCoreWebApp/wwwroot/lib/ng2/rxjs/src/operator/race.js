System.register(['../util/isArray', '../observable/ArrayObservable', '../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var isArray_1, ArrayObservable_1, OuterSubscriber_1, subscribeToResult_1;
    var RaceOperator, RaceSubscriber;
    /**
     * Returns an Observable that mirrors the first source Observable to emit an item
     * from the combination of this Observable and supplied Observables
     * @param {...Observables} ...observables sources used to race for which Observable emits first.
     * @return {Observable} an Observable that mirrors the output of the first Observable to emit an item.
     * @method race
     * @owner Observable
     */
    function race() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i - 0] = arguments[_i];
        }
        // if the only argument is an array, it was most likely called with
        // `pair([obs1, obs2, ...])`
        if (observables.length === 1 && isArray_1.isArray(observables[0])) {
            observables = observables[0];
        }
        observables.unshift(this);
        return raceStatic.apply(this, observables);
    }
    exports_1("race", race);
    function raceStatic() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i - 0] = arguments[_i];
        }
        // if the only argument is an array, it was most likely called with
        // `pair([obs1, obs2, ...])`
        if (observables.length === 1) {
            if (isArray_1.isArray(observables[0])) {
                observables = observables[0];
            }
            else {
                return observables[0];
            }
        }
        return new ArrayObservable_1.ArrayObservable(observables).lift(new RaceOperator());
    }
    exports_1("raceStatic", raceStatic);
    return {
        setters:[
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            },
            function (ArrayObservable_1_1) {
                ArrayObservable_1 = ArrayObservable_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            RaceOperator = (function () {
                function RaceOperator() {
                }
                RaceOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new RaceSubscriber(subscriber));
                };
                return RaceOperator;
            }());
            exports_1("RaceOperator", RaceOperator);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            RaceSubscriber = (function (_super) {
                __extends(RaceSubscriber, _super);
                function RaceSubscriber(destination) {
                    _super.call(this, destination);
                    this.hasFirst = false;
                    this.observables = [];
                    this.subscriptions = [];
                }
                RaceSubscriber.prototype._next = function (observable) {
                    this.observables.push(observable);
                };
                RaceSubscriber.prototype._complete = function () {
                    var observables = this.observables;
                    var len = observables.length;
                    if (len === 0) {
                        this.destination.complete();
                    }
                    else {
                        for (var i = 0; i < len; i++) {
                            var observable = observables[i];
                            var subscription = subscribeToResult_1.subscribeToResult(this, observable, observable, i);
                            if (this.subscriptions) {
                                this.subscriptions.push(subscription);
                                this.add(subscription);
                            }
                        }
                        this.observables = null;
                    }
                };
                RaceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    if (!this.hasFirst) {
                        this.hasFirst = true;
                        for (var i = 0; i < this.subscriptions.length; i++) {
                            if (i !== outerIndex) {
                                var subscription = this.subscriptions[i];
                                subscription.unsubscribe();
                                this.remove(subscription);
                            }
                        }
                        this.subscriptions = null;
                    }
                    this.destination.next(innerValue);
                };
                return RaceSubscriber;
            }(OuterSubscriber_1.OuterSubscriber));
            exports_1("RaceSubscriber", RaceSubscriber);
        }
    }
});
//# sourceMappingURL=race.js.map