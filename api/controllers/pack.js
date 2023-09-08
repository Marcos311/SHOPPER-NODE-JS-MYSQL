import { db } from "../db.js";

export const getPacks = (_, res) => {
    const q = "SELECT * FROM packs";

    db.query(q, (err, data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
    })
};

export const addPack = (req, res) => {
    const q =
    "INSERT INTO packs(`pack_id`, `product_id`, `qty`) VALUES(?)";

    const values = [
        req.body.pack_id,
        req.body.product_id,
        req.body.qty,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Pacote adicionado com sucesso!");
    });
};

export const updatePack = (req, res) => {
    const q = "UPDATE packs SET `pack_id` = ?, `product_id` = ?, `qty` = ? WHERE `id` = ?";

    const values = [
        req.body.pack_id,
        req.body.product_id,
        req.body.qty,
        req.params.id,
    ];

    db.query(q, values, (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Pacote atualizado com sucesso!");
    });
};

export const deletePack = (req, res) => {
    const q = "DELETE FROM packs WHERE id = ?";

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Pacote deletado com sucesso");
    });
};