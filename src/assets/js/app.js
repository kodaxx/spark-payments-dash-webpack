// add listener for android back button
document.addEventListener("backbutton", onBackKeyDown, false);
// android back key event handler
function onBackKeyDown(e) {
  e.preventDefault();
  app.cancel()
  app.$data.route = 'home';
}
// keyboard input event listeners
window.addEventListener('keydown', function(e) {
  if (app.$data.route === 'home') {
    switch (e.keyCode) {
      case 49:
        app.add('1')
        break
      case 50:
        app.add('2')
        break
      case 51:
        app.add('3')
        break
      case 52:
        app.add('4')
        break
      case 53:
        app.add('5')
        break
      case 54:
        app.add('6')
        break
      case 55:
        app.add('7')
        break
      case 56:
        app.add('8')
        break
      case 57:
        app.add('9')
        break
      case 48:
        app.add('0')
        break
        //backspace
      case 8:
        app.remove()
        break
        //delete
      case 46:
        app.remove()
    }
  }
  //esc key returns home if on settings screen
  if (e.keyCode === 27) {
    if (app.$data.route === 'settings') {
      app.$data.route = 'home'
    }
  }
  //enter key
  if (e.keyCode === 13) {
    if (app.$data.route === 'settings') {
      app.save()
    }
    if (app.$data.route === 'home') {
      app.purchase()
    } else {
      app.cancel()
    }
  }
}, false)
