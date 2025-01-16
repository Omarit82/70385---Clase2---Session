//import Swal from "sweetalert2";

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
                pass: form.get('password')
            })
        }).then((response) => {
            if(response.status === 201 ){
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "User Created",
                    didClose: () => {
                        window.location.href = '/api/sessions/viewlogin';
                    }
                });
            }else if(response.status === 500){
                console.log("Error al conectar con servidor")
            }else{
                console.log("Error")
            }
        })
    })
})


