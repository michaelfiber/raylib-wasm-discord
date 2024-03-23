import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config({ path: "../.env" });

const app = express();
const port = 3001;

app.set('view engine', 'pug');
app.set('views', "./views");

// Allow express to parse JSON bodies
app.use(express.json());

// serve static files from root 
app.use(express.static("./static/"));

app.get("/", (req, res) => {
  res.render('index', {
    DISCORD_CLIENT_PUBLIC_ID: process.env.DISCORD_CLIENT_PUBLIC_ID
  });
});

app.post("/api/token", async (req, res) => {
  
  // Exchange the code for an access_token
  const response = await fetch(`https://discord.com/api/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_PUBLIC_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code: req.body.code,
    }),
  });

  // Retrieve the access_token from the response
  const { access_token } = await response.json();

  // Return the access_token to our client as { access_token: "..."}
  res.send({access_token});
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
