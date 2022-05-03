function runDeclareJS(observe = true) {
    function updateDeclaration(declarationElement) {
        if (tagName = declarationElement.getAttribute("name")) {
            let elements = declarationElement.parentElement.getElementsByTagName(tagName)
            for (let i = 0; i < elements.length; i++) {
                const element = elements.item(i)
                while (element.lastChild) element.removeChild(element.lastChild)
                for (let ci = 0; ci < declarationElement.children.length; ci++) {
                    element.appendChild(declarationElement.children.item(ci).cloneNode(true))
                }
            }
        }
    }
    function removeDeclaration(parentElement, tagName) {
        if (tagName !== null) {
            let elements = parentElement.getElementsByTagName(tagName)
            for (let i = 0; i < elements.length; i++) {
                const element = elements.item(i)
                while (element.lastChild) element.removeChild(element.lastChild)
            }
        }
    }
    const declarationElements = document.body.getElementsByTagName("DECLARE")
    for (let i = 0; i < declarationElements.length; i++) {
        const declarationElement = declarationElements.item(i)
        declarationElement.hidden = true
        updateDeclaration(declarationElement)
    }
    if (!observe) return
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.target.tagName === "DECLARE" &&mutation.type === "childList") updateDeclaration(mutation.target)
            mutation.addedNodes.forEach(element => {
                if (element.tagName === "DECLARE") {
                    element.hidden = true
                    updateDeclaration(element)
                }
            })
            mutation.removedNodes.forEach(element => {
                if (element.tagName === "DECLARE") removeDeclaration(mutation.target, element.getAttribute("name"))
            })
        })
    })
    observer.observe(document.body, {
        subtree: true,
        childList: true
    })
}
if (observe = document.currentScript.getAttribute("observe")) {
    if (observe === "" || observe === "true") runDeclareJS(true)
    else runDeclareJS(false)
} else runDeclareJS(true)