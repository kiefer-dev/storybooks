const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard') //if successful, redirect to dashboard
  }
)

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
  req.logout(req.user, err => {
    if (err) { return next(err); }
    res.redirect('/') //redirect to homepage after logging out
  })  //passport logout method
})
// https://stackoverflow.com/questions/72336177/error-reqlogout-requires-a-callback-function

module.exports = router