app.post("/pedido", (req, res) => {
    const { nome, email, telefone, endereco, cidade, estado, pedido, cor, mensagem } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ msg: "Acesso negado!" });

    try {
        const decoded = jwt.verify(token, "secreto");
        
        db.query(
            "INSERT INTO pedidos (user_id, nome, email, telefone, endereco, cidade, estado, pedido, cor, mensagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [decoded.id, nome, email, telefone, endereco, cidade, estado, pedido, cor, mensagem],
            (err, result) => {
                if (err) throw err;
                res.status(201).json({ msg: "Pedido realizado com sucesso!" });
            }
        );
    } catch (err) {
        res.status(401).json({ msg: "Token inválido!" });
    }
});





