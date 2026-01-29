import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import axios from 'axios';
import { backend_url } from '../../App';
import ExpenseOverview from '../../components/expense/ExpenseOverview';
import AddExpens from '../../components/expense/AddExpens';
import Modal from '../../components/income/Modal';
import { toast } from 'react-toastify';
import ExpenseList from '../../components/expense/ExpenseList';
import DeleteAlert from '../../components/income/DeleteAlert';

function Expense() {

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddExpense, setOpenAddExpense] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState({
    show: false,
    data: null
  })

  const fetchExpenseData = async () => {
    if (loading) return;

    setLoading(true)
    try {
      const response = await axios.get(backend_url + '/api/expense/getall', {
        withCredentials: true
      })

      if (response.data.success) {
        setExpenseData(response.data.expenses)
      }
    } catch (error) {
      console.error("error in fetching user income detail ", error)
    }
    finally {
      setLoading(false)
    }
  }

  const handleAddExpense = async (expense) => {
    try {
      const { category, amount, date } = expense;

      if (!category.trim()) {
        toast.error("Category is required.", { autoClose: 800, position: 'top-center' })
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


      const response = await axios.post(backend_url + '/api/expense/add', expense, {
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true
      })

      if (response.data.success) {
        setOpenAddExpense(false);
        toast.success("Expense added successfully", { autoClose: 800, position: 'top-center' })
        fetchExpenseData();
      }
    } catch (error) {
      console.error("error in adding income ", error)
    }
  }

  const handleDeleteExpense = async (id) => {
    try {
      const response = await axios.delete(backend_url + `/api/expense/${id}`, {
        withCredentials: true
      })

      if (response.data.success) {
        setDeleteAlert({ show: false, data: null });
        toast.success("Expense deleted successfully", { autoClose: 800, position: 'top-center' })
        fetchExpenseData();
      }
    } catch (error) {
      console.error("error in deleting income ", error)
    }
  }

  const dowloadExpenseDetail = async () => {
    try {
      const response = await axios.get(backend_url + '/api/expense/downloadExcel', {
        withCredentials: true,
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Expenses_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Expense file downloaded successfully", { autoClose: 800, position: 'top-center' })
    } catch (error) {
      console.error("error in downloading expense details ", error)
    }
  }


  useEffect(() => {
    fetchExpenseData();
  }, [])


  return (
    <DashboardLayout activeMenu="Expense">
      <div className="mx-auto my-5">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transaction={expenseData}
              onAddExpense={() => { setOpenAddExpense(true)}}
            />
          </div>
          <ExpenseList
            transaction={expenseData}
            onDelete={(id) => {
              setDeleteAlert({ show: true, data: id })
            }}
            onDownload={dowloadExpenseDetail}
          />
        </div>

        <Modal
          isOpen={openAddExpense}
          onClose={() => setOpenAddExpense(false)}
          title="Add Expense"
        >
          <AddExpens onAddExpense={handleAddExpense} />
        </Modal>


        <Modal
          isOpen={deleteAlert.show}
          onClose={() => setDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this Expense detail?"
            onDelete={() => handleDeleteExpense(deleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense