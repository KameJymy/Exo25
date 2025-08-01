const selectors = require("./selectors");

async function fillForm(session)
{
    await session.get(selectors.lien);


}

module.exports = fillForm;