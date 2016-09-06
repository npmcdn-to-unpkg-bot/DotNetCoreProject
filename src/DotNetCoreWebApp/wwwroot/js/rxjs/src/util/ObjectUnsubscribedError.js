System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ObjectUnsubscribedError;
    return {
        setters:[],
        execute: function() {
            /**
             * An error thrown when an action is invalid because the object has been
             * unsubscribed.
             *
             * @see {@link Subject}
             * @see {@link BehaviorSubject}
             *
             * @class ObjectUnsubscribedError
             */
            ObjectUnsubscribedError = (function (_super) {
                __extends(ObjectUnsubscribedError, _super);
                function ObjectUnsubscribedError() {
                    var err = _super.call(this, 'object unsubscribed');
                    this.name = err.name = 'ObjectUnsubscribedError';
                    this.stack = err.stack;
                    this.message = err.message;
                }
                return ObjectUnsubscribedError;
            }(Error));
            exports_1("ObjectUnsubscribedError", ObjectUnsubscribedError);
        }
    }
});
//# sourceMappingURL=ObjectUnsubscribedError.js.map