export function AddAnswer(data) {
  return fetch('/.netlify/functions/postanswer', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

// reponse retournée dans le vide, add answer callback 

