import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState } from "react";

interface SuggestionVinProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

export default function SuggestionVin({
  openModal,
  setOpenModal,
}: SuggestionVinProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [origin, setOrigin] = useState("");
  const [description, setDescription] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false); // ✅ Fermer la modal
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setOrigin("");
    setDescription("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const currentDate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const userId = 1; // Replace with the actual user ID
      if (!userId) {
        throw new Error("User ID is required");
      }
      await axios.post("http://localhost:3310/api/suggestion", {
        user_id: userId,
        name,
        price,
        origin,
        description,
        creation_date: currentDate,
        modification_date: currentDate,
      });
      handleCloseModal(); // ✅ Fermer la modal après soumission
    } catch (error) {
      console.error("Erreur lors de l'ajout du vin :", error);
    }
  };

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box sx={{ width: 400, bgcolor: "background.paper", p: 4, m: "auto" }}>
        <h2>Ajouter un vin</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom du vin"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Prix (€)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Origine"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Ajouter</button>
        </form>
        <Button onClick={handleCloseModal}>Fermer</Button>
      </Box>
    </Modal>
  );
}
