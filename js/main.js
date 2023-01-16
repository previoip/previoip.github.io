
function remEl(parent, elClassName) {
  const els = parent.getElementsByClassName(elClassName)
  while (els.length > 0) {
    els[0].parentNode.removeChild(els[0])
  }
}

function copyCodeblockButton(targetNode) {
  element = document.createElement('input')
  element.type = 'button'
  element.value = 'Copy'
  element.classList = 'copy-button'
  element.onclick = () => {
    let elCopy = targetNode.cloneNode(true)
    remEl(elCopy, 'ln');
    // todo: turn this into async
    navigator.clipboard.writeText(elCopy.innerText);
    console.log("Copied to clipboard successfully!");
  }
  return element
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