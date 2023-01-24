
function rmChildElementByCLassName(parent, elClassName) {
  const els = parent.getElementsByClassName(elClassName)
  while (els.length > 0) {
    els[0].parentNode.removeChild(els[0])
  }
}


function createInput(inputType, value) {
  const el = document.createElement('input')
  el.type = inputType
  el.value = value
  el.className = 'input-' + inputType
  return el
}

function copyCodeblockButton(codeBlockElement) {
  // Constructor functions, returns codeblock input -> button element
  const el = createInput('button', 'Copy')
  el.onclick = () => {
    // https://developer.mozilla.org/en-US/docs/Web/Security/User_activation
    let elCopy = codeBlockElement.cloneNode(true) // deep copy of codeblock element nodes
    let tempValue = el.value

    rmChildElementByCLassName(elCopy, 'ln'); // Removes line number

    navigator.clipboard.writeText(elCopy.innerText)
    .then( 
      ()=>{
        el.value = 'Copied!'
        el.disabled = true
        el.classList.add('disabled')
        setTimeout(()=>{
          el.value = tempValue
          el.disabled = false
          el.classList.remove('disabled')
        }, 2000)
        console.log("Copied to clipboard successfully!");
        
      },
      ()=>{
        el.value = 'Failed!'
        el.classList.add('failed')
        el.disabled = true
        setTimeout(()=>{
          el.value = tempValue
          el.disabled = false
          el.classList.remove('failed')
        }, 2000)
        console.warn("Failed to copy content.")
      }
    )
    .catch((e)=>{
      console.warn(e)
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
    child.style.setProperty('margin-bottom', '1em')
    child.style.setProperty('align-items', 'center')
    child.innerHTML = el.attributes.getNamedItem('data-lang').value
    child.appendChild(copyCodeblockButtonEl)
    el.parentNode.insertBefore(child, el.parentNode.firstChild)
  });

});