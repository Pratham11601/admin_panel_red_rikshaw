import React from 'react'
import Header from "../components/common/Header";
import TransactionTable from "../components/Transaction/TransactionTable";

function TransactionsDetails() {
  return (
    <div className="bg-white flex-1 overflow-auto relative z-10 text-black">
      <Header title="Transactions" />
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
      

					<TransactionTable />
			</main>
    </div>
  )
}

export default TransactionsDetails