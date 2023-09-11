function getFormValue() {
  let getForm = document.getElementById('form1')
  for (let i = 0; i < getForm.length; i++) {
    if (getForm[i].value != 'Submit') {
      console.log(getForm[i].value);
      let getSpan = document.createElement('span')
      getSpan.innerHTML = getForm[i].value
      getForm.appendChild(getSpan)
    }
  }
}

export default getFormValue;