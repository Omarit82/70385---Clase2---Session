document.addEventListener('DOMContentLoaded',()=>{
    "use strict";
    const formulario = document.getElementById('form');

    formulario.addEventListener('submit',(event)=>{
        event.preventDefault();
        form = new FormData(formulario)
        fetch('/api/sessions/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                first_name: form.get('first_name'),
                last_name: form.get('last_name'),
                email: form.get('email'),
                age: form.get('age'),
                password: form.get('password')
            })
        })
    })
})


