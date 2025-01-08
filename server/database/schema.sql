-- Création de la table users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    date_of_birth DATE,
    email VARCHAR(50) UNIQUE NOT NULL,
    mobile_data TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    address VARCHAR(50)
);

-- Création de la table vin
CREATE TABLE vin (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    origin VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    description TEXT DEFAULT NULL,
    CONSTRAINT price_positive CHECK (prix > 0)
);

-- Création de la table degustations
CREATE TABLE degustations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    date DATE DEFAULT NULL,
    location VARCHAR(255),
    city_name VARCHAR(50) NOT NULL,
    reservation_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table avis
CREATE TABLE avis (
    id SERIAL PRIMARY KEY,
    note DECIMAL(3,1) NOT NULL,
    description VARCHAR(200) NOT NULL,
    vin_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vin_id) REFERENCES vin(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT note_range CHECK (note >= 0 AND note <= 5)
);

-- Création de la table quizz
CREATE TABLE quizz (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    question TEXT,
    options JSON,
    media_data TEXT,
    duree_en_minutes INT,
    url VARCHAR(255),
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT duree_positive CHECK (duree_en_minutes > 0)
);

-- Création de la table questions
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    queries TEXT NOT NULL,
    name VARCHAR(100) NOT NULL,
    img BOOLEAN DEFAULT FALSE,
    quizz_id INT NOT NULL,
    FOREIGN KEY (quizz_id) REFERENCES quizz(id) ON DELETE CASCADE
);

