const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// BUG #1: Wrong default password - doesn't match docker-compose!
// Change it to be from local host which is content of docker to postgres
const pool = new Pool({
   user: process.env.DB_USER || 'postgres',
   host: process.env.DB_HOST || 'postgres',
   database: process.env.DB_NAME || 'tododb',
   password: process.env.DB_PASSWORD || 'postgres',
   port: process.env.DB_PORT || 5432,
});

app.get('/health', (req, res) => {
   res.json({ status: 'healthy', version: '1.0.0' });
});

// GET todos
app.get('/api/todos', async (req, res) => {
   try {
      const result = await pool.query('SELECT * FROM todos ORDER BY id');
      res.json(result.rows);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// BUG #2: Missing validation - will cause test to fail!
// STUDENT TODO: Add validation to reject empty title
// Add validation to make POST validation pass 

app.post('/api/todos', async (req, res) => {
   try {
      const { title, completed = false } = req.body;

      // STUDENT FIX: Add validation here!
      // Hint: Check if title is empty or undefined
      // Return 400 status with error message if invalid

      if (!title || title.trim() ===''){
         return res.status(400).json({error: 'Title is required'});
      }

      const result = await pool.query(
         'INSERT INTO todos(title, completed) VALUES($1, $2) RETURNING *',
         [title, completed]
      );
      res.status(201).json(result.rows[0]);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// BUG #3: Missing DELETE endpoint - but test expects it!
// STUDENT TODO: Implement DELETE /api/todos/:id endpoint
app.delete('/api/todos/:id', async (req, res) =>{
   try{
      const { id } =req.params;
      await pool.query('DELETE FROM todos WHERE id = $1', [id]);
      res.status(204).send(); //this keep no content return ,good for delete
   } catch (err) {
      res.status(500).json({error:err.message}); //this catch any error from server side
   }
});
// BUG #4: Missing PUT endpoint for updating todos
// STUDENT TODO: Implement PUT /api/todos/:id endpoint

const port = process.env.PORT || 8080;
app.put('/api/todos/:id',async (req,res) => {
   try{
      const {id} = req.params;
      const {title,completed} = req.body;
      // check the tittle,if user input new title it wont be empty 
      if (title !== undefined && title.trim() === ""){
         return res.status(400).json({error: 'Title cannot be empty'});
      }
      //Build dynamic query
      const fields = [];
      const values = [];
      let idx = 1;

      if (title !== undefined){
         fields.push(`title = $${idx}`);
         values.push(title);
         idx++;
      }
      if (completed !== undefined){
         fields.push(`completed = $${idx}`);
         values.push(completed);
         idx++;
      }
      if (fields.length === 0){
         return res.status(400).json({error:'Nothing to update'});
      }

      values.push(id); //keep play holder work

      const result = await pool.query(
         `UPDATE todos SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
          values
      );
      if (result.rows.length === 0) {
         return res.status(404).json({ error: 'Todo not found' });
      }

      res.json(result.rows[0]);
   } catch(err){
      res.status(500).json({error:err.message});
   }
})
// BUG #5: Server starts even in test mode, causing port conflicts
// STUDENT FIX: Only start server if NOT in test mode
if (process.env.NODE_ENV !== 'test'){
   app.listen(port,()=>{
      console.log(`Backend running on port ${port}`);
   });
}

// BUG #6: App not exported - tests can't import it!
// STUDENT FIX: Export the app module
module.exports = app;