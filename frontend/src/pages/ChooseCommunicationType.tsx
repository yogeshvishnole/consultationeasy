import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

import {  getConsultantById, RootState } from "../app";
import Layout from "../components/layout/Layout";
import stripeService from "../services/stripe"
import { ICommunicationType } from "../types";

const ChooseCommunicationType: React.FC = ({location}:any) => {
    let baseNumOfDays = 10;
    const params = useParams<{id:string}>()
    const [comType,setComType] = useState<ICommunicationType>('chat')  
    const [basePrice,setBasePrice] = useState<number|null>(null)
    const [numOfDays,setNumOfDays] = useState<number>(baseNumOfDays)  
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const {token} = useSelector((state:RootState) => state.user) 
    const {consultant} = useSelector((state:RootState) => state.consultant)
    useEffect(() => {
        if(params){
              dispatch(getConsultantById({consultantId:params.id}))
        }
    }, [params])

   

    const handleBooking = async () => {
      setLoading(true)
        let res = await stripeService.getSessionId(token,{id:consultant?._id,communicationType:comType,numOfDays});
    console.log("get sessionid resposne", res);
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY as string);
    setLoading(false)
    stripe?.redirectToCheckout({
        sessionId: res
      })
      .then((result:any) => console.log(result));
    }

  return (
    <Layout>
      <div className="container flex-center">
          <div className="price-box">
              <div className="form-control">
          <label>Select a Communication type</label>
          <select placeholder="select a communication type" onChange={(e) => setComType(e.target.value as ICommunicationType)}>
            <option value="chat">chat</option>
            <option value="voice">voice</option>
            <option value="video">video</option>
          </select>
        </div>
              <div className="form-control">
            <label>Enter number of days you wanna consult</label>
            <input type="number" value={numOfDays} onChange={e => {
              if(e.target.value >= baseNumOfDays){
                  setNumOfDays(e.target.value)
              }
              }}/>
         
        </div>
       {consultant && <div className='pricing-list'>
            <ul>
                <li>Pricing for each type</li>
                <li>Chat --> {consultant?.price + ( numOfDays -baseNumOfDays
                  )}</li>
                <li>Voice --> {consultant?.price + ( numOfDays -baseNumOfDays) + Math.floor(((consultant?.price + ( numOfDays -baseNumOfDays))*20)/100)}</li>
                <li>Video --> {consultant?.price + ( numOfDays - baseNumOfDays) + Math.floor(((consultant?.price +( numOfDays -baseNumOfDays))*40)/100)}</li>
            </ul>
        </div>}
        <button className='btn' onClick={handleBooking}>{loading ? "loading...":"Book"}</button>

          </div>
   
      </div>
    </Layout>
  );
};

export default ChooseCommunicationType;
