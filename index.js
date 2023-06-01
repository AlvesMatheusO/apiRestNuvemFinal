const express = require('express');
const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://dcwgoqckfkmmdtvmzsnh.supabase.co'; // Substitua pela URL do seu projeto Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjd2dvcWNrZmttbWR0dm16c25oIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM2ODA2NDMsImV4cCI6MTk5OTI1NjY0M30.dwl2CmpWmZnyyYj5NIXM9QBpu2HG13Y8_BWptlTozv4'; // Substitua pela chave do seu projeto Supabase
const supabase = createClient(supabaseUrl, supabaseKey);


const app = express();

app.use(express.json());


//Pagina Principal
app.get('/', function (req, res) {
    res.send("<h1>Catalogo de Produtos!!!</h1>");
});



//todos os produtos
app.get('/produtos', async (req, res) => {
    try {
      const { data: produtos, error } = await supabase.from('produtos').select('*');
      if (error) throw error;
      res.json(produtos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Criar novo Produto
  app.post('/produtos', async (req, res) => {
    try {
      const { desc, preco } = req.body;
      const { data, error } = await supabase.from('produtos').insert([{ desc, preco }]);
      if (error) throw error;
      res.json({ message: 'Produto criado com sucesso', data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


// Rota para consultar um produto pelo ID
app.get('/produtos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
// Rota para editar um produto pelo ID
app.put('/produtos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { desc, preco } = req.body;
      const { data, error } = await supabase
        .from('produtos')
        .update({ desc, preco })
        .match({ id });
      if (error) throw error;
      res.json({ message: 'Produto atualizado com sucesso', data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  // Rota para deletar um produto pelo ID
app.delete('/produtos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { data, error } = await supabase
        .from('produtos')
        .delete()
        .eq('id', id);
      if (error) throw error;
      res.json({ message: 'Produto deletado com sucesso', data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

//Controle de teste: 
app.listen(3000, function (erro) {
    if (erro) {
        console.log("Erro ao Iniciar");
    } else {
        console.log('Servidor Iniciado');
    } 
});

