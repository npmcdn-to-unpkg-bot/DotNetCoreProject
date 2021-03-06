System.register(['../Observable', '../util/isScheduler'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1, isScheduler_1;
    var selfSelector, GenerateObservable;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (isScheduler_1_1) {
                isScheduler_1 = isScheduler_1_1;
            }],
        execute: function() {
            selfSelector = function (value) { return value; };
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            GenerateObservable = (function (_super) {
                __extends(GenerateObservable, _super);
                function GenerateObservable(initialState, condition, iterate, resultSelector, scheduler) {
                    _super.call(this);
                    this.initialState = initialState;
                    this.condition = condition;
                    this.iterate = iterate;
                    this.resultSelector = resultSelector;
                    this.scheduler = scheduler;
                }
                GenerateObservable.create = function (initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
                    if (arguments.length == 1) {
                        return new GenerateObservable(initialStateOrOptions.initialState, initialStateOrOptions.condition, initialStateOrOptions.iterate, initialStateOrOptions.resultSelector || selfSelector, initialStateOrOptions.scheduler);
                    }
                    if (resultSelectorOrObservable === undefined || isScheduler_1.isScheduler(resultSelectorOrObservable)) {
                        return new GenerateObservable(initialStateOrOptions, condition, iterate, selfSelector, resultSelectorOrObservable);
                    }
                    return new GenerateObservable(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler);
                };
                GenerateObservable.prototype._subscribe = function (subscriber) {
                    var state = this.initialState;
                    if (this.scheduler) {
                        return this.scheduler.schedule(GenerateObservable.dispatch, 0, {
                            subscriber: subscriber,
                            iterate: this.iterate,
                            condition: this.condition,
                            resultSelector: this.resultSelector,
                            state: state });
                    }
                    var _a = this, condition = _a.condition, resultSelector = _a.resultSelector, iterate = _a.iterate;
                    do {
                        if (condition) {
                            var conditionResult = void 0;
                            try {
                                conditionResult = condition(state);
                            }
                            catch (err) {
                                subscriber.error(err);
                                return;
                            }
                            if (!conditionResult) {
                                subscriber.complete();
                                break;
                            }
                        }
                        var value = void 0;
                        try {
                            value = resultSelector(state);
                        }
                        catch (err) {
                            subscriber.error(err);
                            return;
                        }
                        subscriber.next(value);
                        if (subscriber.closed) {
                            break;
                        }
                        try {
                            state = iterate(state);
                        }
                        catch (err) {
                            subscriber.error(err);
                            return;
                        }
                    } while (true);
                };
                GenerateObservable.dispatch = function (state) {
                    var subscriber = state.subscriber, condition = state.condition;
                    if (subscriber.closed) {
                        return;
                    }
                    if (state.needIterate) {
                        try {
                            state.state = state.iterate(state.state);
                        }
                        catch (err) {
                            subscriber.error(err);
                            return;
                        }
                    }
                    else {
                        state.needIterate = true;
                    }
                    if (condition) {
                        var conditionResult = void 0;
                        try {
                            conditionResult = condition(state.state);
                        }
                        catch (err) {
                            subscriber.error(err);
                            return;
                        }
                        if (!conditionResult) {
                            subscriber.complete();
                            return;
                        }
                        if (subscriber.closed) {
                            return;
                        }
                    }
                    var value;
                    try {
                        value = state.resultSelector(state.state);
                    }
                    catch (err) {
                        subscriber.error(err);
                        return;
                    }
                    if (subscriber.closed) {
                        return;
                    }
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return;
                    }
                    return this.schedule(state);
                };
                return GenerateObservable;
            }(Observable_1.Observable));
            exports_1("GenerateObservable", GenerateObservable);
        }
    }
});
//# sourceMappingURL=GenerateObservable.js.map