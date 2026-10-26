import { useNavigate } from "react-router-dom";
import { markNotificationsRead } from "../api/notification";
import { useState } from "react";
import { useAlert } from "../../../context/AlertContext";


export function useMarkNotificationRead(){
  const {showAlert} = useAlert()
      const [loading, setLoading] = useState(false)
      const navigate = useNavigate()
  
         async function handlePost(payload) {
                 
                  setLoading(true)
                  try {
                    await markNotificationsRead(payload)
                      showAlert("success", `Data Added Successfully`)
                      navigate(-1)
                  }
                  catch (err) {
                      showAlert("error", err.message ||  'Something went wrong')
                  }
                  finally {
                      setLoading(false)
                  }
              }
      
          return {
              loading, handlePost
          }
      
      }