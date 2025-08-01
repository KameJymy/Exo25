const selectors = require("./selectors");

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

    const role = findByCssSelector(selectors.role);
    

}

module.exports = fillForm;