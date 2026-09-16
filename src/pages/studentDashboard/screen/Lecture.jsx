import React from 'react'
import { useFetch } from '../../directorDashboard/hooks/useFetch'
import { getLectures } from '../api/lectures'
import ActivityIndicator from "../../../components/ActivityIndicator"
import {useAlert} from "../../../context/AlertContext"
import LectureCard from '../../../components/LectureCard'

function Lecture() {
  const {data : lectures, loading, error, refetch} = useFetch(getLectures, "getLectures")
  const {showAlert} = useAlert()
  if(loading)
    return <ActivityIndicator></ActivityIndicator>

  return (
     <div className="bg-black min-h-screen">
            <div className="p-5 mx-auto">
                <p className="text-sm font-medium text-green-600 uppercase ">My Lectures</p>
                <h1 className="text-3xl font-bold text-white mb-4">Recorded Lectures</h1>

                {error && showAlert("error", error.e)}

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
                    {lectures?.map((lecture) => (
                        <LectureCard key={lecture.id} lecture={lecture} />
                    ))}
                </div>
            </div>
        </div>
  )
}

export default Lecture