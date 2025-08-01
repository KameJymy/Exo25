const {Server} = require("@theintern/leadfoot");
const serveur = new Server("http://localhost:58785");
const fillForm = require("./fillForm");

(async() =>{
    const session =await serveur.createSession({browserName:"chrome"});

    try
    {
        await fillForm(session);
    }
    catch(err)
    {
        console.log("Error : "+err.message);
    }
    finally
    {
        await session.quit();
    }
})();