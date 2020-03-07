// Imports the Google Cloud client library
const language = require('@google-cloud/language');

async function queryNLP(chatText) {
  try {
    // Creates a client
    const client = new language.LanguageServiceClient();

    // Prepares a document, representing the provided text
    const document = {
      content: chatText,
      type: 'PLAIN_TEXT',
    };

    // Detects entities in the document
    const [result] = await client.analyzeEntities({ document });

    const entities = result.entities;

    return entities;

    // console.log('Entities:');
    // entities.forEach(entity => {
    //   console.log(entity.name);
    //   console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
    //   if (entity.metadata && entity.metadata.wikipedia_url) {
    //     console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
    //   }
    // });
  } catch (err) {
    console.log(err);
  }
}


module.exports = queryNLP;