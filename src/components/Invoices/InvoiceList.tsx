import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import {
  FetchedDocument,
  Parameters,
  ResourceMetadata,
  RootState,
} from "../../types/types";
import { fetchDocumentsThunk } from "../../config/redux/slices/documentsSlices";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import {
  getTableHeaders,
  DEFAULT_INVOICE_PARAMETERS,
} from "../../constants/constants";
import moment from "moment";
import DocumentViewSVG from "../shared/DocumentViewSVG";
import DocumentModal from "../shared/DocumentModal";
export interface IInvoiceListProps {}

const columns = getTableHeaders("invoice");
const cellBorderStyle = {
  borderRightStyle: "solid",
  borderRightWidth: "0.1rem",
  borderRightColor: "#f4f4f4",
};

function InvoiceList(props: IInvoiceListProps) {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const [parameters, setParameters] = useState<Parameters>(
    DEFAULT_INVOICE_PARAMETERS
  );
  const [selectedInvoice, setSelectedInvoice] = useState<FetchedDocument>();
  const [currentPage, setCurrentPage] = useState(
    DEFAULT_INVOICE_PARAMETERS.page
  );
  const [open, setOpen] = useState(false);
  const handleOpen = (invoice: FetchedDocument) => {
    setSelectedInvoice(invoice);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const [listOfInvoices, setListOfInvoices] = useState<FetchedDocument[]>([]);
  const [pagination, setPagination] = useState<ResourceMetadata>({
    current_page: DEFAULT_INVOICE_PARAMETERS.page,
  });

  const fetchedData = useSelector((state: RootState) => state.documents);
  const status = useSelector((state: RootState) => state.status);

  const fetchDocuments = useCallback(() => {
    dispatch(fetchDocumentsThunk.pending);
    dispatch(fetchDocumentsThunk(parameters));
  }, [dispatch, parameters]);

  useEffect(() => {
    const { data, meta } = fetchedData;
    setListOfInvoices(data);
    setPagination(meta);
  }, [fetchedData]);

  useEffect(() => {
    fetchDocuments();
  }, [parameters.page]);

  function handlePaginationChange(event: ChangeEvent<unknown>, page: number) {
    setCurrentPage(page);
    setParameters({ ...parameters, page });
  }

  if (status == "loading")
    return (
      <div className="absolute left-[45%] top-[28rem] w-[90%] ml-auto">
        <CircularProgress />
      </div>
    );
  if (status == "failed")
    return (
      <>
        <Alert
          className="absolute w-[30%] left-[30%] top-[26rem]"
          severity="error"
        >
          Fetching error
        </Alert>
      </>
    );
  if (status == "succeeded")
    return (
      <div className="absolute left-[4.6rem] top-[9.5rem] w-[90%] ml-auto">
        <span className="relative mb-[2rem] bottom-3 text-2xl font-medium font-lg">
          Invoices report
        </span>
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="bg-[#eeeeee] border-solid border-y-[#e0e0e0] border-b-2 border-t-1">
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      borderRightStyle: "solid",
                      borderRightWidth: "0.1rem",
                      borderRightColor: "#e0e0e0",
                    }}
                    key={index}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {listOfInvoices.map((invoice, invoiceIndex) => (
                <TableRow key={invoiceIndex}>
                  <TableCell sx={cellBorderStyle}>
                    {invoice.document_number}
                  </TableCell>
                  <TableCell sx={cellBorderStyle}>
                    {invoice.contact_name}
                  </TableCell>

                  <TableCell sx={cellBorderStyle}>
                    {invoice.contact_phone}
                  </TableCell>

                  <TableCell sx={cellBorderStyle}>
                    {invoice.amount_formatted}
                  </TableCell>

                  <TableCell sx={cellBorderStyle}>
                    {moment(invoice.issued_at).format("MM-DD-YYYY")}
                  </TableCell>

                  <TableCell sx={cellBorderStyle}>
                    {moment(invoice.due_at).format("MM-DD-YYYY")}
                  </TableCell>

                  <TableCell sx={cellBorderStyle}>
                    {String(invoice.status).toUpperCase()}
                  </TableCell>
                  <TableCell>
                    <button
                      className="rounded-2xl width-[25px]"
                      onClick={() => handleOpen(invoice)}
                    >
                      <DocumentViewSVG />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {pagination && (
          <Pagination
            count={pagination.last_page}
            page={currentPage}
            onChange={handlePaginationChange}
            className="bg-[#f3f3f3] h-[4rem] text-lg rounded-b-lg border-solid border-y-[#e0e0e0] border-b-2 border-t-1 flex flex-row align-start justify-start "
          />
        )}
        {selectedInvoice && (
          <DocumentModal
            isOpen={open}
            closeModal={handleClose}
            selectedDocument={selectedInvoice}
          />
        )}
      </div>
    );
}

export default InvoiceList;