-- Création de la table reponses
CREATE TABLE reponses (
    id SERIAL PRIMARY KEY,
    choix_1 TEXT NOT NULL,
    choix_2 TEXT NOT NULL,
    choix_3 TEXT,
    choix_4 TEXT,
    question_id INT NOT NULL,
    correct_choix INT NOT NULL CHECK (correct_choix BETWEEN 1 AND 4),
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Création de la table answer (réponses des utilisateurs)
CREATE TABLE answer (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    quizz_id INT NOT NULL,
    question_id INT NOT NULL,
    reponse_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (quizz_id) REFERENCES quizz(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY (reponse_id) REFERENCES reponses(id) ON DELETE CASCADE
);

-- Création de la table filtres
CREATE TABLE filtres (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


INSERT INTO degustations (id, name, date, location, city_name, reservation_url) VALUES
  (1,'Millésime Bio','27-29 janvier 2025','Parc des Expositions', 'Montpellier','https://www.millesime-bio.com'),
  (2,'Salon Vinidôme','31 janvier - 3 février 2025','Grande Halle d''Auvergne', 'Clermont-Ferrand','https://www.salon-vinifrance.fr/les-salonsclermont-ferrand/'),
  (3,'Salon des Vins de Loire','3-4 février 2025','Parc des Expositions', 'Angers','https://salondesvinsdeloire.com/'),
  (4,'Wine Paris / Vinexpo','10-12 février 2025','Paris Porte de Versailles', 'Paris','https://wineparis.com/newfront'),
  (5, 'Salon des Vins de Limoges', '14-16 février 2025', 'Parc des Expositions', 'Limoges', 'https://www.salon-vinifrance.fr/les-salons/limoges/'),
  (6, 'Salon des Vins Bio de Nantes', '28 février 2025', 'Parc des Expositions', 'Nantes', 'https://www.club-vignerons-laureats.com/salon-des-vins-nantes/'),
  (7, 'Salon Vins et Terroirs Toulouse', '7-9 mars 2025', 'Parc des Expositions MEETT', 'Toulouse', 'https://www.salon-vins-terroirs-toulouse.com'),
  (8, 'Salon des Vins des Vigerons Indépendants de Lyon', '07-09 mars 2025', 'Eurexpo', 'Lyon', 'https://www.vigneron-independant.com/19ème-salon-des-vins-des-vignerons-indépendants-lyon-eurexpo'),
  (9, 'Les Printemps de Châteauneuf-du-Pape', '8-9 Mars 2025', 'Châteauneuf-du-Pape', 'https://www.lesprintempsdechateauneufdupape.fr'),
  (10, 'Salon de Cusset', '20-23 mars 2025', 'Cusset', 'https://vinsetgastronomie.fr/cusset.php'),
  (11, 'Salon aux vignoles de La Rochelle', '28 Février - 2 Mars 2025',  'La Rochelle', 'https://www.auxvignobles.fr/la-rochelle/'),
  (12, 'Salon des Grands Crus de Bourgogne', '10-12 avril 2025', 'Beaune', 'https://www.salondesgrandscrusdebourgogne.com')
  (13, 'Salon des Vins de Marseille', '22-25 novembre 2024', 'Parc Chanot', 'Marseille', 'https://www.jds.fr/marseille/foires-et-salons/foires/savim-marseille-170815_A'),
  (14, 'Salon des Vins Bio de Montpellier', '27-29 avril 2025', 'Parc des Expositions', 'Montpellier', 'https://www.parc-expo-montpellier.com/evenement/millesime-bio-2025/'),
  (15, 'Salon Vins et Gastronomie Bretagne', '7-9 février 2025', 'Centre de Congrès', 'Binic-Etable-sur-Mer', 'https://www.salon-vins-gastronomie-bretagne.com'),
  (16, 'Salon des Vins et Fromages', '9-11 mai 2025', 'Parc des Expositions', 'Clermont-Ferrand', 'https://www.salon-vins-fromages-clermontferrand.com'),
  (17, 'Salon du Vin de Nice', '10-12 mai 2025', 'Palais des Expositions', 'Nice', 'https://www.salon-vin-nice.com'),
  (18, 'Salon des Vins d''Alsace', '23-25 mai 2025', 'Parc des Expositions', 'Strasbourg', 'https://www.salon-vins-alsace.com'),
  (19, 'Salon des Vins de Paris Bercy', '23-25 mai 2025', 'AccorHotels Arena', 'Paris', 'https://www.salon-vins-paris-bercy.com'),
  (20, 'Salon Viti Loire', '30 mai - 1 juin 2025', 'Parc des Expositions', 'Tours', 'https://www.vitiloire.fr'),
  (21, 'Salon des Vins de Provence', '2-4 juin 2026', 'Palais des Congrès', 'Toulon', 'https://www.salon-vins-provence.com'),
  (22, 'Salon des Vins de Sancerre', '6-8 juin 2025', 'Centre Ville', 'Sancerre', 'https://www.salon-vins-sancerre.com'),
  (23, 'Salon des Vins et Saveurs', '6-8 juin 2025', 'Parc des Expositions', 'Bordeaux', 'https://www.salon-vins-saveurs-bordeaux.com'),
  (24, 'Salon Vinexpo Bordeaux', '16-18 juin 2025', 'Palais des Congrès', 'Bordeaux', 'https://www.vinexpobordeaux.com'),
  (25, 'Salon des Vins de Champagne', '19-21 juin 2026', 'Épernay', 'https://www.salon-vins-champagne.com'),
  (26, 'Salon des Vins du Jura', '12-14 juillet 2025', 'Arbois', 'https://www.salon-vins-jura.com'),
  (27, 'Salon des Vins de Nice', '8-10 août 2025', 'Palais des Expositions', 'Nice', 'https://www.salon-vins-nice.com'),
  (28, 'Salon des Vins d''Automne de Colmar', '4-6 septembre 2025', 'Colmar', 'https://www.salon-vins-automne-colmar.com'),
  (29, 'Salon des Vins de Perpignan', '12-14 septembre 2025', 'Palais des Congrès', 'Perpignan', 'https://www.salon-vins-perpignan.com'),
  (30, 'Salon des Vins de Bourgogne', '12-14 septembre 2026', 'Beaune', 'https://www.salon-vins-bourgogne.com'),
  (31, 'Salon des Vins et Saveurs d''Automne', '20-22 septembre 2025', 'Parc Floral de Paris', 'Paris', 'https://www.salon-saveurs-automne-paris.com'),
  (32, 'Salon Vins et Terroirs Marseille', '3-5 octobre 2025', 'Parc Chanot', 'Marseille', 'https://www.salon-vins-terroirs-marseille.com'),
  (33, 'Salon des Vins d''Avignon', '4-5 octobre 2025', 'Palais des Papes', 'Avignon', 'https://www.salon-vins-avignon.com'),
  (34, 'Salon des Vins de Chablis', '11-13 octobre 2025', 'Chablis', 'https://www.salon-vins-chablis.com'),
  (35, 'Salon des Vins du Beaujolais', '16-18 octobre 2025', 'Villefranche-sur-Saône', 'https://www.salon-vins-beaujolais.com'),
  (36, 'Salon de la Gastronomie et des Vins du Sud-Ouest', '17-19 octobre 2025', 'Toulouse', 'https://www.salon-gastronomie-vins-sudouest.com'),
  (37, 'Salon du Vin de Bordeaux', '18-20 octobre 2025', 'Parc des Expositions', 'Bordeaux', 'https://www.salon-vins-bordeaux.com'),
  (38, 'Salon des Vins de Saint-Émilion', '7-9 novembre 2025', 'Salle des Dominicains', 'Saint-Émilion', 'https://www.salon-vins-saint-emilion.com'),
  (39, 'Salon des Vins de Reims', '10-11 novembre 2025', 'Parc des Expositions', 'Reims', 'https://www.salon-vins-reims.com'),
  (40, 'Salon Saveurs et Terroirs', '22-24 novembre 2025', 'Chambéry','https://www.salon-saveurs-terroirs.com');
	(41,'Salon des Vins de Provence et Côte d''Azur','22-24 novembre 2025','Cannes','https://www.salon-vins-provence-cotedazur.com'),
	(42,'Salon des Vins des Vignerons Indépendants Paris','28 novembre - 1 décembre 2025','Parc des Expositions Porte de Versailles', 'Paris','https://www.vigneron-independant.com'),
	(43,'Le Grand Tasting','28-29 novembre 2025','Carrousel du Louvre', 'Paris','https://www.grandtasting.com'),
	(44,'Salon des Vins et Gourmandises','5-7 décembre 2025','Espace Tête d''Or', 'Lyon','https://www.salon-vins-gourmandises-lyon.com'),
	(45,'Salon des Vins et de la Truffe','13-15 décembre 2025','Carpentras','https://www.salon-vins-truffes-carpentras.com'),
	(46,'Salon des Vins de Savoie','18-20 décembre 2025','Annecy','https://www.salon-vins-savoie.com'),
	(47,'Salon Vino Vision','14-16 janvier 2026','Paris Expo Porte de Versailles', 'Paris','https://www.vinovisionparis.com'),
	(48,'Salon du Vin et de la Gastronomie','8-10 février 2026','Nantes','https://www.salon-vins-gastronomie-nantes.com'),
	(49,'Salon des Vins de Saumur','3-5 avril 2026','Saumur','https://www.salon-vins-saumur.com'),
	(50,'Salon des Vins de Bourgogne','12-14 septembre 2026','Beaune', 'https://www.salon-vins-bourgogne.com');

INSERT INTO vin (id, name, category, origin, price, description) VALUES
(1, 'Château Margaux', 'Rouge', 'Bordeaux', 1200, 'Réputé pour son équilibre et sa complexité.'),
(2, 'Domaine de la Romanée-Conti', 'Rouge', 'Bourgogne', 20000, 'Offrant une profondeur exceptionnelle.'),
(3, 'Pétrus', 'Rouge', 'Pomerol', 4500, 'Riche et voluptueux.'),
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
(15, 'Rosé de Provence', 'Rosé', 'Provence', 20, 'Idéal pour l\'été.'),
(16, 'Shiraz Australien', 'Rouge', 'Australie', 30, 'Aux notes d\'épices et de fruits noirs.'),
(17, 'Sauternes', 'Blanc', 'France', 45, 'Parfait pour les desserts.'),
(18, 'Gewurztraminer', 'Blanc', 'Alsace', 30, 'Aux notes florales et épicées.'),
(19, 'Corton-Charlemagne', 'Blanc', 'Bourgogne', 150, 'Riche et complexe.'),
(20, 'Zinfandel', 'Rouge', 'États-Unis', 28, 'Avec une saveur distincte.'),
(21, 'Tavel', 'Rosé', 'Rhône', 25, 'Rosé corsé du Rhône, idéal avec les plats relevés.'),
(22, 'Prosecco', 'Blanc', 'Italie', 12, 'Vin effervescent italien, doux et fruité.'),
(23, 'Chianti Classico', 'Rouge', 'Italie', 35, 'Vin rouge toscan aux notes de cerise et d\'épices.'),
(24, 'Réserve Saint-Estèphe', 'Rouge', 'Bordeaux', 60, 'Rouge bordelais structuré et élégant.'),
(25, 'Beaujolais Nouveau', 'Rouge', 'Beaujolais', 10, 'Vin rouge léger et fruité, idéal pour les occasions décontractées.'),
(26, 'Cabernet Sauvignon', 'Rouge', 'International', 40, 'Un classique mondial, riche en tanins avec des notes de cassis.'),
(27, 'Merlot', 'Rouge', 'International', 25, 'Vin rouge souple et rond, aux arômes de fruits rouges.'),
(28, 'Syrah du Rhône', 'Rouge', 'Rhône', 30, 'Rouge épicé et puissant, idéal avec les viandes grillées.'),
(29, 'Pinot Noir', 'Rouge', 'Bourgogne', 50, 'Vin rouge élégant et subtil, originaire de Bourgogne.'),
(30, 'Verdicchio', 'Blanc', 'Italie', 18, 'Blanc italien frais et citronné, parfait avec les fruits de mer.'),
(31, 'Viognier', 'Blanc', 'Rhône', 35, 'Blanc aux arômes d\'abricot et de fleurs, provenant de la Vallée du Rhône.'),
(32, 'Carignan', 'Rouge', 'Sud de la France', 22, 'Vin rouge rustique du sud de la France, riche et fruité.'),
(33, 'Muscat', 'Blanc', 'International', 15, 'Vin doux et floral, idéal avec les desserts.'),
(34, 'Albariño', 'Blanc', 'Espagne', 28, 'Blanc espagnol vif, avec des arômes d\'agrumes.'),
(35, 'Grenache', 'Rouge', 'International', 20, 'Rouge généreux avec des notes de fruits rouges et de poivre.'),
(36, 'Chenin Blanc', 'Blanc', 'Loire', 25, 'Blanc de la Vallée de la Loire, offrant une belle minéralité.'),
(37, 'Tempranillo', 'Rouge', 'Espagne', 30, 'Rouge espagnol riche et épicé, typique de la région de la Rioja.'),
(38, 'Vin Jaune', 'Blanc', 'Jura', 75, 'Vin unique du Jura, avec des arômes de noix et une belle longévité.'),
(39, 'Globule Blanc', 'Blanc', 'Loire', 750, 'Un Chenin qui coule, juteux, vif , élégant et épuré. Un joli bouquet d’agrumes au nez.'),
(40, 'Globule Rouge', 'Rouge', 'Loire', 18000, 'Un Cabernet franc sur la finesse, avec un parfum de cuir et de rose.  En bouche, le vin est harmonieux, à la fois gourmand et acidulé, les tanins sont légers et fins.');
(41, 'L\'échapée', 'Rouge', 'France', 18, 'Vin 100% Grolleau, fruité et épicé, parfait avec des plats savoureux.'),
(42, 'Somnambule', 'Rouge', 'France', 25, 'Vin 90% Cabernet Franc, souple et rond, aux arômes de fruits rouges.'),
(43, 'L\'âme de fond', 'Blanc', 'France', 30, 'Vin 100% Chenin, dense et minéral, aux notes de fruits blancs.'),
(44, 'Cocagne', 'Rouge', 'France', 15, 'Vin 100% Grolleau, fruité et épicé.'),
(45, 'Contact', 'Blanc', 'France', 22, 'Vin 100% Chenin, puissant et fruité, idéal avec canard à l’orange ou Saint-Jacques.'),
(46, 'Révolution', 'Rouge', 'France', 20, 'Vin 100% Pineau d’Aunis, souple et épicé, aux arômes de poivre blanc et fruits rouges.'),
(47, 'Ô Temps Suspend Ton Vol Blanc', 'Blanc', 'Loire', 35, 'Assez loin des traditionnels crémants de Loire, c\'est d\'ailleurs un "Vin de France" très original.'),
(48, 'Chocolate in a Bottle CHARDONNAY', 'Blanc', 'France', 18, 'Vin blanc pétillant et gourmand du sud de la France.'),
(49, 'Sauvignon Blanc Lablachère', 'Blanc', 'France', 12, 'Ce vin blanc très aromatique à la robe brillante et limpide accompagnera les poissons et crustacés.'),
(50, 'Le Merlot', 'Rouge', 'France', 14, 'Rouge fruit noir et mûre, tannins puissants.');
