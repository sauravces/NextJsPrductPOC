const ServerAction=()=>{
    async function handleServerAction(params:any) {
        'use server'
        console.log(params);
    }
    return(
        <h1>
            Server Action Page
            <form action={handleServerAction}>
                <input type="email" name="email"></input>
                <button>Submit</button>
            </form>
        </h1>
    )
}
export default ServerAction;