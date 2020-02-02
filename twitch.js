(function () {
    var cleanupHistoryListener = null;
    var targetNode = null;
    var intervalIds = [];
    var config = {
        attributes: false,
        childList: true,
        subtree: true
    };
    var observer = new MutationObserver(mutationCallback);
    function mutationCallback(mutations, _observer) {
        for (var _i = 0, mutations_1 = mutations; _i < mutations_1.length; _i++) {
            var _mutation = mutations_1[_i];
            if (targetNode !== null) {
                clickBonus();
            }
        }
    }
    function clickBonus() {
        var interactiveElement = targetNode.querySelector('.tw-interactive');
        if (interactiveElement !== null) {
            interactiveElement.click();
        }
    }
    function findPointsContainer() {
        var timer = setInterval(function () {
            targetNode = document.querySelector('.community-points-summary > div:last-child');
            if (targetNode !== null) {
                clickBonus();
                observer.observe(targetNode, config);
                clearInterval(timer);
            }
        }, 1000);
        intervalIds.push(timer);
    }
    function hookIntoReact() {
        function reactNavigationHook(history) {
            var lastPathName = history.location.pathname;
            cleanupHistoryListener = history.listen(function (location) {
                if (location.pathname !== lastPathName) {
                    lastPathName = location.pathname;
                    cleanup();
                    start();
                }
            });
        }
        function findReactProp(node, prop, func) {
            if (node.stateNode &&
                node.stateNode.props &&
                node.stateNode.props[prop]) {
                func(node.stateNode.props[prop]);
            }
            else if (node.child) {
                var child = node.child;
                while (child) {
                    findReactProp(child, prop, func);
                    child = child.sibling;
                }
            }
        }
        function findReactInstance(element, target, func) {
            var timer = setInterval(function () {
                var reactRoot = document.getElementById(element);
                if (reactRoot !== null) {
                    var reactInstance = null;
                    for (var _i = 0, _a = Object.keys(reactRoot); _i < _a.length; _i++) {
                        var key = _a[_i];
                        if (key.startsWith(target)) {
                            reactInstance = reactRoot[key];
                            break;
                        }
                    }
                    if (reactInstance) {
                        func(reactInstance);
                        clearInterval(timer);
                    }
                }
            }, 500);
            intervalIds.push(timer);
        }
        findReactInstance('root', '_reactRootContainer', function (instance) {
            if (instance._internalRoot && instance._internalRoot.current) {
                findReactProp(instance._internalRoot.current, 'history', reactNavigationHook);
                var timer_1 = setInterval(function () {
                    findReactProp(instance._internalRoot.current, 'isChannelPointsEnabled', function (value) {
                        if (value) {
                            findPointsContainer();
                        }
                        clearInterval(timer_1);
                    });
                }, 1000);
                intervalIds.push(timer_1);
            }
        });
    }
    function start() {
        window.removeEventListener('beforeunload', cleanup);
        window.addEventListener('beforeunload', cleanup);
        hookIntoReact();
    }
    function cleanup() {
        observer.disconnect();
        for (var _i = 0, intervalIds_1 = intervalIds; _i < intervalIds_1.length; _i++) {
            var id = intervalIds_1[_i];
            clearInterval(id);
        }
        if (cleanupHistoryListener !== null) {
            cleanupHistoryListener();
        }
    }
    start();
    console.log('Twitch Channel Points Auto-Clicker');
})();
