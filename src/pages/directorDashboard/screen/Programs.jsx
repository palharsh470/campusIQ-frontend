import { Link } from "react-router-dom"
import ActivityIndicator from "../../../components/ActivityIndicator"
import { useFetch } from "../hooks/useFetch"
import ProgramCard, { ProgramIcon } from "../components/ProgramCard"
import { useDelete } from "../hooks/useDelete"
import { useCallback } from "react"
import { useAuth } from "../../../context/AuthContext"
import { useEdit } from "../hooks/useEdit"
import { deleteProgram, editProgram, listProgram } from "../api/programs"

const Programs = () => {

    const {user} = useAuth()
    let isOwner = false
    if(user.role == "DIRECTOR")
        isOwner = true
    const { data : programs, isLoading: listLoading, error, refetch } = useFetch(listProgram,"listPrograms")
    const { loading: deleteLoading, handleDelete : handleDeleteProgram } = useDelete(deleteProgram)
    const { handleEdit : handleEditProgram} = useEdit(editProgram)

    const handleDelete = useCallback(async (prgmId) => {
        await handleDeleteProgram(prgmId)
        await refetch()
    } , [])

    const handleEdit = useCallback(async (id, form)=> {
        await handleEditProgram(id, form)
        await refetch()
    }, []
    )

    return (

        <div className="bg-black min-h-screen px-4 py-16" >
            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                    <div>
                        <p className="text-sm font-medium text-green-600 uppercase mb-2">Programs</p>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white">All Programs</h1>
                        <p className="text-sm text-zinc-500 mt-2">Every placement-ready track launched across your organization.</p>
                    </div>
                    <Link
                        to="/director/programs/new"
                        className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-3 rounded-lg transition-colors shrink-0"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
                        New Program
                    </Link>
                </div>


                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-8">
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                {deleteLoading && listLoading && (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <ActivityIndicator />
                        <p className="text-sm text-zinc-500">Loading ...</p>
                    </div>
                )}

                {!listLoading && !deleteLoading && programs.length === 0 && (
                    <div className="border border-dashed border-neutral-800 rounded-2xl py-20 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4">
                            <ProgramIcon />
                        </div>
                        <h3 className="text-white font-medium mb-1">No programs yet</h3>
                        <p className="text-sm text-zinc-500 max-w-xs mb-6">Launch your first Bootcamp, GD or COE track to get started.</p>
                        <Link to="/director/programs/new" className="bg-green-600 hover:bg-green-700 text-white text-sm px-5 py-2.5 rounded-lg transition-colors">
                            Launch a Program
                        </Link>
                    </div>
                )}

                {!listLoading && !deleteLoading && !error && programs.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {programs.map((program) => (
                            <ProgramCard key={program.id} program={program} isOwner={isOwner} handleDelete={handleDelete} handleEdit={handleEdit} />
                        ))}
                    </div>
                )}
            </div>
            
        </div>

    )
}

export default Programs