const express = require( 'express' );
const ejs = require( 'ejs' );
const mongoose = require( 'mongoose' );


const app = express();

mongoose.connect( 'mongodb://localhost:27017/subscriberDB', { useNewUrlParser: true, useUnifiedTopology: true} );

const subscriberSchema = new mongoose.Schema( {
  firstName: String,
  lastName: String,
  email: String
})

const Subscriber = mongoose.model( 'Subscriber', subscriberSchema );

app.set( 'view engine', 'ejs' );
app.use( express.static( 'public' ) );
app.use( express.urlencoded( { extended: true } ) );


app.get( '/', ( req, res ) => {
  res.render( 'signup' );
} )


app.post( '/', ( req, res ) => {
  const { firstName, lastName, email } = req.body;

  if ( firstName && lastName && email ) {
    const newSubscriber = new Subscriber( {
    firstName: firstName,
    lastName: lastName,
    email: email
  } )
  
    newSubscriber.save( ( err, info ) => {
      console.log( info );
    res.render('success', {firstName: info.firstName})
  })
  } else {
    res.render( 'failure' );
  }


} )

app.post( '/failure', ( req, res ) => {
  res.redirect( '/' );
})


app.listen( 3000, () => console.log( 'Server is running on port 3000' ) );