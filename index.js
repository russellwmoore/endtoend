const express = require('express');
const app = express();
const { db, User, Task, Session } = require('./db');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const uuidv4 = require('uuid/v4');

const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use((req, res, next) => {
  if (req.cookies.SSID) {
    // see if this cookie is in the session!
    Session.findOne({
      where: { id: req.cookies.SSID },
      include: { model: User },
    })
      .then(sessOrNull => {
        if (sessOrNull) {
          req.user = sessOrNull.user;
        }
        next();
      })
      .catch(e => {
        console.log(e);
        next();
      });
    // if there is a session, then attatch the user on that session to the req.user object
  } else {
    // assign cookie to response here if none was present before
    // res.cookie = something
    res.cookie('SSID', uuidv4(), { expires: new Date(Date.now() + 900000) });
    next();
  }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/tasks', (req, res, next) => {
  Task.findAll({ where: { userId: req.user.id } })
    .then(tasks => res.send(tasks))
    .catch(e => console.log(e));
});

app.post('/auth/login', (req, res, next) => {
  console.log('in login route');
  const { password, email } = req.body;
  User.findOne({
    where: {
      email,
      password,
    },
  }).then(userOrNull => {
    if (userOrNull) {
      // handle not being in session tble yet
      if (!req.cookies.SSID) {
        Session.create()
          .then(sess => {
            return sess.setUser(userOrNull);
          })
          .then(() => res.send(userOrNull));
      } else {
        Session.findOrCreate({ where: { id: req.cookies.SSID } })
          .then(response => {
            const session = response[0];
            return session.setUser(userOrNull);
          })
          .then(() => {
            res.send(userOrNull);
          })
          .catch(e => console.log('error in login ', e));
      }
    } else {
      const err = new Error('Incorrect Username or Password');
      res.status(401).send(err);
    }
  });
});

app.post('/auth/logout', (req, res, next) => {
  console.log(req.cookies);
  Session.findOne({ where: { id: req.cookies.SSID } })
    .then(sess => {
      res.clearCookie('SSID');
      return sess.destroy();
    })
    .then(() => {
      res.sendStatus(201);
    });
});

app.get('/auth/me', (req, res, next) => {
  if (req.user) {
    return res.send(req.user);
  }
  res.send('not logged in');
});

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch(e => {
    console.log('db sync error', e);
    process.exit(1);
  });
