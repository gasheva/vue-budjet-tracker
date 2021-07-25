const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const categories = require('./routes/categories');
const records = require('./routes/records');
const infos = require('./routes/infos');
const users = require('./routes/users');
const {authenticateJWT} = require('./middleware/auth');

app.use(cors());
app.use(express.json());

app.post('/api/login', users.login);
app.post('/api/registration', users.registration);
app.post('/api/logout', users.logout);
app.post('/api/token', users.refresh);

app.put('/api/users/:id', authenticateJWT, users.updateUser);
app.get('/api/categories', authenticateJWT, categories.getCategories);
app.get('/api/categories/:id', authenticateJWT, categories.getCategoryById);
app.post('/api/categories', authenticateJWT, categories.postCategory);
app.delete('/api/categories/:id', authenticateJWT, categories.deleteCategory);
app.put('/api/categories/:id', authenticateJWT, categories.putCategory);

app.get('/api/records', authenticateJWT, records.getRecords);
app.get('/api/records/:id', authenticateJWT, records.getRecordById);
app.post('/api/records', authenticateJWT, records.postRecord);

app.get('/api/info/:id', authenticateJWT, infos.getInfo);
app.put('/api/info/:id', authenticateJWT, infos.putInfo);
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    // console.log(err);
    res.json({ error: err })
  });
  
  app.get('/', (req, res) => {
    res.send(`Server is listening on port 3000`)
  });

app.listen(3000, ()=>{
    console.log('Server is listening on port 3000');
})