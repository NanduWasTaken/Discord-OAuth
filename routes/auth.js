const express = require('express');
const fetch = require('@replit/node-fetch');
const router = express.Router();
const user = require('./../schema/discord');

const clientID = process.env.clientID;
const clientSecret = process.env.secret;
const redirectURI = 'https://discord-auth-1000.nanduwastaken.repl.co/auth/discord/callback';

router.get('/discord', (req, res) => {
  const params = new URLSearchParams({
    client_id: clientID,
    redirect_uri: redirectURI,
    response_type: 'code',
    scope: 'identify email guilds guilds.join'
  }).toString();

  const authorizationURL = `https://discord.com/api/oauth2/authorize?${params}`;
  res.redirect(authorizationURL);
});

router.get('/discord/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const tokenParams = new URLSearchParams({
      client_id: clientID,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectURI,
      scope: 'identify email guilds guilds.join'
    }).toString();

    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: tokenParams
    });

    const tokenData = await tokenResponse.json();
    const { access_token, refresh_token } = tokenData;

    const profileResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    const profile = await profileResponse.json();
/*
    const guildResponse = await fetch(`https://discord.com/api/guilds/1122371463060668489/members/${profile.id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bot ${process.env.Bot_Token}`
  },
  body: JSON.stringify({
    access_token: `${access_token}`
  })
});
  
    

    const guildMember = await guildResponse.json();
    console.log(guildMember);

    let User = await user.findOneAndUpdate(
      { id: profile.id },
      {
        id: profile.id,
        username: profile.username,
        global_name: profile.global_name,
        discriminator: profile.discriminator,
        email: profile.email,
        guilds: profile.guilds,
        avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}`,
        accessToken: access_token,
        refreshToken: refresh_token
      },
      { upsert: true, new: true }
    );
  */
    req.session.profileId = profile.id;

    res.send(`Logged in ${profile.username}.`);
  } catch (error) {
    console.error('Error during authentication:', error);
    res.send(error);
  }
});

module.exports = router;
