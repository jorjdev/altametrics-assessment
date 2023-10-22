import "./App.css";
import { Route, Routes } from "react-router";
import NavigationDrawer from "./components/NavigationDrawer";
import  BillList  from "./components/Bills/BillList";
import  InvoiceList  from "./components/Invoices/InvoiceList";
import OutletContainer from "./components/OutletContainer";

const App: React.FC = () => {
  return (
    <div className='bg-[white]'>
      <NavigationDrawer />
      <OutletContainer className="ml-[16rem] relative">
        <Routes>
          <Route path="/invoices" element={<InvoiceList />} />
          <Route path="/bills" element={<BillList />} />
        </Routes>
      </OutletContainer>
    </div>
  );
};

export default App;
