const selectors = require("./selectors");
const Command =require('leadfoot/Command');
const pollUntil = require('leadfoot/helpers/pollUntil');

async function fillForm(session)
{
    await session.get(selectors.lien);

    const inputs = await session.findAllByXpath(selectors.inputs);

    const champ ={
        identifiant :"Jean",
        password :"1234",
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
    const options = await session.findAllByTagName("option");
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

    await new Command(session)
        .then(pollUntil(function(){
            const element = document.querySelector("#welcome");
            return element && window.getComputedStyle(element).display !== "none" ? true : null
        ;},[], 3000));

        console.log("Chargement réussi de la page");
}

module.exports = fillForm;