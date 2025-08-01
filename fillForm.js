const selectors = require("./selectors");
const Command =require('leadfoot/Command');
const pollUntil = require('leadfoot/helpers/pollUntil');

async function fillForm(session)
{
    await session.get(selectors.lien);

    const inputs = await session.findAllByXpath(selectors.inputs);

    const champ ={
        identifiant :"Jean",
        password :"cool1234",
    };
    for (let input of inputs)
    {
        const id = await input.getAttribute(selectors.id);
        if (champ[id])
        {
            await input.type(champ[id]);
            console.log(id +" : "+champ[id]);
        }
    }

    const role = await session.findByCssSelector(selectors.role);
    const options = await role.findAllByTagName("option");
    for (let option of options)
    {
        const value = await option.getAttribute("value");
        if (value==="employe")
        {
            await option.click();
            console.log("Employé selectionné");
            break;
        }
    }
    const connexion = await session.findByCssSelector(selectors.connect);
    await connexion.click();

    await chargement("#welcome", session);

    const msg = await session.findByXpath(selectors.msg_employe);
    console.log(await msg.getVisibleText());

    const deco = await session.findByCssSelector(selectors.deco);
    await deco.click();

    await chargement("#identifiant", session);

    const inputss = await session.findAllByXpath(selectors.inputs);
    const champ2 ={
        identifiant :"Jean",
        password :"texts12345",
    };
    for (let input of inputss)
    {
        const id = await input.getAttribute(selectors.id);
        if (champ2[id])
        {
            await input.type(champ2[id]);
            console.log(id +" : "+champ2[id]);
        }
    }

    const role2 = await session.findByCssSelector(selectors.role);
    const options2 = await role2.findAllByTagName("option");
    for (let option of options2)
    {
        const value = await option.getAttribute("value");
        if (value==="manager")
        {
            await option.click();
            console.log("Manager selectionné");
            break;
        }
    }
    const connexion2 = await session.findByCssSelector(selectors.connect);
    await connexion2.click();

    
    const msg2 = await session.findByXpath(selectors.msg2);
    console.log(await msg2.getVisibleText());
     
}



async function chargement(a, session) {
    await new Command(session)
        .then(pollUntil(function(selector) {
            const element = document.querySelector(selector);
            return element && window.getComputedStyle(element).display !== "none" ? true : null;
        }, [a], 3000));

    console.log("Page chargée avec succès");
}



module.exports = fillForm;