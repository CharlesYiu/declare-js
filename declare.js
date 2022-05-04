function runDeclareJS(observe = true) {
    let takenTagNames = [
        "a",
        "abbr",
        "acronym",
        "address",
        "applet",
        "area",
        "article",
        "aside",
        "audio",
        "b",
        "base",
        "basefront",
        "bdi",
        "bdo",
        "big",
        "blockquote",
        "body",
        "br",
        "button",
        "canvas",
        "caption",
        "center",
        "cite",
        "code",
        "col",
        "colgroup",
        "data",
        "datalist",
        "dd",
        "del",
        "details",
        "dfn",
        "dialog",
        "dir",
        "div",
        "dl",
        "dt",
        "em",
        "embed",
        "fieldset",
        "figcaption",
        "figure",
        "font",
        "footer",
        "form",
        "frame",
        "frameset",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "head",
        "header",
        "hr",
        "html",
        "i",
        "iframe",
        "img",
        "input",
        "ins",
        "kbd",
        "label",
        "legend",
        "li",
        "link",
        "main",
        "map",
        "mark",
        "meta",
        "meter",
        "nav",
        "noframes",
        "noscript",
        "object",
        "ol",
        "optgroup",
        "option",
        "output",
        "p",
        "param",
        "picture",
        "pre",
        "progress",
        "q",
        "rp",
        "rt",
        "ruby",
        "s",
        "samp",
        "script",
        "section",
        "select",
        "small",
        "source",
        "span",
        "strike",
        "strong",
        "style",
        "sub",
        "summary",
        "sup",
        "svg",
        "table",
        "tbody",
        "td",
        "template",
        "textarea",
        "tfoot",
        "th",
        "thead",
        "time",
        "title",
        "tr",
        "track",
        "tt",
        "u",
        "ul",
        "var",
        "video",
        "wbr"
    ]
    let declaredTags = {}
    function updateDeclaration(declarationElement) {
        if (tagName = declarationElement.getAttribute("name")) {
            let elements = declarationElement.parentElement.getElementsByTagName(tagName)
            for (let i = 0; i < elements.length; i++) {
                const element = elements.item(i)
                while (element.lastChild) element.removeChild(element.lastChild)
                for (let ci = 0; ci < declarationElement.children.length; ci++) {
                    element.appendChild(declarationElement.children.item(ci).cloneNode(true))
                }
                for (let ai = 0; ai < declarationElement.attributes.length; ai++) {
                    const attribute = declarationElement.attributes.item(ai)
                    if (attribute.name !== "name" && attribute.name !== "hidden") {
                        element.setAttribute(attribute.name, attribute.value)
                    }
                }
            }
        } else throw Error(`Declaration has no attribute 'name'`)
    }
    function removeDeclaration(parentElement, declarationElement) {
        if (tagName = declarationElement.getAttribute("name")) {
            delete declaredTags[tagName]
            let elements = parentElement.getElementsByTagName(tagName)
            for (let i = 0; i < elements.length; i++) {
                const element = elements.item(i)
                while (element.lastChild) element.removeChild(element.lastChild)
                for (let ai = 0; ai < declarationElement.attributes.length; ai++) {
                    const attribute = declarationElement.attributes.item(ai)
                    if (attribute.name !== "name" && attribute.name !== "hidden") {
                        element.removeAttribute(attribute.name, attribute.value)
                    }
                }
            }
        }
    }
    function addDeclaration(declarationElement) {
        if (tagName = declarationElement.getAttribute("name").toLowerCase()) {
            if (takenTagNames.includes(tagName)) throw Error(`The tag ('name' attribute) '${tagName}' is taken`)
            const scopeDeclarations = declarationElement.parentElement.getElementsByTagName("DECLARE")
            for (let i = 0; i < scopeDeclarations.length; i++) {
                const scopeDeclaration = scopeDeclarations.item(i)
                if (otherTagName = scopeDeclaration.getAttribute("name") && scopeDeclaration !== declarationElement) {
                    if (tagName === otherTagName) throw Error(`The tag ('name' attribute) '${tagName}' is taken`)
                }
            }
            declaredTags[tagName] = declarationElement
            declaredTags[tagName] = declarationElement
            declarationElement.hidden = true
            updateDeclaration(declarationElement)
        } else throw Error(`Declaration has no attribute 'name'`)
    }
    const declarationElements = document.body.getElementsByTagName("DECLARE")
    for (let i = 0; i < declarationElements.length; i++) {
        addDeclaration(declarationElements.item(i))
    }
    if (!observe) return
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === "childList" && mutation.target.tagName === "DECLARE") updateDeclaration(mutation.target)
            mutation.addedNodes.forEach(element => {
                if (element.tagName === "DECLARE") addDeclaration(element)
                else if (Object.keys(declaredTags).includes(element.tagName.toLowerCase())) {
                    updateDeclaration(declaredTags[element.tagName.toLowerCase()])
                }
            })
            mutation.removedNodes.forEach(element => {
                if (element.tagName === "DECLARE") removeDeclaration(mutation.target, element)
            })
        })
    })
    observer.observe(document.body, {
        subtree: true,
        childList: true
    })
}
if (["", "true", null].includes(document.currentScript.getAttribute("autorun"))) {
    if (observe = document.currentScript.getAttribute("observe")) {
        if (observe === "" || observe === "true") runDeclareJS(true)
        else runDeclareJS(false)
    } else runDeclareJS(true)
}