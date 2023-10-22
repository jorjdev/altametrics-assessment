import React, { useEffect } from "react";
import { Button, Modal, Box, TextField } from "@mui/material";
import { FetchedDocument } from "../../types/types";
import moment from "moment";

interface DocumentModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedDocument: FetchedDocument;
}

const DocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  closeModal,
  selectedDocument,
}) => {
  const handleClose = () => {
    closeModal();
  };
  useEffect(() => {}, [selectedDocument]);
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            transform: "translate(-50%, -50%)",
          }}
          className="grid grid-cols-3 gap-x-12 gap-y-6 absolute top-[50%] left-[50%]  transform bg-white shadow-md p-5 min-w-[800px]"
        >
          <TextField
            className="text-md"
            id="standard-basic"
            value={selectedDocument.document_number}
            label="Document number"
            variant="standard"
          />
          <TextField
            className="text-md"
            id="standard-basic"
            sx={{ fontSize: "50px" }}
            value={String(selectedDocument.status).toUpperCase()}
            label="Status"
            variant="standard"
          />
          <TextField
            className="text-md"
            id="standard-basic"
            value={moment(selectedDocument.issued_at).format("MM-DD-YYYY")}
            label="Issued at"
            variant="standard"
          />
          <TextField
            className="text-[0.2rem]"
            id="standard-basic"
            value={moment(selectedDocument.due_at).format("MM-DD-YYYY")}
            label="Due at"
            variant="standard"
          />
          <TextField
            className="text-md"
            id="standard-basic"
            value={selectedDocument.amount_formatted}
            label="Amount"
            variant="standard"
          />
          <TextField
            className="text-md"
            id="standard-basic"
            value={selectedDocument.contact_name}
            label="Contact name"
            variant="standard"
          />
          <TextField
            className="text-md"
            id="standard-basic"
            value={selectedDocument.contact_email}
            label="Contact email"
            variant="standard"
          />
          <TextField
            className="text-md"
            id="standard-basic"
            value={selectedDocument.contact_phone}
            label="Contact phone"
            variant="standard"
          />
          <TextField
            className="text-md"
            id="standard-basic"
            value={selectedDocument.contact_tax_number}
            label="Contact tax number"
            variant="standard"
          />
          <TextField
            className="text-md"
            id="standard-basic"
            value={moment(selectedDocument.created_at).format("MM-DD-YYYY")}
            label="Created at"
            variant="standard"
          />
          <TextField
            className="text-md"
            id="standard-basic"
            value={moment(selectedDocument.updated_at).format("MM-DD-YYYY")}
            label="Updated at"
            variant="standard"
          />
          <TextField
            className="text-md"
            id="standard-basic"
            value={selectedDocument.category.name}
            label="Category"
            variant="standard"
          />
          <TextField
            className="w-[20rem]"
            id="outlined-basic"
            value={selectedDocument.contact_address}
            label="Contact address"
            variant="standard"
          />
          <Button
            onClick={handleClose}
            className="absolute left-[31.8rem]  top-[1rem] w-[2rem]"
          >
            <span className="text-[#2c2c2c] text-[1.1rem]">Close</span>
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DocumentModal;
