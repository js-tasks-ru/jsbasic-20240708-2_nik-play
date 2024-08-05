function toggleText() {
  let text = document.getElementById('text');
  let button = document.querySelector('button');
  button.addEventListener('click', () => {
  text.toggleAttribute('hidden');
  })
}
