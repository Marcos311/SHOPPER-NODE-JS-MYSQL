import { db } from "../db.js";

export const getProducts = (_, res) => {
    const q = "SELECT * FROM products";

    db.query(q, (err, data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
    })
};

export const addProduct = (req, res) => {
    const q =
    "INSERT INTO products(`code`, `name`, `cost_price`, `sales_price`) VALUES(?)";

    const values = [
        req.body.code,
        req.body.name,
        req.body.cost_price,
        req.body.sales_price,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Produto adicionado com sucesso!");
    });
};

export const updateProduct = (req, res) => {
    const q = "UPDATE products SET `code` = ?, `name` = ?, `cost_price` = ?, `sales_price` = ? WHERE `code` = ?"

    const values = [
        req.body.code,
        req.body.name,
        req.body.cost_price,
        req.body.sales_price,
    ];

    db.query(q, [...values, req.params.code], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Produto atualizado com sucesso!");
    });
};

export const deleteProduct = (req, res) => {
    const q = "DELETE FROM products WHERE code = ?";

    db.query(q, [req.params.code], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Produto deletado com sucesso");
    });
};