'use client'

import useFollowerInfo from '@/app/hooks/useFollowerInfo'
import { formatNumber } from '@/lib/utils'
import { FollowerInfo } from '@/types'
import React from 'react'

interface FollowerCountProps {
  userId: string,
  initialState: FollowerInfo
}

const FollowerCount = ({userId,initialState }:FollowerCountProps) => {
  const { data } = useFollowerInfo(userId,initialState)

  return (
    <span>
      Người theo dõi:{" "}
      <span className='font-semibold'>{formatNumber(data.followers)}</span>
    </span>
  )
}

export default FollowerCount