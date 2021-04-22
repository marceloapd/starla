async function teste(){
    try{
        await erro()
    }catch(e){
        console.log(e)
    }
}

function erro(){
    erroasync()
}

async function erroasync(){
    throw ("ERRADO")
}

teste()