import { Pagination } from '@mantine/core'
import React, {memo} from 'react'

function StyledPagination() {
  return (
    <Pagination total={2} radius="md" color="violet"/>
  )
}

export default memo(StyledPagination)