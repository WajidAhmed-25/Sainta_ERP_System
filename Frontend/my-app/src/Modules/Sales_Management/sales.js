import React from 'react'

import SalesPart from './sales_data'
import SalesDataPart from './sales_product_data'

const Sales = () => {
  return (
    <div className='flex flex-col w-full gap-5 pt-12 h-fit'>

      <div className='w-full '>
        {/* side 1 */}
        <SalesPart />
      </div>

      <div className='w-full '>
     
        <SalesDataPart />
      </div>
    
    </div>
  )
}

export default Sales
