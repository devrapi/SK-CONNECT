import React from 'react'
import { Button } from '@material-tailwind/react'
import ApiService from '../../../Services/ApiService'

const ClaimReward = ({rewardId , userId}) => {

    const handleClaim =  async () => {
        const  response = await ApiService.post(`rewards/claim/${userId}/${rewardId}`)
        console.log(response.data.message);
    }

  return (
    <Button onClick={handleClaim}>Claim Rewards</Button>
  )
}

export default ClaimReward
