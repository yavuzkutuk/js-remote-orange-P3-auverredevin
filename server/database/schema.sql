CREATE TABLE roles (
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    date_of_birth DATE,
    email VARCHAR(50) UNIQUE NOT NULL,
    phone VARCHAR(50),
    address VARCHAR(250),
    role_id INT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE SET NULL
);

CREATE TABLE wine (
    wine_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    origin VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    description TEXT DEFAULT NULL,
    CONSTRAINT price_positive CHECK (price > 0)
);

CREATE TABLE tasting (
    tasting_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    date DATE DEFAULT NULL,
    location VARCHAR(255),
    city_name VARCHAR(50) NOT NULL,
    reservation_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE opinion (
    opinion_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    opinion DECIMAL(3,1) NOT NULL,
    description VARCHAR(200) NOT NULL,
    wine_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wine_id) REFERENCES wine(wine_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT opinion_range CHECK (opinion >= 0 AND opinion <= 5)
);

CREATE TABLE questions (
    question_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question_text TEXT NOT NULL
);

CREATE TABLE answers (
    answer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    answer_text TEXT NOT NULL,
    score_value INT NOT NULL, -- Score de la reponse
    CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

CREATE TABLE user_answers (
    user_answer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    answer_id INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_question_2 FOREIGN KEY (question_id) REFERENCES questions(question_id),
    CONSTRAINT fk_answer FOREIGN KEY (answer_id) REFERENCES answers(answer_id)
);

CREATE TABLE taste_profiles (
    profile_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    min_score INT NOT NULL,
    max_score INT NOT NULL,
    profile_name VARCHAR(255) NOT NULL
);

CREATE TABLE user_scores (
    score_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_score INT NOT NULL,
    taste_profile_id INT,  -- Clé étrangère vers la table taste_profiles
    CONSTRAINT fk_user_score FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_taste_profile FOREIGN KEY (taste_profile_id) REFERENCES taste_profiles(profile_id)
);

CREATE TABLE wine_filters (
    filter_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    wine_id INT NOT NULL, 
    color VARCHAR(20),  -- Couleur du vin (Blanc, Rouge, Rosé)
    price_range VARCHAR(50), -- Plage de prix (par exemple : '0-20€', '20-50€', '50-100€', etc.)
    origin VARCHAR(100), -- Origine du vin (par exemple : 'Bordeaux', 'Italie', etc.)
    category VARCHAR(50), -- Catégorie du vin (par exemple : 'Sec', 'Doux', etc.)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wine_id) REFERENCES wine(wine_id) ON DELETE CASCADE
);

INSERT INTO roles (name) VALUES ('admin'), ('client');

INSERT INTO users (firstname, lastname, date_of_birth, email, phone, address) VALUES
('Jean', 'Dupont', '1985-03-15', 'jean.dupont@email.com', '+33612345678', '123 Rue de Paris, Paris'),
('Marie', 'Martin', '1990-07-22', 'marie.martin@email.com', '+33623456789', '45 Avenue des Champs-Élysées, Paris'),
('Pierre', 'Bernard', '1988-11-30', 'pierre.bernard@email.com', '+33634567890', '78 Rue du Commerce, Lyon'),
('Sophie', 'Petit', '1992-04-18', 'sophie.petit@email.com', '+33645678901', '15 Rue de la République, Marseille'),
('Lucas', 'Moreau', '1987-09-25', 'lucas.moreau@email.com', '+33656789012', '32 Boulevard Victor Hugo, Nice');

INSERT INTO wine (wine_id, name, category, origin, price, description) VALUES
(1, 'Château Margaux', 'Rouge', 'Bordeaux', 1200, 'Réputé pour son équilibre et sa complexité.'),
(2, 'Domaine de la Romanée-Conti', 'Rouge', 'Bourgogne', 200, 'Offrant une profondeur exceptionnelle.'),
(3, 'Pétrus', 'Rouge', 'Pomerol', 450, 'Riche et voluptueux.'),
(4, 'Sassicaia', 'Rouge', 'Italie', 280, 'Avec une belle structure tannique.'),
(5, 'Opus One', 'Rouge', 'Californie', 450, 'Alliant puissance et finesse.'),
(6, 'Châteauneuf-du-Pape', 'Rouge', 'Rhône', 75, 'Connu pour ses arômes épicés.'),
(7, 'Barolo', 'Rouge', 'Italie', 95, 'Souvent appelé le "roi des vins".'),
(8, 'Amarone della Valpolicella', 'Rouge', 'Italie', 85, 'Avec des notes de fruits confits.'),
(9, 'Grange', 'Rouge', 'Australie', 800, 'Reconnu pour sa richesse et sa longévité.'),
(10, 'Riesling Trocken', 'Blanc', 'Allemagne', 40, 'Réputé pour son acidité vibrante.'),
(11, 'Malbec Argentin', 'Rouge', 'Argentine', 25, 'Avec des arômes de prune et de chocolat.'),
(12, 'Pouilly-Fumé', 'Blanc', 'Loire', 30, 'Caractérisé par des notes fumées.'),
(13, 'Cava', 'Blanc', 'Espagne', 20, 'Une alternative au champagne.'),
(14, 'Champagne Dom Pérignon', 'Blanc', 'France', 210, 'Aux bulles fines et à la saveur complexe.'),
(15, 'Rosé de Provence', 'Rosé', 'Provence', 20, "Idéal pour l'été."),
(16, 'Shiraz Australien', 'Rouge', 'Australie', 30, "Aux notes d'épices et de fruits noirs."),
(17, 'Sauternes', 'Blanc', 'France', 45, 'Parfait pour les desserts.'),
(18, 'Gewurztraminer', 'Blanc', 'Alsace', 30, 'Aux notes florales et épicées.'),
(19, 'Corton-Charlemagne', 'Blanc', 'Bourgogne', 150, 'Riche et complexe.'),
(20, 'Zinfandel', 'Rouge', 'États-Unis', 28, 'Avec une saveur distincte.'),
(21, 'Tavel', 'Rosé', 'Rhône', 25, 'Rosé corsé du Rhône, idéal avec les plats relevés.'),
(22, 'Prosecco', 'Blanc', 'Italie', 12, 'Vin effervescent italien, doux et fruité.'),
(23, 'Chianti Classico', 'Rouge', 'Italie', 35, "Vin rouge toscan aux notes de cerise et d'épices."),
(24, 'Réserve Saint-Estèphe', 'Rouge', 'Bordeaux', 60, 'Rouge bordelais structuré et élégant.'),
(25, 'Beaujolais Nouveau', 'Rouge', 'Beaujolais', 10, 'Vin rouge léger et fruité, idéal pour les occasions décontractées.'),
(26, 'Cabernet Sauvignon', 'Rouge', 'International', 40, 'Un classique mondial, riche en tanins avec des notes de cassis.'),
(27, 'Merlot', 'Rouge', 'International', 25, 'Vin rouge souple et rond, aux arômes de fruits rouges.'),
(28, 'Syrah du Rhône', 'Rouge', 'Rhône', 30, 'Rouge épicé et puissant, idéal avec les viandes grillées.'),
(29, 'Pinot Noir', 'Rouge', 'Bourgogne', 50, 'Vin rouge élégant et subtil, originaire de Bourgogne.'),
(30, 'Verdicchio', 'Blanc', 'Italie', 18, 'Blanc italien frais et citronné, parfait avec les fruits de mer.'),
(31, 'Viognier', 'Blanc', 'Rhône', 35, "Blanc aux arômes d'abricot et de fleurs, provenant de la Vallée du Rhône."),
(32, 'Carignan', 'Rouge', 'Sud de la France', 22, 'Vin rouge rustique du sud de la France, riche et fruité.'),
(33, 'Muscat', 'Blanc', 'International', 15, 'Vin doux et floral, idéal avec les desserts.'),
(34, 'Albariño', 'Blanc', 'Espagne', 28, "Blanc espagnol vif, avec des arômes d'agrumes."),
(35, 'Grenache', 'Rouge', 'International', 20, 'Rouge généreux avec des notes de fruits rouges et de poivre.'),
(36, 'Chenin Blanc', 'Blanc', 'Loire', 25, 'Blanc de la Vallée de la Loire, offrant une belle minéralité.'),
(37, 'Tempranillo', 'Rouge', 'Espagne', 30, 'Rouge espagnol riche et épicé, typique de la région de la Rioja.'),
(38, 'Vin Jaune', 'Blanc', 'Jura', 75, 'Vin unique du Jura, avec des arômes de noix et une belle longévité.'),
(39, 'Globule Blanc', 'Blanc', 'Loire', 18, 'Un Chenin qui coule, juteux, vif , élégant et épuré. Un joli bouquet d’agrumes au nez.'),
(40, 'Globule Rouge', 'Rouge', 'Loire', 18, 'Un Cabernet franc sur la finesse, avec un parfum de cuir et de rose.  En bouche, le vin est harmonieux, à la fois gourmand et acidulé, les tanins sont légers et fins.'),
(41, "L'échapée", 'Rouge', 'France', 18, 'Vin 100% Grolleau, fruité et épicé, parfait avec des plats savoureux.'),
(42, 'Somnambule', 'Rouge', 'France', 25, 'Vin 90% Cabernet Franc, souple et rond, aux arômes de fruits rouges.'),
(43, "L'âme de fond", 'Blanc', 'France', 30, 'Vin 100% Chenin, dense et minéral, aux notes de fruits blancs.'),
(44, 'Cocagne', 'Rouge', 'France', 15, 'Vin 100% Grolleau, fruité et épicé.'),
(45, 'Contact', 'Blanc', 'France', 22, 'Vin 100% Chenin, puissant et fruité, idéal avec canard à l’orange ou Saint-Jacques.'),
(46, 'Révolution', 'Rouge', 'France', 20, 'Vin 100% Pineau d’Aunis, souple et épicé, aux arômes de poivre blanc et fruits rouges.'),
(47, 'Ô Temps Suspend Ton Vol Blanc', 'Blanc', 'Loire', 35, "Assez loin des traditionnels crémants de Loire, c'est d'ailleurs un 'Vin de France' très original."),
(48, 'Chocolate in a Bottle CHARDONNAY', 'Blanc', 'France', 18, 'Vin blanc pétillant et gourmand du sud de la France.'),
(49, 'Sauvignon Blanc Lablachère', 'Blanc', 'France', 12, 'Ce vin blanc très aromatique à la robe brillante et limpide accompagnera les poissons et crustacés.'),
(50, 'Le Merlot', 'Rouge', 'France', 14, 'Rouge fruit noir et mûre, tannins puissants.');

INSERT INTO opinion (opinion, description, wine_id, user_id) VALUES
(4.5, "Vin excellent avec une belle complexité. Très équilibré, j'ai adoré!", 1, 1),
(3.8, 'Un bon vin, mais je trouve que le goût manque un peu de profondeur.', 2, 2),
(5.0, 'Absolument incroyable! La qualité de ce vin est exceptionnelle.', 3, 3),
(2.5, "Le vin n'est pas à la hauteur de mes attentes. Un peu trop amer.", 4, 4),
(4.0, 'Très bon vin, agréable et bien structuré. À recommander.', 5, 5),
(3.2, 'Un bon vin mais pas assez de caractère pour moi. Un peu trop léger.', 6, 1),
(4.7, 'Arômes de fruits confits et une belle longueur en bouche, un de mes préférés!', 7, 2),
(4.3, 'Très bon rapport qualité/prix, avec des notes fruitées et épicées.', 8, 3),
(4.9, 'Vin robuste, mais très élégant. Un must pour les amateurs!', 9, 4),
(3.0, 'Un peu trop acide pour mon goût, mais reste correct.', 10, 5),
(4.4, 'Une belle bouteille, agréable à boire et facile à apprécier.', 11, 1),
(3.5, 'Un vin un peu trop sucré à mon goût, mais il est assez rafraîchissant.', 12, 2),
(4.6, 'Très agréable avec des poissons. Les arômes sont parfaits.', 13, 3),
(5.0, 'Un classique! Dom Pérignon ne déçoit jamais. Parfait pour des occasions spéciales.', 14, 4),
(4.0, "Parfait pour l'été, léger et frais, très bon vin rosé.", 15, 5),
(3.7, 'Pas mal du tout, mais un peu trop sec à mon goût.', 16, 1),
(4.2, 'Un vin agréable avec des arômes d’épices, parfait pour les viandes grillées.', 17, 2),
(4.8, "Un vin d'exception pour accompagner les desserts. Très doux et équilibré.", 18, 3),
(3.9, 'Bon vin mais peut-être un peu trop intense pour un dîner léger.', 19, 4),
(5.0, 'Un vin riche et complexe. Parfait pour les grandes occasions.', 20, 5);

INSERT INTO questions (question_text) VALUES
("Quel niveau d'acidité aimez-vous dans un vin ?"),
("Préférez-vous un vin léger ou puissant ?"),
("Quel arôme recherchez-vous dans un vin ?"),
("Préférez-vous un vin sec ou sucré ?"),
("Quel type de vin préférez vous?");

-- Question 1 : Quel niveau d'acidité aimez-vous dans un vin ?
INSERT INTO answers (question_id, answer_text, score_value) VALUES
(1, 'Faible acidité', 1),
(1, 'Acidité modérée', 2),
(1, 'Acidité élevée', 3);

-- Question 2 : Préférez-vous un vin léger ou puissant ?
INSERT INTO answers (question_id, answer_text, score_value) VALUES
(2, 'Léger', 1),
(2, 'Modéré', 2),
(2, 'Puissant', 3);

-- Question 3 : Quel arôme recherchez-vous dans un vin ?
INSERT INTO answers (question_id, answer_text, score_value) VALUES
(3, 'Fruité', 1),
(3, 'Épicé', 2),
(3, 'Boisé', 3),
(3, 'Floral', 4);

-- Question 4 : Préférez-vous un vin sec ou sucré ?
INSERT INTO answers (question_id, answer_text, score_value) VALUES
(4, 'Sec', 1),
(4, 'Demi-sec', 2),
(4, 'Sucré', 3);

-- Question 5 : Quel type de vin préférez-vous ?
INSERT INTO answers (question_id, answer_text, score_value) VALUES
(5, 'Rouge', 1),
(5, 'Blanc', 2),
(5, 'Rosé', 3);

-- Réponses des utilisateurs

INSERT INTO user_answers (user_id, question_id, answer_id) VALUES
(1, 1, 2),  -- Jean Dupont répond à la première question (acidité modérée)
(1, 2, 3),  -- Jean Dupont répond à la deuxième question (puissant)
(1, 3, 1),  -- Jean Dupont répond à la troisième question (fruity)
(1, 4, 1),  -- Jean Dupont répond à la quatrième question (sec)
(1, 5, 1),  -- Jean Dupont répond à la cinquième question (rouge)

-- Marie Martin avec user_id = 2
(2, 1, 3),  -- Marie Martin répond à la première question (acidité élevée)
(2, 2, 1),  -- Marie Martin répond à la deuxième question (léger)
(2, 3, 2),  -- Marie Martin répond à la troisième question (épicé)
(2, 4, 2),  -- Marie Martin répond à la quatrième question (demi-sec)
(2, 5, 2);  -- Marie Martin répond à la cinquième question (blanc)

-- Insérer les profils de goût en fonction des scores
INSERT INTO taste_profiles (min_score, max_score, profile_name) VALUES
(0, 5, 'Adepte des vins légers'),  -- Scores entre 0 et 5 : Profil "Adepte des vins légers"
(6, 10, 'Explorateur de vins'),    -- Scores entre 6 et 10 : Profil "Explorateur de vins"
(11, 15, 'Épicurien'),             -- Scores entre 11 et 15 : Profil "Épicurien"
(16, 20, 'Connaisseur des grands crus'); -- Scores entre 16 et 20 : Profil "Connaisseur des grands crus"

-- Insérer les scores des utilisateurs
-- Ce score correspond au profil "Épicurien" (score entre 11 et 15)

INSERT INTO user_scores (user_id, total_score, taste_profile_id) VALUES
(1, 12, 3);  -- Profil "Épicurien" a `profile_id = 3`

-- Ajouter des filtres pour les vins
INSERT INTO wine_filters (wine_id, color, price_range, origin, category) VALUES
(1, 'Rouge', '0-50€', 'Bordeaux', 'Sec'), -- Château Margaux : Rouge, moins de 50€, Bordeaux, sec
(2, 'Rouge', '200-500€', 'Bourgogne', 'Fruité'), -- Domaine de la Romanée-Conti : Rouge, entre 200€ et 500€, Bourgogne, fruité
(3, 'Rouge', '400-800€', 'Pomerol', 'Riche'), -- Pétrus : Rouge, entre 400€ et 800€, Pomerol, riche
(4, 'Rouge', '50-100€', 'Italie', 'Tannique'), -- Sassicaia : Rouge, entre 50€ et 100€, Italie, tannique
(10, 'Blanc', '20-50€', 'Allemagne', 'Acide'), -- Riesling Trocken : Blanc, entre 20€ et 50€, Allemagne, acide
(11, 'Rouge', '0-30€', 'Argentine', 'Fruité'), -- Malbec Argentin : Rouge, moins de 30€, Argentine, fruité
(12, 'Blanc', '20-50€', 'Loire', 'Sec'); -- Pouilly-Fumé : Blanc, entre 20€ et 50€, Loire, sec

