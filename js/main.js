
function rmElementByCLassName(parent, elClassName) {
  const els = parent.getElementsByClassName(elClassName)
  while (els.length > 0) {
    els[0].parentNode.removeChild(els[0])
  }
}

function copyCodeblockButton(codeBlockElement) {
  // Constructor functions, returns code block element
  el = document.createElement('input')
  el.type = 'button'
  el.value = 'Copy'
  el.classList = 'copy-button'
  el.onclick = () => {

    let elCopy = codeBlockElement.cloneNode(true) // deep copy of codeblock element nodes

    rmElementByCLassName(elCopy, 'ln'); // Removes line number

    navigator.clipboard.writeText(elCopy.innerText).then( 
      ()=>{
        console.log("Copied to clipboard successfully!");
      },
      ()=>{
        console.warn("Failed to copy content.")
      }
    );
  }
  return el
}

document.addEventListener('DOMContentLoaded', (event) => {

  document.querySelectorAll('pre code').forEach((el) => {
    const child = document.createElement('span')
    var copyCodeblockButtonEl = copyCodeblockButton(el)

    child.style.setProperty('display', 'flex')
    child.style.setProperty('color', 'var(--tx-c-primary-half)')
    child.style.setProperty('margin-bottom', '.5em')
    child.style.setProperty('align-items', 'center')
    child.innerHTML = el.attributes.getNamedItem('data-lang').value
    child.appendChild(copyCodeblockButtonEl)
    el.parentNode.insertBefore(child, el.parentNode.firstChild)
  });

});