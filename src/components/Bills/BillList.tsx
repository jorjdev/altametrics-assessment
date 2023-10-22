import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Pagination,
  CircularProgress,
  Alert,
} from "@mui/material";
import DocumentModal from "../shared/DocumentModal";
import { useDispatch, useSelector } from "react-redux";
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
  DEFAULT_BILL_PARAMETERS,
} from "../../constants/constants";
import moment from "moment";
import DocumentViewSVG from "../shared/DocumentViewSVG";

const columns = getTableHeaders("bill");
const cellBorderStyle = {
  borderRightStyle: "solid",
  borderRightWidth: "0.1rem",
  borderRightColor: "#f4f4f4",
};

function BillList() {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const [parameters, setParameters] = useState<Parameters>(
    DEFAULT_BILL_PARAMETERS
  );
  const [currentPage, setCurrentPage] = useState(DEFAULT_BILL_PARAMETERS.page);
  const [listOfBills, setListOfBills] = useState<FetchedDocument[]>([]);
  const [pagination, setPagination] = useState<ResourceMetadata>({
    current_page: DEFAULT_BILL_PARAMETERS.page,
  });
  const [selectedBill, setSelectedBill] = useState<FetchedDocument>();

  const [open, setOpen] = useState(false);
  const fetchedData = useSelector((state: RootState) => state.documents);
  const status = useSelector((state: RootState) => state.status);

  const fetchDocuments = useCallback(() => {
    dispatch(fetchDocumentsThunk.pending);
    dispatch(fetchDocumentsThunk(parameters));
  }, [dispatch, parameters]);

  useEffect(() => {
    const { data, meta } = fetchedData;
    setListOfBills(data);
    setPagination(meta);
  }, [fetchedData]);

  useEffect(() => {
    fetchDocuments();
  }, [parameters.page]);

  function handlePaginationChange(event: ChangeEvent<unknown>, page: number) {
    setCurrentPage(page);
    setParameters({ ...parameters, page });
  }
  const handleOpen = (bill: FetchedDocument) => {
    setSelectedBill(bill);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  if (status == "loading")
    return (
      <div id='loader' className="absolute left-[45%] top-[28rem] w-[90%] ml-auto">
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
      <div  className="absolute left-[4.6rem] top-[9.5rem] w-[90%] ml-auto">
        <span role='heading' className="relative mb-[2rem] bottom-3 text-2xl font-medium font-lg">
          Bills report
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
              {listOfBills.map((bill, billIndex) => (
                <TableRow key={billIndex}>
                  <TableCell sx={cellBorderStyle}>
                    {bill.document_number}
                  </TableCell>
                  <TableCell sx={cellBorderStyle}>
                    {bill.contact_name}
                  </TableCell>

                  <TableCell sx={cellBorderStyle}>
                    {bill.contact_phone}
                  </TableCell>

                  <TableCell sx={cellBorderStyle}>
                    {bill.amount_formatted}
                  </TableCell>

                  <TableCell sx={cellBorderStyle}>
                    {moment(bill.issued_at).format("MM-DD-YYYY")}
                  </TableCell>

                  <TableCell sx={cellBorderStyle}>
                    {moment(bill.due_at).format("MM-DD-YYYY")}
                  </TableCell>

                  <TableCell sx={cellBorderStyle}>
                    {String(bill.status).toUpperCase()}
                  </TableCell>
                  <TableCell>
                    <button
                      className="rounded-2xl width-[25px]"
                      onClick={() => handleOpen(bill)}
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
            className="bg-[#f3f3f3] h-[4rem] text-lg rounded-b-lg border-solid border-y-[#e0e0e0] border-b-2 border-t-1 flex flex-row align-start justify-start "
            count={pagination.last_page}
            page={currentPage}
            onChange={handlePaginationChange}
          />
        )}
        {selectedBill && (
          <DocumentModal
            isOpen={open}
            closeModal={handleClose}
            selectedDocument={selectedBill}
          />
        )}
      </div>
    );
}

export default BillList;
