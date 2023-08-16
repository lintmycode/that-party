-- insert categories
INSERT INTO Categories (id, name) VALUES 
(1, 'Para a grelha'),
(2, 'Doces'),
(3, 'Bebidas alcoólicas'),
(4, 'Bebidas não-alcoólicas');

-- insert contributions
INSERT INTO Contributions (id, category_id, name, qtyPer10Adults, qtyPer10Children) VALUES 
(1, 1, 'Frango', 3, 3),
(2, 1, 'Costelinha (piano)', 3, 3),
(3, 1, 'Hamburgeres (pack 2)', 4, 4),
(4, 1, 'Chouriço', 4, 2),
(5, 1, 'Toscanas', 4, 5),

(7, 2, 'Bolo de noiva', 1, 1),

(8, 3, 'Vinho branco', 3, 0),
(9, 3, 'Vinho alvarinho', 3, 0),
(10, 3, 'Vinho rosé', 3, 0),
(11, 3, 'Gin + tónica (pack 6)', 1, 0),
(12, 3, 'Cerveja (pack 6)', 8, 0),

(13, 4, 'Água das Pedras (pack 6)', 2, 1),
(14, 4, 'Coca-cola (1.5l)', 1, 1),
(15, 4, 'Seven-up (1.5l)', 1, 1),
(16, 4, 'Ice Tea (1.5l)', 1, 1),
(17, 4, 'Fanta / Sumol (1.5l)', 1, 1),
(18, 4, 'Sumos de fruta (1l)', 1, 1);
