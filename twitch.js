(function() {
    setInterval(function(){
        var gift = document.getElementsByClassName('claimable-bonus__icon')[0];
        if (gift) {
            gift.click()
        }
    }, 5000)
})();
