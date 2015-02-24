function highlightCode(node) {
    text = node.innerHTML;

    idxStart = text.indexOf('`');
    idxEnd = text.indexOf('`', idxStart + 1);

    code_node = document.createElement('code');
    code_node.innerHTML = text.substr(idxStart + 1, idxEnd - idxStart - 1);

    node.innerHTML = text.substr(0, idxStart) + code_node.outerHTML;
    if (idxEnd !== (text.length - 1))
        node.innerHTML += text.substr(idxEnd + 1, text.length - idxEnd + 1);

    code_block = node.querySelector('code');
    hljs.highlightBlock(code_block);
}

function observeColumns(event) {
    target = event.target;

    if (target.tagName == "ARTICLE") {
        tweet = target.querySelector('.tweet-text');

        text = tweet.innerHTML;
        if (text.indexOf('`') !== -1) {
            highlightCode(tweet);
        }
    }
}

function waitForLogin() {
    if (typeof document.getElementsByClassName("app-signin-form")[0] === "undefined") {
        document.getElementsByTagName("html")[0].setAttribute("class", document.getElementsByTagName("html")[0].getAttribute("class").replace(" signin-sheet-now-present",""));
        console.log('Connected.')
        return;
    }

    setTimeout(waitForLogin, 500);
}


console.log('Bootstrapping HGTD...');
setTimeout(register, 6500);

function register() {
    console.log('Ext registered!');
    document.querySelector('.js-app-columns').addEventListener('DOMNodeInserted', observeColumns);
}


