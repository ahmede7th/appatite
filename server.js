const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const cors = require('cors');
const tokenService = require('./services/TokenService');
const favoritesRouter = require('./routes/favoritesRouter');
const reviewRouter = require('./routes/reviewRouter');
const restaurantRouter = require('./routes/restaurantRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const authService = require('./services/AuthService');
const followerRouter = require('./routes/followerRouter');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger('dev'));
app.use(express.static('build'));
app.use(cors());
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(tokenService.receiveToken);

app.get('/restricted', authService.restrict(), (req, res) => {
  res.json({ msg: 'yay' });
});

app.get('/isLoggedIn', authService.isLoggedIn, (req, res) => {
  res.json({ isLoggedIn: res.locals.isLoggedIn });
});

app.use('/favorites', favoritesRouter);
app.use('/review', reviewRouter);
app.use('/restaurant', restaurantRouter);
app.use('/user', userRouter);
app.use('/user/auth', authRouter);
app.use('/follower', followerRouter);

app.get('*', (req, res) => res.sendFile(path.resolve('client/public', 'index.html')));

app.listen(PORT, () => {
  console.log(`Up and listening in express on port ${PORT}`);
});
