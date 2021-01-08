/** A minimal plugin example **/
var HelloWorldPlugin = function(args) {

  var createButton = function(value) {
    var button = document.createElement('button');

    if (value == currentColorValue)
      button.className = 'selected';

    button.dataset.tag = value;
    button.style.backgroundColor = value;
    button.addEventListener('click', addTag); 
    return button;
  }

  var createTag = function(value) {
    var button = document.createElement('span');
    button.className = "badge badge-secondary mx-1 p-2";
    button.innerHTML = value
    return button;
  }

  var container = document.createElement('div');
  container.className = 'p-2';

  var textContainer = document.createElement('div');
  textContainer.className = 'mt-2';
  container.appendChild(textContainer)

  var tagContainer = document.createElement('div');
  tagContainer.className = 'mt-2';
  container.appendChild(tagContainer)

  args.annotation.body.map((body) => {
    if(body.purpose == "tagging"){
      tagContainer.appendChild(createTag(body.value));
    } else {
      textContainer.appendChild(createElementFromHTML(body.value));
    }
  })

  return container;
}

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild; 
}