document.addEventListener('DOMContentLoaded',()=>{
    "use strict";
    const login = document.getElementById('login');
    login.addEventListener('submit',(e)=>{
        e.preventDefault();
        const data = new FormData(login);
        fetch('/api/sessions/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: data.get('userEmail'),
                password: data.get('userPass')
            })
        }).then((response)=>{
            if(response.status == 200){
                console.log("usuario logueado")
            }else{
                console.log("error en el login")
            }
        })
    })
})