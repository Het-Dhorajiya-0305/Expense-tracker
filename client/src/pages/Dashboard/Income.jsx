import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import IncomeOverview from '../../components/income/IncomeOverview'
import axios from 'axios';
import { backend_url } from '../../App';
import Modal from '../../components/income/Modal';
import AddIncome from '../../components/income/AddIncome';
import { toast } from 'react-toastify';
import IncomeList from '../../components/income/IncomeList';
import DeleteAlert from '../../components/income/DeleteAlert';

function Income() {

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddIncome, setOpenAddIncome] = useState(false);
  const [deleteAlert,setDeleteAlert]=useState({
    show:false,
    data:null
  })

  const fetchIncomeData = async () => {
    if (loading) return;

    setLoading(true)
    try {
      const response = await axios.get(backend_url + '/api/income/getall', {
        withCredentials: true
      })

      if (response.data.success) {
        setIncomeData(response.data.incomes)
      }
    } catch (error) {
      console.error("error in fetching user income detail ", error)
    }
    finally {
      setLoading(false)
    }
  }

  const handleAddincome = async (income) => {
    try {
      const { source, amount, date } = income;

      if (!source.trim()) {
        toast.error("Source is required.", { autoClose: 800, position: 'top-center' })
        return
      }
      if (!amount || isNaN(amount) || Number(amount) <= 0) {
        toast.error("Amount should be number and greater than 0.", { autoClose: 800, position: 'top-center' })
        return
      }
      if (!date) {
        toast.error("Date is required. ", { autoClose: 800, position: 'top-center' })
        return
      }


      const response = await axios.post(backend_url + '/api/income/add', income, {
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true
      })

      if (response.data.success) {
        setOpenAddIncome(false);
        toast.success("Income added successfully", { autoClose: 800, position: 'top-center' })
        fetchIncomeData();
      }
    } catch (error) {
      console.error("error in adding income ", error)
    }
  }

  const handleDeleteIncome = async (id) => {
    try {
      const response = await axios.delete(backend_url + `/api/income/${id}`, {
        withCredentials: true
      })

      if (response.data.success) {
        setDeleteAlert({ show: false, data: null });
        toast.success("Income deleted successfully", { autoClose: 800, position: 'top-center' })
        fetchIncomeData();
      }
    } catch (error) {
      console.error("error in deleting income ", error)
    }
  }

  const dowloadIncomeDetail = async () => {
    try {
          const response = await axios.get(backend_url + '/api/income/downloadExcel', {
            withCredentials: true,
            responseType: 'blob'
          })
    
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Income_details.xlsx');
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
    
          toast.success("Income file downloaded successfully", { autoClose: 800, position: 'top-center' })
        } catch (error) {
          console.error("error in downloading expense details ", error)
        }
  }


  useEffect(() => {
    fetchIncomeData();
  }, [])

  return (
    <DashboardLayout activeMenu="Income">
      <div className="mx-auto my-5">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transaction={incomeData}
              onAddIncome={() => { setOpenAddIncome(true) }}
            />
          </div>
          <IncomeList
            transaction={incomeData}
            onDelete={(id) => {
              setDeleteAlert({ show: true, data: id })
            }}
            onDownload={dowloadIncomeDetail}
          />
        </div>

        <Modal
          isOpen={openAddIncome}
          onClose={() => setOpenAddIncome(false)}
          title="Add Income"
        >
          <AddIncome onAddIncome={handleAddincome} />
        </Modal>

        
        <Modal
        isOpen={deleteAlert.show}
        onClose={()=>setDeleteAlert({show:false,data:null})}
        title="Delete Income"
        >
          <DeleteAlert
          content="Are you sure you want to delete this income detail?"
          onDelete={()=>handleDeleteIncome(deleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>

  )
}

export default Income