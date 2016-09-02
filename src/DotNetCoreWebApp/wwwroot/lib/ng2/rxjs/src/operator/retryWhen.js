System.register(['../Subject', '../util/tryCatch', '../util/errorObject', '../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subject_1, tryCatch_1, errorObject_1, OuterSubscriber_1, subscribeToResult_1;
    var RetryWhenOperator, RetryWhenSubscriber;
    /**
     * Returns an Observable that emits the same values as the source observable with the exception of an `error`.
     * An `error` will cause the emission of the Throwable that cause the error to the Observable returned from
     * notificationHandler. If that Observable calls onComplete or `error` then retry will call `complete` or `error`
     * on the child subscription. Otherwise, this Observable will resubscribe to the source observable, on a particular
     * Scheduler.
     *
     * <img src="./img/retryWhen.png" width="100%">
     *
     * @param {notificationHandler} receives an Observable of notifications with which a user can `complete` or `error`,
     * aborting the retry.
     * @param {scheduler} the Scheduler on which to subscribe to the source Observable.
     * @return {Observable} the source Observable modified with retry logic.
     * @method retryWhen
     * @owner Observable
     */
    function retryWhen(notifier) {
        return this.lift(new RetryWhenOperator(notifier, this));
    }
    exports_1("retryWhen", retryWhen);
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            RetryWhenOperator = (function () {
                function RetryWhenOperator(notifier, source) {
                    this.notifier = notifier;
                    this.source = source;
                }
                RetryWhenOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new RetryWhenSubscriber(subscriber, this.notifier, this.source));
                };
                return RetryWhenOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            RetryWhenSubscriber = (function (_super) {
                __extends(RetryWhenSubscriber, _super);
                function RetryWhenSubscriber(destination, notifier, source) {
                    _super.call(this, destination);
                    this.notifier = notifier;
                    this.source = source;
                }
                RetryWhenSubscriber.prototype.error = function (err) {
                    if (!this.isStopped) {
                        var errors = this.errors;
                        var retries = this.retries;
                        var retriesSubscription = this.retriesSubscription;
                        if (!retries) {
                            errors = new Subject_1.Subject();
                            retries = tryCatch_1.tryCatch(this.notifier)(errors);
                            if (retries === errorObject_1.errorObject) {
                                return _super.prototype.error.call(this, errorObject_1.errorObject.e);
                            }
                            retriesSubscription = subscribeToResult_1.subscribeToResult(this, retries);
                        }
                        else {
                            this.errors = null;
                            this.retriesSubscription = null;
                        }
                        this.unsubscribe();
                        this.closed = false;
                        this.errors = errors;
                        this.retries = retries;
                        this.retriesSubscription = retriesSubscription;
                        errors.next(err);
                    }
                };
                RetryWhenSubscriber.prototype._unsubscribe = function () {
                    var _a = this, errors = _a.errors, retriesSubscription = _a.retriesSubscription;
                    if (errors) {
                        errors.unsubscribe();
                        this.errors = null;
                    }
                    if (retriesSubscription) {
                        retriesSubscription.unsubscribe();
                        this.retriesSubscription = null;
                    }
                    this.retries = null;
                };
                RetryWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    var _a = this, errors = _a.errors, retries = _a.retries, retriesSubscription = _a.retriesSubscription;
                    this.errors = null;
                    this.retries = null;
                    this.retriesSubscription = null;
                    this.unsubscribe();
                    this.isStopped = false;
                    this.closed = false;
                    this.errors = errors;
                    this.retries = retries;
                    this.retriesSubscription = retriesSubscription;
                    this.source.subscribe(this);
                };
                return RetryWhenSubscriber;
            }(OuterSubscriber_1.OuterSubscriber));
        }
    }
});
//# sourceMappingURL=retryWhen.js.map