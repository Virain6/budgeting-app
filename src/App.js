//Recourses
//https://www.youtube.com/watch?v=yz8x71BiGXg
//https://react-bootstrap.netlify.app/docs/forms/form-control
//https://getbootstrap.com/docs/5.0/utilities/spacing/

import {Button, Stack } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import BudgetCard from './components/BudgetCard'
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard'
import AddBudgetModal from './components/AddBudgetModal'
import ViewExpensesModal from './components/ViewExpensesModal'
import AddExpenseModal from './components/AddExpenseModal'
import { useState } from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './context/BudgetContext'
import TotalBudgetcard from './components/TotalBudgetCard'

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetID, setViewExpensesModalBudgetID] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const {budgets, getBudgetExpenses} = useBudgets()

  function openAddExpenseModal(budgetId){
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return(
    <> 
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>
        <div 
          style={{
            display:"grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
            gap: "1rem", 
            alignItems:"flex-start"
            }}>
          
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
            return( 
              <BudgetCard 
                key={budget.id}
                name={budget.name} 
                amount={amount} 
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)} 
                onViewExpenseClick={() => setViewExpensesModalBudgetID(budget.id)} 
              /> 
            )
          })}
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal}
          onViewExpenseClick={() => setViewExpensesModalBudgetID(UNCATEGORIZED_BUDGET_ID)}/>
          <TotalBudgetcard />

        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)}/>
      <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={addExpenseModalBudgetId} handleClose={() => setShowAddExpenseModal(false)}/>
      <ViewExpensesModal budgetId={viewExpensesModalBudgetID} handleClose={() => setViewExpensesModalBudgetID()}/>
    </>
  ) 
}
export default App;