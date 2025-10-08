const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const User = require('./models/User');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());


app.use(session({ secret: 'jwtsecret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new GoogleStrategy({
  clientID: '889767050341-ca9joe83ngjh083qn2fc1qraa441id76.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:5000/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ email: profile.emails[0].value });
  if (!user) {
    user = await User.create({ email: profile.emails[0].value, password: '' });
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

app.use('/api', authRoutes);


app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/frontend/index.html' }),
  (req, res) => {

    res.redirect('/frontend/dashboard.html');
  }
);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));