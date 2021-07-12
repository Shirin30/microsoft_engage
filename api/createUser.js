import axios from 'axios';

const createUser = async (req, res) => {
  const { userId, userName } = req.body;
  // here we make an api call to chatengine.io to create users in the chat engine.
  //we create the users that have been authorized by the firebase.
  //the private key is set as an environment variable in vercel to protect the privacy.
  axios
    .post('https://api.chatengine.io/projects/people/',
      { username: userName, secret: userId },
      { headers: { 'Private-Key': process.env.chat_engine_private_key } },
    )
    .then(apiRes => {
      res.json({
        body: apiRes.data,
        error: null,
      });
    })
    .catch(() => {
      res.json({
        body: null,
        error: 'There was an error creating the user',
      });
    });
};

export default createUser;